const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT_DIR, "data");
const SETS_DIR = path.join(OUTPUT_DIR, "sets");
const ASSETS_DIR = path.join(ROOT_DIR, "assets");
const MODULE_OUTPUT = path.join(OUTPUT_DIR, "quiz-data.js");
const MANIFEST_OUTPUT = path.join(OUTPUT_DIR, "quiz-manifest.json");
const TRANSLATION_CACHE_OUTPUT = path.join(OUTPUT_DIR, ".translation-cache.json");
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
    fileName: "問題集1.html",
    title: "問題集1",
    inputDir: EXTERNAL_UDEMY_DIR,
    language: "ja",
  },
  {
    sourceId: "jp2",
    fileName: "問題集2.html",
    title: "問題集2",
    inputDir: path.join(ROOT_DIR, "assets"),
    language: "ja",
  },
  {
    sourceId: "jp3",
    fileName: "問題集3.html",
    title: "問題集3",
    inputDir: path.join(ROOT_DIR, "assets"),
    language: "ja",
  },
  {
    sourceId: "en1",
    fileName: "英語問題集1.html",
    title: "英語問題集1 翻訳版",
    inputDir: EXTERNAL_UDEMY_DIR,
    language: "en",
  },
  {
    sourceId: "en2",
    fileName: "英語問題集2.html",
    title: "英語問題集2 翻訳版",
    inputDir: EXTERNAL_UDEMY_DIR,
    language: "en",
  },
  {
    sourceId: "en3",
    fileName: "英語問題集3.html",
    title: "英語問題集3 翻訳版",
    inputDir: EXTERNAL_UDEMY_DIR,
    language: "en",
  },
  {
    sourceId: "en4",
    fileName: "英語問題集4.html",
    title: "英語問題集4 翻訳版",
    inputDir: EXTERNAL_UDEMY_DIR,
    language: "en",
  },
  {
    sourceId: "en5",
    fileName: "英語問題集5.html",
    title: "英語問題集5 翻訳版",
    inputDir: EXTERNAL_UDEMY_DIR,
    language: "en",
  },
  {
    sourceId: "en6",
    fileName: "英語問題集6.html",
    title: "英語問題集6 翻訳版",
    inputDir: EXTERNAL_UDEMY_DIR,
    language: "en",
  },
];

const QUESTION_BLOCK_MARKER =
  '<div class="result-pane--question-result-pane--sIcOh result-pane--accordion-panel--TEJg7">';
const ANSWER_BLOCK_MARKER = '<div class="result-pane--answer-result-pane--Niazi">';
const RELATED_FIELDS_MARKER =
  '<div class="result-pane--question-related-fields--c3m--">';
const TRANSLATION_ENDPOINT =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ja&dt=t&q=";
const TRANSLATION_SENTINEL = "data-az";

