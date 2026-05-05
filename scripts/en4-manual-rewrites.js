const {
  applyEnglishSetRewrites,
  buildAuditStatus,
} = require("./english-manual-rewrite-utils");

const AUDIT_STATUS = buildAuditStatus(
  "en4",
  57,
  ["en4-q-001", "en4-q-004", "en4-q-043", "en4-q-055"],
  [
    "en4-q-002",
    "en4-q-003",
    "en4-q-016",
    "en4-q-017",
    "en4-q-019",
    "en4-q-020",
    "en4-q-023",
    "en4-q-024",
    "en4-q-027",
    "en4-q-028",
    "en4-q-031",
    "en4-q-032",
    "en4-q-033",
    "en4-q-034",
    "en4-q-042",
    "en4-q-043",
    "en4-q-044",
    "en4-q-045",
    "en4-q-046",
    "en4-q-047",
    "en4-q-050",
    "en4-q-051",
    "en4-q-054",
    "en4-q-055",
  ],
);

const PROMPT_OVERRIDES = {
  "en4-q-001": [
    "Web アクセス ログ データを Azure Blob Storage に保存しています。",
    "このアクセス ログ データを基に、月次レポートを作成する予定です。",
    "Azure Blob Storage から Azure SQL Database へデータを転送し、月次スケジュールで自動実行できるソリューションを推奨する必要があります。",
    "",
    "推奨事項には何を含める必要がありますか。",
  ].join("\n"),
  "en4-q-004": [
    "ApexCore, Ltd. という Microsoft ボリューム ライセンス顧客のデータベース環境を管理しています。ApexCore は、ソフトウェア アシュアランスによるライセンス モビリティを利用できます。",
    "50 個のデータベースを展開する必要があります。",
    "",
    "ソリューションは次の要件を満たす必要があります。",
    "・自動スケーリングをサポートする。",
    "・SQL Server ライセンス コストを最小限に抑える。",
    "",
    "推奨事項に含めるべき購入モデルはどれですか。",
  ].join("\n"),
  "en4-q-043": [
    "次の Azure リソースがあります。",
    "・VNET1: ExpressRoute を使用してオンプレミス ネットワークに接続されている仮想ネットワーク",
    "・VM1: DNS サーバーとして機能するように構成された仮想マシン",
    "・PE1: SQLDB1 に接続するプライベート エンドポイント",
    "・apexcore.com のプライベート DNS ゾーン: VNET1 にリンクされ、PE1 のレコードを含む",
    "・apexcore.com のパブリック DNS ゾーン: SQLDB1 の CNAME レコードを含む",
    "",
    "PE1 を使用して、オンプレミス ネットワークから SQLDB1 に接続できるようにする必要があります。",
    "名前解決のために、オンプレミス側ではどの構成を選択する必要がありますか。",
  ].join("\n"),
  "en4-q-055": [
    "複数のオンプレミス Microsoft SQL Server データベースから、Azure でホストされる分析ソリューションへ大量データを取り込んで処理するデータ パイプラインを設計しています。",
    "パイプラインでは次の処理を実行します。",
    "・データベースの変更を Azure Blob Storage のステージング領域に定期的にエクスポートする。",
    "・高度に並列化されたデータ読み込みプロセスを使用して、ステージングされたデータをクレンジングおよび変換する。",
    "・処理済みデータをデータ ウェアハウスへ読み込む。",
    "・処理済みデータの各バッチを使用して、マネージド サービング レイヤーでホストされる OLAP モデルを更新する。",
    "・数千人のユーザーにマネージド サービング レイヤーへのアクセスを提供する。",
    "",
    "データ ウェアハウス レイヤーとサービス レイヤーの両方を実装する必要があります。",
    "サービス レイヤーを実装するには何を使用する必要がありますか。",
  ].join("\n"),
};

const CHOICE_TEXT_OVERRIDES = {
  "en4-q-001-c2": "Data Migration Assistant",
  "en4-q-001-c3": "Microsoft SQL Server Migration Assistant (SSMA)",
  "en4-q-043-c1": "apexcore.com を VM1 に転送します",
  "en4-q-043-c2": "apexcore.com をパブリック DNS ゾーンに転送します",
  "en4-q-043-c3": "apexcore.com を Azure が提供する DNS 168.63.129.16 に転送します",
  "en4-q-055-c2": "Azure Synapse Analytics の Apache Spark プール",
};

