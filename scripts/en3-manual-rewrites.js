const EN3_REASON_OVERRIDES = {
  "en3-q-001": "Microsoft Entra ID 監査ログのような継続的なイベント ストリームを受け取る入口には、高スループットの取り込みに向いた Azure Event Hubs が適しています。",
  "en3-q-002": "Event Hubs で受け取った監査イベントを処理し、必要な形式に変換して Cosmos DB へ保存する処理には Azure Functions が適しています。",
  "en3-q-003": "データは毎日アクセスされるため、アクセス料金と待ち時間を抑えるには Hot アクセス層の汎用 v2 ストレージ アカウントが適しています。",
  "en3-q-004": "書き込み後の変更や削除を防ぎ、一定期間保持するには、Blob コンテナーの不変性ポリシーを構成するコンテナー アクセス ポリシーが適しています。",
  "en3-q-005": "Azure Data Factory からオンプレミスの Server1 に接続してデータをコピーするには、オンプレミス側にセルフホステッド統合ランタイムを配置する必要があります。",
  "en3-q-006": "Data Factory でデータ移動を実行する単位はパイプラインです。データ ファクトリ作成後はコピー アクティビティを含むパイプラインを作成します。",
  "en3-q-007": "販売アプリケーションはフェールオーバーが主要件なので、レプリケーションとフェールオーバーを提供する Azure Site Recovery だけで要件を満たせます。",
  "en3-q-008": "財務アプリケーションは 10 分 RTO のフェールオーバーと 7 年のデータ保持が必要なため、Azure Site Recovery と Azure Backup の両方が必要です。",
  "en3-q-009": "レポート アプリケーションは日単位のポイントインタイム復旧と 8 時間 RTO が要件なので、Azure Backup だけで足ります。",
  "en3-q-010": "AKS 上の API を単一のプライベート IP で公開し、mTLS とレート制限を扱うには、VNet 接続を使える API Management Premium が適しています。",
  "en3-q-011": "Azure Load Balancer は L4 の負荷分散であり、グローバルな Web アプリ配信、レート制限、リージョン障害時の L7 フェールオーバー要件を満たしません。",
  "en3-q-012": "Azure Traffic Manager は DNS ベースのルーティングであり、リクエスト単位のレート制限を提供しないため、この要件を満たしません。",
  "en3-q-013": "Azure Front Door はグローバル L7 入口として、複数リージョンへの分散、リージョン障害時のフェールオーバー、WAF ルールによるレート制限に対応できます。",
  "en3-q-014": "Azure Application Gateway はリージョン内の L7 ロード バランサーであり、複数リージョン全体への分散とグローバル フェールオーバー要件を単独では満たしません。",
  "en3-q-015": "開発用の短時間タスクは中断許容度が高いため、ユーザー サブスクリプション プールで低優先度 VM を使うとコストを抑えられます。",
  "en3-q-016": "本番の長時間 MPI ワークロードは中断されると困るため、専用 VM を使う Batch サービス プールが適しています。",
  "en3-q-017": "既存 Logic Apps を変更せず外部開発者に公開し、OAuth 2.0 とレート制限を適用する入口には Azure API Management が適しています。",
  "en3-q-018": "管理グループは Microsoft Entra テナントごとの階層に属するため、2 つのテナントにまたがる環境では少なくとも 2 つ必要です。",
  "en3-q-019": "Azure Blueprint 定義はテナントをまたいで共有できないため、East と West の各テナントに 1 つずつ、合計 2 つ必要です。",
  "en3-q-020": "Blueprint の割り当てはサブスクリプションごとに行うため、4 つのサブスクリプションへ展開するには 4 つの割り当てが必要です。",
  "en3-q-021": "別テナントのユーザーにシングルテナント アプリへのアクセスを管理して提供するには、Microsoft Entra ID Governance の資格管理が適しています。",
  "en3-q-022": "月 1 日だけ利用する大きな Azure SQL Database には、自動一時停止と自動再開を使える vCore ベース General Purpose のサーバーレス構成が適しています。",
  "en3-q-023": "Blob Storage で階層フォルダーと ACL を使うには、階層型名前空間を有効にした汎用 v2 ストレージ アカウント、つまり ADLS Gen2 構成が必要です。",
  "en3-q-024": "トランザクション量が多く低遅延が必要な Azure Files には、SSD ベースで高 IOPS の Premium ファイル共有が適しています。",
  "en3-q-025": "Premium Azure Files で選べる中で最も高い可用性を得るには、複数の可用性ゾーンへ同期レプリケートする ZRS が適しています。",
  "en3-q-026": "Azure Key Vault はリージョン障害時にペア リージョンへフェールオーバーされる設計です。",
  "en3-q-027": "Key Vault のフェールオーバー中は整合性保護のため読み取り系操作が中心となり、削除などの書き込み操作は利用できません。",
  "en3-q-028": "Azure File Sync と Azure ファイル共有を使うと、オンプレミス ファイル サーバーのデータを Azure に同期し、他拠点から低遅延で継続利用できます。",
  "en3-q-029": "複数のアクセス層と低コストを両立する Blob Storage には、標準の汎用 v2 ストレージ アカウントが適しています。",
  "en3-q-030": "単一データセンター障害に耐えつつコストを抑えるには、同一リージョン内の複数ゾーンへ同期複製する ZRS が適しています。",
  "en3-q-031": "VM Insights は依存関係や接続の可視化には使えますが、特定パケットが許可か拒否かを NSG ルールで判定する機能ではありません。",
  "en3-q-032": "Traffic Analytics は NSG フロー ログの分析サービスであり、特定通信の許可または拒否を即時判定する目的には IP flow verify が適しています。",
  "en3-q-033": "Network Watcher 経由の Traffic Analytics でも集計分析が中心であり、個別パケットの許可または拒否判定には IP flow verify が必要です。",
  "en3-q-034": "Azure Advisor はベスト プラクティス推奨のサービスであり、ネットワーク トラフィックの許可または拒否判定には使いません。",
  "en3-q-035": "Azure Firewall Policy の親子継承では親ポリシーを子ポリシーと同じリージョンに作る必要があるため、既存の 3 リージョン分が必要です。",
  "en3-q-036": "Cosmos DB の運用データを業務処理へ影響させず Synapse で分析するには、ETL なしで分析ストアを使える Azure Synapse Link が適しています。",
  "en3-q-037": "リソース ロックは削除や変更を防ぐための機能であり、許可リージョンや関連リソースの配置を強制する機能ではありません。",
  "en3-q-038": "Azure Policy のオンデマンド評価スキャンは、Azure CLI や PowerShell、REST API から開始できます。選択肢では Azure CLI が該当します。",
  "en3-q-039": "非準拠リソースをクエリして Azure Monitor アラートを作るには、診断データを Log Analytics ワークスペースへ送る必要があります。",
  "en3-q-040": "提示された診断設定では、SQL Insights データの Blob Storage 側の保持期間が 90 日に設定されています。",
  "en3-q-041": "Log Analytics の対話型保持は最大 730 日まで設定できるため、選択肢では 730 日が最大です。",
  "en3-q-042": "VPN なしでオンプレミス AD DS 認証アプリを公開し、Entra ID と MFA を使うには Microsoft Entra Application Proxy コネクタが必要です。",
  "en3-q-043": "Traffic Manager はグローバルに 1 つで足り、Application Gateway は App1 が配置される各リージョンに 1 つずつ必要です。",
  "en3-q-044": "ゲスト ユーザーのアクセスを定期的に確認し、不要になったアクセスを削除する要件は Microsoft Entra ID Governance の領域です。",
  "en3-q-045": "毎月のアクセス確認と不要アクセスの削除には、Identity Governance のアクセス レビュー機能が適しています。",
  "en3-q-046": "資格情報をサービス インスタンスごとに分離し共有させないには、その App Service インスタンスに紐づくシステム割り当てマネージド ID が適しています。",
  "en3-q-047": "Key Vault のシークレット取得を許可するには、対象 ID に Key Vault のデータプレーン権限を与えるアクセス ポリシーが該当します。",
  "en3-q-048": "App1 は複数リージョンに配置されるため、コストを抑えながら各リージョンでインスタンスをホストするにはリージョンごとに App Service プランを用意します。",
  "en3-q-049": "ステージング版を検証してからダウンタイムなしで本番へ切り替えるには、App Service のデプロイ スロットが適しています。",
  "en3-q-050": "定期実行される PowerShell メンテナンス処理は、タイマー トリガーを持つ Azure Functions で低コストに実装できます。",
  "en3-q-051": "各リージョンやゾーンに近い場所へ書き込み、他インスタンスからも参照可能にするには、マルチリージョン書き込みを使う Azure Cosmos DB が適しています。",
  "en3-q-052": "App Service アプリのトランザクション時間をコード変更なしで監視するには、Application Insights が適しています。",
};

