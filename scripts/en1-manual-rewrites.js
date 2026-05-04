const EN1_NOTES = {
  "en1-q-001": {
    reason:
      "Sub1 のリソースを Azure Backup で保護するには、バックアップ データと復旧ポイントを格納するコンテナーが Sub1 側に必要です。",
    supplement:
      "Recovery Services コンテナーは Azure VM、SQL Server in Azure VM、ファイル共有などのバックアップ管理単位です。Resource Guard は重要操作の追加承認に使う補助リソースであり、バックアップの保存先ではありません。",
  },
  "en1-q-002": {
    reason:
      "Sub2 では User1 に重要操作を承認させる必要があります。この要件は、別テナントまたは別サブスクリプションに配置した Resource Guard で重要なバックアップ操作を保護する設計に該当します。",
    supplement:
      "Resource Guard は、バックアップの削除や保護停止などの重要操作に対して追加の承認を要求します。Recovery Services コンテナーそのものは Sub1 のバックアップ保存先です。",
  },
  "en1-q-003": {
    reason:
      "APIM から AKS 上の API へ、既定以外の HTTP ポートや mTLS を含めて公開するには、AKS 側で Ingress Controller を使う構成が最も自然です。",
    supplement:
      "Ingress Controller は HTTP/HTTPS のルーティング、TLS 終端、パスやホスト名による転送制御を Kubernetes 側で扱えます。外部ロード バランサーだけでは L7 の API ルーティングや mTLS 要件を満たしにくくなります。",
  },
  "en1-q-004": {
    reason:
      "App1 は HTTPS で利用される対話型 Java Web アプリで、コンテナー化には大きな変更が必要です。Azure App Service ならコードベースの Web アプリを PaaS としてホストし、自動スケールも構成できます。",
    supplement:
      "AKS はコンテナー前提、VM Scale Sets は OS やミドルウェア管理が増えます。管理負荷を最小化するという条件では App Service が適しています。",
  },
  "en1-q-005": {
    reason:
      "IroncladVM1 から Data Lake に研究データを取り込み、ApexCore で使う形式へ変換する必要があります。取り込みと変換を一連の処理として実行するには Azure Synapse パイプラインが適しています。",
    supplement:
      "Synapse パイプラインは Azure Data Factory と同系統のデータ統合機能で、コピー、変換、スケジュール実行をワークスペース内で管理できます。",
  },
  "en1-q-006": {
    reason:
      "IronClad に ApexCore 側データのスナップショットを安全に共有する要件なので、データ移動や ETL ではなくデータ共有の仕組みが必要です。",
    supplement:
      "Azure Data Share は組織間でデータセットを共有するためのサービスです。Synapse パイプラインは処理の自動化、Data Box Gateway はデータ転送が主目的です。",
  },
  "en1-q-007": {
    reason:
      "NVA1 と NVA2 のようなネットワーク仮想アプライアンスへ透過的にトラフィックを分散するには Gateway Load Balancer が適しています。",
    supplement:
      "Gateway Load Balancer は L3/L4 のインライン NVA シナリオ向けです。Front Door、Application Gateway、Traffic Manager は Web 配信や DNS ベース分散など目的が異なります。",
  },
  "en1-q-008": {
    reason:
      "ワークロード需要に応じた自動スケールと秒単位課金は、単一 Azure SQL Database のサーバーレス コンピューティングで満たせます。",
    supplement:
      "Elastic Pool は複数データベースでリソースを共有する構成、Managed Instance は SQL Server 互換性を重視した移行向けです。",
  },
  "en1-q-009": {
    reason:
      "Azure SQL Database のサーバーレス コンピューティングは General Purpose サービス レベルで利用します。",
    supplement:
      "この設問は製品ではなくサービス レベルを問うています。自動一時停止や秒単位課金を含むサーバーレスの要件は General Purpose の選択につながります。",
  },
  "en1-q-010": {
    reason:
      "コスト削減策としてコミットメント レベルを使う場合、変更対象は Log Analytics テーブルではなくワークスペースです。",
    supplement:
      "App1 や個別テーブルを変更しても、既存アラートを保ったまま大量取り込みの単価を下げる直接的な解決にはなりません。",
    incorrect: {
      "en1-q-010-c1": "App Service アプリ本体を変更しても、Log Analytics の取り込み単価やコミットメント レベルは変わりません。",
      "en1-q-010-c2": "App1Logs はログを格納するテーブルです。Analytics ログとしてアラートを維持する要件では、コスト最適化の主な変更点はワークスペースの価格レベルです。",
    },
  },
  "en1-q-011": {
    reason:
      "1 日約 120 GB の取り込みが継続するため、Log Analytics ワークスペースをコミットメント レベルに変更することで単価を下げられます。",
    supplement:
      "Basic ログへ変更するとクエリやアラートの利用条件が変わり、既存アラートへの影響が大きくなります。日次上限は取り込みを止める可能性があり、全ログを取り込む要件に反します。",
  },
  "en1-q-012": {
    reason:
      "複数サブスクリプションに分散するリソースをプロジェクト単位で集計するには、リソース タグでプロジェクトを識別し、予算でコストを監視します。",
    supplement:
      "管理グループはガバナンス階層の整理には有効ですが、プロジェクト横断のコスト分類にはタグの方が柔軟です。RBAC や Azure Boards はコスト集計の主機能ではありません。",
  },
  "en1-q-013": {
    reason:
      "合成トランザクション監視とアプリケーション コンポーネント間の追跡には Application Insights が適しています。",
    supplement:
      "Container Insights はコンテナー基盤のメトリックやログが中心です。Application Insights は分散トレース、依存関係、可用性テストなどアプリ視点の監視を提供します。",
  },
  "en1-q-014": {
    reason:
      "単一チームで集中運用する前提なら、監視データを 1 つのワークスペースに集約するのが最小構成です。",
    supplement:
      "複数ワークスペースはデータ分離、課金分離、リージョン要件がある場合に検討します。この設問では分離要件がないため、最小数は 1 です。",
    incorrect: {
      "en1-q-014-c2": "追加の分離要件がないため、2 つに分ける必要はありません。",
      "en1-q-014-c3": "単一チームで運用する集中監視の要件に対して、3 つのワークスペースは過剰です。",
      "en1-q-014-c4": "各サービスごとにワークスペースを分ける必要はありません。",
    },
  },
  "en1-q-015": {
    reason:
      "Writer ロール要求を App1 が発行されるトークンに含めるには、リソース アプリである App1 側でアプリ ロールを定義します。",
    supplement:
      "アプリ ロールは API またはアプリが公開するロールです。API のアクセス許可はクライアント側で要求する権限の構成、トークン構成は任意要求の追加が主目的です。",
  },
  "en1-q-016": {
    reason:
      "App2 が App1 の Writer ロールを取得するには、クライアント アプリである App2 側で App1 への API 権限を要求し、ロールを割り当てます。",
    supplement:
      "App1 側でロールを定義した後、App2 側ではその API 権限を追加します。App2 にアプリ ロールを作っても、App1 へのアクセス トークンの roles 要求にはつながりません。",
  },
  "en1-q-017": {
    reason:
      "サードパーティ API キーは暗号鍵や証明書ではなく、アプリが取り出して使う機密文字列です。Key Vault ではシークレットとして保存します。",
    supplement:
      "Key Vault のキーは暗号化や署名などの暗号操作用、証明書は証明書ライフサイクル管理用です。",
  },
  "en1-q-018": {
    reason:
      "VM 上のアプリから Key Vault へ資格情報なしでアクセスするには、マネージド ID を使うのが最小管理です。",
    supplement:
      "マネージド ID は Azure リソースに自動管理される ID を付与します。サービス プリンシパルや API トークンは資格情報の作成、保存、ローテーション管理が増えます。",
  },
  "en1-q-019": {
    reason:
      "約 50 個の SQL Server データベースを Azure SQL Managed Instance へオフライン移行するには、Azure Database Migration Service が適しています。",
    supplement:
      "DMS はオンライン/オフライン移行を支援するマネージド サービスです。DMA は評価、SSMA は異種 DB 移行、Azure Migrate は広い移行ハブであり、この設問の実行ツールとしては DMS が直接的です。",
  },
  "en1-q-020": {
    reason:
      "User1 は MarketingAU 内で新規ユーザーを作成する必要があります。管理単位をスコープにしたユーザー管理者ロールなら、必要な範囲だけでユーザー作成権限を付与できます。",
    supplement:
      "テナント レベルにすると権限範囲が広すぎます。ヘルプデスク管理者は主にパスワード リセットなどの支援操作向けで、ユーザー作成には不足します。",
  },
  "en1-q-021": {
    reason:
      "User2 の要件は既存ユーザーのパスワード リセットです。MarketingAU をスコープにしたヘルプデスク管理者ロールが最小権限です。",
    supplement:
      "ユーザー管理者でも実現できますが、ユーザー作成など余分な権限を含みます。テナント レベルの割り当ては MarketingAU 外にも影響するため過剰です。",
  },
  "en1-q-022": {
    reason:
      "SQL Server 2008 の単一データベースを Azure SQL Managed Instance へ最小停止で移行するには、Azure Data Studio の Azure SQL Migration 拡張が適しています。",
    supplement:
      "Azure Data Studio は DMS と連携した移行ウィザードを提供します。SSMS は管理ツール、WANdisco はファイル/データ レイク移行寄り、Azure Migrate は移行全体のハブです。",
  },
  "en1-q-023": {
    reason:
      "Azure Monitor Private Link Scope は、監視リソースへのプライベート接続をまとめる論理スコープです。接続可能なネットワーク群であれば 1 つの AMPLS で足ります。",
    supplement:
      "ここで問われているのは AMPLS の数です。プライベート エンドポイントの数とは別に考えます。",
    incorrect: {
      "en1-q-023-c2": "複数の接続可能なネットワークを 1 つの AMPLS に関連付けられるため、2 つは最小ではありません。",
      "en1-q-023-c3": "VNet ごとに AMPLS を作る必要はなく、管理負荷が増えます。",
    },
  },
  "en1-q-024": {
    reason:
      "VNet1 と VNet2 は相互に接続されていますが、VNet3 はどちらにも接続できません。そのため接続グループごとにプライベート エンドポイントが必要で、最小数は 2 です。",
    supplement:
      "プライベート エンドポイントはネットワーク到達性の境界をまたいで共有できません。3 つ作ると要件は満たせますが管理負荷が増えます。",
    incorrect: {
      "en1-q-024-c1": "VNet3 が VNet1/VNet2 と接続できないため、1 つのプライベート エンドポイントだけでは全ネットワークをカバーできません。",
      "en1-q-024-c3": "3 つ作れば動作しますが、VNet1 と VNet2 は接続されているため 1 つを共有でき、最小構成ではありません。",
    },
  },
  "en1-q-025": {
    reason:
      "Cosmos DB 分析ストアのデータをほぼリアルタイムに処理し、Synapse 内で結果を書き込むには Apache Spark プールが適しています。",
    supplement:
      "Synapse Link と Spark を組み合わせると、運用ストアから大きくデータを移動せずに分析処理できます。サーバーレス SQL は参照やアドホック分析向けです。",
  },
  "en1-q-026": {
    reason:
      "Azure 側で VMware VM の移行評価と計画を始めるには、まず Azure Migrate プロジェクトを作成します。",
    supplement:
      "Azure Migrate プロジェクトは検出、評価、移行ツールをまとめる管理単位です。AVS プライベート クラウドは VMware 環境を Azure 上に構築する別アプローチです。",
  },
  "en1-q-027": {
    reason:
      "オンプレミスの vSphere 環境を検出・評価するには、Cluster1 側に Azure Migrate アプライアンスをデプロイします。",
    supplement:
      "プロジェクトは Azure 側の器、アプライアンスはオンプレミス環境から VM 情報を収集するコンポーネントです。",
  },
  "en1-q-028": {
    reason:
      "フェールオーバーには事前にセカンダリ リージョンへデータを複製する GRS が必要です。フェールオーバー後も再び地理冗長にしておくことで、将来のフェールバックや DR に備えられます。",
    supplement:
      "ZRS は同一リージョン内のゾーン冗長であり、リージョン障害時のアカウント フェールオーバー要件には不足します。",
  },
  "en1-q-029": {
    reason:
      "Workday からの自動プロビジョニングは 1 つのエンタープライズ アプリ構成で扱い、スコープ フィルターや属性マッピングで従業員と請負業者の差を表現できます。",
    supplement:
      "ユーザー種別ごとにアプリを分けると管理が増えます。要件は最小管理なので、アプリ登録数は 1 です。",
    incorrect: {
      "en1-q-029-c2": "従業員と請負業者の違いはスコープや属性マッピングで表現できるため、2 つに分ける必要はありません。",
      "en1-q-029-c3": "3 つのアプリ登録は要件に対して過剰で、管理オーバーヘッドを増やします。",
    },
  },
  "en1-q-030": {
    reason:
      "オンプレミス AD への Workday プロビジョニングでは、1 つのプロビジョニング エージェントで複数ドメインへの接続とルール処理を構成できます。",
    supplement:
      "従業員と請負業者の違いは属性マッピングやスコープ条件で扱います。エージェントを増やす必要はありません。",
    incorrect: {
      "en1-q-030-c2": "複数ドメインやユーザー種別の違いは 1 つのエージェント構成で扱えるため、2 つは最小ではありません。",
      "en1-q-030-c3": "エージェントを 3 つに分けても要件上の利点はなく、管理が複雑になります。",
    },
  },
  "en1-q-031": {
    reason:
      "50 個の App Service インスタンス構成を一貫して定義し、変更履歴を残すには Bicep による Infrastructure as Code が適しています。",
    supplement:
      "Azure Repos に Bicep ファイルを保存すれば、構成のバージョン管理、レビュー、再デプロイが可能です。ZIP やコンテナー イメージはアプリ成果物であり、インフラ構成管理ではありません。",
  },
  "en1-q-032": {
    reason:
      "AKS 上のマイクロサービスで状態管理を共通化するには Dapr が適しています。",
    supplement:
      "Dapr は状態管理、Pub/Sub、サービス呼び出しなどをサイドカー/API として提供します。Flux は GitOps、Istio はサービス メッシュです。",
  },
  "en1-q-033": {
    reason:
      "Pub/Sub メッセージングをマイクロサービスへ低負荷で組み込むには Dapr が適しています。",
    supplement:
      "Dapr は Azure Service Bus や Kafka などの実装を抽象化し、アプリ側は共通 API で発行/購読できます。",
  },
  "en1-q-034": {
    reason:
      "トラフィック ルーティングや分割、カナリア リリースのような高度な制御はサービス メッシュである Istio の領域です。",
    supplement:
      "Dapr はアプリケーションの構成要素、Flux は GitOps デプロイ管理です。トラフィック分割は Istio の VirtualService などで扱います。",
  },
  "en1-q-035": {
    reason:
      "PA1 が MG1 に割り当てられている場合、評価対象は MG1 配下の Sub2 と Sub4 です。Sub1 や Sub3 の VM までは対象になりません。",
    supplement:
      "Azure Policy は割り当てスコープとその子スコープに継承されます。管理グループの階層をたどって対象範囲を判断します。",
    incorrect: {
      "en1-q-035-c1": "PA1 は MG1 配下にだけ継承されるため、設問の評価対象すべてに適用されるという判断は誤りです。",
    },
  },
  "en1-q-036": {
    reason:
      "PA2 は Sub1 に割り当てられているため、米国東部の VM 全体ではなく Sub1 内の該当リソースだけが評価されます。",
    supplement:
      "リソース セレクターは割り当てスコープ内で評価対象を絞る条件です。スコープ外の Sub2 や Sub3 には広がりません。",
    incorrect: {
      "en1-q-036-c1": "米国東部という条件だけでは不十分です。PA2 の割り当てスコープは Sub1 なので、他サブスクリプションの VM は対象外です。",
    },
  },
  "en1-q-037": {
    reason:
      "PA3 はテナント ルート グループに割り当てられ、Sub1 は除外されています。VM3 は Sub3 にあり除外されていないため、PA3 の評価対象です。",
    supplement:
      "上位スコープのポリシーは子サブスクリプションへ継承されますが、明示的な除外があるスコープは対象外になります。",
    incorrect: {
      "en1-q-037-c2": "VM3 は PA3 の除外対象ではない Sub3 にあるため、評価対象外とは判断できません。",
    },
  },
  "en1-q-038": {
    reason:
      "階層型名前空間が有効なストレージ アカウント、つまり ADLS Gen2 へ約 1 TB のファイルを転送するには AzCopy が適しています。",
    supplement:
      "AzCopy は Blob Storage/ADLS Gen2 への大容量コピーに使うコマンドライン ツールです。Azure File Sync や Robocopy は Azure Files または Windows ファイル共有寄りです。",
  },
  "en1-q-039": {
    reason:
      "リージョンごとに収集するログ種別が異なるため、不要なログを取らないように 3 つの DCR に分ける必要があります。",
    supplement:
      "DCR は Azure Monitor Agent の収集内容と送信先を定義します。同じルールを広く当てると不要なデータまで取り込み、コスト増につながります。",
    incorrect: {
      "en1-q-039-c1": "1 つの DCR ではリージョンごとに異なるログ種別を最小データ量で分けられません。",
      "en1-q-039-c2": "2 つでは 3 つの異なる収集パターンを最小データ量で表現しきれません。",
    },
  },
  "en1-q-040": {
    reason:
      "WS1 はパブリック エンドポイントからアクセスできるため、Azure Monitor Agent が送信するための Data Collection Endpoint は必須ではありません。",
    supplement:
      "DCE は Private Link などで取り込みエンドポイントを明示的に制御する場合に使います。この設問ではパブリック到達性があるため最小数は 0 です。",
    incorrect: {
      "en1-q-040-c2": "パブリック エンドポイント経由で WS1 に送信できるため、DCE を 1 つ作る必要はありません。",
      "en1-q-040-c3": "DCE は必須ではないため、2 つは過剰です。",
      "en1-q-040-c4": "リージョン数に合わせて DCE を作る要件はありません。",
    },
  },
  "en1-q-041": {
    reason:
      "移行後のデータ変更を一定期間禁止するには、Blob の不変性ポリシーを表すアクセス ポリシーを作成します。",
    supplement:
      "RBAC は誰が操作できるか、リソース ロックはリソース構成の削除や変更を制御します。Blob データ自体の WORM 要件には不変ストレージのアクセス ポリシーが必要です。",
  },
  "en1-q-042": {
    reason:
      "ストレージ アカウントへパブリック インターネットを経由せずに接続するには、Azure Storage のプライベート エンドポイントを使います。",
    supplement:
      "サービス エンドポイントは Azure バックボーンを使いますが、サービスのパブリック エンドポイントを前提にします。Private Endpoint は VNet 内のプライベート IP で接続できます。",
  },
  "en1-q-043": {
    reason:
      "BlueRock には 2 つの Microsoft Entra テナントがあり、RBAC の割り当てはテナント境界を越えられません。各テナントの管理グループ階層で 1 つずつ割り当てが必要です。",
    supplement:
      "管理グループ レベルへ割り当てれば、各テナント配下のサブスクリプションに継承できます。したがって最小数は 2 です。",
  },
  "en1-q-044": {
    reason:
      "既存と将来の Azure SQL Database で TDE を強制し、非準拠を修復するには、deployIfNotExists のポリシー定義、ポリシー割り当て、修復タスクの順に実行します。",
    supplement:
      "deployIfNotExists は不足している構成を展開して準拠させる効果です。modify はタグや一部プロパティ変更向けで、TDE 有効化の修復には適しません。",
  },
  "en1-q-045": {
    reason:
      "オンプレミス SQL Server の DB1/DB2 を高い互換性のまま Azure に移行するには Azure SQL Managed Instance が適しています。",
    supplement:
      "単一データベースや Elastic Pool は PaaS として有効ですが、インスタンス レベル機能や移行互換性の要件が強い場合は Managed Instance が合います。",
  },
  "en1-q-046": {
    reason:
      "低遅延 I/O と高可用性を重視する業務データベースには Business Critical レベルが適しています。",
    supplement:
      "Business Critical はローカル SSD と高可用性構成によりトランザクション処理向けです。General Purpose はコスト効率重視、Hyperscale は大容量スケール重視です。",
  },
  "en1-q-047": {
    reason:
      "ユーザーを Azure MFA に登録させる仕組みとしては、Microsoft Entra ID Protection の MFA 登録ポリシーを使います。",
    supplement:
      "セキュリティの既定値はテナント全体に広く適用され、既存の条件付きアクセス設計と併用しにくい場合があります。認証方法ポリシーは利用可能な方法の制御が中心です。",
  },
  "en1-q-048": {
    reason:
      "Azure portal サインイン時に MFA を要求するには、条件付きアクセス ポリシー Capolicy1 の許可制御で MFA 要求を構成します。",
    supplement:
      "セッション制御はサインイン後のセッション動作を制御します。サインイン リスク ポリシーはリスク検出時に適用するもので、毎回 MFA の要件とは異なります。",
  },
  "en1-q-049": {
    reason:
      "App1 のデータ保存先として、Blob、ADLS Gen2、プライベート エンドポイント、不変性などを広くサポートする標準汎用 v2 ストレージ アカウントが適しています。",
    supplement:
      "プレミアム ページ BLOB はディスク系、プレミアム ファイル共有は Azure Files 向けです。Blob/ADLS Gen2 のコンプライアンス機能を使うなら汎用 v2 が基本です。",
  },
  "en1-q-050": {
    reason:
      "きめ細かいアクセス制御や Data Lake Storage Gen2 機能を使うには、ストレージ アカウントで階層型名前空間を有効にします。",
    supplement:
      "NFSv3 や大規模ファイル共有はファイル共有機能です。Blob データの ACL やデータ レイク機能の前提は階層型名前空間です。",
  },
  "en1-q-051": {
    reason:
      "2 つの可用性ゾーン障害にも耐えるには、3 つのゾーンに分散した構成が必要です。専用ホスト要件と自動スケール要件を両立するため、各ゾーンにホスト グループと VM Scale Set を配置します。",
    supplement:
      "ホスト グループだけではスケール セットの自動スケール要件を満たせません。1 つまたは 2 つの配置ではゾーン障害時の耐障害性が不足します。",
    incorrect: {
      "en1-q-051-c1": "ホスト グループが 1 つではゾーン分散が不足し、VM Scale Set もないため自動スケール要件を満たせません。",
      "en1-q-051-c2": "2 つの配置では、2 つの可用性ゾーン障害に耐える設計として不足します。",
      "en1-q-051-c4": "ホスト グループだけを増やしても、VM Scale Set による自動スケール要件を満たせません。",
      "en1-q-051-c5": "ホスト グループだけを増やしても、VM Scale Set による自動スケール要件を満たせません。",
      "en1-q-051-c6": "1 つのホスト グループと 1 つの VM Scale Set では、ゾーン障害に耐える分散構成として不足します。",
    },
  },
  "en1-q-052": {
    reason:
      "VM 上のアプリがマネージド ID のアクセス トークンを取得する実際の呼び出し先は Azure Instance Metadata Service です。",
    supplement:
      "Microsoft Entra ID はトークン発行基盤ですが、VM 内のアプリケーションは IMDS エンドポイントへ要求してトークンを取得します。",
  },
  "en1-q-053": {
    reason:
      "新規データの書き込みは許可しつつ、既存および新規データの変更を 3 年間禁止するには、Blob の不変性ポリシーをアクセス ポリシーとして構成します。",
    supplement:
      "RBAC やパブリック アクセス レベルはアクセス制御であり、保持期間中の変更禁止を保証しません。リソース ロックも Blob データの WORM 保護とは目的が異なります。",
  },
  "en1-q-054": {
    reason:
      "オンプレミス ワークロードを Azure へ移行した場合の継続コストを事前に見積もるには、Azure TCO 計算ツールを使います。",
    supplement:
      "Cost Management は既存 Azure 利用状況の分析が中心です。Advisor はデプロイ後の最適化推奨であり、移行前の総所有コスト見積もりではありません。",
  },
  "en1-q-055": {
    reason:
      "App1 が長期稼働する本番ワークロードなら、Azure 予約で一定期間の利用をコミットしてコンピューティング コストを下げるのが適しています。",
    supplement:
      "Azure ハイブリッド特典は既存 Windows Server/SQL Server ライセンスの活用が前提です。Spot VM は中断される可能性があり、本番の継続稼働要件には向きません。",
  },
};

