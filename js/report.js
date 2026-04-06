function buildSessionReport(set, session, questionStates) {
  const byId = new Map(set.questions.map((question) => [question.questionId, question]));
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;
  let markedCount = 0;
  const wrongQuestionIds = [];
  const items = [];

  for (const questionId of session.questionIds) {
    const question = byId.get(questionId);
    const answer = session.answers[questionId] ?? null;
    const questionState = questionStates[questionId] ?? {};

    if (questionState.marked) {
      markedCount += 1;
    }

    let status = "unanswered";
    if (answer?.status === "correct") {
      status = "correct";
      correctCount += 1;
    } else if (answer?.status === "wrong") {
      status = "wrong";
      wrongCount += 1;
      wrongQuestionIds.push(questionId);
    } else {
      unansweredCount += 1;
    }

    items.push({
      questionId,
      questionNumber: question.sourceQuestionNumber,
      status,
      promptSnippet: question.promptText.slice(0, 120),
      correctAnswers: question.choices
        .filter((choice) => question.correctChoiceIds.includes(choice.choiceId))
        .map((choice) => choice.text),
    });
  }

  return {
    setId: set.setId,
    title: set.title,
    mode: session.mode,
    modeLabel: window.QuizEngine.getModeLabel(session.mode),
    finishedAt: new Date().toISOString(),
    correctCount,
    wrongCount,
    unansweredCount,
    markedCount,
    accuracy: session.questionIds.length
      ? Number((correctCount / session.questionIds.length).toFixed(3))
      : 0,
    wrongQuestionIds,
    items,
  };
}

window.QuizReport = {
  buildSessionReport,
};