const CHOICE_TEXT_OVERRIDES = {
  "en3-q-001-c3": "Azure Functions",
  "en3-q-001-c5": "Azure Notification Hubs",
  "en3-q-002-c3": "Azure Functions",
  "en3-q-002-c5": "Azure Notification Hubs",
  "en3-q-010-c1": "VNet 接続を備えた Azure API Management Premium レベル",
  "en3-q-010-c3": "サービス エンドポイントを備えた Azure API Management Standard レベル",
  "en3-q-017-c2": "Azure API Management",
  "en3-q-021-c2": "Microsoft Entra ID Governance の資格管理を使用して外部ユーザーを管理します。",
  "en3-q-034-c2": "いいえ",
  "en3-q-047-c1": "アクセス ポリシー",
  "en3-q-048-c2": "可用性ゾーンごとに 1 つの App Service 環境 (ASE)",
  "en3-q-050-c2": "Azure Functions アプリ",
  "en3-q-051-c1": "geo ゾーン冗長ストレージ (GZRS) を使用する Azure Storage アカウント",
  "en3-q-051-c2": "マルチリージョン書き込みを使用する Azure Cosmos DB",
};

const TOPIC_SUPPLEMENTS = [
  [/Blueprint|管理グループ|サブスクリプション/, "Azure Blueprint は定義、保存スコープ、割り当て先を分けて考えます。テナント境界を越えて 1 つの定義を共有することはできません。"],
  [/Event Hubs|監査ログ/, "ログ取り込み、イベント処理、保存先を分けて考えます。Event Hubs は取り込み、Functions は処理、Cosmos DB は保存先です。"],
  [/不変|保持|読み取り専用|アクセス層/, "Blob の不変ストレージでは、アクセス頻度に応じた層選択と、変更や削除を防ぐ保持ポリシーを分けて判断します。"],
  [/Data Factory|統合ランタイム|パイプライン/, "Data Factory では、接続実行環境を統合ランタイム、処理のまとまりをパイプラインとして構成します。"],
  [/BCDR|RTO|フェールオーバー|Backup|Site Recovery/, "Azure Site Recovery はフェールオーバー、Azure Backup は復元ポイントと長期保持が主な役割です。"],
  [/Front Door|Traffic Manager|Application Gateway|Load Balancer|レート制限/, "グローバル L7 要件は Front Door、DNS ベース分散は Traffic Manager、リージョン内 L7 は Application Gateway、L4 は Load Balancer と分けます。"],
  [/Batch|MPI|低優先度|専用仮想マシン/, "Batch のノード選択では、コスト最小化と中断許容度を分けて考えます。低優先度 VM は安価ですが退避される可能性があります。"],
  [/資格管理|アクセス レビュー|Identity Governance|ゲスト/, "Identity Governance は、外部ユーザーのアクセス要求、定期レビュー、不要アクセスの削除を管理する領域です。"],
  [/階層型名前空間|ACL|Data Lake|Blob/, "ADLS Gen2 は Blob Storage に階層型名前空間を有効化した構成で、ディレクトリ構造と ACL を使えます。"],
  [/Azure Files|ファイル共有|Premium|ZRS/, "Azure Files では、性能要件はストレージ層、可用性要件は冗長性で判断します。"],
  [/Key Vault|フェールオーバー|削除|暗号化|復号化/, "Key Vault の災害復旧では、リージョン障害時の読み取り可否と書き込み操作の制限を区別します。"],
  [/Network Watcher|Traffic Analytics|IP flow|NSG/, "個別通信の許可または拒否判定には Network Watcher の IP flow verify を使います。Traffic Analytics は集計分析向けです。"],
  [/Azure Policy|コンプライアンス|Log Analytics|診断設定/, "Azure Policy の評価結果を監視やアラートに使う場合は、評価実行とログ保存先を分けて設計します。"],
  [/Application Proxy|VPN|MFA|AD DS/, "Microsoft Entra Application Proxy はオンプレミス Web アプリを外部公開し、Entra ID と条件付きアクセスを組み合わせられます。"],
  [/App Service|デプロイ スロット|Functions|Application Insights/, "App Service 周辺では、ホスト、デプロイ、メンテナンス実行、監視の役割を別々に選びます。"],
  [/Cosmos DB|マルチリージョン書き込み|可用性ゾーン/, "Cosmos DB はグローバル分散とマルチリージョン書き込みにより、複数リージョンのアプリから低遅延に読み書きできます。"],
];

