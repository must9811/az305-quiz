const assert = require("node:assert/strict");
const { describe, test } = require("node:test");

const { loadScript } = require("./test-helpers");

function loadCopyModule() {
  const context = {
    Blob,
    console,
    window: {},
  };

  loadScript("js/copy.js", context);
  return context.window.QuizCopy;
}

describe("markdown copy", () => {
  test("questionToMarkdown includes prompt and explanation images", () => {
    const QuizCopy = loadCopyModule();
    const markdown = QuizCopy.questionToMarkdown({
      sourceQuestionNumber: 12,
      promptText: "prompt text",
      promptHtml: '<p>prompt text</p><img src="assets/prompt.png" alt="">',
      explanationText: "explanation text",
      explanationHtml: '<p>explanation text</p><img src="assets/explanation.png" alt="">',
      choices: [
        { choiceId: "c1", text: "A", html: "A" },
        { choiceId: "c2", text: "B", html: "B" },
      ],
      correctChoiceIds: ["c2"],
    });

    assert.match(markdown, /12/);
    assert.match(markdown, /\(assets\/prompt\.png\)/);
    assert.match(markdown, /\(assets\/explanation\.png\)/);
  });

  test("extractImageSources returns image sources in order", () => {
    const QuizCopy = loadCopyModule();
    const sources = QuizCopy.extractImageSources(
      '<p>a</p><img src="assets/a.png"><img src="assets/b.png">',
    );

    assert.deepEqual(sources, ["assets/a.png", "assets/b.png"]);
  });
});
