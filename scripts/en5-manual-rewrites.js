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
    "en5-q-046",
    "en5-q-047",
    "en5-q-048",
    "en5-q-049",
    "en5-q-050",
    "en5-q-051",
    "en5-q-052",
    "en5-q-053",
    "en5-q-054",
    "en5-q-055",
    "en5-q-056",
    "en5-q-057",
  ],
);

const IRONCLAD_CASE_STUDY_TEXT = [
  "IronClad, Ltd. ケーススタディ",
  "",
  "概要",
  "IronClad, Ltd. は、ヨーロッパ各地に拠点を持つエンジニアリング会社です。",
  "本社はロンドンにあり、支社はアムステルダム、ベルリン、ローマの 3 か所にあります。",
  "",
  "既存環境",
  "",
  "Microsoft Entra 環境",
  "・ネットワークには、corp.ironclad.com と rd.ironclad.com という 2 つの Active Directory フォレストがあります。",
  "・2 つのフォレスト間に信頼関係はありません。",
  "・corp.ironclad.com は本番用フォレストであり、社内ユーザーとコンピューターの認証に使う ID を含みます。",
  "・rd.ironclad.com は研究開発 (R&D) 部門専用です。",
  "・R&D 部門はオンプレミス リソースのみを使用するよう制限されています。",
  "",
  "ネットワーク インフラストラクチャ",
  "・各オフィスには、corp.ironclad.com ドメインのドメイン コントローラーが少なくとも 1 台あります。",
  "・本社には、rd.ironclad.com フォレストのすべてのドメイン コントローラーがあります。",
  "・すべてのオフィスは、インターネットへの高速接続を備えています。",
  "・既存アプリケーション WebApp1 は、ロンドン本社のデータ センターでホストされています。",
  "・WebApp1 は、顧客が注文を作成および追跡するために使用します。",
  "・WebApp1 には、Microsoft Internet Information Services (IIS) を使用する Web 層と、Microsoft SQL Server 2016 を実行するデータベース層があります。",
  "・Web 層とデータベース層は、Hyper-V 上で実行される仮想マシンにデプロイされています。",
  "・IT 部門は現在、WebApp1 の更新をテストするために、別の Hyper-V 環境を使用しています。",
  "・IronClad は、Software Assurance を含む Microsoft Enterprise Agreement を通じて、すべての Microsoft ライセンスを購入しています。",
  "",
  "問題点",
  "・WebApp1 の利用量は予測しにくい状態です。",
  "・ピーク時には、ユーザーから遅延が報告されることがよくあります。",
  "・一方で、ピーク以外の時間帯には、WebApp1 用リソースの多くが十分に使用されていません。",
  "",
  "要件",
  "",
  "計画されている変更",
  "・IronClad は今後数年で、本番ワークロードの大部分を Azure へ移行する予定です。",
  "・移行対象には、Microsoft Entra による認証に依存する仮想マシンも含まれます。",
  "・最初のプロジェクトの 1 つとして、Microsoft 365 展開に備えたハイブリッド ID モデルを確立する予定です。",
  "・R&D のすべての運用はオンプレミスに残します。",
  "・WebApp1 の本番インスタンスとテスト インスタンスを Azure へ移行する予定です。",
  "",
  "技術要件",
  "・Web サイトのコンテンツは、単一の場所から簡単に更新できる必要があります。",
  "・新しい Web アプリ インスタンスをプロビジョニングするときのユーザー入力を最小限に抑える必要があります。",
  "・可能な限り、既存のオンプレミス ライセンスを使用してコストを削減する必要があります。",
  "・ユーザーは常に corp.ironclad.com の UPN ID を使用して認証する必要があります。",
  "・Azure への新規デプロイは、Azure リージョン障害に備えて冗長化する必要があります。",
  "・可能な限り、Azure App Service の Standard 価格レベルを使用して Azure にデプロイする必要があります。",
  "・ディレクトリ同期サービスに関連する問題が発生した場合は、IT Support というメール配布グループへ通知する必要があります。",
  "・Azure とオンプレミス ネットワーク間のリンクに障害が発生しても、Azure でホストされる仮想マシンが Microsoft Entra に認証できるようにする必要があります。",
  "・Azure とオンプレミス ネットワーク間のリンク障害によって、Microsoft Entra と corp.ironclad.com 間のディレクトリ同期が影響を受けてはなりません。",
  "",
  "データベース要件",
  "・WebApp1 の本番インスタンスについて、データベース管理者がパフォーマンス設定を最適化できるよう、データベース メトリックを分析可能にする必要があります。",
  "・顧客アクセスへの影響を避けるため、データベース移行時のダウンタイムを最小限に抑える必要があります。",
  "・コンプライアンス要件を満たすため、データベース バックアップは最低 7 年間保持する必要があります。",
  "",
  "セキュリティ要件",
  "・ポリシー、テンプレート、データを含む会社情報は、社外のユーザーからアクセスできないようにする必要があります。",
  "・インターネット リンクに障害が発生しても、オンプレミス ネットワーク上のユーザーが corp.ironclad.com に認証できる必要があります。",
  "・管理者は、corp.ironclad.com の資格情報を使用して Azure portal に認証できる必要があります。",
  "・Azure portal へのすべての管理アクセスは、多要素認証 (MFA) を使用して保護する必要があります。",
  "・WebApp1 更新のテストは、社外のユーザーから見えないようにする必要があります。",
].join("\n");