const CASE_STUDY_PREFIX =
  "ApexCore Ltd. のケーススタディを前提として、次の設問に答えてください。\n\n";

const CASE_STUDY_PROMPT_OVERRIDES = {
  "en3-q-043": [
    CASE_STUDY_PREFIX.trim(),
    "",
    "App1 は複数の Azure リージョンにデプロイされ、リージョン間のトラフィック分散と Web Application Firewall の要件を満たす必要があります。",
    "Azure Traffic Manager と Azure Application Gateway を組み合わせて、App1 の接続要件を満たす構成を検討しています。",
    "",
    "各サービスに必要な最小インスタンス数を選択してください。",
    "・Azure Traffic Manager",
    "・Azure Application Gateway",
  ].join("\n"),
  "en3-q-044": [
    CASE_STUDY_PREFIX.trim(),
    "",
    "ApexCore ユーザーと BlueRock ユーザーのアクセスを、ケーススタディで示された ID 制約に従って管理する必要があります。",
    "外部ユーザーのアクセス ライフサイクルを管理し、不要になったアクセスを削除できるようにするには、どの Azure サービスを実装する必要がありますか。",
  ].join("\n"),
  "en3-q-045": [
    CASE_STUDY_PREFIX.trim(),
    "",
    "ApexCore ユーザーと BlueRock ユーザーのアクセスを、ケーススタディで示された ID 制約に従って管理する必要があります。",
    "既存のアクセスを定期的に確認し、不要なアクセスを削除するには、どの機能を実装する必要がありますか。",
  ].join("\n"),
  "en3-q-046": [
    CASE_STUDY_PREFIX.trim(),
    "",
    "Azure App Service でホストされる App1 は、Key Vault に保存されたサードパーティの資格情報とアクセス文字列を取得する必要があります。",
    "",
    "セキュリティ要件:",
    "・シークレットはアプリケーションに直接保存しません。",
    "・認証情報は特定のサービス インスタンスに関連付けます。",
    "・認証情報はサービス インスタンス間で共有しません。",
    "",
    "App1 が安全に認証するために、何を使用する必要がありますか。",
  ].join("\n"),
  "en3-q-047": [
    CASE_STUDY_PREFIX.trim(),
    "",
    "Azure App Service でホストされる App1 は、Key Vault に保存されたサードパーティの資格情報とアクセス文字列を取得する必要があります。",
    "App1 にシークレット取得を許可するため、Key Vault 側で適切な権限を構成する必要があります。",
    "",
    "App1 を承認するには何を使用する必要がありますか。",
  ].join("\n"),
  "en3-q-048": [
    CASE_STUDY_PREFIX.trim(),
    "",
    "App1 は Linux ランタイムで実行される Python ベースの Azure App Service アプリです。複数の Azure リージョンにデプロイし、ケーススタディで定義された機能、接続、セキュリティ、可用性、リージョン トラフィック ルーティングの要件を満たす必要があります。",
    "全体のコストも最小限に抑える必要があります。",
    "",
    "App1 にはどの App Service アーキテクチャを推奨しますか。",
  ].join("\n"),
  "en3-q-049": [
    CASE_STUDY_PREFIX.trim(),
    "",
    "App1 と App2 のアプリケーション開発要件を満たすソリューションを設計します。",
    "",
    "要件:",
    "・本番利用前に、各アプリケーションのステージング バージョンをデプロイします。",
    "・ステージング バージョンを検証およびテストします。",
    "・アプリケーションを停止せず、ステージングから本番へ切り替えます。",
    "",
    "推奨事項には何を含める必要がありますか。",
  ].join("\n"),
  "en3-q-050": [
    CASE_STUDY_PREFIX.trim(),
    "",
    "App1 では、スケジュールに基づいて実行される定期メンテナンス タスクが必要です。このタスクでは、一元化された場所からすべての App1 インスタンスに対してファイル コピー操作を実行します。",
    "App1 の機能要件を満たしながら、全体のコストを最小限に抑える必要があります。",
    "",
    "App1 のメンテナンス タスクをサポートするには、推奨事項に何を含める必要がありますか。",
  ].join("\n"),
  "en3-q-051": [
    CASE_STUDY_PREFIX.trim(),
    "",
    "App1 は各 Azure リージョンの複数の可用性ゾーンにデプロイされます。データについて、ローカリティとインスタンス間の可視性に関する要件があります。",
    "",
    "データ要件:",
    "・データは、App1 インスタンスと同じ可用性ゾーン内でローカルに書き込まれる必要があります。",
    "・任意の App1 インスタンスが書き込んだデータは、他のすべての App1 インスタンスから参照できる必要があります。",
    "",
    "これらの要件を満たすために、App1 のインスタンスをホストする各可用性ゾーンへ何をデプロイする必要がありますか。",
  ].join("\n"),
  "en3-q-052": [
    CASE_STUDY_PREFIX.trim(),
    "",
    "App2 は Azure App Service で実行されるアプリケーションです。アプリケーション コードを変更せずに、App2 のトランザクション時間を分析できる監視ソリューションが必要です。",
    "",
    "監視要件を満たすため、推奨事項には何を含める必要がありますか。",
  ].join("\n"),
};

function applyEnglishSet3Rewrites(questions) {
  return questions.map((question) => {
    if (!question.questionId?.startsWith("en3-q-")) {
      return question;
    }

    const choices = question.choices.map((choice) => {
      const text = cleanChoiceText(CHOICE_TEXT_OVERRIDES[choice.choiceId] ?? choice.text);
      return {
        ...choice,
        text,
        html: escapeHtml(text),
      };
    });

    const promptText = cleanPromptText(buildPromptOverride(question) ?? question.promptText);
    const promptHtml = appendOriginalPromptImages(textToHtml(promptText), question.promptHtml);
    const explanationHtml = buildExplanationHtml(question, choices, promptText);

    return {
      ...question,
      promptHtml,
      promptText,
      choices,
      explanationHtml,
      explanationText: htmlToText(explanationHtml),
      images: Array.from(
        new Set([
          ...question.images,
          ...extractImageSources(promptHtml),
          ...extractImageSources(explanationHtml),
        ]),
      ),
    };
  });
}

