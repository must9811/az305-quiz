const assert = require("node:assert/strict");
const { describe, test } = require("node:test");

const { loadQuizEnvironment } = require("./test-helpers");

describe("report and copy", () => {
  describe("session report", () => {
    test.todo("セット完了後に結果レポート画面を表示できる");
    test.todo("レポート画面で正解数 不正解数 未回答数を表示できる");
    test.todo("レポート画面で正答率を表示できる");
    test.todo("レポート画面でマーク数を表示できる");
    test.todo("レポート画面で問題別結果一覧を表示できる");
    test.todo("レポート画面から通常モードの再挑戦を開始できる");
    test.todo("レポート画面からマークのみモードの再挑戦を開始できる");
    test.todo("レポート画面から直近誤答のみモードの再挑戦を開始できる");

    test("未回答を含むレポートで未回答数を集計できる", () => {
      const { QuizReport } = loadQuizEnvironment();
      const set = {
        setId: "set-001",
        title: "セット 1",
        questions: [
          {
            questionId: "q-001",
            sourceQuestionNumber: 1,
            promptText: "question 1",
            correctChoiceIds: ["q-001-c1"],
            choices: [{ choiceId: "q-001-c1", text: "A" }],
          },
          {
            questionId: "q-002",
            sourceQuestionNumber: 2,
            promptText: "question 2",
            correctChoiceIds: ["q-002-c2"],
            choices: [{ choiceId: "q-002-c2", text: "B" }],
          },
          {
            questionId: "q-003",
            sourceQuestionNumber: 3,
            promptText: "question 3",
            correctChoiceIds: ["q-003-c3"],
            choices: [{ choiceId: "q-003-c3", text: "C" }],
          },
        ],
      };
      const session = {
        mode: "normal",
        questionIds: ["q-001", "q-002", "q-003"],
        answers: {
          "q-001": { status: "correct" },
          "q-002": { status: "wrong" },
        },
      };

      const report = QuizReport.buildSessionReport(set, session, {});

      assert.equal(report.correctCount, 1);
      assert.equal(report.wrongCount, 1);
      assert.equal(report.unansweredCount, 1);
      assert.equal(JSON.stringify(report.wrongQuestionIds), JSON.stringify(["q-002"]));
    });
  });

  describe("markdown copy", () => {
    test.todo("問題単位で Markdown コピー文字列を生成できる");
    test.todo("コピー文字列に問題番号 問題文 選択肢 正答 解説を含められる");
    test.todo("複数正答問題で正答を箇条書き複数行で出力できる");
    test.todo("画像付き問題でもテキスト中心の Markdown を生成できる");
    test.todo("クリップボードコピー失敗時に失敗状態を扱える");
  });
});
