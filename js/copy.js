function questionToMarkdown(question) {
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
    "### 選択肢",
    choices,
    "",
    "### 正答",
    answers,
    "",
    "### 解説",
    question.explanationText,
  ].join("\n");
}

async function copyQuestionAsMarkdown(question) {
  const markdown = questionToMarkdown(question);
  await navigator.clipboard.writeText(markdown);
  return markdown;
}

window.QuizCopy = {
  questionToMarkdown,
  copyQuestionAsMarkdown,
};