const REASON_OVERRIDES = {
  "en4-q-001": "Azure Data Factory は、Blob Storage をソース、Azure SQL Database をシンクにしたコピー処理をパイプラインとして作成し、月次トリガーで自動実行できます。単発コピーや移行評価ツールでは、定期的なデータ転送ワークフローの要件を満たしません。",
  "en4-q-004": "vCore 購入モデルでは Azure Hybrid Benefit を利用でき、既存の SQL Server ライセンスを Azure SQL Database に適用してライセンス コストを抑えられます。DTU モデルではこのライセンス最適化を同じ形で扱えません。",
  "en4-q-043": "オンプレミスからプライベート エンドポイントの名前を解決するには、VNET1 にリンクされたプライベート DNS ゾーンを参照できる DNS サーバーへ転送する必要があります。VM1 は VNET1 内の DNS サーバーとして構成されているため、apexcore.com を VM1 に転送します。",
  "en4-q-055": "サービス レイヤーは OLAP モデルをホストし、多数のユーザーに分析用のセマンティック モデルを提供する層です。Azure Analysis Services はこの用途に適しており、Spark プールや専用 SQL プールは主に変換処理やデータ ウェアハウス層の役割です。",
};

const CHOICE_REASON_OVERRIDES = {
  "en4-q-001-c1": "AzCopy はストレージ間コピー用のコマンドライン ツールであり、Azure SQL Database への定期的な取り込みパイプラインには向きません。",
  "en4-q-001-c2": "Data Migration Assistant は SQL Server 移行評価や互換性確認のためのツールであり、Blob から SQL Database への月次 ETL 実行基盤ではありません。",
  "en4-q-001-c3": "SSMA は異種データベースから SQL Server 系プラットフォームへの移行支援ツールであり、定期レポート用の自動データ転送には使いません。",
  "en4-q-043-c2": "パブリック DNS ゾーンではプライベート エンドポイントのプライベート IP を解決できません。",
  "en4-q-043-c3": "168.63.129.16 は Azure 内部の名前解決で使われるアドレスであり、オンプレミス DNS の直接転送先としては適切ではありません。",
  "en4-q-055-c2": "Spark プールは大規模なデータ変換や処理には適していますが、OLAP モデルをマネージドに提供するサービス レイヤーではありません。",
  "en4-q-055-c3": "専用 SQL プールはデータ ウェアハウス レイヤーには適していますが、OLAP セマンティック モデルを提供するサービス レイヤーではありません。",
};

const TOPIC_SUPPLEMENTS = [
  [/Analysis Services|OLAP|Spark|専用 SQL プール|データ ウェアハウス/, "分析基盤は、取り込み、変換、データ ウェアハウス、セマンティック モデルの各層で役割が異なります。設問がどの層を問うているかを先に特定します。"],
  [/Data Factory|Blob Storage|SQL Database|Data Migration Assistant|SSMA/, "継続的または定期的なデータ移動では、移行ツールではなく、ソース、変換、シンク、スケジュールをまとめて管理できるデータ統合サービスを選びます。"],
  [/vCore|DTU|SQL Server ライセンス|Hybrid Benefit/, "Azure SQL の購入モデルは、スケーリング方式だけでなく、既存ライセンスを Azure Hybrid Benefit として使えるかがコスト最適化の判断軸になります。"],
  [/DNS|プライベート DNS|ExpressRoute|プライベート エンドポイント|168\.63\.129\.16/, "Private Endpoint の名前解決では、オンプレミス DNS と Azure 側のプライベート DNS ゾーンをどの DNS サーバーで橋渡しするかを確認します。"],
];

function applyEnglishSet4Rewrites(questions) {
  return applyEnglishSetRewrites(questions, {
    sourceId: "en4",
    auditStatus: AUDIT_STATUS,
    promptOverrides: PROMPT_OVERRIDES,
    choiceTextOverrides: CHOICE_TEXT_OVERRIDES,
    reasonOverrides: REASON_OVERRIDES,
    choiceReasonOverrides: CHOICE_REASON_OVERRIDES,
    topicSupplements: TOPIC_SUPPLEMENTS,
  });
}

module.exports = {
  applyEnglishSet4Rewrites,
};
