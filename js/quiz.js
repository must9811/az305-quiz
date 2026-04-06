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
  buildQuestionIdsForMode,
  canGoBack,
  createSession,
  evaluateAnswer,
  getAdvanceActionLabel,
  getModeLabel,
  goBackSession,
  isLastQuestion,
};
