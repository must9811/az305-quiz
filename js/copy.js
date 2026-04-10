function extractImageSources(html) {
  return [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1]);
}

function buildMarkdownImageLines(sources, label) {
  if (!sources.length) {
    return [];
  }

  return sources.flatMap((src, index) => [`![${label}${index + 1}](${src})`, ""]);
}

function questionToMarkdown(question) {
  const promptImages = extractImageSources(question.promptHtml ?? "");
  const explanationImages = extractImageSources(question.explanationHtml ?? "");
  const choices = question.choices.map((choice) => `- ${choice.text}`).join("\n");
  const answers = question.choices
    .filter((choice) => question.correctChoiceIds.includes(choice.choiceId))
    .map((choice) => `- ${choice.text}`)
    .join("\n");

  return [
    `## 問題${question.sourceQuestionNumber}`,
    "",
    question.promptText,
    "",
    ...buildMarkdownImageLines(promptImages, "問題画像"),
    "### 選択肢",
    choices,
    "",
    "### 正答",
    answers,
    "",
    "### 解説",
    question.explanationText,
    "",
    ...buildMarkdownImageLines(explanationImages, "解説画像"),
  ]
    .join("\n")
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildQuestionHtml(question) {
  const choices = question.choices
    .map((choice) => `<li>${choice.html}</li>`)
    .join("");
  const answers = question.choices
    .filter((choice) => question.correctChoiceIds.includes(choice.choiceId))
    .map((choice) => `<li>${choice.html}</li>`)
    .join("");

  return `
    <article>
      <h2>問題${escapeHtml(question.sourceQuestionNumber)}</h2>
      <section>
        ${question.promptHtml}
      </section>
      <section>
        <h3>選択肢</h3>
        <ul>${choices}</ul>
      </section>
      <section>
        <h3>正答</h3>
        <ul>${answers}</ul>
      </section>
      <section>
        <h3>解説</h3>
        ${question.explanationHtml}
      </section>
    </article>
  `.trim();
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read blob"));
    reader.readAsDataURL(blob);
  });
}

async function inlineHtmlImages(html) {
  const matches = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)];
  if (!matches.length) {
    return html;
  }

  let nextHtml = html;
  for (const match of matches) {
    const src = match[1];

    try {
      const response = await fetch(src);
      if (!response.ok) {
        continue;
      }

      const blob = await response.blob();
      const dataUrl = await blobToDataUrl(blob);
      nextHtml = nextHtml.replace(`src="${src}"`, `src="${dataUrl}"`);
    } catch {
      // Keep the original src when the asset cannot be fetched.
    }
  }

  return nextHtml;
}

async function writeMarkdownWithImages(question, markdown) {
  const clipboard = typeof navigator === "undefined" ? null : navigator.clipboard;
  if (!clipboard) {
    throw new Error("Clipboard API is unavailable");
  }

  if (
    typeof clipboard.write !== "function" ||
    typeof clipboard.writeText !== "function" ||
    typeof ClipboardItem === "undefined"
  ) {
    await clipboard.writeText(markdown);
    return;
  }

  const html = await inlineHtmlImages(buildQuestionHtml(question));
  const item = new ClipboardItem({
    "text/plain": new Blob([markdown], { type: "text/plain" }),
    "text/html": new Blob([html], { type: "text/html" }),
  });

  await clipboard.write([item]);
}

async function copyQuestionAsMarkdown(question) {
  const markdown = questionToMarkdown(question);
  await writeMarkdownWithImages(question, markdown);
  return markdown;
}

window.QuizCopy = {
  buildQuestionHtml,
  copyQuestionAsMarkdown,
  extractImageSources,
  inlineHtmlImages,
  questionToMarkdown,
};