function buildPromptOverride(question) {
  const id = question.questionId;
  const suffix = {
    "en3-q-001": "Azure サービス 1 にはどのサービスを選択しますか。",
    "en3-q-002": "Azure サービス 2 にはどのサービスを選択しますか。",
  }[id];
  if (suffix) {
    return [
      "ユーザー作成とロール割り当てを検出し、取得した情報を Azure Cosmos DB に保存するアーキテクチャを設計します。",
      "",
      "想定する処理の流れは次のとおりです。",
      "・Microsoft Entra ID の監査ログがイベントを生成します。",
      "・イベントは Azure サービス 1 に送信されます。",
      "・Azure サービス 1 の出力は Azure サービス 2 に渡されます。",
      "・Azure サービス 2 が処理済みデータを Azure Cosmos DB に保存します。",
      "",
      suffix,
    ].join("\n");
  }

  if (["en3-q-003", "en3-q-004"].includes(id)) {
    const target = id === "en3-q-003" ? "ストレージ アカウントの種類" : "変更と削除を防ぐ構成";
    return [
      "機密データ用の Azure Storage ソリューションを設計します。データは毎日アクセスされ、総データ量は 10 GB 未満です。",
      "",
      "要件:",
      "・ストレージに書き込まれたデータは、最低 5 年間保持する必要があります。",
      "・書き込み後のデータは読み取り専用にし、保持期間中の変更または削除を許可してはいけません。",
      "・5 年の保持期間が経過した後、データは削除できる必要があります。ただし、変更は許可してはいけません。",
      "・データ アクセス コストを最小限に抑える必要があります。",
      "",
      `${target}として何を推奨しますか。`,
    ].join("\n");
  }

  if (["en3-q-005", "en3-q-006"].includes(id)) {
    return [
      "オンプレミス環境には、500 GB のデータを含む Server1 というファイル サーバーがあります。",
      "Azure Data Factory を使用して、Server1 から Azure Storage にデータをコピーする必要があります。",
      "新しいデータ ファクトリは作成済みです。",
      "",
      id === "en3-q-005"
        ? "Server1 側では、次に何をする必要がありますか。"
        : "データ ファクトリ側では、次に何をする必要がありますか。",
    ].join("\n");
  }

  if (["en3-q-007", "en3-q-008", "en3-q-009"].includes(id)) {
    const target = {
      "en3-q-007": "販売アプリケーション",
      "en3-q-008": "財務アプリケーション",
      "en3-q-009": "レポート アプリケーション",
    }[id];
    return [
      "オンプレミス データ センターで、販売、財務、レポートの各アプリケーションをホストする仮想マシンがあります。",
      "",
      "BCDR 要件:",
      "・販売アプリケーションは、セカンダリ環境へのフェールオーバーをサポートする必要があります。",
      "・レポート アプリケーションは、日単位のポイントインタイム復旧をサポートする必要があり、RTO は 8 時間です。",
      "・財務アプリケーションは、データを 7 年間保持する必要があります。災害時には Azure から実行できる必要があり、RTO は 10 分です。",
      "",
      "要件を満たしながらコストを最小化する Azure サービスを推奨する必要があります。",
      `${target}にはどの Azure サービスを推奨しますか。`,
    ].join("\n");
  }

  if (["en3-q-011", "en3-q-012", "en3-q-013", "en3-q-014"].includes(id)) {
    const proposal = {
      "en3-q-011": "Azure Load Balancer を使用してアプリへのアクセスを提供します。",
      "en3-q-012": "Azure Traffic Manager を使用してアプリへのアクセスを提供します。",
      "en3-q-013": "Azure Front Door を使用してアプリへのアクセスを提供します。",
      "en3-q-014": "Azure Application Gateway を使用してアプリへのアクセスを提供します。",
    }[id];
    return [
      "注: この問題は、同じシナリオを使う関連問題の一部です。各問題では、提案された解決策が要件を満たすかどうかを判定します。",
      "",
      "複数の Azure リージョンに Azure Web アプリの複数インスタンスをデプロイする予定です。",
      "",
      "アクセス ソリューションの要件:",
      "・レート制限をサポートする必要があります。",
      "・リクエストをデプロイ済みの全インスタンスに分散する必要があります。",
      "・リージョン障害が発生しても、ユーザーがアプリケーションへアクセスできる必要があります。",
      "",
      `提案された解決策: ${proposal}`,
      "この解決策は要件を満たしますか。",
    ].join("\n");
  }

  if (["en3-q-015", "en3-q-016"].includes(id)) {
    return [
      "Linux コンピューティング ノードで 2 種類のジョブを実行する、コスト最適化された Azure Batch ソリューションを設計します。",
      "",
      "ジョブの種類:",
      "・最初のジョブ: 開発環境で使う短時間実行タスク",
      "・2 番目のジョブ: 本番環境で使う長時間実行の MPI ワークロード。タイムリーな完了が必要です。",
      "",
      "要件:",
      "・コンピューティング コストを最小限に抑えます。",
      "・該当する場合は Azure ハイブリッド特典を使用します。",
      "",
      id === "en3-q-015"
        ? "最初のジョブには、どの Azure Batch プール タイプとノード タイプを推奨しますか。"
        : "2 番目のジョブには、どの Azure Batch プール タイプとノード タイプを推奨しますか。",
    ].join("\n");
  }

  if (["en3-q-018", "en3-q-019", "en3-q-020"].includes(id)) {
    const target = {
      "en3-q-018": "管理グループ",
      "en3-q-019": "Blueprint 定義",
      "en3-q-020": "Blueprint 割り当て",
    }[id];
    return [
      "組織は次の 2 つの部門で構成されています。",
      "",
      "東部門:",
      "・Azure サブスクリプション: Sub1、Sub2",
      "・Microsoft Entra テナント: East.apexcore.com",
      "",
      "西部門:",
      "・Azure サブスクリプション: Sub3、Sub4",
      "・Microsoft Entra テナント: West.apexcore.com",
      "",
      "各 Azure サブスクリプションにカスタム アプリケーションをデプロイします。デプロイには、リソース グループ、Azure Web アプリ、カスタム ロール割り当て、Azure Cosmos DB アカウントが含まれます。",
      "Azure Blueprints を使用して、すべてのサブスクリプションへ一貫してアプリケーションをデプロイする必要があります。",
      "",
      `アプリケーションをデプロイするために必要な${target}の最小数はいくつですか。`,
    ].join("\n");
  }

  if (id === "en3-q-021") {
    return [
      "組織は次のように構成されています。",
      "",
      "東部門:",
      "・Azure サブスクリプション: Sub1",
      "・Microsoft Entra テナント: apexcore.com",
      "",
      "西部門:",
      "・Azure サブスクリプション: Sub2",
      "・Microsoft Entra テナント: ironclad.com",
      "",
      "Sub1 には App1 という Azure App Service Web アプリがあります。App1 はシングルテナント認証に Microsoft Entra ID を使用しており、現在は apexcore.com テナントのユーザーだけがサインインできます。",
      "",
      "ironclad.com テナントのユーザーも App1 に認証できるようにするソリューションを推奨する必要があります。",
      "何を推奨しますか。",
    ].join("\n");
  }

  if (id === "en3-q-022") {
    return [
      "組織には、複数のオンプレミス Microsoft SQL Server データベースを使用する App1 というアプリケーションがあります。",
      "",
      "データベース サイズ:",
      "・DB1: 450 GB",
      "・DB2: 250 GB",
      "・DB3: 300 GB",
      "・DB4: 50 GB",
      "",
      "App1 と関連データは、毎月 1 日だけアクセスされます。データ量の増加は年間 3% 以内と予想されています。",
      "App1 は Azure ベースの Web アプリケーションとして再設計され、すべての既存データを Azure SQL Database へ移行する予定です。データベースは、毎月 1 日だけ利用できればよいものとします。",
      "",
      "どの Azure SQL Database サービス レベルを選択する必要がありますか。",
    ].join("\n");
  }

  if (id === "en3-q-023") {
    return [
      "次の要件を満たす Azure Storage ソリューションを推奨する必要があります。",
      "",
      "要件:",
      "・最大 1 PB のデータをサポートします。",
      "・データは Blob Storage に保存します。",
      "・3 階層のサブフォルダー構造をサポートします。",
      "・アクセス制御リスト (ACL) をサポートします。",
      "",
      "推奨事項には何を含める必要がありますか。",
    ].join("\n");
  }

  if (["en3-q-024", "en3-q-025"].includes(id)) {
    const target = id === "en3-q-024" ? "ストレージ層" : "冗長性";
    return [
      "ファイル共有をホストする Azure Storage アカウントを作成する予定です。",
      "これらのファイル共有は、オンプレミス環境で実行されるトランザクション集中型アプリケーションからアクセスされます。",
      "",
      "要件:",
      "・ファイル共有アクセス時の待ち時間を最小限に抑えます。",
      "・選択したストレージで利用可能な最高レベルの回復性を提供します。",
      "",
      `${target}として何を推奨しますか。`,
    ].join("\n");
  }

  if (["en3-q-026", "en3-q-027"].includes(id)) {
    return [
      "App1 という Azure Web アプリと、KV1 という Azure Key Vault があります。",
      "App1 はデータベース接続文字列を KV1 に保存し、KV1 に対して取得、リスト、ラップ、ラップ解除、バックアップ、削除、暗号化、復号化を実行します。",
      "",
      "KV1 をホストする Azure リージョンが利用できなくなった場合のサービス継続性を評価しています。",
      id === "en3-q-026"
        ? "KV1 はどこにフェールオーバーしますか。"
        : "フェールオーバー中、どのリクエスト タイプが利用できなくなりますか。",
    ].join("\n");
  }

  if (["en3-q-029", "en3-q-030"].includes(id)) {
    const target = id === "en3-q-029" ? "ストレージ アカウントの種類" : "冗長性";
    return [
      "2 TB のデータ ファイルを含むオンプレミス ファイル サーバーがあります。",
      "これらのデータ ファイルを西ヨーロッパ リージョンの Azure Blob Storage に移行する予定です。",
      "",
      "要件:",
      "・単一の Azure データセンターに障害が発生しても、データを利用できる必要があります。",
      "・複数のストレージ層をサポートする必要があります。",
      "・コストを最小限に抑える必要があります。",
      "",
      `${target}として何を推奨しますか。`,
    ].join("\n");
  }

  if (["en3-q-031", "en3-q-032", "en3-q-033", "en3-q-034"].includes(id)) {
    const proposal = {
      "en3-q-031": "すべての VM に Azure Monitor Agent と依存関係エージェントをインストールし、Azure Monitor の VM Insights でネットワーク トラフィックを分析します。",
      "en3-q-032": "Log Analytics の Traffic Analytics ソリューションを使用してネットワーク トラフィックを分析します。",
      "en3-q-033": "Azure Network Watcher で Traffic Analytics を使用します。",
      "en3-q-034": "Azure Advisor を使用してネットワークを分析します。",
    }[id];
    return [
      "注: この問題は、同じシナリオを使う関連問題の一部です。各問題では、提案された解決策が要件を満たすかどうかを判定します。",
      "",
      "組織では、オンプレミスと Azure の両方で複数の仮想マシンを実行しています。Azure ExpressRoute により、オンプレミス環境と Azure の間が接続されています。",
      "いくつかの VM でネットワーク接続の問題が発生しています。VM へのパケットが許可されているか拒否されているかを判断するため、ネットワーク トラフィックを検査する必要があります。",
      "",
      `提案された解決策: ${proposal}`,
      "この解決策は目標を達成しますか。",
    ].join("\n");
  }

  if (id === "en3-q-035") {
    return [
      "図に示す Azure Firewall と Azure Firewall Policy がデプロイされています。",
      "",
      "すべての Azure Firewall デプロイに適用される必須ルールを定義する、新しい Azure Firewall Policy をデプロイする必要があります。",
      "新しいポリシーは、既存の Azure Firewall Policy の親ポリシーとして構成します。",
      "",
      "作成する必要がある追加の Azure Firewall Policy の最小数はいくつですか。",
    ].join("\n");
  }

  if (id === "en3-q-036") {
    return [
      "次の Azure リソースがあります。",
      "・AS1: Azure Synapse Analytics ワークスペース",
      "・CDB1: Azure Cosmos DB for NoSQL アカウント",
      "",
      "CDB1 には、継続的に更新される運用データを保持するコンテナーがあります。",
      "AS1 を使用して、この運用データを毎日分析するソリューションを設計しています。",
      "",
      "CDB1 の運用データ ストアのパフォーマンスに影響を与えずに分析を実行するには、推奨事項に何を含めるべきですか。",
    ].join("\n");
  }

  if (id === "en3-q-037") {
    return [
      "注: この問題は、同じシナリオを使う関連問題の一部です。各問題では、提案された解決策が要件を満たすかどうかを判定します。",
      "",
      "複数の Azure App Service インスタンスと、それらに対応する Azure SQL Database を同時にプロビジョニングする予定です。",
      "",
      "規制要件:",
      "・App Service インスタンスは、特定の Azure リージョンにのみデプロイできます。",
      "・App Service インスタンスに関連付けられたすべてのリソースは、同じ Azure リージョンに配置する必要があります。",
      "",
      "提案された解決策: 場所に基づいてリソース グループを作成し、リソース グループにリソース ロックを実装します。",
      "この解決策は要件を満たしますか。",
    ].join("\n");
  }

  if (id === "en3-q-038") {
    return [
      "複数のストレージ アカウントを含む Azure サブスクリプションがあります。これらのストレージ アカウントには Azure Policy 定義が割り当てられています。",
      "",
      "要件:",
      "・オンデマンドで Azure Policy のコンプライアンス スキャンを開始できる必要があります。",
      "・Log Analytics に保存されたデータをクエリして、非準拠リソースに対する Azure Monitor アラートを生成する必要があります。",
      "",
      "Azure Policy のコンプライアンス スキャンを開始するには、何を使用する必要がありますか。",
    ].join("\n");
  }

  if (id === "en3-q-039") {
    return [
      "複数のストレージ アカウントを含む Azure サブスクリプションがあります。これらのストレージ アカウントには Azure Policy 定義が割り当てられています。",
      "",
      "要件:",
      "・オンデマンドで Azure Policy のコンプライアンス スキャンを開始できる必要があります。",
      "・Log Analytics に保存されたデータをクエリして、非準拠リソースに対する Azure Monitor アラートを生成する必要があります。",
      "",
      "非準拠アラートを生成するために、診断設定の送信先として何を構成する必要がありますか。",
    ].join("\n");
  }

  if (id === "en3-q-040") {
    return [
      "複数の Azure SQL Database インスタンスをデプロイしています。図に示す構成で、データベースの診断設定を構成する予定です。",
      "",
      "図の診断設定に基づいて、次の文を正しく完成させる選択肢を選んでください。",
      "「SQL Insights データが Blob Storage に保存される期間は ____________ です。」",
    ].join("\n");
  }

  if (id === "en3-q-041") {
    return [
      "複数の Azure SQL Database インスタンスをデプロイしています。図に示す構成で、データベースの診断設定を構成する予定です。",
      "",
      "図の診断設定に基づいて、次の文を正しく完成させる選択肢を選んでください。",
      "「SQL Insights データが Azure Log Analytics に保存される最大期間は ____________ です。」",
    ].join("\n");
  }

  if (id === "en3-q-042") {
    return [
      "オンプレミス環境には Active Directory Domain Services (AD DS) ドメインがあります。ドメイン内の Server1 は App1 というアプリケーションをホストしており、App1 は AD DS 認証に依存しています。",
      "現在、リモート ユーザーは VPN でオンプレミス ネットワークへ接続して App1 にアクセスしています。",
      "",
      "また、Microsoft Entra Connect により、オンプレミス AD DS ドメインと同期される Microsoft Entra テナントがあります。",
      "",
      "VPN 接続を必要とせずに、リモート ユーザーが App1 にアクセスできるソリューションを設計する必要があります。",
      "",
      "要件:",
      "・ユーザーは Azure Multi-Factor Authentication (MFA) を使用して認証する必要があります。",
      "・管理および運用の労力を最小限に抑える必要があります。",
      "",
      "ソリューションのオンプレミス側には、何を含める必要がありますか。",
    ].join("\n");
  }

  if (CASE_STUDY_PROMPT_OVERRIDES[id]) {
    return CASE_STUDY_PROMPT_OVERRIDES[id];
  }

  if (/^en3-q-04[3-9]$/.test(id) || ["en3-q-050", "en3-q-051", "en3-q-052"].includes(id)) {
    return cleanCaseStudyPrompt(question.promptText);
  }

  return null;
}

