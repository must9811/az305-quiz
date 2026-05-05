function applyEnglishSetRewrites(questions, config) {
  const {
    sourceId,
    auditStatus,
    promptOverrides = {},
    choiceTextOverrides = {},
    reasonOverrides = {},
    choiceReasonOverrides = {},
    topicSupplements = [],
  } = config;

  assertAuditCoverage(questions, sourceId, auditStatus);

  return questions.map((question) => {
    if (!question.questionId?.startsWith(`${sourceId}-q-`)) {
      return question;
    }

    const choices = question.choices.map((choice) => {
      const text = cleanChoiceText(choiceTextOverrides[choice.choiceId] ?? choice.text);
      return {
        ...choice,
        text,
        html: choice.html?.startsWith("<p>") ? textToHtml(text) : escapeHtml(text),
      };
    });

    const promptText = cleanPromptText(promptOverrides[question.questionId] ?? question.promptText);
    const promptHtml = appendOriginalPromptImages(textToHtml(promptText), question.promptHtml);
    const explanationHtml = buildExplanationHtml(question, choices, promptText, {
      reasonOverrides,
      choiceReasonOverrides,
      topicSupplements,
    });

    return {
      ...question,
      promptHtml,
      promptText,
      choices,
      explanationHtml,
      explanationText: htmlToText(explanationHtml),
      images: Array.from(
        new Set([
          ...question.images,
          ...extractImageSources(promptHtml),
          ...extractImageSources(explanationHtml),
        ]),
      ),
    };
  });
}

function buildAuditStatus(sourceId, count, rewriteNeededIds = [], sharedOverrideIds = []) {
  const rewriteNeeded = new Set(rewriteNeededIds);
  const sharedOverride = new Set(sharedOverrideIds);
  return Object.fromEntries(
    Array.from({ length: count }, (_, index) => {
      const questionId = `${sourceId}-q-${String(index + 1).padStart(3, "0")}`;
      let status = "reviewed OK";
      if (sharedOverride.has(questionId)) {
        status = "shared override applied";
      }
      if (rewriteNeeded.has(questionId)) {
        status = "rewrite needed";
      }
      return [questionId, status];
    }),
  );
}

function assertAuditCoverage(questions, sourceId, auditStatus) {
  const missing = questions
    .filter((question) => question.questionId?.startsWith(`${sourceId}-q-`))
    .map((question) => question.questionId)
    .filter((questionId) => !auditStatus[questionId]);
  if (missing.length) {
    throw new Error(`Missing ${sourceId} audit status for: ${missing.join(", ")}`);
  }
}

function buildExplanationHtml(question, choices, promptText, options) {
  const correctChoices = choices.filter((choice) => question.correctChoiceIds.includes(choice.choiceId));
  const correctLabel = correctChoices.map((choice) => choice.text).join("、");
  const reason =
    cleanExplanationText(options.reasonOverrides[question.questionId]) ||
    deriveReason(question.explanationText, correctChoices.map((choice) => choice.text)) ||
    `${correctLabel} が、問題文で示された要件を満たす選択肢です。`;
  const supplement = selectTopicSupplement(promptText, choices, options.topicSupplements);
  const choiceItems = choices.map((choice) => {
    const isCorrect = question.correctChoiceIds.includes(choice.choiceId);
    const reasonOverride = options.choiceReasonOverrides[choice.choiceId];
    const itemReason =
      cleanExplanationText(reasonOverride) ||
      deriveReason(question.explanationText, [choice.text]) ||
      (isCorrect
        ? "この選択肢は要件に合致します。"
        : "この選択肢は、この設問で重視されている要件を満たしません。");
    return `<li><strong>${escapeHtml(choice.text)}:</strong> ${isCorrect ? "正解" : "不正解"}。${escapeHtml(itemReason)}</li>`;
  });
  const referencesHtml = buildReferencesHtml(question.explanationHtml);
  const imageHtml = extractImageTags(question.explanationHtml).join("\n");

  return [
    `<p><strong>結論:</strong> 正解は ${escapeHtml(correctLabel)} です。</p>`,
    `<p><strong>理由:</strong> ${escapeHtml(reason)}</p>`,
    `<p><strong>補足:</strong> ${escapeHtml(supplement)}</p>`,
    `<p><strong>選択肢の整理:</strong></p>`,
    `<ul>${choiceItems.join("")}</ul>`,
    referencesHtml,
    imageHtml,
  ]
    .filter(Boolean)
    .join("\n");
}

