const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT_DIR, "data");
const SETS_DIR = path.join(OUTPUT_DIR, "sets");
const MODULE_OUTPUT = path.join(OUTPUT_DIR, "quiz-data.js");
const MANIFEST_OUTPUT = path.join(OUTPUT_DIR, "quiz-manifest.json");
const EXTERNAL_UDEMY_DIR = path.join(
  "C:\\Users\\ms-98\\OneDrive\\Desktop\\codex proj",
  "az305-udemy",
);
const SOURCE_FILTER = process.argv
  .slice(2)
  .find((arg) => arg.startsWith("--source="))
  ?.slice("--source=".length);

const SOURCES = [
  {
    sourceId: "jp1",
    fileName: "\u554f\u984c\u96c61.html",
    title: "\u554f\u984c\u96c61",
    inputDir: EXTERNAL_UDEMY_DIR,
  },
  {
    sourceId: "jp2",
    fileName: "\u554f\u984c\u96c62.html",
    title: "\u554f\u984c\u96c62",
    inputDir: path.join(ROOT_DIR, "assets"),
  },
  {
    sourceId: "jp3",
    fileName: "\u554f\u984c\u96c63.html",
    title: "\u554f\u984c\u96c63",
    inputDir: path.join(ROOT_DIR, "assets"),
  },
];

const QUESTION_BLOCK_MARKER =
  '<div class="result-pane--question-result-pane--sIcOh result-pane--accordion-panel--TEJg7">';
const ANSWER_BLOCK_MARKER = '<div class="result-pane--answer-result-pane--Niazi">';
const RELATED_FIELDS_MARKER =
  '<div class="result-pane--question-related-fields--c3m--">';

function main() {
  const targetSources = resolveTargetSources();
  const generatedSets = [];

  for (const source of targetSources) {
    const sourcePath = path.join(source.inputDir, source.fileName);
    const html = fs.readFileSync(sourcePath, "utf8");
    const questions = buildQuestions(html, source);
    generatedSets.push(...buildSets(questions, source));
  }

  const { manifest, allSets } = buildOutputs(generatedSets);

  fs.mkdirSync(SETS_DIR, { recursive: true });
  fs.writeFileSync(MANIFEST_OUTPUT, JSON.stringify(manifest, null, 2), "utf8");
  fs.writeFileSync(MODULE_OUTPUT, buildModuleSource(manifest, allSets), "utf8");

  for (const set of generatedSets) {
    fs.writeFileSync(
      path.join(SETS_DIR, `${set.setId}.json`),
      JSON.stringify(set, null, 2),
      "utf8",
    );
  }

  console.log(
    `Generated ${generatedSets.length} set(s) for ${targetSources
      .map((source) => source.sourceId)
      .join(", ")}`,
  );
}

function resolveTargetSources() {
  if (!SOURCE_FILTER) {
    return SOURCES;
  }

  const source = SOURCES.find((entry) => entry.sourceId === SOURCE_FILTER);
  if (!source) {
    throw new Error(`Unknown source filter: ${SOURCE_FILTER}`);
  }

  return [source];
}

function buildOutputs(generatedSets) {
  if (!SOURCE_FILTER) {
    return {
      manifest: buildManifest(generatedSets),
      allSets: generatedSets,
    };
  }

  const existingManifest = JSON.parse(fs.readFileSync(MANIFEST_OUTPUT, "utf8"));
  const existingSets = loadExistingSets(existingManifest);
  const existingSetMap = new Map(existingSets.map((set) => [set.setId, set]));
  const generatedSetMap = new Map(generatedSets.map((set) => [set.setId, set]));
  const allSets = existingManifest.sets
    .map((summary) => generatedSetMap.get(summary.setId) ?? existingSetMap.get(summary.setId))
    .filter(Boolean);

  return {
    manifest: buildManifest(allSets),
    allSets,
  };
}

function loadExistingSets(manifest) {
  return manifest.sets.map((summary) => {
    const setPath = path.join(SETS_DIR, `${summary.setId}.json`);
    return JSON.parse(fs.readFileSync(setPath, "utf8"));
  });
}

function buildModuleSource(manifest, sets) {
  const payload = {
    manifest,
    sets: Object.fromEntries(sets.map((set) => [set.setId, set])),
  };

  return `window.QUIZ_DATA = ${JSON.stringify(payload, null, 2)};\n`;
}

