const {
  applyEnglishSetRewrites,
  buildAuditStatus,
} = require("./english-manual-rewrite-utils");

const AUDIT_STATUS = buildAuditStatus(
  "en6",
  55,
  ["en6-q-014"],
  [
    "en6-q-018",
    "en6-q-019",
    "en6-q-020",
    "en6-q-021",
    "en6-q-022",
    "en6-q-023",
    "en6-q-024",
    "en6-q-025",
    "en6-q-027",
    "en6-q-028",
    "en6-q-029",
    "en6-q-030",
    "en6-q-032",
    "en6-q-033",
    "en6-q-035",
    "en6-q-036",
    "en6-q-039",
    "en6-q-040",
    "en6-q-041",
    "en6-q-042",
    "en6-q-045",
    "en6-q-046",
    "en6-q-047",
    "en6-q-048",
    "en6-q-051",
    "en6-q-052",
  ],
);

const PROMPT_OVERRIDES = {
  "en6-q-014": [
    "50 台のデバイスが、パフォーマンス メトリックを Azure Blob Storage に継続的に書き込んでいます。",
    "このデータを Azure SQL Database に保存し、継続的に分析する予定です。",
    "Blob Storage から Azure SQL Database へパフォーマンス データを継続的に転送できるソリューションを推奨する必要があります。",
    "",
    "推奨事項には何を含める必要がありますか。",
  ].join("\n"),
};

const CHOICE_TEXT_OVERRIDES = {
  "en6-q-014-c2": "Data Migration Assistant",
  "en6-q-055-c3": "Microsoft Entra Privileged Identity Management (PIM)",
  "en6-q-055-c5": "条件付きアクセス ポリシー",
};

const REASON_OVERRIDES = {
  "en6-q-014": "Azure Data Factory は、Blob Storage から Azure SQL Database へのデータ移動をパイプラインとして構成し、継続的または定期的に実行できます。Data Migration Assistant、Azure Data Box、Azure Database Migration Service は、継続的な分析用データ転送よりも移行やオフライン転送を主目的とするため、この要件には合いません。",
};

const CHOICE_REASON_OVERRIDES = {
  "en6-q-014-c2": "Data Migration Assistant は移行評価と互換性確認のためのツールであり、継続的なデータ パイプラインではありません。",
  "en6-q-014-c3": "Azure Data Box は大量データのオフライン転送サービスであり、Blob Storage から Azure SQL Database への継続的な転送には向きません。",
  "en6-q-014-c4": "Azure Database Migration Service はデータベース移行のためのサービスであり、Blob に蓄積されるメトリックを継続的に SQL Database へ取り込む用途ではありません。",
};

const TOPIC_SUPPLEMENTS = [
  [/Microsoft Entra|PIM|条件付きアクセス|Identity Protection|エンタープライズ アプリケーション/, "Microsoft Entra の設問では、アプリ登録、アプリ公開、特権管理、リスク検出、アクセス制御を混同しないことが重要です。"],
  [/Application Proxy|IWA|内部 Web|条件付きアクセス|Application Gateway/, "オンプレミス アプリの公開では、認証方式、外部公開、MFA や条件付きアクセスとの統合を確認します。"],
  [/Data Factory|Blob Storage|SQL Database|Data Box|Database Migration Service/, "継続的なデータ連携では、移行ツールやオフライン転送ではなく、パイプラインとして実行できるデータ統合サービスを選びます。"],
  [/Storage|Blob|Block Blob|ZRS|GRS|LRS|RA-GRS|アクセス層/, "ストレージ設計では、性能、コスト、冗長性、アクセス層、障害時の読み取り可否を別々に確認します。"],
  [/Azure Files|ファイル共有|トランザクション|オンプレミス/, "ファイル共有では、ワークロードの IOPS、待機時間、冗長性、オンプレミスからのアクセス方式がサービス選択の決め手になります。"],
];

function applyEnglishSet6Rewrites(questions) {
  return applyEnglishSetRewrites(questions, {
    sourceId: "en6",
    auditStatus: AUDIT_STATUS,
    promptOverrides: PROMPT_OVERRIDES,
    choiceTextOverrides: CHOICE_TEXT_OVERRIDES,
    reasonOverrides: REASON_OVERRIDES,
    choiceReasonOverrides: CHOICE_REASON_OVERRIDES,
    topicSupplements: TOPIC_SUPPLEMENTS,
  });
}

module.exports = {
  applyEnglishSet6Rewrites,
};