function buildExplanationHtml(question, choices, promptText) {
  const correctIds = new Set(question.correctChoiceIds);
  const correctChoices = choices.filter((choice) => correctIds.has(choice.choiceId));
  const correctLabel = correctChoices.map((choice) => choice.text).join("、");
  const reason = EN3_REASON_OVERRIDES[question.questionId] || deriveReason(question, correctChoices);
  const supplement = deriveSupplement(`${promptText}\n${choices.map((choice) => choice.text).join("\n")}`);

  const choiceItems = choices
    .map((choice) => {
      const isCorrect = correctIds.has(choice.choiceId);
      const itemReason = isCorrect ? reason : buildIncorrectReason(question, choice);
      return `<li><strong>${escapeHtml(choice.text)}:</strong> ${isCorrect ? "正解" : "不正解"}。${escapeHtml(itemReason)}</li>`;
    })
    .join("");

  return [
    `<p><strong>結論:</strong> 正解は ${escapeHtml(correctLabel)} です。</p>`,
    `<p><strong>理由:</strong> ${escapeHtml(reason)}</p>`,
    `<p><strong>補足:</strong> ${escapeHtml(supplement)}</p>`,
    `<p><strong>選択肢の整理:</strong></p>`,
    `<ul>${choiceItems}</ul>`,
    extractImageTags(question.explanationHtml).join("\n"),
    buildReferencesHtml(question.explanationHtml),
  ]
    .filter(Boolean)
    .join("\n");
}