const IRONCLAD_CASE_STUDY_MARKER = "上記のケーススタディを前提として、次の設問に答えてください。";
const IRONCLAD_CASE_STUDY_PREFIX = `${IRONCLAD_CASE_STUDY_TEXT}\n\n${IRONCLAD_CASE_STUDY_MARKER}\n\n`;

const withIronCladCaseStudy = (text) => `${IRONCLAD_CASE_STUDY_PREFIX}${text.trim()}`;

const WEBAPP1_COMPONENT_PROMPT = [
  "WebApp1 を Azure へ移行するにあたり、計画されているアーキテクチャをサポートするために必要な Azure コンポーネントを検討しています。",
  "ケーススタディの技術要件とデータベース要件を踏まえて、次の提案が要件を満たすか判断してください。",
].join("\n");

const WEB_TIER_DESIGN_PROMPT = [
  "WebApp1 の Web 層を、北ヨーロッパと西ヨーロッパの 2 つの Azure リージョンに配置した Azure App Service インスタンスとして実行する設計を検討しています。",
  "Web アプリケーションへのトラフィックは Azure Traffic Manager で分散し、ユーザーを利用可能なリージョン エンドポイントへ誘導します。",
].join("\n");

const ID_REQUIREMENTS_PROMPT = [
  "IronClad の Azure 移行に向けて、ケーススタディで定義されている認証と ID の要件を確認しています。",
  "運用の複雑さと不要な ID の拡散を抑えながら、ユーザー、アプリケーション、サービスをサポートする必要があります。",
].join("\n");