function buildQuestions(html, source) {
  const starts = [...html.matchAll(new RegExp(escapeRegExp(QUESTION_BLOCK_MARKER), "g"))].map(
    (match) => match.index,
  );

  const questions = starts.map((start, index) => {
    const end = index < starts.length - 1 ? starts[index + 1] : html.length;
    const block = html.slice(start, end);
    const sourceQuestionNumber = extractQuestionNumber(block);
    const questionId = `${source.sourceId}-q-${String(sourceQuestionNumber).padStart(3, "0")}`;
    const promptHtml = sanitizeRichHtml(
      normalizeHtmlPaths(captureDivById(block, "question-prompt")),
    );
    const explanationHtml = sanitizeRichHtml(
      normalizeHtmlPaths(captureDivById(block, "overall-explanation")),
    );
    const promptText = htmlToText(promptHtml);
    const explanationText = htmlToText(explanationHtml);
    const choices = extractChoices(block, questionId);
    const correctChoiceIds = choices
      .filter((choice) => choice.isCorrect)
      .map((choice) => choice.choiceId);
    const questionType = detectQuestionType(promptText, choices.length, correctChoiceIds.length);
    const images = Array.from(
      new Set([...extractImages(promptHtml), ...extractImages(explanationHtml)]),
    );

    return {
      questionId,
      sourceQuestionNumber,
      promptHtml,
      promptText,
      choices: choices.map(({ choiceId, html: choiceHtml, text }) => ({
        choiceId,
        label: null,
        text,
        html: choiceHtml,
      })),
      correctChoiceIds,
      explanationHtml,
      explanationText,
      images,
      domain: null,
      questionType,
      contextGroupId: null,
      tags: buildTags(promptText, questionType),
    };
  });

  assignContextGroups(questions, source.sourceId);
  return questions;
}

function buildSets(questions, source) {
  const sets = [];

  for (let index = 0; index < questions.length; index += 10) {
    const setQuestions = questions.slice(index, index + 10);
    const firstQuestion = setQuestions[0];
    const lastQuestion = setQuestions[setQuestions.length - 1];
    const setNumber = sets.length + 1;

    sets.push({
      setId: `${source.sourceId}-set-${String(setNumber).padStart(3, "0")}`,
      title: `${source.title} ${String(firstQuestion.sourceQuestionNumber).padStart(2, "0")}-${String(
        lastQuestion.sourceQuestionNumber,
      ).padStart(2, "0")}`,
      sourceHtml: `assets/${source.fileName}`,
      questionIds: setQuestions.map((question) => question.questionId),
      questions: setQuestions,
    });
  }

  return sets;
}

function buildManifest(sets) {
  return {
    sourceHtml: SOURCES.map((source) => `assets/${source.fileName}`),
    generatedAt: new Date().toISOString(),
    setCount: sets.length,
    sets: sets.map((set) => ({
      setId: set.setId,
      title: set.title,
      sourceHtml: set.sourceHtml,
      questionCount: set.questions.length,
      questionIds: set.questionIds,
      questionNumberRange: [
        set.questions[0].sourceQuestionNumber,
        set.questions[set.questions.length - 1].sourceQuestionNumber,
      ],
      hasImages: set.questions.some((question) => question.images.length > 0),
      hasMultiSelect: set.questions.some((question) => question.questionType === "multi"),
    })),
  };
}

function extractQuestionNumber(block) {
  const match = block.match(/<span>問題\s*(\d+)<\/span>/);
  if (!match) {
    throw new Error("Could not extract question number from block");
  }
  return Number(match[1]);
}

function extractChoices(block, questionId) {
  const relatedMarkerIndex = block.indexOf(RELATED_FIELDS_MARKER);
  const searchEnd = relatedMarkerIndex === -1 ? block.length : relatedMarkerIndex;
  const choices = [];

  let cursor = 0;
  while (true) {
    const start = block.indexOf(ANSWER_BLOCK_MARKER, cursor);
    if (start === -1 || start >= searchEnd) {
      break;
    }

    const next = block.indexOf(ANSWER_BLOCK_MARKER, start + ANSWER_BLOCK_MARKER.length);
    const end = next === -1 || next > searchEnd ? searchEnd : next;
    const answerBlock = block.slice(start, end);
    const html = sanitizeInlineHtml(normalizeHtmlPaths(captureDivById(answerBlock, "answer-text")));
    const text = htmlToText(html);

    choices.push({
      choiceId: `${questionId}-c${choices.length + 1}`,
      html,
      text,
      isCorrect: answerBlock.includes(">正解<") || answerBlock.includes(">正しい選択"),
    });

    cursor = end;
  }

  return choices;
}