function deriveReason(explanationText, labels) {
  const paragraphs = cleanExplanationText(stripReferences(explanationText))
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const normalizedLabels = labels.map(normalizeLookupText).filter(Boolean);
  if (!normalizedLabels.length) {
    return "";
  }

  const paragraph = paragraphs.find((candidate) => {
    const normalized = normalizeLookupText(candidate);
    return normalizedLabels.some((label) => normalized.includes(label));
  });
  if (!paragraph) {
    return "";
  }

  return splitSentences(paragraph)
    .slice(0, 2)
    .join("")
    .replace(/^.+?(?:は|が)(?:正しい|正解)[。．]\s*/, "")
    .replace(/^.+?(?:は|が)(?:間違い|不正解)[。．]\s*/, "")
    .trim();
}

function selectTopicSupplement(promptText, choices, supplements) {
  const text = `${promptText}\n${choices.map((choice) => choice.text).join("\n")}`;
  for (const [pattern, supplement] of supplements) {
    if (pattern.test(text)) {
      return supplement;
    }
  }
  return "設計問題では、単にサービス名を覚えるのではなく、可用性、コスト、管理負荷、セキュリティ、データ処理方式のどの条件が決め手になっているかを先に整理します。";
}

function cleanPromptText(text) {
  return cleanText(text)
    .replace(/あなたはWeb/g, "あなたは Web")
    .replace(/Azure Blob Storageに/g, "Azure Blob Storage に")
    .replace(/Blob のステージング領域に定期的にエクスポートします。ストレージ。/g, "Azure Blob Storage のステージング領域に定期的にエクスポートします。")
    .replace(/Azure に転送する/g, "Azure SQL Database に転送する")
    .replace(/SQL データベース/g, "SQL Database")
    .replace(/Microsoft SQL サーバー/g, "Microsoft SQL Server")
    .replace(/Microsoft SQL Server ライセンス/g, "SQL Server ライセンス")
    .replace(/購入モデル のタイプ/g, "購入モデル")
    .replace(/として機能するように構成された仮想マシンDNS サーバー/g, "DNS サーバーとして機能するように構成された仮想マシン")
    .replace(/SQLDB1 への接続を可能にするソリューションを設計する必要があります。 PE1 を使用します。/g, "PE1 を使用して SQLDB1 へ接続できるソリューションを設計する必要があります。")
    .replace(/どの オンプレミス構成/g, "どのオンプレミス構成")
    .replace(/サービス レイヤー を/g, "サービス レイヤーを")
    .replace(/何を含める必要がありますか$/g, "何を含める必要がありますか。")
    .replace(/edit。usp=sharing/g, "edit?usp=sharing")
    .replace(/以下のリンクにある ([^。]+?) の事例を参照し、次の質問に答えてください。このリンクを新しいタブで開き、このテスト タブをブラウザで開いたままにしてください。\s*https:\/\/\S+/g, "$1 のケーススタディを前提として、次の設問に答えてください。")
    .replace(/以下のリンクにある ([^。]+?) の事例を参照し、次の質問に答えてください。/g, "$1 のケーススタディを前提として、次の設問に答えてください。")
    .replace(/([A-Za-z0-9])を/g, "$1 を")
    .replace(/を([A-Za-z0-9])/g, "を $1")
    .replace(/([A-Za-z0-9])に/g, "$1 に")
    .replace(/([A-Za-z0-9])から/g, "$1 から")
    .replace(/\s+([。、])/g, "$1")
    .trim();
}

