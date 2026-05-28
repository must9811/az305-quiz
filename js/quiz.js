const QUIZ_MODES = {
  normal: "通常",
  marked: "マークのみ",
  wrong: "直近誤答のみ",
};

function buildQuestionIdsForMode(set, mode, questionStates, reports) {
  if (mode === "marked") {
    return set.questions
      .filter((question) => questionStates[question.questionId]?.marked)
      .map((question) => question.questionId);
  }

  if (mode === "wrong") {
    const wrongQuestionIds = reports[set.setId]?.wrongQuestionIds ?? [];
    const validIds = new Set(set.questions.map((question) => question.questionId));
    return wrongQuestionIds.filter((questionId) => validIds.has(questionId));
  }

  return set.questions.map((question) => question.questionId);
}

function buildProblemBookFilters(sets) {
  if (!Array.isArray(sets)) {
    return [];
  }

  const byKey = new Map();

  for (const set of sets) {
    const key = getProblemBookKey(set);
    const current = byKey.get(key);

    if (current) {
      current.count += 1;
      continue;
    }

    byKey.set(key, {
      key,
      label: getProblemBookLabel(set),
      count: 1,
    });
  }

  return [...byKey.values()];
}

function filterSetsByProblemBook(sets, problemBookKey) {
  if (!Array.isArray(sets)) {
    return [];
  }

  if (!problemBookKey || problemBookKey === "all") {
    return sets;
  }

  return sets.filter((set) => getProblemBookKey(set) === problemBookKey);
}

function getProblemBookKey(set) {
  return set?.sourceHtml || set?.setId || "";
}

function getProblemBookLabel(set) {
  const fallback = set?.sourceHtml || set?.setId || "";
  const title = String(set?.title || fallback).trim();
  return title.replace(/\s+\d+\s*-\s*\d+$/, "") || title || fallback;
}

function getNextSetInManifest(sets, currentSetId) {
  if (!Array.isArray(sets) || !currentSetId) {
    return null;
  }

  const currentIndex = sets.findIndex((set) => set.setId === currentSetId);

  if (currentIndex < 0 || currentIndex >= sets.length - 1) {
    return null;
  }

  return sets[currentIndex + 1];
}

function createSession(set, mode, questionIds) {
  const now = new Date().toISOString();
  return {
    setId: set.setId,
    mode,
    questionIds,
    currentIndex: 0,
    answers: {},
    startedAt: now,
    updatedAt: now,
  };
}

function canGoBack(session) {
  return Number(session?.currentIndex ?? 0) > 0;
}

function isLastQuestion(session) {
  if (!session || !Array.isArray(session.questionIds) || session.questionIds.length === 0) {
    return true;
  }

  return session.currentIndex === session.questionIds.length - 1;
}

function advanceSession(session, timestamp = new Date().toISOString()) {
  if (isLastQuestion(session)) {
    return false;
  }

  session.currentIndex += 1;
  session.updatedAt = timestamp;
  return true;
}

function goBackSession(session, timestamp = new Date().toISOString()) {
  if (!canGoBack(session)) {
    return false;
  }

  session.currentIndex -= 1;
  session.updatedAt = timestamp;
  return true;
}

function getAdvanceActionLabel(session) {
  return isLastQuestion(session) ? "結果を見る" : "次へ";
}

function evaluateAnswer(question, selectedChoiceIds) {
  const actual = [...selectedChoiceIds].sort();
  const expected = [...question.correctChoiceIds].sort();
  const isCorrect =
    actual.length === expected.length &&
    actual.every((choiceId, index) => choiceId === expected[index]);

  return isCorrect ? "correct" : "wrong";
}

function getModeLabel(mode) {
  return QUIZ_MODES[mode] ?? mode;
}

window.QuizEngine = {
  QUIZ_MODES,
  advanceSession,
  buildProblemBookFilters,
  buildQuestionIdsForMode,
  canGoBack,
  createSession,
  evaluateAnswer,
  filterSetsByProblemBook,
  getAdvanceActionLabel,
  getModeLabel,
  getNextSetInManifest,
  goBackSession,
  isLastQuestion,
};