function deriveReason(question, correctChoices) {
  const text = stripReferences(cleanText(question.explanationText));
  const firstSentence = splitSentences(text).find((sentence) => !/誤り|不正確|不正解/.test(sentence));
  if (firstSentence) {
    return normalizeCorrectSentence(firstSentence, correctChoices);
  }
  return `${correctChoices.map((choice) => choice.text).join("、")} が、設問の要件に最も直接対応します。`;
}

function normalizeCorrectSentence(sentence, correctChoices) {
  const correctLabel = correctChoices.map((choice) => choice.text).join("、");
  return cleanText(sentence)
    .replace(/^正解は\s*/, "")
    .replace(/^(.+?)\s*は正解です。?/, `${correctLabel} が正解です。`)
    .replace(/^(.+?)\s*は正しいため.*?。/, `${correctLabel} が正解です。`)
    .replace(/^はいは/, "はい が")
    .replace(/^いいえは/, "いいえ が")
    .trim();
}

function deriveSupplement(text) {
  const found = TOPIC_SUPPLEMENTS.find(([pattern]) => pattern.test(text));
  return found
    ? found[1]
    : "設問では、サービス名だけでなく、スコープ、データの流れ、運用負荷、可用性、コスト要件を組み合わせて判断します。";
}

function buildIncorrectReason(question, choice) {
  if (["en3-q-018", "en3-q-019", "en3-q-020", "en3-q-035", "en3-q-040", "en3-q-041", "en3-q-043"].includes(question.questionId)) {
    return "必要な数または期間が、設問のスコープや保持要件と一致しません。";
  }

  const hint = SERVICE_HINTS.find(([pattern]) => pattern.test(choice.text));
  if (hint) {
    return hint[1];
  }

  const original = findOriginalChoiceReason(question.explanationText, choice.text);
  if (original) {
    return original;
  }

  if (/^はい$|^いいえ$/.test(choice.text)) {
    return "提案された解決策が要件を満たすかどうかの判定が、正解とは逆になります。";
  }

  return "設問の主要要件に直接対応する選択肢ではありません。正解の選択肢が、求められている機能またはスコープにより直接対応します。";
}

