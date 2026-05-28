const assert = require("node:assert/strict");
const { describe, test } = require("node:test");

const { loadQuizEnvironment } = require("./test-helpers");

describe("set selection", () => {
  describe("initial rendering", () => {
    test.todo("セット選択画面で可変件数のセット一覧を表示できる");
    test.todo("各セットに問題数と出題範囲を表示できる");
    test.todo("各セットに画像有無と複数選択有無を表示できる");
    test.todo("各セットで 通常 マークのみ 直近誤答のみ の開始導線を表示できる");
    test.todo("未完了セッションがない場合は再開カードを表示しない");
    test.todo("未完了セッションがある場合は再開カードを最上部に表示できる");
    test.todo("対象 0 件のマークのみ開始時に空状態メッセージを表示できる");
    test.todo("対象 0 件の直近誤答のみ開始時に空状態メッセージを表示できる");
    test.todo("セットデータの読み込み失敗時にエラーメッセージを表示できる");
  });

  describe("problem book filters", () => {
    test("sourceHtml ごとに問題集フィルタを作成できる", () => {
      const { QuizEngine } = loadQuizEnvironment();
      const sets = [
        {
          setId: "jp1-set-001",
          sourceHtml: "assets/問題集1.html",
          title: "問題集1 01-10",
        },
        {
          setId: "jp1-set-002",
          sourceHtml: "assets/問題集1.html",
          title: "問題集1 11-20",
        },
        {
          setId: "en1-set-001",
          sourceHtml: "assets/英語問題集1.html",
          title: "英語問題集1 翻訳版 01-10",
        },
      ];

      const filters = JSON.parse(JSON.stringify(QuizEngine.buildProblemBookFilters(sets)));

      assert.deepEqual(filters, [
        {
          key: "assets/問題集1.html",
          label: "問題集1",
          count: 2,
        },
        {
          key: "assets/英語問題集1.html",
          label: "英語問題集1 翻訳版",
          count: 1,
        },
      ]);
    });

    test("選択した問題集のセットだけに絞り込める", () => {
      const { QuizEngine } = loadQuizEnvironment();
      const sets = [
        { setId: "jp1-set-001", sourceHtml: "assets/問題集1.html" },
        { setId: "jp1-set-002", sourceHtml: "assets/問題集1.html" },
        { setId: "jp2-set-001", sourceHtml: "assets/問題集2.html" },
      ];

      assert.deepEqual(QuizEngine.filterSetsByProblemBook(sets, "assets/問題集1.html"), [
        sets[0],
        sets[1],
      ]);
      assert.deepEqual(QuizEngine.filterSetsByProblemBook(sets, "all"), sets);
    });
  });
});
