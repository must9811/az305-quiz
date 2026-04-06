const QUESTION_STATE_KEY = "az305.quiz.state.v1";
const SESSION_KEY = "az305.quiz.session.v1";
const REPORT_KEY = "az305.quiz.report.v1";

function loadJson(key, fallbackValue) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallbackValue;
    }
    return JSON.parse(raw);
  } catch {
    window.localStorage.removeItem(key);
    return fallbackValue;
  }
}

function saveJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getQuestionStates() {
  return loadJson(QUESTION_STATE_KEY, {});
}

function getQuestionState(questionId) {
  return getQuestionStates()[questionId] ?? {
    marked: false,
    lastAnswerStatus: null,
    lastAnsweredChoiceIds: [],
  };
}

function updateQuestionState(questionId, partialState) {
  const states = getQuestionStates();
  states[questionId] = {
    marked: false,
    lastAnswerStatus: null,
    lastAnsweredChoiceIds: [],
    ...(states[questionId] ?? {}),
    ...partialState,
  };
  saveJson(QUESTION_STATE_KEY, states);
  return states[questionId];
}

function getSession() {
  return loadJson(SESSION_KEY, null);
}

function saveSession(session) {
  saveJson(SESSION_KEY, session);
}

function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

function getReports() {
  return loadJson(REPORT_KEY, {});
}

function saveReport(setId, report) {
  const reports = getReports();
  reports[setId] = report;
  saveJson(REPORT_KEY, reports);
  return reports[setId];
}

window.QuizStorage = {
  getQuestionStates,
  getQuestionState,
  updateQuestionState,
  getSession,
  saveSession,
  clearSession,
  getReports,
  saveReport,
};