const PROMPT_OVERRIDES = {
  "en1-q-023":
    "Azure サブスクリプションには、次のリソースがあります。\n\nリソース:\n・apexcore.com: Azure プライベート DNS ゾーン\n・VNet1: apexcore.com プライベート DNS ゾーンにリンクされている仮想ネットワーク\n・VNet2: VNet1 とピアリングされ、apexcore.com プライベート DNS ゾーンにリンクされている仮想ネットワーク\n・VNet3: apexcore.com プライベート DNS ゾーンにリンクされている仮想ネットワーク。VNet1 または VNet2 とはピアリングされていません。\n・Workspace1: VNet1、VNet2、VNet3 の仮想マシンから収集されたログを保存する Log Analytics ワークスペース\n\nVNet1、VNet2、VNet3 には、それぞれ複数の仮想マシンがあります。すべての仮想マシンは、名前解決に Azure DNS を使用しています。\n\n次の要件を満たす Azure Monitor ログ ルーティングを設計する必要があります。\n・各仮想マシンから収集され、Workspace1 に取り込まれるログ データは、Microsoft バックボーン経由でのみ送信される必要があります。\n・管理作業を最小限に抑える必要があります。\n\nAzure Monitor Private Link Scope (AMPLS) リソースの最小数として、いくつを推奨しますか。",
  "en1-q-024":
    "Azure サブスクリプションには、次のリソースがあります。\n\nリソース:\n・apexcore.com: Azure プライベート DNS ゾーン\n・VNet1: apexcore.com プライベート DNS ゾーンにリンクされている仮想ネットワーク\n・VNet2: VNet1 とピアリングされ、apexcore.com プライベート DNS ゾーンにリンクされている仮想ネットワーク\n・VNet3: apexcore.com プライベート DNS ゾーンにリンクされている仮想ネットワーク。VNet1 または VNet2 とはピアリングされていません。\n・Workspace1: VNet1、VNet2、VNet3 の仮想マシンから収集されたログを保存する Log Analytics ワークスペース\n\nVNet1、VNet2、VNet3 には、それぞれ複数の仮想マシンがあります。すべての仮想マシンは、名前解決に Azure DNS を使用しています。\n\n次の要件を満たす Azure Monitor ログ ルーティングを設計する必要があります。\n・各仮想マシンから収集され、Workspace1 に取り込まれるログ データは、Microsoft バックボーン経由でのみ送信される必要があります。\n・管理作業を最小限に抑える必要があります。\n\nプライベート エンドポイントの最小数として、いくつを推奨しますか。",
  "en1-q-007":
    "Azure サブスクリプションには、VMSS1、NVA1、NVA2 などのリソースがあります。VMSS1 への受信トラフィックを NVA1 と NVA2 に分散する負荷分散ソリューションを推奨する必要があります。管理オーバーヘッドは最小限に抑える必要があります。推奨事項には何を含めるべきですか。",
  "en1-q-009":
    "データベース プラットフォームとして Azure SQL を使用する予定です。次の要件を満たす Azure SQL のサービス レベルを推奨する必要があります。\n・コンピューティング リソースは、ワークロードの需要に基づいて自動的にスケールする必要があります。\n・課金は秒単位で計算される必要があります。\nどのサービス レベルを推奨しますか。",
};

