const {
  applyEnglishSetRewrites,
  buildAuditStatus,
} = require("./english-manual-rewrite-utils");

const AUDIT_STATUS = buildAuditStatus(
  "en5",
  57,
  [],
  [
    "en5-q-013",
    "en5-q-014",
    "en5-q-016",
    "en5-q-017",
    "en5-q-018",
    "en5-q-019",
    "en5-q-020",
    "en5-q-021",
    "en5-q-023",
    "en5-q-024",
    "en5-q-027",
    "en5-q-028",
    "en5-q-031",
    "en5-q-032",
    "en5-q-033",
    "en5-q-037",
    "en5-q-038",
    "en5-q-042",
    "en5-q-043",
    "en5-q-044",
    "en5-q-045",
  ],
);

const PROMPT_OVERRIDES = {};

const CHOICE_TEXT_OVERRIDES = {
  "en5-q-040-c1": "Log Analytics エージェント",
  "en5-q-040-c2": "Azure Monitor エージェント",
  "en5-q-040-c3": "Azure Connected Machine エージェント",
};

const REASON_OVERRIDES = {};

const CHOICE_REASON_OVERRIDES = {};

const TOPIC_SUPPLEMENTS = [
  [/Log Analytics|Azure Monitor|セキュリティ イベント|エージェント/, "監視設計では、収集対象の OS、ワークスペースの配置、複数テナントまたは複数サブスクリプションからの集約可否を確認します。"],
  [/Microsoft Entra|条件付きアクセス|PIM|Identity|Application Proxy/, "ID 設計では、認証、認可、特権昇格、アプリ公開、条件付きアクセスのどの機能が要件に対応するかを切り分けます。"],
  [/不変|Blob|Storage|ZRS|LRS|GRS|RA-GRS|耐久性/, "Azure Storage の設問では、アクセス層、冗長性、変更不可ポリシー、リージョン障害時の読み取り可否を分けて整理します。"],
  [/仮想マシン|可用性ゾーン|自動スケーリング|専用ホスト|予約/, "コンピューティング設計では、ピーク時間、可用性、専有要件、予約割引、スケール方式を分けて判断します。"],
  [/Data Factory|Synapse|SQL|分析|パイプライン/, "データ分析基盤では、取り込み、変換、蓄積、提供、可視化のどの層を問われているかを先に特定します。"],
];

function applyEnglishSet5Rewrites(questions) {
  return applyEnglishSetRewrites(questions, {
    sourceId: "en5",
    auditStatus: AUDIT_STATUS,
    promptOverrides: PROMPT_OVERRIDES,
    choiceTextOverrides: CHOICE_TEXT_OVERRIDES,
    reasonOverrides: REASON_OVERRIDES,
    choiceReasonOverrides: CHOICE_REASON_OVERRIDES,
    topicSupplements: TOPIC_SUPPLEMENTS,
  });
}

module.exports = {
  applyEnglishSet5Rewrites,
};