async function main() {
  const targetSources = resolveTargetSources();
  const translationCache = loadTranslationCache();
  const generatedSets = [];

  for (const source of targetSources) {
    syncSourceAssets(source);
    const sourcePath = path.join(source.inputDir, source.fileName);
    const html = fs.readFileSync(sourcePath, "utf8");
    let questions = buildQuestions(html, source);

    if (source.language === "en") {
      questions = await localizeEnglishQuestions(questions, translationCache);
    }

    generatedSets.push(...buildSets(questions, source));
  }

  const { manifest, allSets } = buildOutputs(generatedSets);

  fs.mkdirSync(SETS_DIR, { recursive: true });
  fs.writeFileSync(MANIFEST_OUTPUT, JSON.stringify(manifest, null, 2), "utf8");
  fs.writeFileSync(MODULE_OUTPUT, buildModuleSource(manifest, allSets), "utf8");
  fs.writeFileSync(TRANSLATION_CACHE_OUTPUT, JSON.stringify(translationCache, null, 2), "utf8");

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
  if (!SOURCE_FILTER || !fs.existsSync(MANIFEST_OUTPUT)) {
    return {
      manifest: buildManifest(generatedSets),
      allSets: generatedSets,
    };
  }

  const existingManifest = JSON.parse(fs.readFileSync(MANIFEST_OUTPUT, "utf8"));
  const existingSets = loadExistingSets(existingManifest);
  const existingSetMap = new Map(existingSets.map((set) => [set.setId, set]));
  const generatedSetMap = new Map(generatedSets.map((set) => [set.setId, set]));
  const retainedSetIds = new Set(generatedSets.map((set) => set.setId));

  const allSets = [
    ...existingManifest.sets
      .map((summary) => {
        const candidate = generatedSetMap.get(summary.setId) ?? existingSetMap.get(summary.setId);
        if (!candidate) {
          return null;
        }
        if (candidate.setId.startsWith(`${SOURCE_FILTER}-`) || !summary.setId.startsWith(`${SOURCE_FILTER}-`)) {
          return candidate;
        }
        return null;
      })
      .filter(Boolean),
    ...generatedSets.filter((set) => !existingSetMap.has(set.setId) && retainedSetIds.has(set.setId)),
  ];

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

function syncSourceAssets(source) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  const sourceHtmlPath = path.join(source.inputDir, source.fileName);
  const targetHtmlPath = path.join(ASSETS_DIR, source.fileName);
  if (sourceHtmlPath !== targetHtmlPath && fs.existsSync(sourceHtmlPath)) {
    fs.copyFileSync(sourceHtmlPath, targetHtmlPath);
  }

  const sourceCompanionDir = path.join(
    source.inputDir,
    `${path.parse(source.fileName).name}_files`,
  );
  const targetCompanionDir = path.join(
    ASSETS_DIR,
    `${path.parse(source.fileName).name}_files`,
  );
  if (fs.existsSync(sourceCompanionDir)) {
    fs.cpSync(sourceCompanionDir, targetCompanionDir, {
      recursive: true,
      force: true,
    });
  }
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
  const caseStudyMeta = extractCaseStudyMetadata(html);

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
    const questionType = detectQuestionType(
      promptText,
      choices.map((choice) => choice.text),
      correctChoiceIds.length,
    );
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
      domain: extractDomain(block),
      questionType,
      contextGroupId: null,
      tags: buildTags(promptText, questionType, source.language),
      sourceLanguage: source.language,
    };
  });

  assignContextGroups(questions, source.sourceId, caseStudyMeta, source.language);
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
      questions: setQuestions.map(stripSourceLanguage),
    });
  }

  return sets;
}