function cleanChoiceText(text) {
  return cleanText(text)
    .replace(/Microsoft SQL サーバー/g, "Microsoft SQL Server")
    .replace(/Data Migration Assistant \(DMA\)/g, "Data Migration Assistant")
    .replace(/Azure Synapse の Apache Spark プールAnalytics/g, "Azure Synapse Analytics の Apache Spark プール")
    .replace(/Microsoft Entra Privileged Identity Management \(PIM\)\)/g, "Microsoft Entra Privileged Identity Management (PIM)")
    .replace(/条件付きアクセスポリシー/g, "条件付きアクセス ポリシー")
    .replace(/BlobStorage/g, "Blob Storage")
    .replace(/BlockBlobStorage/g, "Block Blob Storage")
    .replace(/ローカル冗長ストレージ\(LRS\)/g, "ローカル冗長ストレージ (LRS)")
    .replace(/に転送します168\.63\.129\.16/g, " 168.63.129.16 に転送します")
    .replace(/\s+([。、])/g, "$1")
    .trim();
}

function cleanExplanationText(text) {
  return cleanText(text)
    .replace(/SQL データベース/g, "SQL Database")
    .replace(/Microsoft SQL サーバー/g, "Microsoft SQL Server")
    .replace(/Data Migration Assistant \(DMA\)/g, "Data Migration Assistant")
    .replace(/edit。usp=sharing/g, "edit?usp=sharing")
    .replace(/\s+([。、])/g, "$1")
    .trim();
}

function cleanText(text) {
  return String(text ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/\[\[KEEP_\d+\s*/g, "")
    .replace(/[ \t\f\v]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/ \./g, ".")
    .trim();
}

function splitSentences(text) {
  return String(text ?? "")
    .replace(/\n/g, " ")
    .split(/(?<=[。．.!?])\s*/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function stripReferences(text) {
  return String(text ?? "")
    .replace(/参考リンク:[\s\S]*$/i, "")
    .replace(/参考:[\s\S]*$/i, "")
    .replace(/Read More:[\s\S]*$/i, "")
    .trim();
}

function normalizeLookupText(text) {
  return String(text ?? "").toLowerCase().replace(/\s+/g, "");
}

function textToHtml(text) {
  const blocks = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length) {
      blocks.push(`<ul>${currentList.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`);
      currentList = [];
    }
  };

  for (const line of String(text ?? "").split(/\n+/).map((entry) => entry.trim())) {
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith("・")) {
      currentList.push(line.slice(1).trim());
    } else {
      flushList();
      blocks.push(`<p>${escapeHtml(line)}</p>`);
    }
  }
  flushList();
  return blocks.join("\n");
}

function appendOriginalPromptImages(promptHtml, originalPromptHtml) {
  const imageTags = extractImageTags(originalPromptHtml).join("\n");
  return [promptHtml, imageTags].filter(Boolean).join("\n");
}

function extractImageTags(html) {
  return Array.from(String(html ?? "").matchAll(/<img\b[^>]*>/gi), (match) => {
    const tag = match[0];
    return /loading=/.test(tag) ? tag : tag.replace(/>$/, ' loading="eager">');
  });
}

function extractImageSources(html) {
  return Array.from(String(html ?? "").matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi), (match) => match[1]);
}

function buildReferencesHtml(originalExplanationHtml) {
  const links = Array.from(
    String(originalExplanationHtml ?? "").matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi),
    (match) => {
      const href = match[1];
      const label = htmlToText(match[2]) || href;
      return `<li><a href="${escapeHtml(href)}">${escapeHtml(label)}</a></li>`;
    },
  );
  return links.length ? `<p><strong>参考:</strong></p>\n<ul>${links.join("")}</ul>` : "";
}

function htmlToText(html) {
  return String(html ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "・")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

module.exports = {
  applyEnglishSetRewrites,
  buildAuditStatus,
};
