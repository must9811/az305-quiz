(function bootstrapQuizApp() {
  const app = document.querySelector("#app");
  const {
    clearSession,
    getQuestionState,
    getQuestionStates,
    getReports,
    getSetAttemptState,
    getSession,
    saveReport,
    saveSession,
    updateSetAttemptState,
    updateQuestionState,
  } = window.QuizStorage;
  const {
    advanceSession,
    buildQuestionIdsForMode,
    canGoBack,
    createSession,
    evaluateAnswer,
    getAdvanceActionLabel,
    getModeLabel,
    goBackSession,
    isLastQuestion,
  } = window.QuizEngine;
  const { buildSessionReport } = window.QuizReport;
  const { copyQuestionAsMarkdown } = window.QuizCopy;
  const { QUIZ_DATA } = window;

  const state = {
    manifest: null,
    currentSet: null,
    session: null,
    report: null,
    error: "",
    notice: "",
  };

  const setCache = new Map();

  init().catch((error) => {
    state.error = error.message;
    render();
  });

  async function init() {
    state.manifest = loadManifest();
    state.session = getSession();
    render();
  }

  function loadManifest() {
    if (!QUIZ_DATA?.manifest?.sets?.length) {
      throw new Error("クイズデータの読み込みに失敗しました。");
    }

    return QUIZ_DATA.manifest;
  }

  async function loadSet(setId) {
    if (setCache.has(setId)) {
      return setCache.get(setId);
    }

    const set = QUIZ_DATA?.sets?.[setId];
    if (!set) {
      throw new Error(`セット ${setId} の読み込みに失敗しました。`);
    }

    setCache.set(setId, set);
    return set;
  }

  function render() {
    if (state.error) {
      app.innerHTML = `
        <section class="error-layout">
          <article class="panel error-card">
            <div class="section-heading">
              <h2>アプリを表示できません</h2>
            </div>
            <p>${escapeHtml(state.error)}</p>
          </article>
        </section>
      `;
      return;
    }

    if (!state.manifest) {
      app.innerHTML = `
        <section class="loading-layout">
          <article class="panel notice-card">
            <p>クイズデータを読み込み中です。</p>
          </article>
        </section>
      `;
      return;
    }

    if (state.report) {
      renderReportScreen();
      return;
    }

    if (state.currentSet && state.session) {
      renderQuizScreen();
      return;
    }

    renderSelectionScreen();
  }

  function renderSelectionScreen() {
    const questionStates = getQuestionStates();
    const reports = getReports();
    const session = getSession();
    const resumeSet = session
      ? state.manifest.sets.find((set) => set.setId === session.setId)
      : null;

    const resumeHtml =
      session && resumeSet
        ? `
          <article class="panel resume-card">
            <div class="section-heading">
              <div>
                <h2>中断したセッションがあります</h2>
                <p class="section-subtle">
                  ${escapeHtml(resumeSet.title)} / ${escapeHtml(getModeLabel(session.mode))} /
                  ${session.currentIndex + 1} 問目から再開
                </p>
              </div>
              <button class="button button-primary" data-action="resume-session">再開する</button>
            </div>
          </article>
        `
        : "";

    const noticeHtml = state.notice
      ? `
        <article class="panel notice-card">
          <p>${escapeHtml(state.notice)}</p>
        </article>
      `
      : "";

    const cardsHtml = state.manifest.sets
      .map((set) => {
        const markedCount = countMarkedQuestionsForSet(set, questionStates);
        const wrongCount = (reports[set.setId]?.wrongQuestionIds ?? []).length;
        const attemptState = getSetAttemptState(set.setId);
        const attemptHtml = attemptState
          .map(
            (checked, index) => `
              <label class="attempt-checkbox">
                <input
                  type="checkbox"
                  data-action="toggle-set-attempt"
                  data-set-id="${set.setId}"
                  data-attempt-index="${index}"
                  ${checked ? "checked" : ""}
                />
                <span>${index + 1}回目</span>
              </label>
            `,
          )
          .join("");

        return `
          <article class="panel selection-card">
            <div class="section-heading">
              <div>
                <h3>${escapeHtml(set.title)}</h3>
                <p class="section-subtle">
                  ${set.questionCount}問 / 範囲 ${set.questionNumberRange[0]}-${set.questionNumberRange[1]}
                </p>
              </div>
              <span class="badge">${set.hasMultiSelect ? "複数選択あり" : "単一選択中心"}</span>
            </div>
            <div class="meta-row">
              <span class="stat-pill">画像 ${set.hasImages ? "あり" : "なし"}</span>
              <span class="stat-pill">マーク済み ${markedCount}</span>
              <span class="stat-pill">直近誤答 ${wrongCount}</span>
            </div>
            <div class="attempt-row">
              <span class="section-subtle">学習回数</span>
              <div class="attempt-checklist">${attemptHtml}</div>
            </div>
            <div class="action-row">
              <button class="button button-primary button-block" data-action="start-mode" data-set-id="${set.setId}" data-mode="normal">通常で開始</button>
              <button class="button button-secondary button-block" data-action="start-mode" data-set-id="${set.setId}" data-mode="marked">マークのみ</button>
              <button class="button button-warm button-block" data-action="start-mode" data-set-id="${set.setId}" data-mode="wrong">直近誤答のみ</button>
            </div>
          </article>
        `;
      })
      .join("");

    app.innerHTML = `
      <section class="selection-layout">
        ${noticeHtml}
        ${resumeHtml}
        <article class="panel selection-card">
          <div class="section-heading">
            <div>
              <h2>セットを選択</h2>
              <p class="section-subtle">
                10 問ずつに分割した ${state.manifest.setCount} セットから学習を開始できます。
              </p>
            </div>
          </div>
        </article>
        <section class="selection-grid">${cardsHtml}</section>
      </section>
    `;

    app.querySelectorAll('[data-action="start-mode"]').forEach((button) => {
      button.addEventListener("click", async () => {
        try {
          state.notice = "";
          await startMode(button.dataset.setId, button.dataset.mode);
        } catch (error) {
          state.notice = error.message;
          renderSelectionScreen();
        }
      });
    });

    app.querySelectorAll('[data-action="toggle-set-attempt"]').forEach((input) => {
      input.addEventListener("change", () => {
        updateSetAttemptState(
          input.dataset.setId,
          Number(input.dataset.attemptIndex),
          input.checked,
        );
      });
    });

    const resumeButton = app.querySelector('[data-action="resume-session"]');
    if (resumeButton) {
      resumeButton.addEventListener("click", async () => {
        try {
          await resumeSession();
        } catch (error) {
          state.notice = error.message;
          renderSelectionScreen();
        }
      });
    }
  }

  function renderQuizScreen() {
    const question = getCurrentQuestion();
    const answer = state.session.answers[question.questionId] ?? null;
    const questionState = getQuestionState(question.questionId);
    const selectedChoiceIds = new Set(answer?.selectedChoiceIds ?? []);
    const isAnswered = Boolean(answer);
    const canReturnToPrevious = canGoBack(state.session);
    const advanceLabel = getAdvanceActionLabel(state.session);
    const choiceType = question.questionType === "multi" ? "checkbox" : "radio";

    const choicesHtml = question.choices
      .map((choice) => {
        const isSelected = selectedChoiceIds.has(choice.choiceId);
        const isCorrect = isAnswered && question.correctChoiceIds.includes(choice.choiceId);
        const isWrong = isAnswered && isSelected && !isCorrect;
        const classes = [
          "choice-item",
          isSelected ? "is-selected" : "",
          isCorrect ? "is-correct" : "",
          isWrong ? "is-wrong" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return `
          <label class="${classes}">
            <input
              type="${choiceType}"
              name="choice"
              value="${choice.choiceId}"
              ${isSelected ? "checked" : ""}
              ${isAnswered ? "disabled" : ""}
            />
            <span>${choice.html}</span>
          </label>
        `;
      })
      .join("");

    const feedbackHtml = isAnswered
      ? `
        <div class="feedback-box ${answer.status}">
          <p>${answer.status === "correct" ? "正解です。" : "不正解です。"}</p>
        </div>
      `
      : "";

    const explanationHtml = isAnswered
      ? `
        <div class="explanation-box">
          <div class="section-heading">
            <h3>解説</h3>
          </div>
          <div class="explanation-html">${question.explanationHtml}</div>
        </div>
      `
      : "";

    const submitButtonHtml = isAnswered
      ? ""
      : '<button class="button button-primary" data-action="submit-answer">回答する</button>';

    app.innerHTML = `
      <section class="quiz-layout">
        <div class="quiz-main">
          ${state.notice ? `<article class="panel notice-card"><p>${escapeHtml(state.notice)}</p></article>` : ""}
          <article class="panel quiz-card">
            <div class="section-heading">
              <div>
                <div class="badge-row">
                  <span class="mode-chip">${escapeHtml(getModeLabel(state.session.mode))}</span>
                  ${(question.tags ?? []).map((tag) => `<span class="badge">${escapeHtml(tag)}</span>`).join("")}
                </div>
                <h2>問題 ${question.sourceQuestionNumber}</h2>
                <p class="progress-text">${state.session.currentIndex + 1} / ${state.session.questionIds.length}</p>
              </div>
              <div class="action-row">
                <button class="button button-secondary" data-action="toggle-mark">${
                  questionState.marked ? "マーク解除" : "マークする"
                }</button>
                <button class="button button-warm" data-action="copy-question">Markdown をコピー</button>
              </div>
            </div>

            <div class="question-html">${question.promptHtml}</div>
            <div class="choice-list">${choicesHtml}</div>
            ${feedbackHtml}
            ${explanationHtml}
            <div class="action-row quiz-nav-row">
              <button class="button button-ghost" data-action="go-back" ${canReturnToPrevious ? "" : "disabled"}>
                戻る
              </button>
              ${submitButtonHtml}
              <button class="button ${isAnswered ? "button-primary" : "button-secondary"}" data-action="advance-question">
                ${advanceLabel}
              </button>
              <button class="button button-danger" data-action="leave-session">途中で終了</button>
            </div>
          </article>
        </div>

        <aside class="quiz-side">
          <article class="panel quiz-card">
            <div class="section-heading">
              <h3>${escapeHtml(state.currentSet.title)}</h3>
            </div>
            <p class="section-subtle">
              セットの途中経過です。途中で終了すると、次回はこの位置から再開できます。
            </p>
            <div class="meta-row">
              <span class="stat-pill">マーク済み ${countMarkedQuestionsInSession()}</span>
              <span class="stat-pill">回答済み ${Object.keys(state.session.answers).length}</span>
            </div>
          </article>
        </aside>
      </section>
    `;

    bindQuizEvents(question);
  }

  function renderReportScreen() {
    const report = state.report;
    const itemsHtml = report.items
      .map(
        (item) => `
          <article class="result-item ${item.status}">
            <div class="section-heading">
              <h4>問題 ${item.questionNumber}</h4>
              <span class="badge">${
                item.status === "correct"
                  ? "正解"
                  : item.status === "wrong"
                    ? "不正解"
                    : "未回答"
              }</span>
            </div>
            <p>${escapeHtml(item.promptSnippet)}</p>
            <p class="section-subtle">正答: ${escapeHtml(item.correctAnswers.join(" / "))}</p>
          </article>
        `,
      )
      .join("");

    app.innerHTML = `
      <section class="report-layout">
        <article class="panel report-card">
          <div class="section-heading">
            <div>
              <h2>${escapeHtml(report.title)}</h2>
              <p class="section-subtle">
                ${escapeHtml(report.modeLabel)} / 終了日時 ${escapeHtml(
                  new Date(report.finishedAt).toLocaleString("ja-JP"),
                )}
              </p>
            </div>
          </div>
          <div class="summary-grid">
            <div class="summary-item"><span>正解</span><strong>${report.correctCount}</strong></div>
            <div class="summary-item"><span>不正解</span><strong>${report.wrongCount}</strong></div>
            <div class="summary-item"><span>未回答</span><strong>${report.unansweredCount}</strong></div>
            <div class="summary-item"><span>正答率</span><strong>${Math.round(report.accuracy * 100)}%</strong></div>
            <div class="summary-item"><span>マーク数</span><strong>${report.markedCount}</strong></div>
          </div>
          <div class="action-row">
            <button class="button button-primary" data-action="retry-mode" data-mode="normal">通常で再挑戦</button>
            <button class="button button-secondary" data-action="retry-mode" data-mode="marked">マークのみ</button>
            <button class="button button-warm" data-action="retry-mode" data-mode="wrong">直近誤答のみ</button>
            <button class="button button-ghost" data-action="back-selection">セット選択へ戻る</button>
          </div>
        </article>
        <article class="panel report-card">
          <div class="section-heading">
            <h3>問題別の結果</h3>
          </div>
          <div class="result-list">${itemsHtml}</div>
        </article>
      </section>
    `;

    app.querySelectorAll('[data-action="retry-mode"]').forEach((button) => {
      button.addEventListener("click", async () => {
        try {
          await startMode(report.setId, button.dataset.mode);
        } catch (error) {
          state.notice = error.message;
          state.report = null;
          renderSelectionScreen();
        }
      });
    });

    app.querySelector('[data-action="back-selection"]').addEventListener("click", () => {
      state.report = null;
      state.notice = "";
      renderSelectionScreen();
    });
  }

  async function startMode(setId, mode) {
    const set = await loadSet(setId);
    const questionIds = buildQuestionIdsForMode(set, mode, getQuestionStates(), getReports());

    if (questionIds.length === 0) {
      throw new Error(
        mode === "marked"
          ? "このセットにはマーク済みの問題がありません。"
          : "このセットには直近誤答の問題がありません。",
      );
    }

    state.currentSet = set;
    state.session = createSession(set, mode, questionIds);
    state.report = null;
    state.notice = "";
    saveSession(state.session);
    render();
  }

  async function resumeSession() {
    const session = getSession();
    if (!session) {
      throw new Error("再開できるセッションが見つかりません。");
    }

    state.currentSet = await loadSet(session.setId);
    state.session = session;
    state.report = null;
    state.notice = "";
    render();
  }

  function bindQuizEvents(question) {
    app.querySelector('[data-action="toggle-mark"]').addEventListener("click", () => {
      const current = getQuestionState(question.questionId);
      updateQuestionState(question.questionId, { marked: !current.marked });
      state.notice = current.marked ? "マークを解除しました。" : "マークしました。";
      renderQuizScreen();
    });

    app.querySelector('[data-action="copy-question"]').addEventListener("click", async () => {
      try {
        await copyQuestionAsMarkdown(question);
        state.notice = "Markdown をクリップボードにコピーしました。";
      } catch {
        state.notice =
          "コピーに失敗しました。ブラウザのクリップボード権限を確認してください。";
      }
      renderQuizScreen();
    });

    const goBackButton = app.querySelector('[data-action="go-back"]');
    if (goBackButton && !goBackButton.disabled) {
      goBackButton.addEventListener("click", () => {
        goBackQuestion();
      });
    }

    app.querySelector('[data-action="leave-session"]').addEventListener("click", () => {
      state.session.updatedAt = new Date().toISOString();
      saveSession(state.session);
      state.currentSet = null;
      state.report = null;
      state.notice = "途中終了しました。次回はこの位置から再開できます。";
      renderSelectionScreen();
    });

    const submitButton = app.querySelector('[data-action="submit-answer"]');
    if (submitButton) {
      submitButton.addEventListener("click", () => {
        submitCurrentAnswer(question);
      });
    }

    const advanceButton = app.querySelector('[data-action="advance-question"]');
    if (advanceButton) {
      advanceButton.addEventListener("click", () => {
        advanceQuestion();
      });
    }
  }

  function submitCurrentAnswer(question) {
    const selectedChoiceIds = [...app.querySelectorAll('input[name="choice"]:checked')].map(
      (input) => input.value,
    );

    if (selectedChoiceIds.length === 0) {
      state.notice = "選択肢を選んでから回答してください。";
      renderQuizScreen();
      return;
    }

    const status = evaluateAnswer(question, selectedChoiceIds);
    state.session.answers[question.questionId] = {
      selectedChoiceIds,
      status,
      answeredAt: new Date().toISOString(),
    };
    state.session.updatedAt = new Date().toISOString();
    saveSession(state.session);

    updateQuestionState(question.questionId, {
      lastAnswerStatus: status,
      lastAnsweredChoiceIds: selectedChoiceIds,
    });

    state.notice = "";
    renderQuizScreen();
  }

  function advanceQuestion() {
    if (isLastQuestion(state.session)) {
      finishSession();
      return;
    }

    advanceSession(state.session);
    saveSession(state.session);
    state.notice = "";
    renderQuizScreen();
  }

  function goBackQuestion() {
    if (!goBackSession(state.session)) {
      return;
    }

    saveSession(state.session);
    state.notice = "";
    renderQuizScreen();
  }

  function finishSession() {
    const report = buildSessionReport(state.currentSet, state.session, getQuestionStates());
    saveReport(state.currentSet.setId, report);
    clearSession();
    state.report = report;
    state.session = null;
    state.currentSet = null;
    state.notice = "";
    render();
  }

  function getCurrentQuestion() {
    const questionId = state.session.questionIds[state.session.currentIndex];
    return state.currentSet.questions.find((question) => question.questionId === questionId);
  }

  function countMarkedQuestionsInSession() {
    const questionStates = getQuestionStates();
    return state.session.questionIds.filter((questionId) => questionStates[questionId]?.marked)
      .length;
  }

  function countMarkedQuestionsForSet(set, questionStates) {
    const questionIds =
      Array.isArray(set.questionIds) && set.questionIds.length > 0
        ? set.questionIds
        : set.questions?.map((question) => question.questionId) ?? [];

    return questionIds.filter((questionId) => questionStates[questionId]?.marked).length;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }
})();