const SERVICE_HINTS = [
  [/Event Grid/, "個別イベントのルーティング向けであり、監査ログの継続的な高スループット取り込みには Event Hubs の方が適しています。"],
  [/Event Hubs/, "イベント取り込みには適していますが、処理や変換を行って Cosmos DB へ保存する実行基盤ではありません。"],
  [/Azure Functions|Azure 関数/, "イベント処理には適していますが、監査ログを受け取る最初の取り込みサービスとしては Event Hubs が適しています。"],
  [/Notification Hubs|通知/, "モバイル通知配信のサービスであり、ログ取り込みやデータ処理の用途ではありません。"],
  [/Archive|アーカイブ/, "Archive 層は低頻度アクセス向けで、毎日アクセスするデータには取得待ち時間とアクセス コストが合いません。"],
  [/Cool|クール/, "Cool 層は低頻度アクセス向けで、毎日アクセスするデータでは Hot 層よりアクセス コストが不利になります。"],
  [/リソース ロック/, "リソースの削除や変更を防ぐ管理機能であり、Blob 単位の不変保持やリージョン制約を実現する機能ではありません。"],
  [/Azure File Sync/, "ファイル同期のサービスであり、Data Factory からオンプレミス データへ接続する実行基盤ではありません。"],
  [/Import\/Export|インポート\/エクスポート/, "物理ディスク搬送による大量データ移行のサービスであり、Data Factory パイプラインの作成ではありません。"],
  [/SSIS/, "SSIS パッケージを Azure で実行するためのランタイムであり、単純なファイル コピーの中心機能ではありません。"],
  [/Azure Backup/, "復元ポイントと長期保持には適していますが、アプリケーションを短い RTO でフェールオーバーする機能ではありません。"],
  [/Azure Site Recovery/, "フェールオーバーには適していますが、7 年保持などの長期バックアップ保持は Azure Backup の役割です。"],
  [/Load Balancer/, "L4 の負荷分散であり、グローバル L7、WAF、レート制限の要件には向きません。"],
  [/Traffic Manager/, "DNS ベースのルーティングであり、リクエスト単位のレート制限や L7 制御は提供しません。"],
  [/Application Gateway/, "リージョン内の L7 負荷分散向けであり、複数リージョン全体の入口には Front Door や Traffic Manager と組み合わせて考えます。"],
  [/Front Door/, "グローバル L7 入口としては有効ですが、設問がプライベート IP の AKS 公開を求める場合は API Management Premium の方が合います。"],
  [/専用仮想マシン/, "専用 VM は中断されにくい一方、短時間の開発ジョブでは低優先度 VM よりコストが高くなります。"],
  [/低優先度|優先順位の低い/, "低優先度 VM は安価ですが退避される可能性があり、本番の長時間 MPI ワークロードには不向きです。"],
  [/Application Proxy/, "オンプレミス アプリ公開向けであり、Azure 上の Logic Apps を外部開発者向け API として管理する入口ではありません。"],
  [/Front Door/, "グローバル配信と WAF は提供しますが、OAuth 2.0 ID プロバイダー連携や利用者別 API ポリシー管理は API Management の領域です。"],
  [/B2B/, "Microsoft Entra ゲストを使う方式であり、設問の「ゲストを使用しない」制約に合いません。"],
  [/パススルー認証/, "オンプレミス AD DS と Entra ID のサインイン連携向けであり、別テナント利用者のアプリ アクセス管理ではありません。"],
  [/条件付きアクセス/, "既存アクセスに条件を課す機能であり、外部ユーザーのアクセス権付与やライフサイクル管理の中心ではありません。"],
  [/Premium ブロック|ページ BLOB|Premium Storage/, "高性能用途向けであり、階層型名前空間や複数アクセス層、ACL 要件とは一致しません。"],
  [/ファイル共有/, "Azure Files の用途であり、Blob Storage と階層型名前空間、ACL を求める設問とは異なります。"],
  [/GRS|RA-GRS/, "リージョン間冗長は単一データセンター障害対策としては過剰で、コスト最小化要件では ZRS が適しています。"],
  [/LRS/, "単一データセンター内の冗長化であり、そのデータセンター障害には耐えられません。"],
  [/Traffic Analytics/, "集計されたフロー分析向けであり、個別通信が許可か拒否かの判定には IP flow verify が適しています。"],
  [/Advisor|IDvisor/, "推奨事項を提示するサービスであり、ネットワーク通信の許可または拒否を判定する診断ツールではありません。"],
  [/変更フィード/, "変更検出には使えますが、追加処理やデータ移動が必要で、Synapse Link のような直接分析ではありません。"],
  [/Data Factory/, "データ移動やパイプラインには使えますが、Cosmos DB の運用ストアへ影響を抑えた HTAP 分析には Synapse Link が適しています。"],
  [/アクセス パッケージ/, "アクセス要求のパッケージ化には使いますが、毎月の既存アクセス確認そのものはアクセス レビューが中心です。"],
  [/Identity Protection/, "リスク検出の機能であり、ゲスト アクセスの定期レビューや削除の主機能ではありません。"],
  [/PIM/, "特権ロールの Just-In-Time 管理向けであり、通常のゲスト アクセスレビューとは目的が異なります。"],
  [/証明書/, "認証には使えますが、証明書管理やローテーションが必要になり、インスタンスごとの資格情報分離にはマネージド ID が適しています。"],
  [/ユーザー割り当て/, "複数リソースで共有できる ID であり、サービス インスタンス間で資格情報を共有しない要件には合いません。"],
  [/プライベート リンク/, "ネットワーク経路をプライベート化する機能であり、Key Vault のシークレット取得権限を付与する機能ではありません。"],
  [/ロールの割り当て/, "Key Vault が Azure RBAC 承認モデルの場合は使えますが、設問の選択肢ではデータプレーン権限としてアクセス ポリシーが該当します。"],
  [/App Service 環境|ASE/, "分離環境が必要な場合に使いますが、通常の App Service プランより高コストです。"],
  [/CI\/CD/, "デプロイ自動化には役立ちますが、ステージングと本番のスワップ機能そのものではありません。"],
  [/App Configuration/, "アプリ設定や機能フラグ管理のサービスであり、ステージング スロットの置き換えではありません。"],
  [/Container Registry/, "コンテナー イメージの保管先であり、App Service のステージング検証やスワップ機能ではありません。"],
  [/Logic Apps|ロジック アプリ/, "ワークフロー統合には適していますが、PowerShell の定期実行を低コストに行う用途では Azure Functions が自然です。"],
  [/仮想マシン/, "常時稼働の管理と課金が発生し、定期タスクを低コストに実行する要件には過剰です。"],
  [/Container Insights/, "コンテナー基盤の監視向けであり、App Service アプリのトランザクション時間分析には Application Insights が適しています。"],
  [/Sentinel/, "SIEM/SOAR のセキュリティ監視向けであり、アプリケーション性能監視の中心ではありません。"],
  [/VM の分析情報/, "VM 監視向けであり、App Service で実行されるアプリのトランザクション監視には向きません。"],
];

