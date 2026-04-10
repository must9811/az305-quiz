const assert = require("node:assert/strict");
const { describe, test } = require("node:test");

const { createLocalStorage, loadQuizEnvironment } = require("./test-helpers");

describe("storage and resume", () => {
  describe("set attempts", () => {
    test("setId ごとの学習回数チェックを保存できる", () => {
      const { QuizStorage } = loadQuizEnvironment({
        localStorage: createLocalStorage(),
      });

      QuizStorage.updateSetAttemptState("set-001", 0, true);
      QuizStorage.updateSetAttemptState("set-001", 2, true);

      assert.deepEqual(QuizStorage.getSetAttemptState("set-001"), [true, false, true]);
    });

    test("未保存のセットは 3 つとも未チェックで復元する", () => {
      const { QuizStorage } = loadQuizEnvironment({
        localStorage: createLocalStorage(),
      });

      assert.deepEqual(QuizStorage.getSetAttemptState("set-999"), [false, false, false]);
    });
  });

  describe("question state", () => {
    test.todo("問題ごとの marked 状態を保存できる");
    test.todo("問題ごとの lastAnswerStatus を保存できる");
    test.todo("問題ごとの lastAnsweredChoiceIds を保存できる");
    test.todo("保存済みの marked 状態を再読み込み後に復元できる");
  });

  describe("session lifecycle", () => {
    test.todo("途中終了時に未完了セッションを保存できる");
    test.todo("完了時に未完了セッションを削除できる");
    test.todo("完了時にセット単位の直近レポートを保存できる");
    test.todo("マークのみモードで選択セット内の marked 問題だけを出題できる");
    test.todo("直近誤答のみモードで選択セット内の直近誤答問題だけを出題できる");
    test.todo("直近誤答のみで別セットの誤答を混在させない");
    test.todo("localStorage の保存データが破損していても初期状態へ復旧できる");

    test("再開時に setId mode questionIds currentIndex を復元できる", () => {
      const { QuizEngine, QuizStorage } = loadQuizEnvironment({
        localStorage: createLocalStorage(),
      });
      const session = QuizEngine.createSession({ setId: "set-001" }, "normal", [
        "q-001",
        "q-002",
        "q-003",
      ]);

      QuizEngine.advanceSession(session, "2026-04-06T12:00:00.000Z");
      QuizStorage.saveSession(session);

      const restored = QuizStorage.getSession();

      assert.equal(restored.setId, "set-001");
      assert.equal(restored.mode, "normal");
      assert.equal(JSON.stringify(restored.questionIds), JSON.stringify(["q-001", "q-002", "q-003"]));
      assert.equal(restored.currentIndex, 1);
    });

    test("未回答を含む sparse answers を再開復元できる", () => {
      const { QuizEngine, QuizStorage } = loadQuizEnvironment({
        localStorage: createLocalStorage(),
      });
      const session = QuizEngine.createSession({ setId: "set-001" }, "normal", [
        "q-001",
        "q-002",
        "q-003",
      ]);

      session.answers["q-001"] = {
        selectedChoiceIds: ["q-001-c2"],
        status: "correct",
        answeredAt: "2026-04-06T12:00:00.000Z",
      };
      QuizEngine.advanceSession(session, "2026-04-06T12:05:00.000Z");
      QuizEngine.advanceSession(session, "2026-04-06T12:10:00.000Z");
      QuizStorage.saveSession(session);

      const restored = QuizStorage.getSession();

      assert.equal(restored.currentIndex, 2);
      assert.deepEqual(Object.keys(restored.answers), ["q-001"]);
      assert.equal(restored.answers["q-002"], undefined);
    });

    test("戻ると次へ操作でも session を保存できる", () => {
      const { QuizEngine, QuizStorage } = loadQuizEnvironment({
        localStorage: createLocalStorage(),
      });
      const session = QuizEngine.createSession({ setId: "set-001" }, "normal", [
        "q-001",
        "q-002",
        "q-003",
      ]);

      QuizStorage.saveSession(session);
      QuizEngine.advanceSession(session, "2026-04-06T12:00:00.000Z");
      QuizStorage.saveSession(session);
      QuizEngine.goBackSession(session, "2026-04-06T12:05:00.000Z");
      QuizStorage.saveSession(session);

      const restored = QuizStorage.getSession();

      assert.equal(restored.currentIndex, 0);
      assert.equal(restored.updatedAt, "2026-04-06T12:05:00.000Z");
    });
  });
});
