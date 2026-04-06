const { describe, test } = require("node:test");

describe("set selection", () => {
  describe("initial rendering", () => {
    test.todo("セット選択画面で 6 件の 10 問セット一覧を表示できる");
    test.todo("各セットに問題数と出題範囲を表示できる");
    test.todo("各セットに画像有無と複数選択有無を表示できる");
    test.todo("各セットで 通常 マークのみ 直近誤答のみ の開始導線を表示できる");
    test.todo("未完了セッションがない場合は再開カードを表示しない");
    test.todo("未完了セッションがある場合は再開カードを最上部に表示できる");
    test.todo("対象 0 件のマークのみ開始時に空状態メッセージを表示できる");
    test.todo("対象 0 件の直近誤答のみ開始時に空状態メッセージを表示できる");
    test.todo("セットデータの読み込み失敗時にエラーメッセージを表示できる");
  });
});