const PROMPT_OVERRIDES = {
  "en5-q-046": withIronCladCaseStudy([
    "WebApp1 を Azure へ移行するにあたり、データ ストレージ戦略を設計する必要があります。",
    "推奨事項は、パフォーマンス最適化、移行時のダウンタイム最小化、7 年以上のバックアップ保持、既存ライセンス活用によるコスト削減という要件に沿う必要があります。",
    "",
    "WebApp1 のデータ ストレージについて、推奨事項には何を含める必要がありますか。",
  ].join("\n")),
  "en5-q-047": withIronCladCaseStudy([
    "WebApp1 の Azure 移行にあたり、データベース バックアップの保持要件を満たすソリューションを設計する必要があります。",
    "コンプライアンス要件により、データベース バックアップは最低 7 年間保持する必要があります。",
    "",
    "データベース バックアップの保持要件を満たすために、何を推奨する必要がありますか。",
  ].join("\n")),
  "en5-q-048": withIronCladCaseStudy([
    "IronClad は、Microsoft 365 と Azure でホストされるサービスをサポートするために、ハイブリッド ID モデルを準備しています。",
    "次の制約を満たす ID 管理戦略が必要です。",
    "・内部ユーザーは、corp.ironclad.com の ID を使用して認証し続ける。",
    "・Azure とオンプレミス ネットワーク間のリンクに障害が発生しても、Azure でホストされる仮想マシンの認証を維持する。",
    "・R&D 運用は分離したままオンプレミス リソースのみを使用する。",
    "",
    "計画されている変更に基づいて、ID 管理戦略には何を含める必要がありますか。",
  ].join("\n")),
  "en5-q-049": withIronCladCaseStudy([
    WEBAPP1_COMPONENT_PROMPT,
    "",
    "正誤:",
    "「WebApp1 のデータベース メトリック監視をサポートするには、Azure Storage アカウントを明示的にプロビジョニングする必要がある。」",
  ].join("\n")),
  "en5-q-050": withIronCladCaseStudy([
    WEBAPP1_COMPONENT_PROMPT,
    "",
    "正誤:",
    "「SQL Server データベースの移行には、Azure Storage アカウントをプロビジョニングする必要がある。」",
  ].join("\n")),
  "en5-q-051": withIronCladCaseStudy([
    WEBAPP1_COMPONENT_PROMPT,
    "",
    "正誤:",
    "「Web サイト コンテンツの保存用に Azure Storage アカウントをプロビジョニングする必要がある。」",
  ].join("\n")),
  "en5-q-052": withIronCladCaseStudy([
    WEB_TIER_DESIGN_PROMPT,
    "",
    "正誤:",
    "「この Web 層設計は、IronClad の冗長性とリージョン復元性の要件を満たしている。」",
  ].join("\n")),
  "en5-q-053": withIronCladCaseStudy([
    WEB_TIER_DESIGN_PROMPT,
    "",
    "正誤:",
    "「この設計は自動スケーリングをサポートしている。」",
  ].join("\n")),
  "en5-q-054": withIronCladCaseStudy([
    WEB_TIER_DESIGN_PROMPT,
    "",
    "正誤:",
    "「この設計では、Azure リージョンに障害が発生した場合に手動構成が必要である。」",
  ].join("\n")),
  "en5-q-055": withIronCladCaseStudy([
    ID_REQUIREMENTS_PROMPT,
    "IronClad の認証モデルと計画されている Azure アーキテクチャに基づいて、認証要件を満たすために実装する Microsoft Entra テナントの最小数を決定します。",
    "",
    "必要な Microsoft Entra テナントの最小数はいくつですか。",
  ].join("\n")),
  "en5-q-056": withIronCladCaseStudy([
    ID_REQUIREMENTS_PROMPT,
    "Azure portal へのすべての管理アクセスは MFA で保護する必要があります。",
    "",
    "認証要件を満たすために必要な条件付きアクセス ポリシーの最小数はいくつですか。",
  ].join("\n")),
  "en5-q-057": withIronCladCaseStudy([
    "IronClad の Azure 移行にあたり、ディレクトリ同期サービスに関連する問題を IT Support 配布グループへ通知する方法を設計する必要があります。",
    "",
    "IT Support への通知要件を満たすために、推奨事項には何を含める必要がありますか。",
  ].join("\n")),
};

const CHOICE_TEXT_OVERRIDES = {
  "en5-q-040-c1": "Log Analytics エージェント",
  "en5-q-040-c2": "Azure Monitor エージェント",
  "en5-q-040-c3": "Azure Connected Machine エージェント",
  "en5-q-046-c4": "SQL Server を実行する Azure 仮想マシン",
  "en5-q-048-c4": "corp.ironclad.com フォレストのドメイン コントローラーを Azure 仮想ネットワークにデプロイします。",
  "en5-q-049-c1": "正しい",
  "en5-q-049-c2": "誤り",
  "en5-q-050-c1": "正しい",
  "en5-q-050-c2": "誤り",
  "en5-q-051-c1": "正しい",
  "en5-q-051-c2": "誤り",
  "en5-q-052-c1": "正しい",
  "en5-q-052-c2": "誤り",
  "en5-q-053-c1": "正しい",
  "en5-q-053-c2": "誤り",
  "en5-q-054-c1": "正しい",
  "en5-q-054-c2": "誤り",
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
    supplementPromptTransform: stripIronCladCaseStudyForSupplement,
  });
}

function stripIronCladCaseStudyForSupplement(promptText) {
  if (!promptText.startsWith(IRONCLAD_CASE_STUDY_TEXT)) {
    return promptText;
  }

  const markerIndex = promptText.indexOf(IRONCLAD_CASE_STUDY_MARKER);
  if (markerIndex === -1) {
    return promptText;
  }

  return promptText.slice(markerIndex + IRONCLAD_CASE_STUDY_MARKER.length).trimStart();
}

module.exports = {
  applyEnglishSet5Rewrites,
};