const CHOICE_TEXT_OVERRIDES = {
  "en1-q-003-c3": "AKS1 に ExternalName サービスを構成します。",
  "en1-q-007-c1": "Gateway Load Balancer を使用します。",
  "en1-q-011-c3": "日次取り込み上限を構成します。",
  "en1-q-015-c2": "アプリ ロール",
  "en1-q-020-c3": "MarketingAU をスコープとするユーザー管理者ロールを割り当てます。",
  "en1-q-021-c3": "MarketingAU をスコープとするユーザー管理者ロールを割り当てます。",
  "en1-q-026-c2": "Azure Migrate プロジェクトを作成します。",
  "en1-q-027-c2": "Azure Migrate プロジェクトを作成します。",
  "en1-q-031-c3": "アプリケーションの ZIP デプロイ パッケージを Azure Repos に保存します。",
  "en1-q-041-c1": "Azure RBAC の割り当てを作成します。",
  "en1-q-041-c4": "Blob のアクセス ポリシーを作成します。",
  "en1-q-048-c1": "Capolicy1 の許可制御",
  "en1-q-052-c1": "Microsoft Entra ID",
  "en1-q-053-c4": "Azure RBAC の割り当てを作成します。",
  "en1-q-054-c1": "Azure Advisor",
};

const SERVICE_HINTS = [
  [/Recovery Services コンテナー/, "Azure Backup のバックアップ データや復旧ポイントを保存する管理単位です。重要操作の追加承認を行う Resource Guard とは役割が異なります。"],
  [/Resource Guard/, "バックアップの削除や保護停止などの重要操作に追加承認を求める保護機能です。バックアップ データの保存先ではありません。"],
  [/Azure Site Recovery/, "災害復旧やレプリケーションのためのサービスであり、Azure Backup の保存先や重要操作の承認には使いません。"],
  [/MABS|MARS/, "オンプレミス サーバーや特定ワークロードのバックアップに使うコンポーネントであり、この設問の Azure リソース配置要件とは一致しません。"],
  [/Azure Batch/, "バッチ処理や大規模並列処理向けで、常時アクセスされる対話型 Web アプリのホスト先としては適しません。"],
  [/Azure App Service/, "Web アプリを PaaS としてホストし、自動スケールや運用負荷軽減に向いたサービスです。"],
  [/Azure Kubernetes Service|AKS/, "コンテナー オーケストレーション向けです。コンテナー化に大きな変更が必要な場合は管理負荷が増えます。"],
  [/仮想マシン スケール セット|VM Scale Set/, "複数 VM と自動スケールは実現できますが、OS やランタイムの管理が App Service より増えます。"],
  [/Azure Data Share/, "組織間でデータを共有するためのサービスです。データの取り込みや変換処理そのものは主目的ではありません。"],
  [/Azure Synapse パイプライン/, "コピーや変換などのデータ統合処理を定義、実行する機能です。単なるデータ共有とは異なります。"],
  [/Azure Data Box Gateway/, "オンプレミスと Azure 間のデータ転送を支援するアプライアンス型サービスで、分析用 ETL や共有管理の中心ではありません。"],
  [/Azure Front Door/, "グローバル HTTP/HTTPS 配信、WAF、エッジ ルーティング向けで、NVA のインライン分散には向きません。"],
  [/Application Gateway/, "L7 の Web アプリケーション負荷分散向けです。NVA への透過的なトラフィック挿入には Gateway Load Balancer が適しています。"],
  [/Traffic Manager/, "DNS ベースの分散サービスであり、NVA へインラインでトラフィックを流す用途ではありません。"],
  [/エラスティック プール/, "複数データベースでリソースを共有する構成です。単一データベースのサーバーレス要件とは焦点が異なります。"],
  [/マネージド インスタンス/, "SQL Server 互換性を重視した移行向けです。単一データベースのサーバーレス要件とは異なります。"],
  [/Basic|ベーシック|標準|Standard/, "従来の固定的なサービス レベルであり、サーバーレスの自動スケールと秒単位課金の要件を直接満たしません。"],
  [/Business Critical|ビジネス クリティカル/, "高性能と高可用性向けですが、サーバーレスの自動スケール要件を問う設問では General Purpose が対応します。"],
  [/Hyperscale|ハイパースケール/, "大容量データベースのスケールに強いレベルですが、設問の焦点がサーバーレスや低遅延 HA の場合は要件に合うかを分けて判断します。"],
  [/Basic ログ|基本ログ/, "低コストのログ保管には有効ですが、クエリやアラート機能に制限があり、既存アラートへの影響を最小化する要件に合いません。"],
  [/日次取り込み上限/, "コストを抑える手段ですが、上限到達後にログ取り込みが止まるため、すべてのログを取り込む要件に反します。"],
  [/RBAC|ロールベース/, "アクセス権の制御には使いますが、コスト分類、データ不変性、またはサービス固有の処理要件を直接満たすものではありません。"],
  [/管理グループ/, "サブスクリプション階層のガバナンスに使います。プロジェクト別のコスト分類やタグ集計とは役割が異なります。"],
  [/Application Insights|アプリケーション インサイト/, "アプリケーションの分散トレース、依存関係、可用性テストに向いた監視機能です。"],
  [/Container Insights|コンテナー インサイト/, "コンテナー基盤の正常性やリソース使用状況を監視します。アプリの合成トランザクション監視とは目的が異なります。"],
  [/Network Insights|ネットワーク インサイト/, "ネットワーク接続性やトラフィックの可視化が中心です。アプリケーション内部のトランザクション追跡には向きません。"],
  [/API 権限/, "クライアント アプリがリソース API にアクセスするための権限を要求する場所です。ロール定義そのものとは異なります。"],
  [/アプリ ロール/, "リソース アプリが公開するロールを定義する場所です。クライアントがそのロールを要求するには API 権限側の設定も必要です。"],
  [/トークン構成/, "任意要求やグループ要求などを調整する機能で、アプリ ロールの定義や割り当ての代替ではありません。"],
  [/証明書/, "証明書ベース認証や TLS 証明書の管理に使います。API キーのような任意の機密文字列の保存先としてはシークレットが適切です。"],
  [/キー$/, "暗号化や署名などの暗号操作用の鍵を管理します。API キーを単純に保存して取り出す用途とは異なります。"],
  [/シークレット/, "パスワード、接続文字列、API キーなどの機密文字列を保存するための Key Vault オブジェクトです。"],
  [/サービス ?プリンシパル|API トークン/, "利用は可能でも資格情報の作成、保管、ローテーションが必要になり、マネージド ID より管理負荷が高くなります。"],
  [/Azure Migrate アプライアンス/, "オンプレミス VM の検出と評価データ収集に使うコンポーネントです。Azure 側のプロジェクト作成とは役割が異なります。"],
  [/Azure Migrate プロジェクト/, "Azure Migrate の評価や移行ツールをまとめる Azure 側の管理単位です。オンプレミス検出には別途アプライアンスが必要です。"],
  [/Azure VMware Solution/, "Azure 上に VMware 環境を構築するサービスです。Azure VM へ移行するための評価・計画の最小構成とは異なります。"],
  [/ZRS|ゾーン冗長/, "同一リージョン内のゾーン冗長です。リージョン フェールオーバーのためのセカンダリ リージョン複製には GRS が必要です。"],
  [/GRS|地理冗長/, "別リージョンへ非同期複製するため、ストレージ アカウントのフェールオーバー要件に対応します。"],
  [/Bicep/, "Azure リソース構成を宣言的に管理する IaC 言語で、バージョン管理と再現性に向いています。"],
  [/Dapr/, "マイクロサービス向けの状態管理や Pub/Sub などのアプリケーション構成要素を提供します。"],
  [/Flux/, "GitOps による Kubernetes 構成同期やデプロイ管理に使います。状態管理や Pub/Sub の実行基盤ではありません。"],
  [/Istio/, "サービス メッシュとしてトラフィック ルーティング、分割、mTLS、可観測性などを提供します。"],
  [/AzCopy/, "Blob Storage や ADLS Gen2 への大容量データ コピーに使うコマンドライン ツールです。"],
  [/Azure File Sync|Robocopy|Storage Mover/, "ファイル共有同期や移行には使えますが、階層型名前空間付きストレージへの単純な大容量コピーでは AzCopy がより直接的です。"],
  [/プライベート エンドポイント/, "VNet 内のプライベート IP を使って PaaS サービスへ接続し、パブリック インターネット経由を避けられます。"],
  [/サービス エンドポイント|Microsoft ピアリング|パブリック ピアリング/, "Azure サービスへの到達性を提供しますが、Private Endpoint のようにサービスを VNet 内のプライベート IP として公開するものではありません。"],
  [/リソース ロック/, "リソースの削除や構成変更を防ぐ機能です。Blob データの保持期間中の変更禁止を保証するものではありません。"],
  [/アクセス レベル/, "Blob コンテナーの匿名アクセス範囲を制御します。データの不変性や保持期間の強制とは別です。"],
  [/アクセス ポリシー/, "Blob の不変性や保持の制御に使われ、WORM 要件を満たすための中心的な設定です。"],
  [/Azure Advisor/, "デプロイ済みリソースの最適化推奨を提供します。移行前の TCO 見積もりツールではありません。"],
  [/Cost Management/, "既存 Azure 利用のコスト分析や管理に使います。移行前のオンプレミス比較見積もりには TCO 計算ツールが適しています。"],
  [/Azure 予約/, "長期利用をコミットすることで、安定稼働する本番ワークロードのコスト削減に有効です。"],
  [/ハイブリッド特典/, "既存 Windows Server や SQL Server ライセンスの活用が前提です。該当ライセンスがない Linux ワークロードでは効果がありません。"],
  [/スポット/, "割引は大きい一方で容量都合により中断されるため、継続稼働が必要な本番ワークロードには適しません。"],
];