function buildManifest(sets) {
  const sourceOrder = new Map(SOURCES.map((source, index) => [source.sourceId, index]));
  const orderedSets = [...sets].sort((left, right) => {
    const leftSource = left.setId.split("-")[0];
    const rightSource = right.setId.split("-")[0];
    const bySource = (sourceOrder.get(leftSource) ?? 999) - (sourceOrder.get(rightSource) ?? 999);
    if (bySource !== 0) {
      return bySource;
    }
    const leftNumber = left.questions?.[0]?.sourceQuestionNumber ?? 0;
    const rightNumber = right.questions?.[0]?.sourceQuestionNumber ?? 0;
    return leftNumber - rightNumber || left.setId.localeCompare(right.setId);
  });

  return {
    sourceHtml: SOURCES.map((source) => `assets/${source.fileName}`),
    generatedAt: new Date().toISOString(),
    setCount: orderedSets.length,
    sets: orderedSets.map((set) => ({
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

function stripSourceLanguage(question) {
  const { sourceLanguage, ...rest } = question;
  return rest;
}

function extractQuestionNumber(block) {
  const match = block.match(/<span>(?:問題|Question)\s*(\d+)<\/span>/i);
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

function extractDomain(block) {
  const domainBlock = captureDataPurposeBlock(block, "domain-pane");
  if (!domainBlock) {
    return null;
  }

  const texts = [...domainBlock.matchAll(/<div[^>]*class="ud-text-md"[^>]*>([\s\S]*?)<\/div>/g)];
  const lastText = texts.at(-1)?.[1] ?? "";
  const domain = htmlToText(lastText);
  return domain || null;
}

function captureDataPurposeBlock(block, dataPurpose) {
  const pattern = new RegExp(
    `<div[^>]*data-purpose="${escapeRegExp(dataPurpose)}"[^>]*>`,
    "g",
  );
  const match = pattern.exec(block);
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
        endIndex = divPattern.lastIndex;
        break;
      }
    } else {
      depth += 1;
    }
  }

  if (endIndex === -1) {
    return block.slice(openStart);
  }

  return block.slice(openStart, endIndex);
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
      .replace(/<\/li>/gi, "\n")
      .replace(/<\/ul>/gi, "\n")
      .replace(/<\/ol>/gi, "\n")
      .replace(/<li>/gi, "・")
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

function detectQuestionType(promptText, choiceTexts, correctCount) {
  if (correctCount > 1) {
    return "multi";
  }

  const normalizedChoices = choiceTexts.map((choice) => choice.trim().toLowerCase());
  const booleanChoices =
    normalizedChoices.length === 2 &&
    ((normalizedChoices.includes("yes") && normalizedChoices.includes("no")) ||
      (normalizedChoices.includes("はい") && normalizedChoices.includes("いいえ")));
  if (booleanChoices) {
    return "boolean";
  }

  if (
    /目標を満たしていますか|Does this meet the goal|Does the solution meet the goal/i.test(promptText)
  ) {
    return "boolean";
  }

  return "single";
}

function buildTags(promptText, questionType, language) {
  const tags = [];
  if (/ケーススタディ|case study/i.test(promptText)) {
    tags.push("case-study");
  }
  if (
    /2問1セット|前の問題|次の問題|same set of questions|following question|next question/i.test(
      promptText,
    )
  ) {
    tags.push("linked-question");
  }
  if (questionType === "boolean") {
    tags.push("boolean");
  }
  if (language === "en" && /azure service 1|azure service 2|service tier/i.test(promptText)) {
    tags.push("linked-question");
  }
  return tags;
}

function assignContextGroups(questions, sourceId, caseStudyMeta, language) {
  let linkedCounter = 1;
  let caseCounter = 1;

  if (caseStudyMeta.questionCount > 0) {
    const groupId = `${sourceId}-case-${String(caseCounter).padStart(3, "0")}`;
    for (let index = 0; index < Math.min(caseStudyMeta.questionCount, questions.length); index += 1) {
      questions[index].contextGroupId = groupId;
      ensureTag(questions[index], "case-study");
    }
    caseCounter += 1;
  }

  for (let index = 0; index < questions.length; index += 1) {
    const question = questions[index];
    if (!question.tags.includes("case-study")) {
      continue;
    }

    if (question.contextGroupId) {
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

    if (
      /次の問題と2問1セット|following question|next question|same set of questions/i.test(
        question.promptText,
      ) &&
      questions[index + 1]
    ) {
      questions[index + 1].contextGroupId = groupId;
      ensureTag(questions[index + 1], "linked-question");
    }
  }

  if (language === "en") {
    assignRepeatedStemGroups(questions, sourceId, linkedCounter);
  }
}

function assignRepeatedStemGroups(questions, sourceId, linkedCounterStart) {
  let linkedCounter = linkedCounterStart;

  for (let index = 1; index < questions.length; index += 1) {
    const current = questions[index];
    const previous = questions[index - 1];
    if (current.contextGroupId && previous.contextGroupId && current.contextGroupId === previous.contextGroupId) {
      continue;
    }

    if (!hasRepeatedStem(previous.promptText, current.promptText)) {
      continue;
    }

    const groupId =
      previous.contextGroupId ??
      current.contextGroupId ??
      `${sourceId}-linked-${String(linkedCounter).padStart(3, "0")}`;
    if (!previous.contextGroupId && !current.contextGroupId) {
      linkedCounter += 1;
    }

    previous.contextGroupId = groupId;
    current.contextGroupId = groupId;
    ensureTag(previous, "linked-question");
    ensureTag(current, "linked-question");
  }
}

function hasRepeatedStem(leftPrompt, rightPrompt) {
  const leftStem = extractStemKey(leftPrompt);
  const rightStem = extractStemKey(rightPrompt);
  return leftStem.length >= 80 && leftStem === rightStem;
}

function extractStemKey(promptText) {
  const paragraphs = promptText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/which|what|does this meet the goal|does the solution meet the goal|どれ|何|正しいですか/i.test(line));

  return paragraphs.slice(0, 4).join(" ").replace(/\s+/g, " ").toLowerCase();
}

function ensureTag(question, tag) {
  if (!question.tags.includes(tag)) {
    question.tags.push(tag);
  }
}

function extractCaseStudyMetadata(html) {
  const titleMatch = html.match(/Practice Test #\d+\s+\(includes\s+(\d+)\s+Qs\s+on\s+([^()]+?)\s+Case Study\)/i);
  if (!titleMatch) {
    return {
      questionCount: 0,
      title: null,
    };
  }

  return {
    questionCount: Number(titleMatch[1]),
    title: titleMatch[2].trim(),
  };
}

function loadTranslationCache() {
  if (!fs.existsSync(TRANSLATION_CACHE_OUTPUT)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(TRANSLATION_CACHE_OUTPUT, "utf8"));
  } catch {
    return {};
  }
}

async function localizeEnglishQuestions(questions, translationCache) {
  const localized = [];

  for (const question of questions) {
    const { payload, replacements } = protectTranslationTokens(buildTranslationPayload(question));
    const translatedPayload = await translateWithCache(payload, translationCache);
    const restoredPayload = restoreTranslationTokens(translatedPayload, replacements);
    const translatedQuestion = extractTranslatedQuestion(question, restoredPayload);
    localized.push(applyLocalizationRules(translatedQuestion));
  }

  return localized;
}

function buildTranslationPayload(question) {
  const choiceHtml = question.choices
    .map((choice, index) => `<div ${TRANSLATION_SENTINEL}="choice-${index}">${choice.html}</div>`)
    .join("");

  return [
    `<div ${TRANSLATION_SENTINEL}="prompt">${question.promptHtml}</div>`,
    choiceHtml,
    `<div ${TRANSLATION_SENTINEL}="explanation">${question.explanationHtml}</div>`,
  ].join("");
}

async function translateWithCache(text, translationCache) {
  if (translationCache[text]) {
    return translationCache[text];
  }

  const response = await fetch(`${TRANSLATION_ENDPOINT}${encodeURIComponent(text)}`);
  if (!response.ok) {
    throw new Error(`Translation request failed: ${response.status}`);
  }

  const data = await response.json();
  const translated = data?.[0]?.map((segment) => segment[0]).join("") ?? "";
  if (!translated) {
    throw new Error("Translation response was empty");
  }

  translationCache[text] = translated;
  return translated;
}

function protectTranslationTokens(html) {
  const replacements = [];
  let nextHtml = html;

  const protect = (value) => {
    const token = `[[[KEEP_${replacements.length}]]]`;
    replacements.push({ token, value });
    return token;
  };

  nextHtml = nextHtml.replace(/https?:\/\/[^"'<>\s)]+/g, (match) => protect(match));
  nextHtml = nextHtml.replace(/\b(?:Sub|User|App|Workspace|Function|VM|VNet|Subnet|NVA|RG|DB|Queue|Topic|Hub|Server|Vendor|Site|Rule|Disk|Storage|Table|Log)[0-9]+\b/g, (match) => protect(match));
  nextHtml = nextHtml.replace(/\b[A-Z][A-Za-z]*(?:\d+[A-Za-z0-9-]*)+\b/g, (match) => protect(match));
  nextHtml = nextHtml.replace(/\b(?:MABS|MARS|PIM|RBAC|ACL|OLTP|SLA|SQL|VMSS|POSIX|API|DNS)\b/g, (match) => protect(match));

  return {
    payload: nextHtml,
    replacements,
  };
}

function restoreTranslationTokens(text, replacements) {
  let nextText = text;
  for (const { token, value } of replacements) {
    nextText = nextText.replaceAll(token, value);
  }
  return nextText;
}

function extractTranslatedQuestion(question, payload) {
  const promptHtml = normalizeLocalizedHtml(
    captureSegmentHtml(payload, `${TRANSLATION_SENTINEL}="prompt"`),
  );
  const explanationHtml = normalizeLocalizedHtml(
    captureSegmentHtml(payload, `${TRANSLATION_SENTINEL}="explanation"`),
  );
  const choices = question.choices.map((choice, index) => {
    const html = normalizeLocalizedHtml(
      captureSegmentHtml(payload, `${TRANSLATION_SENTINEL}="choice-${index}"`),
    );
    return {
      ...choice,
      html,
      text: htmlToText(html),
    };
  });

  return {
    ...question,
    promptHtml,
    promptText: htmlToText(promptHtml),
    explanationHtml,
    explanationText: htmlToText(explanationHtml),
    choices,
  };
}

function captureSegmentHtml(payload, attributeText) {
  const pattern = new RegExp(`<div[^>]*${escapeRegExp(attributeText)}[^>]*>([\\s\\S]*?)<\\/div>`, "i");
  const match = payload.match(pattern);
  return match?.[1]?.trim() ?? "";
}

function normalizeLocalizedHtml(html) {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<code><strong>([\s\S]*?)<\/strong><\/code>/gi, "<code>$1</code>")
    .replace(/<p>\s*<\/p>/gi, "")
    .trim();
}

function applyLocalizationRules(question) {
  const localized = {
    ...question,
    promptHtml: refineLocalizedHtml(question.promptHtml, "prompt"),
    explanationHtml: compactExplanationHtml(
      refineLocalizedHtml(question.explanationHtml, "explanation"),
    ),
    choices: question.choices.map((choice) => ({
      ...choice,
      html: refineLocalizedHtml(choice.html, "choice"),
      text: refineLocalizedText(choice.text, "choice"),
    })),
    domain: localizeDomain(question.domain),
  };

  localized.promptText = refineLocalizedText(htmlToText(localized.promptHtml), "prompt");
  localized.explanationText = refineLocalizedText(
    htmlToText(localized.explanationHtml),
    "explanation",
  );
  localized.choices = localized.choices.map((choice) => ({
    ...choice,
    text: refineLocalizedText(htmlToText(choice.html), "choice"),
  }));
  return localized;
}

function refineLocalizedHtml(html, kind) {
  return applySharedLocalizedTextRules(html)
    .replace(/<p>["「][\s\S]*?[」"]\s*この要件は[\s\S]*?<\/p>/gi, "")
    .replace(/\?/g, "。")
    .replace(/<\/p>\s*<p>/g, "</p><p>")
    .replace(/Azure Cache for Redis が正解です。/g, "正解は Azure Cache for Redis です。")
    .replace(/<code>([^<]+)<\/code>\s*は<strong>正しい<\/strong>です。/g, "<code>$1</code> が正解です。")
    .replace(/<code>([^<]+)<\/code>\s*は<strong>不正確<\/strong>です。/g, "<code>$1</code> は誤りです。")
    .replace(/<code>([^<]+)<\/code>\s*は<strong>間違っています<\/strong>。/g, "<code>$1</code> は誤りです。")
    .replace(/<code>([^<]+)<\/code>\s*は<strong>不正解<\/strong>です。/g, "<code>$1</code> は誤りです。")
    .replace(/([^\n>])です。<\/p>/g, "$1です。</p>")
    .replace(/<p>正解は([^。]+)です。/g, "<p>正解は$1です。")
    .replace(/<p>([^<]+)が正解です。/g, "<p>正解は$1です。")
    .replace(/<p>([^<]+)は正しくありません。/g, "<p>$1は不正解です。")
    .replace(/<p>([^<]+)は正しいです。/g, "<p>正解は$1です。")
    .replace(/<p>\s*Read More:\s*<\/p>/gi, "<p>参考:</p>")
    .replace(/<strong>続きを読む:<\/strong>/gi, "参考:")
    .replace(/<strong>詳細:<\/strong>/gi, "参考:")
    .replace(/<strong>Reference\(s\.\):<\/strong>/gi, "参考:")
    .replace(/<strong>Reference\(s\):<\/strong>/gi, "参考:")
    .replace(/<p>\s*Reference\(s\.\):\s*<\/p>/gi, "<p>参考:</p>")
    .replace(/<p>\s*Reference\(s\):\s*<\/p>/gi, "<p>参考:</p>")
    .replace(/https:\s*\/\s*\//g, "https://")
    .replace(/。view=/g, "?view=")
    .replace(/。tabs=/g, "?tabs=")
    .replace(/。context=/g, "?context=")
    .replace(/。/g, "。")
    .replace(/<p>\s*incorrect\s*\.<\/p>/gi, "")
    .replace(/<p>\s*correct\s*\.<\/p>/gi, "")
    .replace(/<p>\s*incorrect\s*<\/p>/gi, "")
    .replace(/<p>\s*correct\s*<\/p>/gi, "")
    .replace(/Microsoft Entra tenant/gi, "Microsoft Entra テナント")
    .replace(/Microsoft Entra ID tenant/gi, "Microsoft Entra テナント")
    .replace(/Recovery Services vault/gi, "Recovery Services コンテナー")
    .replace(/Backup vault/gi, "Backup コンテナー")
    .replace(/Resource Guard/gi, "Resource Guard")
    .replace(/Azure Active Directory/gi, "Microsoft Entra ID")
    .replace(/Azure AD/gi, "Microsoft Entra ID")
    .replace(/Azure SQL Database elastic pool/gi, "Azure SQL Database エラスティック プール")
    .replace(/single Azure SQL database/gi, "単一の Azure SQL Database")
    .replace(/Azure Synapseパイプライン/gi, "Azure Synapse パイプライン")
    .replace(/Azure Site Recoveryジョブ/gi, "Azure Site Recovery ジョブ")
    .replace(/Azure SQL\]/g, "Azure SQL")
    .replace(/実装Azure フロント ドア/gi, "Azure Front Door")
    .replace(/ は次のとおりです。それは不正解です。/g, " は誤りです。")
    .replace(/General Purpose/gi, "汎用")
    .replace(/Business Critical/gi, "Business Critical")
    .replace(/Hyperscale/gi, "Hyperscale")
    .replace(/Basic/gi, "Basic")
    .replace(/Standard/gi, "Standard");
}

function refineLocalizedText(text, kind) {
  let next = applySharedLocalizedTextRules(text)
    .replace(/^["「][\s\S]*?この要件は[^\n]*\n*/g, "")
    .replace(/\?/g, "。")
    .replace(/ですか。/g, "ですか。")
    .replace(/https:\s*\/\s*\//g, "https://")
    .replace(/。view=/g, "?view=")
    .replace(/。tabs=/g, "?tabs=")
    .replace(/。context=/g, "?context=")
    .replace(/Microsoft Entra tenant/gi, "Microsoft Entra テナント")
    .replace(/Microsoft Entra ID tenant/gi, "Microsoft Entra テナント")
    .replace(/Recovery Services vault/gi, "Recovery Services コンテナー")
    .replace(/Backup vault/gi, "Backup コンテナー")
    .replace(/Azure Active Directory/gi, "Microsoft Entra ID")
    .replace(/Azure AD/gi, "Microsoft Entra ID")
    .replace(/Azure Synapseパイプライン/gi, "Azure Synapse パイプライン")
    .replace(/Azure Site Recoveryジョブ/gi, "Azure Site Recovery ジョブ")
    .replace(/Azure SQL\]/g, "Azure SQL")
    .replace(/実装Azure フロント ドア/gi, "Azure Front Door")
    .replace(/ は次のとおりです。それは不正解です。/g, " は誤りです。");

  if (kind === "prompt") {
    next = next
      .replace(/何をすべきかしますか。/g, "何をする必要がありますか。")
      .replace(/推奨する必要があります。/g, "推奨する必要があります。")
      .replace(/何を含める必要があります。/g, "提案には何を含めるべきですか。")
      .replace(/どれです。/g, "どれですか。")
      .replace(/何を使用する必要があります。/g, "何を使用する必要がありますか。")
      .replace(/何を作成する必要があります。/g, "何を作成する必要がありますか。")
      .replace(/どのリソースを作成する必要があります。/g, "どのリソースを作成する必要がありますか。")
      .replace(/どのリソースを作成する必要がありますか([A-Z][a-zA-Z0-9-]+)。/g, "$1 にどのリソースを作成する必要がありますか。")
      .replace(/どのリソースを作成する必要がありますか([A-Z][a-zA-Z0-9-]+)\./g, "$1 にどのリソースを作成する必要がありますか。")
      .replace(/^\s*リソースを変更する必要がありますか。$/gm, "どのリソースを変更する必要がありますか。")
      .replace(/どのリソースを使用する必要がありますか。変更しますか。/g, "どのリソースを変更する必要がありますか。")
      .replace(/どのサービス層を推奨する必要があります。/g, "どのサービス レベルを推奨する必要がありますか。")
      .replace(/どの Azure SQL 製品を推奨する必要があります。/g, "どの Azure SQL 製品を推奨する必要がありますか。")
      .replace(/どれを行うべきか([A-Z][A-Za-z0-9-]+)。/g, "$1 に対して何を行うべきですか。")
      .replace(
        /どのソリューションを選択する必要がありますかアーキテクチャ。/g,
        "このアーキテクチャに対してどのソリューションを選択する必要がありますか。",
      )
      .replace(/Analytics ログ データを使用します。計画/g, "Analytics ログ データ プランを使用します")
      .replace(/([A-Z][A-Za-z0-9-]+) に関連するLog Analytics コスト/g, "$1 に関連する Log Analytics コスト")
      .replace(
        /エラー メッセージが検出されたときにトリガーされる ([^。]+)を構成しました。 ([A-Z][A-Za-z0-9-]+) ログ。/g,
        "$2 のログでエラー メッセージが検出されたときにトリガーされる $1 を構成しました。",
      );
  }

  if (kind === "choice") {
    next = next
      .replace(/^A /, "")
      .replace(/^An /, "")
      .replace(/^The /, "");
  }

  if (kind === "explanation") {
    next = next
      .replace(/(^|\n)([^。\n]+) は正しいです。/g, "$1正解は$2です。")
      .replace(/(^|\n)([^。\n]+) は不正確です。/g, "$1$2 は誤りです。")
      .replace(/(^|\n)([^。\n]+) は間違っています。/g, "$1$2 は誤りです。")
      .replace(/(^|\n)([^。\n]+) は不正解です。/g, "$1$2 は誤りです。")
      .replace(/^正解は([^。]+)です。/g, "正解は$1です。")
      .replace(/^([^。]+)が正解です。/g, "正解は$1です。")
      .replace(/ は不正確です。/g, " は誤りです。")
      .replace(/ は間違っています。/g, " は誤りです。")
      .replace(/ と想像してください。/g, "です。")
      .replace(/警報システム/g, "アラート システム")
      .replace(/\bRead More:\b/gi, "参考:")
      .replace(/\b詳細:\b/gi, "参考:")
      .replace(/\b続きを読む:\b/gi, "参考:")
      .replace(/\bReference\(s\.\):\b/gi, "参考:")
      .replace(/\bReference\(s\):\b/gi, "参考:");
  }

  return next
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function compactExplanationHtml(html) {
  const paragraphPattern = /<p>([\s\S]*?)<\/p>/gi;
  let nextHtml = "";
  let lastIndex = 0;
  let match;

  while ((match = paragraphPattern.exec(html))) {
    nextHtml += html.slice(lastIndex, match.index);
    const compacted = compactExplanationParagraph(match[1]);
    if (compacted) {
      nextHtml += `<p>${compacted}</p>`;
    }
    lastIndex = paragraphPattern.lastIndex;
  }

  nextHtml += html.slice(lastIndex);

  return nextHtml
    .replace(/(?:<p>\s*<br>\s*<\/p>\s*)+/gi, "")
    .replace(/<p>\s*<\/p>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function compactExplanationParagraph(innerHtml) {
  const trimmed = innerHtml.trim();
  if (!trimmed) {
    return "";
  }

  if (/<(?:img|a)\b/i.test(trimmed)) {
    return trimmed;
  }

  const text = htmlToText(`<p>${trimmed}</p>`).replace(/\s+/g, " ").trim();
  if (!text) {
    return "";
  }

  if (/^["「].*この要件は/.test(text)) {
    return "";
  }

  if (
    /^(?:\*?Amazon|Amazon からのリアルタイムの例|次の図は|MARS エージェントは、次のバックアップ シナリオをサポートしています。)/.test(
      text,
    ) ||
    /amazon\./i.test(text)
  ) {
    return "";
  }

  if (/^参考[:：]$/.test(text)) {
    return "参考:";
  }

  return escapeHtml(compactExplanationTextParagraph(text));
}

function compactExplanationTextParagraph(text) {
  const normalized = text
    .replace(/^結論として、/, "")
    .replace(/^簡単に言うと、/, "")
    .replace(/^つまり、/, "")
    .replace(/^(.*) は次のとおりです。それは不正解です。/g, "$1 は誤りです。")
    .replace(/^(.*) は次のとおりです。それは正解です。/g, "$1 が正解です。")
    .replace(/であると想像してください。/g, "です。")
    .replace(/と想像してください。/g, "です。")
    .trim();
  const sentences = splitSentences(normalized);

  if (sentences.length <= 2) {
    return normalized;
  }

  if (
    /(?:正解は|が正解です。|は正しいです。|は誤りです。|は不正解です。|は不正確です。|は間違っています。)/.test(
      sentences[0],
    )
  ) {
    return sentences.slice(0, 2).join("");
  }

  return sentences.slice(0, 2).join("");
}

function splitSentences(text) {
  return (text.match(/[^。！？]+[。！？]?/g) ?? []).map((sentence) => sentence.trim()).filter(Boolean);
}

function applySharedLocalizedTextRules(value) {
  return value
    .replace(/Azure solutions Architect Expert/gi, "AZ-305")
    .replace(/Solution Architect/gi, "Solutions Architect")
    .replace(/Privileged Identity Management \(PIM\)/gi, "Privileged Identity Management (PIM)")
    .replace(/Azure service 1/gi, "Azure サービス 1")
    .replace(/Azure service 2/gi, "Azure サービス 2")
    .replace(/Service tier/gi, "サービス レベル")
    .replace(/Resource group/gi, "リソース グループ")
    .replace(/Role-based access control RBAC/gi, "ロールベースのアクセス制御 (RBAC)")
    .replace(/Microsoft Entra Privileged Identity Management/gi, "Microsoft Entra Privileged Identity Management")
    .replace(/Microsoft Entra Connect/gi, "Microsoft Entra Connect")
    .replace(/Microsoft Entra Identity Protection/gi, "Microsoft Entra ID Protection")
    .replace(/Azure Cache for Redis/gi, "Azure Cache for Redis")
    .replace(/Azure Managed Redis/gi, "Azure Managed Redis")
    .replace(/Azure Front Door/gi, "Azure Front Door")
    .replace(/Azure Front Door classic/gi, "Azure Front Door classic")
    .replace(/Azure Data Factory/gi, "Azure Data Factory")
    .replace(/Azure Event Grid/gi, "Azure Event Grid")
    .replace(/Azure Event Hubs/gi, "Azure Event Hubs")
    .replace(/Azure Functions/gi, "Azure Functions")
    .replace(/Azure Policy/gi, "Azure Policy")
    .replace(/Azure SQL Database/gi, "Azure SQL Database")
    .replace(/Azure SQL Managed Instance/gi, "Azure SQL Managed Instance")
    .replace(/Azure Blob Storage/gi, "Azure Blob Storage")
    .replace(/Azure Cosmos DB/gi, "Azure Cosmos DB")
    .replace(/Azure Service Bus/gi, "Azure Service Bus")
    .replace(/Azure Application Gateway/gi, "Azure Application Gateway")
    .replace(/Azure Load Balancer/gi, "Azure Load Balancer")
    .replace(/Azure Traffic Manager/gi, "Azure Traffic Manager")
    .replace(/Azure Backup/gi, "Azure Backup")
    .replace(/Azure Site Recovery/gi, "Azure Site Recovery")
    .replace(/Resource Guard/gi, "Resource Guard")
    .replace(/Azure Synapseパイプライン/gi, "Azure Synapse パイプライン")
    .replace(/Azure Site Recoveryジョブ/gi, "Azure Site Recovery ジョブ")
    .replace(/Azure SQL\]/g, "Azure SQL")
    .replace(/Azure Front を実装するドア/gi, "Azure Front Door")
    .replace(/Azure Loadバランサー/gi, "Azure Load Balancer")
    .replace(/アプリケーションインサイト/gi, "Application Insights")
    .replace(/実装Azure フロント ドア/gi, "Azure Front Door")
    .replace(/ は次のとおりです。それは不正解です。/g, " は誤りです。")
    .replace(/ は次のとおりです。それは正解です。/g, " が正解です。")
    .replace(/ はそれは正解です。/g, " が正解です。")
    .replace(/ はそれは不正解です。/g, " は誤りです。")
    .replace(/それは正解です。/g, "が正解です。")
    .replace(/それは不正解です。/g, "は誤りです。")
    .replace(/watch。v=/g, "watch?v=")
    .replace(
      /https:\/\/learn\.microsoft\.com\/en-us\/azure\/https:\/\/learn\.microsoft\.com\/en-us\/azure\//g,
      "https://learn.microsoft.com/en-us/azure/",
    )
    .replace(/\]/g, "")
    .replace(/\b([A-Z][A-Za-z0-9-]*\d+) ログ\b/g, "$1Logs")
    .replace(/Monthly/gi, "毎月")
    .replace(/per-second/gi, "秒単位");
}

function localizeDomain(domain) {
  if (!domain) {
    return null;
  }

  return (
    {
      "Design Business Continuity Solutions": "事業継続ソリューションを設計する",
      "Design Infrastructure Solutions": "インフラストラクチャ ソリューションを設計する",
      "Design data storage solutions": "データ ストレージ ソリューションを設計する",
      "Design Identity, Governance, and Monitoring Solutions":
        "ID、ガバナンス、監視ソリューションを設計する",
    }[domain] ?? domain
  );
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

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