function findOriginalChoiceReason(explanationText, choiceText) {
  const token = choiceText.replace(/[。、]$/g, "").slice(0, 18);
  if (!token) {
    return "";
  }

  const sentences = splitSentences(stripReferences(cleanText(explanationText)));
  const index = sentences.findIndex((sentence) => sentence.includes(token));
  if (index === -1) {
    return "";
  }

  return sentences
    .slice(index, index + 2)
    .join("")
    .replace(/^正解は[^。]+です。\s*/, "")
    .replace(/^[^。]+?(?:は|が)?(?:誤り|不正確|不正解)[^。]*。\s*/, "")
    .trim();
}

function splitSentences(text) {
  return text
    .replace(/\n/g, " ")
    .split(/(?<=。)/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function stripReferences(text) {
  return text.replace(/参考[:：]?[\s\S]*$/i, "").replace(/参照[:：]?[\s\S]*$/i, "").trim();
}

function cleanCaseStudyPrompt(text) {
  return CASE_STUDY_PREFIX + cleanText(text)
    .replace(/以下のリンクにある ApexCore Ltd\. の事例を参照し、次の質問に答えてください。このリンクを新しいタブで開き、このテスト タブをブラウザで開いたままにしてください。\s*/g, "")
    .replace(/https:\/\/docs\.google\.com\/document\/d\/1qD29F6-8DOjIFF8AybRayDZgL7h_lVGKDsL73lyqkQc\/edit[。.]usp=sharing\s*/g, "")
    .replace(/^ApexCore Ltd\. の(?:ケーススタディ|事例)に基づいて、/g, "")
    .trim();
}

function cleanPromptText(text) {
  return cleanText(text)
    .replace(/Azure サービスにはどの Azure サービスを選択する必要がありますか1。/g, "Azure サービス 1 にはどの Azure サービスを選択しますか。")
    .replace(/Azure サービスにはどの Azure サービスを選択する必要がありますか2。/g, "Azure サービス 2 にはどの Azure サービスを選択しますか。")
    .replace(/Azure仮想/g, "Azure 仮想")
    .replace(/Azureの/g, "Azure の")
    .replace(/Azure Storageに/g, "Azure Storage に")
    .replace(/Azure Blob Storageに/g, "Azure Blob Storage に")
    .replace(/Azure SQL データベース/g, "Azure SQL Database")
    .replace(/Azure SQL データベース インスタンス/g, "Azure SQL Database インスタンス")
    .replace(/Azure Monitor ログ ルーティングアプローチ/g, "Azure Monitor ログ ルーティング")
    .replace(/サポートレート制限/g, "レート制限をサポート")
    .replace(/地域的な停止/g, "リージョン障害")
    .replace(/app\./g, "アプリへのアクセスを提供します。")
    .replace(/必須Azure/g, "Azure")
    .replace(/Log Analyticsワークスペース/g, "Log Analytics ワークスペース")
    .replace(/Microsoft Entra IDvisor/g, "Azure Advisor")
    .replace(/Azure 機能アプリ/g, "Azure Functions アプリ")
    .replace(/Azure アプリケーションInsights/g, "Azure Application Insights")
    .replace(/Azure Application Insights/g, "Azure Application Insights")
    .replace(/ユーザーのカレンダー\s*ユーザーのカレンダー/g, "ユーザーのカレンダー")
    .replace(/(\S)Azure/g, "$1 Azure")
    .replace(/Azure\s+Azure/g, "Azure")
    .replace(/([、。]) Azure/g, "$1Azure")
    .replace(/・ Azure/g, "・Azure")
    .replace(/\s+([。、])/g, "$1")
    .trim();
}

function cleanChoiceText(text) {
  return cleanText(text)
    .replace(/Azure 関数/g, "Azure Functions")
    .replace(/Azure 通知Hubs/g, "Azure Notification Hubs")
    .replace(/Azure API 管理/g, "Azure API Management")
    .replace(/Microsoft Entra ID Identity保護/g, "Microsoft Entra ID Protection")
    .replace(/Azure 機能アプリ/g, "Azure Functions アプリ")
    .replace(/Microsoft Entra Identity を構成します。保護。/g, "Microsoft Entra ID Protection を構成します。")
    .replace(/可用性ごとに/g, "可用性ゾーンごとに")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanText(text) {
  return String(text ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/([A-Za-z0-9])。([A-Za-z0-9])/g, "$1.$2")
    .replace(/edit\.usp=sharing/g, "edit?usp=sharing")
    .replace(/\[\[KEEP_\d+\s*/g, "")
    .replace(/\s+\)/g, ")")
    .replace(/\(\s+/g, "(")
    .replace(/ >・/g, "・")
    .replace(/ \./g, ".")
    .replace(/[ \t\f\v]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function textToHtml(text) {
  const blocks = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length) {
      blocks.push(`<ul>${currentList.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`);
      currentList = [];
    }
  };

  for (const line of text.split(/\n+/).map((entry) => entry.trim())) {
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith("・")) {
      currentList.push(line.slice(1).trim());
    } else {
      flushList();
      blocks.push(`<p>${escapeHtml(line)}</p>`);
    }
  }
  flushList();
  return blocks.join("\n");
}

function appendOriginalPromptImages(promptHtml, originalPromptHtml) {
  const imageTags = extractImageTags(originalPromptHtml).join("\n");
  return [promptHtml, imageTags].filter(Boolean).join("\n");
}

function extractImageTags(html) {
  return Array.from(String(html ?? "").matchAll(/<img\b[^>]*>/gi), (match) => {
    const tag = match[0];
    return /loading=/.test(tag) ? tag : tag.replace(/>$/, ' loading="eager">');
  });
}

function extractImageSources(html) {
  return Array.from(String(html ?? "").matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi), (match) => match[1]);
}

function buildReferencesHtml(originalExplanationHtml) {
  const links = Array.from(
    String(originalExplanationHtml ?? "").matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi),
    (match) => {
      const href = match[1];
      const label = htmlToText(match[2]) || href;
      return `<li><a href="${escapeHtml(href)}">${escapeHtml(label)}</a></li>`;
    },
  );
  return links.length ? `<p><strong>参考:</strong></p>\n<ul>${links.join("")}</ul>` : "";
}

function htmlToText(html) {
  return String(html ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "・")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

module.exports = {
  applyEnglishSet3Rewrites,
};