function captureDivById(block, id) {
  const idPattern = new RegExp(`<div[^>]*id="${escapeRegExp(id)}"[^>]*>`, "g");
  const match = idPattern.exec(block);
  if (!match) {
    return "";
  }

  const openStart = match.index;
  const openEnd = block.indexOf(">", openStart);
  if (openEnd === -1) {
    return "";
  }

  const divPattern = /<\/?div\b[^>]*>/g;
  divPattern.lastIndex = openStart;

  let depth = 0;
  let endIndex = -1;
  let token;

  while ((token = divPattern.exec(block))) {
    if (token[0].startsWith("</div")) {
      depth -= 1;
      if (depth === 0) {
        endIndex = token.index;
        break;
      }
    } else {
      depth += 1;
    }
  }

  if (endIndex === -1) {
    return block.slice(openEnd + 1).trim();
  }

  return block.slice(openEnd + 1, endIndex).trim();
}

function extractImages(html) {
  return [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => normalizeSrc(match[1]));
}

function normalizeHtmlPaths(html) {
  return html.replace(/src="\.\/([^"]+)"/g, 'src="assets/$1"');
}

function normalizeSrc(src) {
  return src.startsWith("./") ? `assets/${src.slice(2)}` : src;
}

function htmlToText(html) {
  return decodeHtmlEntities(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\u00a0/g, " ")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim(),
  );
}

function sanitizeRichHtml(html) {
  return html
    .replace(
      /<span[^>]*class="[^"]*open-full-size-image[^"]*"[^>]*>\s*(<div[^>]*data-purpose="open-full-size-image"[\s\S]*?<\/div>)\s*<\/span>/gi,
      "$1",
    )
    .replace(/<img[^>]*style="display:\s*none;?"[^>]*>/gi, "")
    .replace(/<button[\s\S]*?<\/button>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<\/?span\b[^>]*>/gi, "")
    .replace(/<\/?div\b[^>]*>/gi, "")
    .trim();
}

function sanitizeInlineHtml(html) {
  return html.replace(/<\/?span\b[^>]*>/gi, "").trim();
}

function detectQuestionType(promptText, choiceCount, correctCount) {
  if (correctCount > 1) {
    return "multi";
  }
  if (
    choiceCount === 2 &&
    /正しい記述を選択していますか|ソリューションは正しい記述を選択していますか/.test(
      promptText,
    )
  ) {
    return "boolean";
  }
  return "single";
}

function buildTags(promptText, questionType) {
  const tags = [];
  if (/ケーススタディ/.test(promptText)) {
    tags.push("case-study");
  }
  if (/2問1セット/.test(promptText)) {
    tags.push("linked-question");
  }
  if (questionType === "boolean") {
    tags.push("boolean");
  }
  return tags;
}

function assignContextGroups(questions, sourceId) {
  let linkedCounter = 1;
  let caseCounter = 1;

  for (let index = 0; index < questions.length; index += 1) {
    const question = questions[index];
    if (!question.tags.includes("case-study")) {
      continue;
    }

    if (index > 0 && questions[index - 1].tags.includes("case-study")) {
      question.contextGroupId = questions[index - 1].contextGroupId;
      continue;
    }

    question.contextGroupId = `${sourceId}-case-${String(caseCounter).padStart(3, "0")}`;
    caseCounter += 1;
  }

  for (let index = 0; index < questions.length; index += 1) {
    const question = questions[index];
    if (!question.tags.includes("linked-question")) {
      continue;
    }

    let groupId = question.contextGroupId;
    if (!groupId && index > 0 && questions[index - 1].tags.includes("linked-question")) {
      groupId = questions[index - 1].contextGroupId;
    }
    if (!groupId) {
      groupId = `${sourceId}-linked-${String(linkedCounter).padStart(3, "0")}`;
      linkedCounter += 1;
    }

    question.contextGroupId = groupId;

    if (/次の問題と2問1セット/.test(question.promptText) && questions[index + 1]) {
      questions[index + 1].contextGroupId = groupId;
      if (!questions[index + 1].tags.includes("linked-question")) {
        questions[index + 1].tags.push("linked-question");
      }
    }
  }
}

function decodeHtmlEntities(text) {
  const named = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
  };

  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (_, entity) => {
    if (entity.startsWith("#x")) {
      return String.fromCodePoint(parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(parseInt(entity.slice(1), 10));
    }
    return Object.prototype.hasOwnProperty.call(named, entity) ? named[entity] : `&${entity};`;
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

main();
