const assert = require("node:assert/strict");
const { describe, test } = require("node:test");

const { createLocalStorage, createSupabaseStub, loadScript } = require("./test-helpers");

const MEMO_KEY = "az305-study:memos:v1";

function loadMemoEnvironment(options = {}) {
  const localStorage = options.localStorage ?? createLocalStorage();
  const supabase = options.supabase ?? createSupabaseStub();
  const window = {
    localStorage,
    supabase,
  };
  const context = {
    console,
    crypto: {
      randomUUID: () => options.randomUUID ?? "11111111-1111-4111-8111-111111111111",
    },
    localStorage,
    window,
  };

  loadScript("js/storage.js", context);
  loadScript("js/memos.js", context);

  return { localStorage, supabase, window };
}

describe("memos", () => {
  test("Supabase の study_memos rows を localStorage のメモ配列へ pull できる", async () => {
    const localStorage = createLocalStorage();
    const supabase = createSupabaseStub({
      tables: {
        study_memos: [
          {
            id: "memo-old",
            title: "old",
            body: "old body",
            created_at: "2026-06-08T09:00:00.000Z",
            updated_at: "2026-06-08T09:10:00.000Z",
          },
          {
            id: "memo-new",
            title: "new",
            body: "new body",
            created_at: "2026-06-08T10:00:00.000Z",
            updated_at: "2026-06-08T10:10:00.000Z",
          },
        ],
      },
    });
    const { window } = loadMemoEnvironment({ localStorage, supabase });

    await window.QuizStorage.pullFromSupabase();

    const stored = JSON.parse(localStorage.getItem(MEMO_KEY));
    assert.deepEqual(stored.map((memo) => memo.id), ["memo-new", "memo-old"]);
    assert.deepEqual(stored[0], {
      id: "memo-new",
      title: "new",
      body: "new body",
      createdAt: "2026-06-08T10:00:00.000Z",
      updatedAt: "2026-06-08T10:10:00.000Z",
    });
  });

  test("メモ作成と更新で study_memos に upsert できる", () => {
    const supabase = createSupabaseStub();
    const { window } = loadMemoEnvironment({
      supabase,
      randomUUID: "22222222-2222-4222-8222-222222222222",
    });

    const created = window.QuizMemo.createMemo();
    const updated = window.QuizMemo.updateMemo(created.id, {
      title: "Updated title",
      body: "Updated body",
    });

    const rows = supabase.tables.get("study_memos");
    assert.equal(rows.length, 1);
    assert.equal(rows[0].id, created.id);
    assert.equal(rows[0].title, "Updated title");
    assert.equal(rows[0].body, "Updated body");
    assert.equal(rows[0].created_at, created.createdAt);
    assert.equal(rows[0].updated_at, updated.updatedAt);
    assert.equal(
      supabase.calls.filter((call) => call.table === "study_memos" && call.operation === "upsert").length,
      2,
    );
  });

  test("メモ削除で study_memos の対象IDを delete できる", () => {
    const memo = {
      id: "33333333-3333-4333-8333-333333333333",
      title: "delete me",
      body: "body",
      createdAt: "2026-06-08T09:00:00.000Z",
      updatedAt: "2026-06-08T09:10:00.000Z",
    };
    const localStorage = createLocalStorage({ [MEMO_KEY]: [memo] });
    const supabase = createSupabaseStub({
      tables: {
        study_memos: [
          {
            id: memo.id,
            title: memo.title,
            body: memo.body,
            created_at: memo.createdAt,
            updated_at: memo.updatedAt,
          },
        ],
      },
    });
    const { window } = loadMemoEnvironment({ localStorage, supabase });

    window.QuizMemo.deleteMemo(memo.id);

    assert.deepEqual(JSON.parse(localStorage.getItem(MEMO_KEY)), []);
    assert.deepEqual(supabase.tables.get("study_memos"), []);
    assert.ok(
      supabase.calls.some(
        (call) =>
          call.table === "study_memos" &&
          call.operation === "delete.eq" &&
          call.column === "id" &&
          call.value === memo.id,
      ),
    );
  });

  test("Supabase 書き込み失敗時も localStorage のメモ操作は維持する", () => {
    const localStorage = createLocalStorage();
    const supabase = createSupabaseStub({
      fail: {
        study_memos: {
          upsert: true,
          delete: true,
        },
      },
    });
    const { window } = loadMemoEnvironment({
      localStorage,
      supabase,
      randomUUID: "44444444-4444-4444-8444-444444444444",
    });

    const created = window.QuizMemo.createMemo();
    const updated = window.QuizMemo.updateMemo(created.id, {
      title: "Local only",
      body: "Still saved",
    });

    assert.equal(updated.title, "Local only");
    assert.equal(JSON.parse(localStorage.getItem(MEMO_KEY))[0].body, "Still saved");

    window.QuizMemo.deleteMemo(created.id);

    assert.deepEqual(JSON.parse(localStorage.getItem(MEMO_KEY)), []);
  });
});
