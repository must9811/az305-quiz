(function setupQuizMemo() {
  const STORAGE_KEY = "az305-study:memos:v1";
  const SELECTED_KEY = "az305-study:selected-memo-id:v1";

  function getMemos() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      return Array.isArray(parsed)
        ? parsed.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        : [];
    } catch {
      return [];
    }
  }

  function saveMemos(memos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  }

  function createMemo() {
    const now = new Date().toISOString();
    const memo = {
      id: crypto.randomUUID ? crypto.randomUUID() : `memo-${Date.now()}`,
      title: "無題のメモ",
      body: "",
      createdAt: now,
      updatedAt: now,
    };

    saveMemos([memo, ...getMemos()]);
    setSelectedMemoId(memo.id);
    return memo;
  }

  function updateMemo(id, updates) {
    const now = new Date().toISOString();
    const memos = getMemos();
    const next = memos.map((memo) =>
      memo.id === id
        ? {
            ...memo,
            ...updates,
            title: String(updates.title ?? memo.title).trim() || "無題のメモ",
            body: String(updates.body ?? memo.body),
            updatedAt: now,
          }
        : memo,
    );

    saveMemos(next);
    setSelectedMemoId(id);
    return next.find((memo) => memo.id === id) ?? null;
  }

  function deleteMemo(id) {
    const next = getMemos().filter((memo) => memo.id !== id);
    saveMemos(next);

    const nextSelectedId = next[0]?.id ?? "";
    setSelectedMemoId(nextSelectedId);

    return nextSelectedId;
  }

  function getSelectedMemoId() {
    return localStorage.getItem(SELECTED_KEY) ?? "";
  }

  function setSelectedMemoId(id) {
    localStorage.setItem(SELECTED_KEY, id);
  }

  window.QuizMemo = {
    getMemos,
    createMemo,
    updateMemo,
    deleteMemo,
    getSelectedMemoId,
    setSelectedMemoId,
  };
})();