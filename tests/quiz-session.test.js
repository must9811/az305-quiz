const assert = require("node:assert/strict");
const { describe, test } = require("node:test");

const { loadQuizEnvironment } = require("./test-helpers");

describe("quiz session", () => {
  describe("normal mode", () => {
    test.todo("通常モードでセット内 10 問を固定順で開始できる");
    test.todo("現在問題番号と総問題数を進捗表示できる");
    test.todo("問題文と画像を表示できる");
    test.todo("単一選択問題で 1 つの選択肢を選んで回答確定できる");
    test.todo("複数選択問題で複数の選択肢を選んで回答確定できる");
    test.todo("回答確定後に即時で正誤判定を表示できる");
    test.todo("回答確定後に解説を表示できる");
    test.todo("回答済みで戻った問題は再編集できない");
    test.todo("途中終了操作でセッションを中断できる");

    test("未回答のまま次へ操作で次の問題へ進める", () => {
      const { QuizEngine } = loadQuizEnvironment();
      const session = QuizEngine.createSession({ setId: "set-001" }, "normal", [
        "q-001",
        "q-002",
        "q-003",
      ]);

      const moved = QuizEngine.advanceSession(session, "2026-04-06T12:00:00.000Z");

      assert.equal(moved, true);
      assert.equal(session.currentIndex, 1);
      assert.equal(session.updatedAt, "2026-04-06T12:00:00.000Z");
      assert.equal(Object.keys(session.answers).length, 0);
    });

    test("2問目以降で戻る操作により前の問題へ戻れる", () => {
      const { QuizEngine } = loadQuizEnvironment();
      const session = QuizEngine.createSession({ setId: "set-001" }, "normal", [
        "q-001",
        "q-002",
        "q-003",
      ]);

      QuizEngine.advanceSession(session, "2026-04-06T12:00:00.000Z");
      const movedBack = QuizEngine.goBackSession(session, "2026-04-06T12:05:00.000Z");

      assert.equal(movedBack, true);
      assert.equal(session.currentIndex, 0);
      assert.equal(session.updatedAt, "2026-04-06T12:05:00.000Z");
    });

    test("最終問題では結果を見るラベルを返す", () => {
      const { QuizEngine } = loadQuizEnvironment();
      const session = QuizEngine.createSession({ setId: "set-001" }, "normal", [
        "q-001",
        "q-002",
      ]);

      QuizEngine.advanceSession(session, "2026-04-06T12:00:00.000Z");

      assert.equal(QuizEngine.getAdvanceActionLabel(session), "結果を見る");
      assert.equal(QuizEngine.isLastQuestion(session), true);
    });
  });
});