function applyEnglishSet1Rewrites(questions) {
  return questions.map((question) => {
    if (!question.questionId?.startsWith("en1-q-")) {
      return question;
    }

    const note = EN1_NOTES[question.questionId];
    if (!note) {
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

    const promptText = cleanPromptText(PROMPT_OVERRIDES[question.questionId] ?? question.promptText);
    const promptHtml = appendOriginalPromptImages(
      textToHtml(promptText),
      question.promptHtml,
    );
    const explanationHtml = buildExplanationHtml(question, choices, note);

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

function buildExplanationHtml(question, choices, note) {
  const correctIds = new Set(question.correctChoiceIds);
  const correctChoices = choices.filter((choice) => correctIds.has(choice.choiceId));
  const correctLabel = correctChoices.map((choice) => choice.text).join("、");

  const choiceItems = choices
    .map((choice) => {
      const isCorrect = correctIds.has(choice.choiceId);
      const prefix = isCorrect ? "正解" : "不正解";
      const reason = isCorrect
        ? note.reason
        : buildIncorrectReason(question, choice, note);
      return `<li><strong>${escapeHtml(choice.text)}:</strong> ${prefix}。${escapeHtml(reason)}</li>`;
    })
    .join("");

  const mediaHtml = extractImageTags(question.explanationHtml).join("\n");
  const referencesHtml = buildReferencesHtml(question.explanationHtml);

  return [
    `<p><strong>結論:</strong> 正解は ${escapeHtml(correctLabel)} です。</p>`,
    `<p><strong>理由:</strong> ${escapeHtml(note.reason)}</p>`,
    `<p><strong>補足:</strong> ${escapeHtml(note.supplement)}</p>`,
    `<p><strong>選択肢の整理:</strong></p>`,
    `<ul>${choiceItems}</ul>`,
    mediaHtml,
    referencesHtml,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildIncorrectReason(question, choice, note) {
  if (note.incorrect?.[choice.choiceId]) {
    return note.incorrect[choice.choiceId];
  }

  const serviceHint = SERVICE_HINTS.find(([pattern]) => pattern.test(choice.text));
  if (serviceHint) {
    return serviceHint[1];
  }

  const original = findOriginalChoiceReason(question.explanationText, choice.text);
  if (original) {
    return original;
  }

  return "設問の主要要件に直接対応する選択肢ではありません。正解のサービスが、求められている機能または管理範囲により直接対応します。";
}

function findOriginalChoiceReason(explanationText, choiceText) {
  const paragraphs = cleanText(explanationText)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  const choiceToken = choiceText.replace(/[。.]$/g, "").slice(0, 16);
  const found = paragraphs.find((paragraph) => paragraph.includes(choiceToken));
  if (!found) {
    return "";
  }

  return found
    .replace(/^正解は[^。]+です。?\s*/, "")
    .replace(/^[^。]+?(?:は|が|を)?(?:誤り|不正解|正しくありません|不正確)[^。]*。?\s*/, "")
    .replace(/\s*参考[:：][\s\S]*$/i, "")
    .trim();
}

function cleanPromptText(text) {
  return cleanText(text)
    .replace(/以下のリンクにある BlueRock Inc\. の事例を参照し、次の質問に答えてください。このリンクを新しいタブで開き、このテスト タブをブラウザ(?:ー)?で開いたままにしてください。\s*/g, "BlueRock Inc. のケーススタディを参照して、次の質問に答えてください。\n")
    .replace(/https:\/\/docs\.google\.com\/document\/d\/11vibhAFi4sD7k0shMJHCIWPzj8b_2u8Foa4sY4yC4Yo\/edit。usp=sharing/g, "https://docs.google.com/document/d/11vibhAFi4sD7k0shMJHCIWPzj8b_2u8Foa4sY4yC4Yo/edit?usp=sharing")
    .replace(/edit[.?。]usp=sharing/g, "edit?usp=sharing")
    .replace(/(edit\?usp=sharing) (BlueRock)/g, "$1\n$2")
    .replace(/(onmicrosoft\.com) (contoso\.onmicrosoft\.com)/g, "$1\n$2")
    .replace(/VNet1,VNet2,VNet3/g, "VNet1、VNet2、VNet3")
    .replace(/BlueRock, Inc\./g, "BlueRock Inc.")
    .replace(/IrondClad/g, "IronClad")
    .replace(/データベースapexcoresql1/g, "apexcoresql1 という名前の Azure SQL データベース")
    .replace(/という名前の Azure SQL データベースapexcoresql1/g, "apexcoresql1 という名前の Azure SQL データベース")
    .replace(/Microsoft を実行している IroncladVM1 という名前の仮想マシンSQL Server 2019/g, "SQL Server 2019 を実行している IroncladVM1 という名前の仮想マシン")
    .replace(/Azure を作成するプロジェクトを移行します/g, "Azure Migrate プロジェクトを作成します")
    .replace(/推奨事項。$/g, "何を推奨する必要がありますか。")
    .replace(/どの構成にする必要がありますか。 App1/g, "App1")
    .replace(/どのタイプのエンドポイントを使用する必要がありますか。 App1 Azure/g, "App1 が Azure")
    .replace(/どの構成を推奨しますか。ストレージ。/g, "ストレージにはどの構成を推奨しますか。")
    .replace(/サービス レベル レベル/g, "サービス レベル")
    .replace(/ベースケーススタディ/g, "ケーススタディ")
    .replace(/アズールです/g, "Azure に移行する予定です")
    .replace(/運用経費|運用コスト/g, "運用コスト")
    .replace(/関係者が予算と予算を承認できるように、/g, "関係者が予算を承認できるように、")
    .replace(/継続的なコストを見積もる必要があります。運用コストを計画します。/g, "継続的なコストを見積もり、運用コストを計画する必要があります。")
    .trim();
}

function cleanChoiceText(text) {
  return cleanText(text)
    .replace(/^構成/, "")
    .replace(/Azure を作成するプロジェクトを移行します。?/, "Azure Migrate プロジェクトを作成します。")
    .replace(/Azure を作成するRBAC/, "Azure RBAC")
    .replace(/Power BIアプリ/g, "Power BI アプリ")
    .replace(/Microsoft Entra IDvisor/g, "Azure Advisor")
    .trim();
}

function cleanText(text) {
  return String(text ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/([A-Za-z0-9])。([A-Za-z0-9])/g, "$1.$2")
    .replace(/([A-Za-z0-9])、([A-Za-z0-9])/g, "$1,$2")
    .replace(/([A-Za-z])\s+([A-Za-z])/g, "$1 $2")
    .replace(/Azure API 管理/g, "Azure API Management")
    .replace(/アプリケーション インサイト/g, "Application Insights")
    .replace(/コンテナ インサイト/g, "Container Insights")
    .replace(/ワークスペース インサイト/g, "Workspace Insights")
    .replace(/リソース ガード/g, "Resource Guard")
    .replace(/ゲートウェイ ロード バランサー/g, "Gateway Load Balancer")
    .replace(/階層型名前空間/g, "階層型名前空間")
    .replace(/汎用 v2/g, "汎用 v2")
    .replace(/True/g, "True")
    .replace(/False/g, "False")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function textToHtml(text) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const parts = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length) {
      parts.push(`<ul>${listItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`);
      listItems = [];
    }
  };

  for (const line of lines) {
    const bullet = line.match(/^・(.+)$/);
    if (bullet) {
      listItems.push(bullet[1].trim());
      continue;
    }
    flushList();
    parts.push(`<p>${escapeHtml(line)}</p>`);
  }

  flushList();
  return parts.join("\n");
}

function appendOriginalPromptImages(promptHtml, originalPromptHtml) {
  const imageTags = extractImageTags(originalPromptHtml);
  if (!imageTags.length) {
    return promptHtml;
  }
  return `${promptHtml}\n${imageTags.join("\n")}`;
}

function buildReferencesHtml(html) {
  const links = Array.from(
    new Set([...String(html).matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/gi)].map((match) => match[1])),
  );
  if (!links.length) {
    return "";
  }

  return [
    "<p><strong>参考:</strong></p>",
    `<ul>${links.map((link) => `<li><a href="${escapeHtml(link)}">${escapeHtml(link)}</a></li>`).join("")}</ul>`,
  ].join("\n");
}

function extractImageTags(html) {
  return [...String(html).matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
}

function extractImageSources(html) {
  return [...String(html).matchAll(/<img\b[^>]*src="([^"]+)"/gi)].map((match) => match[1]);
}

function htmlToText(html) {
  return String(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<\/ol>/gi, "\n")
    .replace(/<li>/gi, "・")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

module.exports = {
  applyEnglishSet1Rewrites,
};
