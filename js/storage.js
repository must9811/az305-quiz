const QUESTION_STATE_KEY = "az305.quiz.state.v1";
const SESSION_KEY = "az305.quiz.session.v1";
const REPORT_KEY = "az305.quiz.report.v1";
const SET_ATTEMPT_KEY = "az305.quiz.set-attempts.v1";
const MEMO_KEY = "az305-study:memos:v1";

const SUPABASE_URL = "https://zjmwxmwepmrkaennmecl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_bFbaYKShsKarkteth7vljw__QLRGdrr";
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
  pushQuestionState(questionId, states[questionId]);
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
  pushReport(setId, report);
  return reports[setId];
}

function getSetAttempts() {
  return loadJson(SET_ATTEMPT_KEY, {});
}

function getSetAttemptState(setId) {
  const attempts = getSetAttempts()[setId];
  const defaults = [false, false, false];

  if (!Array.isArray(attempts)) {
    return defaults;
  }

  return defaults.map((value, index) => Boolean(attempts[index] ?? value));
}

function updateSetAttemptState(setId, attemptIndex, checked) {
  const attempts = getSetAttempts();
  const nextState = getSetAttemptState(setId);
  nextState[attemptIndex] = Boolean(checked);
  attempts[setId] = nextState;
  saveJson(SET_ATTEMPT_KEY, attempts);
  pushSetAttempt(setId, nextState);
  return nextState;
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
  getSetAttempts,
  getSetAttemptState,
  updateSetAttemptState,
  pullFromSupabase,
  pullMemosFromSupabase,
  pushMemo,
  deleteMemoFromSupabase,
};

// --- Supabase pull (起動時: Supabase → localStorage) ---

async function pullFromSupabase() {
  try {
    const [qRes, rRes, aRes, mRes] = await Promise.all([
      sb.from("question_states").select("*"),
      sb.from("set_reports").select("*"),
      sb.from("set_attempts").select("*"),
      sb.from("study_memos").select("*"),
    ]);

    if (qRes.data) {
      const map = {};
      for (const row of qRes.data) {
        map[row.question_id] = {
          marked: row.marked,
          lastAnswerStatus: row.last_answer_status,
          lastAnsweredChoiceIds: row.last_answered_choice_ids,
        };
      }
      saveJson(QUESTION_STATE_KEY, map);
    }

    if (rRes.data) {
      const map = {};
      for (const row of rRes.data) {
        map[row.set_id] = {
          setId: row.set_id,
          title: row.title,
          mode: row.mode,
          modeLabel: row.mode_label,
          finishedAt: row.finished_at,
          correctCount: row.correct_count,
          wrongCount: row.wrong_count,
          unansweredCount: row.unanswered_count,
          markedCount: row.marked_count,
          accuracy: Number(row.accuracy),
          wrongQuestionIds: row.wrong_question_ids,
          items: row.items,
        };
      }
      saveJson(REPORT_KEY, map);
    }

    if (aRes.data) {
      const map = {};
      for (const row of aRes.data) {
        map[row.set_id] = row.attempts;
      }
      saveJson(SET_ATTEMPT_KEY, map);
    }

    if (mRes.error) {
      console.warn("[Supabase] pull study_memos 失敗", mRes.error);
    } else if (mRes.data) {
      saveMemosFromRows(mRes.data);
    }

    console.log("[Supabase] pull 完了");
  } catch (err) {
    console.warn("[Supabase] pull 失敗（localStorage フォールバック）", err);
  }
}

async function pullMemosFromSupabase() {
  try {
    const { data, error } = await sb.from("study_memos").select("*");
    if (error) {
      console.warn("[Supabase] pull study_memos 失敗", error);
      return false;
    }

    if (data) {
      saveMemosFromRows(data);
    }

    return true;
  } catch (err) {
    console.warn("[Supabase] pull study_memos 失敗（localStorage フォールバック）", err);
    return false;
  }
}

function saveMemosFromRows(rows) {
  const memos = rows
    .map((row) => ({
      id: row.id,
      title: row.title,
      body: row.body,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  saveJson(MEMO_KEY, memos);
}

// --- Supabase push (書き込み時: localStorage → Supabase, fire-and-forget) ---

function pushQuestionState(questionId, state) {
  sb.from("question_states")
    .upsert({
      question_id: questionId,
      marked: state.marked,
      last_answer_status: state.lastAnswerStatus,
      last_answered_choice_ids: state.lastAnsweredChoiceIds,
      updated_at: new Date().toISOString(),
    })
    .then(({ error }) => {
      if (error) console.warn("[Supabase] push question_states 失敗", error);
    });
}

function pushReport(setId, report) {
  sb.from("set_reports")
    .upsert({
      set_id: setId,
      title: report.title,
      mode: report.mode,
      mode_label: report.modeLabel,
      finished_at: report.finishedAt,
      correct_count: report.correctCount,
      wrong_count: report.wrongCount,
      unanswered_count: report.unansweredCount,
      marked_count: report.markedCount,
      accuracy: report.accuracy,
      wrong_question_ids: report.wrongQuestionIds,
      items: report.items,
    })
    .then(({ error }) => {
      if (error) console.warn("[Supabase] push set_reports 失敗", error);
    });
}

function pushSetAttempt(setId, attempts) {
  sb.from("set_attempts")
    .upsert({
      set_id: setId,
      attempts: attempts,
      updated_at: new Date().toISOString(),
    })
    .then(({ error }) => {
      if (error) console.warn("[Supabase] push set_attempts 失敗", error);
    });
}

function pushMemo(memo) {
  sb.from("study_memos")
    .upsert({
      id: memo.id,
      title: memo.title,
      body: memo.body,
      created_at: memo.createdAt,
      updated_at: memo.updatedAt,
    })
    .then(({ error }) => {
      if (error) console.warn("[Supabase] push study_memos 失敗", error);
    });
}

function deleteMemoFromSupabase(id) {
  sb.from("study_memos")
    .delete()
    .eq("id", id)
    .then(({ error }) => {
      if (error) console.warn("[Supabase] delete study_memos 失敗", error);
    });
}
