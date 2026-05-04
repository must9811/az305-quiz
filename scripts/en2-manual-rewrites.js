const PROMPT_OVERRIDES = {
  "en2-q-006":
    "注: この問題は、同じシナリオを使う関連問題の一部です。各問題では、提案された解決策が要件を満たすかどうかを判定します。\n\n次のリソースを含む Azure サブスクリプションがあります。\n\nストレージ アカウント:\n・storage1: 米国東部リージョンにデプロイされた Storage (汎用 v1) の Azure Storage アカウント\n・storage2: 米国東部リージョンにデプロイされた StorageV2 (汎用 v2) の Azure Storage アカウント\n\nLog Analytics ワークスペース:\n・Workspace1: 米国東部リージョンにある Log Analytics ワークスペース\n・Workspace2: 米国東部リージョンにある Log Analytics ワークスペース\n\nAzure Event Hubs:\n・Hub1: 米国東部リージョンにデプロイされた Azure Event Hub\n\n米国東部リージョンでホストされる DB1 という名前の Azure SQL Database を作成します。\nDB1 には、Settings1 という診断設定が構成されています。Settings1 では、SQLInsights ログを storage1 にアーカイブし、同じログを Workspace1 に送信しています。\n\n正誤問題:\n「SQLInsights ログを storage2 にアーカイブする新しい診断設定を追加できます。」",
  "en2-q-007":
    "注: この問題は、同じシナリオを使う関連問題の一部です。各問題では、提案された解決策が要件を満たすかどうかを判定します。\n\n次のリソースを含む Azure サブスクリプションがあります。\n\nストレージ アカウント:\n・storage1: 米国東部リージョンにデプロイされた Storage (汎用 v1) の Azure Storage アカウント\n・storage2: 米国東部リージョンにデプロイされた StorageV2 (汎用 v2) の Azure Storage アカウント\n\nLog Analytics ワークスペース:\n・Workspace1: 米国東部リージョンにある Log Analytics ワークスペース\n・Workspace2: 米国東部リージョンにある Log Analytics ワークスペース\n\nAzure Event Hubs:\n・Hub1: 米国東部リージョンにデプロイされた Azure Event Hub\n\n米国東部リージョンでホストされる DB1 という名前の Azure SQL Database を作成します。\nDB1 には、Settings1 という診断設定が構成されています。Settings1 では、SQLInsights ログを storage1 にアーカイブし、同じログを Workspace1 に送信しています。\n\n正誤問題:\n「SQLInsights ログを Workspace2 に送信する新しい診断設定を追加できます。」",
};

const EN2_REASON_OVERRIDES = {
  "en2-q-001":
    "SQLdb1 と保存先の storage1 は同じ米国東部リージョンにあり、Azure SQL Database の監査ログ保存先として利用できます。",
  "en2-q-002":
    "SQLdb2 をホストする SQL サーバーと storage2 のリージョンが異なるため、監査ログの保存先としては要件を満たしません。",
  "en2-q-003":
    "SQLdb3 をホストする SQLsvr2 は米国西部ですが、storage2 は米国中部にあるため、監査ログの保存先としては同一リージョン要件を満たしません。",
  "en2-q-004":
    "ARM デプロイの履歴は Azure アクティビティ ログに記録されます。これを検索、集計して月次レポート化するには Log Analytics が適しています。",
  "en2-q-005":
    "許可されたリージョンと VM サイズだけを使わせる制約は、Azure Policy でリソース作成時に評価、拒否できます。",
  "en2-q-006":
    "Azure Monitor の診断設定は 1 つのリソースに複数作成できます。DB1 と storage2 は同じリージョンで、storage2 は診断ログのアーカイブ先として利用できます。",
  "en2-q-007":
    "SQLInsights ログを Log Analytics ワークスペースへ送る診断設定を追加する構成であり、既存の診断設定と併用できます。",
  "en2-q-008":
    "外部ベンダーの開発者アクセスを定期的に確認し、不要なアクセスを検出して通知するには Microsoft Entra ID のアクセス レビューが適しています。",
  "en2-q-009":
    "ブループリント定義をルート管理グループに保存すると、配下の管理グループとサブスクリプションで再利用しやすく、管理を一元化できます。",
  "en2-q-010":
    "Azure Blueprint の割り当てはサブスクリプションに対して行います。定義を管理グループに置くことと、割り当て先は別に考えます。",
  "en2-q-011":
    "ゾーン障害時も可用性を維持し、データ損失なしのフェールオーバーを求める場合、ゾーン冗長をサポートする Premium レベルが該当します。",
  "en2-q-012":
    "複数リージョンの AKS クラスターへ HTTP/HTTPS トラフィックを分散し、SSL 終端とグローバル フェールオーバーを提供するには Azure Front Door が適しています。",
  "en2-q-013":
    "Key Vault のバックアップは同じ Azure 地域内の Key Vault に復元できます。同じリージョンに限定されるわけではありませんが、任意の地域へ復元できるわけでもありません。",
  "en2-q-014":
    "ポリシーで構成されている最長の保持期間は、月次バックアップ ポイントの 36 か月です。",
  "en2-q-015":
    "バックアップは毎日 18:00 UTC に実行されるため、バックアップ ポイントの作成頻度は 1 日に 1 回です。",
  "en2-q-016":
    "Azure VM バックアップのインスタント リカバリ スナップショットは、短期の即時復元用に保持されます。この設問の設定では保持期間は 3 日です。",
  "en2-q-017":
    "アクセス許可を一時的に昇格し、承認や期限付きアクセスを管理する要件は Microsoft Entra Privileged Identity Management の用途です。",
  "en2-q-018":
    "ユーザー リスクやサインイン リスクに基づいてアクセスを制御するには Microsoft Entra ID Protection が適しています。",
  "en2-q-019":
    "Azure リソースへのアプリケーション認証を資格情報なしで行うには、マネージド ID が適しています。",
  "en2-q-020":
    "オンプレミス AD と Microsoft Entra ID の同期やハイブリッド ID 連携には Microsoft Entra Connect が該当します。",
  "en2-q-021":
    "複数の部門からの要求に対して、特権アクセスの管理や監査を求める場合は PIM が適しています。",
  "en2-q-022":
    "Web アプリが Key Vault などの Azure リソースへ安全にアクセスするには、アプリにマネージド ID を付与します。",
  "en2-q-023":
    "アプリケーションの秘密情報やキーをコードに保存せず Azure リソースへアクセスするには、マネージド ID を使います。",
  "en2-q-024":
    "ユーザーの危険なサインインや侵害リスクを検出し、条件付きアクセスと連携するには ID Protection が適しています。",
  "en2-q-025":
    "特権ロールの利用を必要な時間だけに制限するには、PIM の JIT アクセスが適しています。",
  "en2-q-026":
    "オンプレミス ID とクラウド ID の同期を扱う要件なので、Microsoft Entra Connect が該当します。",
  "en2-q-027":
    "SQL Database の監査や診断ログは、同じリージョンのサポートされる保存先へ送る必要があります。提案構成がその条件を満たすかで判断します。",
  "en2-q-028":
    "Azure Policy はリソース作成や構成を評価し、組織標準への準拠を強制できます。",
  "en2-q-029":
    "リソースへの一時的な特権操作を承認付きで提供するには PIM が適しています。",
  "en2-q-030":
    "アプリケーションから Azure リソースへのアクセスには、資格情報の管理を不要にできるマネージド ID が適しています。",
  "en2-q-031":
    "Azure VM に安全に管理接続するには、パブリック IP を公開せずに RDP/SSH を中継できる Azure Bastion が適しています。",
  "en2-q-032":
    "Azure Bastion を使う場合、実際の VM へのサインインに対して MFA を強制するには Azure Windows VM サインインを対象にした条件付きアクセスを構成します。",
  "en2-q-033":
    "リージョン障害にも耐える L7 のグローバル負荷分散、WAF、Cookie アフィニティ、URL ルーティングをまとめて満たすのは Azure Front Door です。",
  "en2-q-034":
    "めったにアクセスされず、24 時間以内に取り出せればよいファイルは Archive 層が最も低コストです。Blob コンテナーへコピーして各 Blob を Archive に設定する構成が該当します。",
  "en2-q-035":
    "Web アプリから Web API への認可には、Microsoft Entra ID が発行する OAuth 2.0 アクセス トークンを使います。",
  "en2-q-036":
    "未承認リクエストを API に到達させないためには、入口である Azure API Management で JWT 検証ポリシーを適用します。",
  "en2-q-037":
    "LDAP、Kerberos、NTLM を必要とするレガシー アプリを Azure に移行する場合、クラウド上でマネージド ドメインを提供する Microsoft Entra Domain Services が適しています。",
  "en2-q-038":
    "セキュリティ部門が求める特権ロールの管理、レビュー、監査には Microsoft Entra Privileged Identity Management が適しています。",
  "en2-q-039":
    "開発部門がアプリから Key Vault へ安全にアクセスしたい場合は、Web アプリにマネージド ID を割り当てます。",
  "en2-q-040":
    "品質保証部門が一時的な特権アクセスを必要とする場合は、PIM による JIT アクセス管理が適しています。",
  "en2-q-041":
    "タグをリソース グループから継承し、既存リソースも修復するには Azure Policy の modify 効果を使用します。",
  "en2-q-042":
    "modify 効果の修復タスクがリソースのタグを変更するには、ポリシー割り当てのマネージド ID に Contributor 権限が必要です。",
  "en2-q-043":
    "複数リージョンの AKS で使うコンテナー イメージを自動複製するには、geo レプリケーションをサポートする Premium SKU の Azure Container Registry が適しています。",
  "en2-q-044":
    "Log Analytics へのログ取り込みをインターネットへ公開せずに行うには、Azure Monitor Private Link Scope を使って Private Link 経由にします。",
};

const EN2_REASON_FIXES = {
  "en2-q-016": ".NET ベースの Web サービスを少ない運用負荷でホストし、ローカル一時ファイルとアプリケーション ログの要件も満たすには Azure App Service Web App が適しています。",
  "en2-q-017": "販売処理後の配送メッセージを後続アプリに配信し、将来の複数購読にも対応しやすくするには Azure Service Bus トピックが適しています。",
  "en2-q-018": "500 GB のオンプレミス ファイルを Blob Storage へ移行するには、物理転送に Azure Import/Export を使い、データ移動や変換の処理に Azure Data Factory を使えます。",
  "en2-q-019": "オンプレミスの 172.16.0.0/16 と重複せず、30 台の VM を収容できるアドレス空間として 192.168.0.0/24 が適しています。",
  "en2-q-020": "30 台の VM を 1 つのサブネットに配置するには /27 程度の範囲が必要です。オンプレミスと重複しない 192.168.1.0/27 が適しています。",
  "en2-q-021": "SQL Server から Azure SQL Database への移行評価と支援には Data Migration Assistant が適しています。",
  "en2-q-022": "SQL Server のテーブルを Azure Cosmos DB for NoSQL へ移行するには、Azure Cosmos DB データ移行ツールが適しています。",
  "en2-q-023": "既存コードの変更を抑えながら、レイヤー 7 負荷分散と WAF による SQL インジェクション対策を組み合わせるには Azure Application Gateway が適しています。",
  "en2-q-024": "SQL インジェクションなどの Web 攻撃から保護する機能は Web Application Firewall です。Application Gateway と組み合わせて使います。",
  "en2-q-025": "アプリケーションがサーバー名、データベース名、テーブル名を前提にしている場合、SQL Server 互換性を保ちやすい Azure VM 上の SQL Server または Azure SQL Managed Instance が適しています。",
  "en2-q-026": "読み取り専用の公開 API にするには、データを変更しない GET メソッドだけを許可します。",
  "en2-q-027": "パブリックの読み取り専用 API として公開するには、Azure Functions の認証レベルを Anonymous にして、許可する HTTP メソッドを GET に制限します。",
  "en2-q-028": "マッピング データ フローを使って Blob Storage のデータを変換し、Data Lake Storage へ転送するには Azure Data Factory が適しています。",
  "en2-q-029": "REST ベースでテーブル データにアクセスし、低コストで別リージョンに冗長化するには、GRS を使う Azure Storage Table が適しています。",
  "en2-q-030": "サイズが同程度で利用パターンが異なる複数の Azure SQL Database には、リソースを共有できる Elastic Pool が適しています。",
  "en2-q-031": "SQL Server のデータ ファイル用ディスクは読み取りが多いため ReadOnly キャッシュが適しています。",
  "en2-q-032": "SQL Server のトランザクション ログ用ディスクは書き込み順序と整合性が重要なため、ホスト キャッシュは無効にします。",
  "en2-q-033": "Microsoft Entra ID で認証する Web アプリを公開するには、アプリを Microsoft Entra に登録して認証対象として構成します。",
  "en2-q-034": "Microsoft Entra 参加済みデバイスなどの条件を使ってアクセスを制御するには、条件付きアクセス ポリシーを使用します。",
  "en2-q-035": "Azure Policy 定義は、管理グループ、サブスクリプション、リソース グループなどのスコープで割り当てて適用できます。",
  "en2-q-036": "SQL Server の互換性が重要で、CLR など単一 Azure SQL Database では制約になりやすい機能を使う場合、Azure SQL Managed Instance が適しています。",
  "en2-q-037": "カスタム COM コンポーネントに依存するアプリは VM ベースが適しています。可用性要件には VM Scale Sets を可用性ゾーンに分散します。",
  "en2-q-038": "オンプレミス App1 を Microsoft Entra ID で安全に公開するには、Application Proxy のコネクタ、エンタープライズ アプリ構成、公開設定を順に構成する必要があります。",
  "en2-q-039": "サードパーティ スケジューラを使う HPC クラスターのプロビジョニングと管理には Azure CycleCloud が適しています。",
  "en2-q-040": "Azure Databricks の変換処理では、取り込みやオーケストレーションに Azure Data Factory、変換済みデータの格納先に Azure Data Lake Storage を使います。",
  "en2-q-041": "オンプレミス VMware VM のサイズ評価と Azure 移行計画には、検出とアセスメントを行える Azure Migrate が適しています。",
  "en2-q-042": "インターネットから VM へ安全に管理接続するには、パブリック IP を公開せずに RDP/SSH を中継できる Azure Bastion が適しています。",
  "en2-q-043": "Azure Bastion などを使った VM サインインに MFA を強制するには、Azure Windows VM サインインを対象にした条件付きアクセス ポリシーを構成します。",
  "en2-q-044": "リージョン障害にも耐える L7 のグローバル負荷分散、WAF、Cookie アフィニティ、URL ルーティングをまとめて満たすのは Azure Front Door です。",
  "en2-q-045": "めったにアクセスされず、24 時間以内に取り出せればよいファイルは Archive 層が最も低コストです。Blob コンテナーへコピーして各 Blob を Archive に設定する構成が該当します。",
  "en2-q-046": "Web アプリから Web API への認可には、Microsoft Entra ID が発行する OAuth 2.0 アクセス トークンを使います。",
  "en2-q-047": "未承認リクエストを API に到達させないためには、入口である Azure API Management で JWT 検証ポリシーを適用します。",
  "en2-q-048": "LDAP、Kerberos、NTLM を必要とするレガシー アプリを Azure に移行する場合、クラウド上でマネージド ドメインを提供する Microsoft Entra Domain Services が適しています。",
  "en2-q-049": "セキュリティ部門が求める特権ロールの管理、レビュー、監査には Microsoft Entra Privileged Identity Management が適しています。",
  "en2-q-050": "開発部門がアプリから Key Vault へ安全にアクセスしたい場合は、Web アプリにマネージド ID を割り当てます。",
  "en2-q-051": "品質保証部門が一時的な特権アクセスを必要とする場合は、PIM による JIT アクセス管理が適しています。",
  "en2-q-052": "タグをリソース グループから継承し、既存リソースも修復するには Azure Policy の modify 効果を使用します。",
  "en2-q-053": "modify 効果の修復タスクがリソースのタグを変更するには、ポリシー割り当てのマネージド ID に Contributor 権限が必要です。",
  "en2-q-054": "複数リージョンの AKS で使うコンテナー イメージを自動複製するには、geo レプリケーションをサポートする Premium SKU の Azure Container Registry が適しています。",
  "en2-q-055": "Log Analytics へのログ取り込みをインターネットへ公開せずに行うには、Azure Monitor Private Link Scope を使って Private Link 経由にします。",
};

const EN2_SUPPLEMENT_FIXES = {
  "en2-q-001": "Azure SQL Database の監査ログを Storage アカウントへ保存する場合、リージョンや保存先の要件を確認します。設問の True/False では、提案された保存先が要件を満たすかだけを判定します。",
  "en2-q-002": "Azure SQL Database の監査ログでは、保存先の Storage アカウントが指定条件に合うかが重要です。リージョン指定がある場合、別リージョンの保存先は要件違反になります。",
  "en2-q-003": "監査ログや診断ログの保存先は、SQL サーバーやデータベースのリージョンとの関係を確認します。提案された Storage アカウントが条件外なら False になります。",
  "en2-q-004": "Azure アクティビティ ログには ARM デプロイなど管理プレーンの操作履歴が記録されます。Log Analytics に送ると、KQL で検索、集計、レポート化できます。",
  "en2-q-005": "Azure Policy は、作成できるリソースの場所、SKU、サイズ、タグなどのルールを強制するために使います。RBAC は誰が操作できるかを制御する仕組みです。",
  "en2-q-006": "診断設定は、ログやメトリックを Storage アカウント、Log Analytics、Event Hubs などへ送る構成です。設問では既存設定数と保存先の条件を確認します。",
  "en2-q-007": "SQLInsights などの診断ログは Log Analytics ワークスペースへ送信できます。ワークスペースを分ける要件がある場合は、指定されたワークスペースを保存先にします。",
  "en2-q-008": "アクセス レビューは、ゲストや外部ベンダーなどに付与したアクセス権が今も必要かを定期的に確認する Microsoft Entra ID Governance の機能です。",
  "en2-q-009": "Azure Blueprint の定義は管理グループに保存すると複数サブスクリプションで再利用しやすくなります。ルート管理グループは最上位のスコープです。",
  "en2-q-010": "Blueprint は定義を作ったあと、対象サブスクリプションへ割り当ててリソースやポリシーを展開します。定義スコープと割り当てスコープを分けて考えます。",
  "en2-q-011": "Azure SQL Database のサービス レベルは、可用性、ゾーン冗長、性能、コストの要件で選びます。ゾーン障害への耐性とゼロ データ損失が問われています。",
  "en2-q-012": "Azure Front Door はグローバルな HTTP/HTTPS 負荷分散、SSL 終端、WAF、リージョン間フェールオーバーを提供します。AKS 側のコンテナー変更を抑えたい要件にも合います。",
  "en2-q-013": "Key Vault のバックアップと復元には制約があります。復元先が同じリージョンか、同じ地理内か、任意リージョンかを区別して判断します。",
  "en2-q-014": "バックアップ ポリシーでは日次、週次、月次、年次などの保持期間を個別に考えます。最長保持期間を問う問題では、年単位の保持を確認します。",
  "en2-q-015": "バックアップ頻度は、復旧ポイントをどれくらい細かく残すかを決めます。Azure Backup のポリシーで日次バックアップか週次バックアップかを読み取ります。",
  "en2-q-016": "App Service は PaaS の Web アプリ実行環境です。OS 管理を抑えながら .NET アプリ、アプリケーション ログ、一時ファイルなどの一般的な Web 要件に対応できます。",
  "en2-q-017": "Service Bus のキューは 1 対 1 の処理、トピックは 1 対多の購読に向きます。後続アプリの監視や将来の購読追加がある場合はトピックが自然です。",
  "en2-q-018": "大量データ移行では、ネットワーク転送だけでなく物理転送も選択肢になります。Import/Export はディスク搬送、Data Factory はクラウド内外のデータ移動や変換に使います。",
  "en2-q-019": "仮想ネットワークのアドレス空間は、オンプレミスや他 VNet と重複しない範囲にします。30 台程度なら /24 は十分な余裕があります。",
  "en2-q-020": "Azure サブネットでは予約 IP も考慮します。30 台の VM を置くには /28 では不足し、/27 程度の範囲が必要です。",
  "en2-q-021": "Data Migration Assistant は SQL Server から Azure SQL 系サービスへ移行する際の互換性評価と移行支援に使います。",
  "en2-q-022": "Cosmos DB for NoSQL へ既存データを取り込む場合、対象 API とデータ形式に合う移行ツールを選びます。SQL Server の表をそのまま Azure SQL へ移す問題ではありません。",
  "en2-q-023": "Application Gateway はレイヤー 7 の負荷分散を提供し、WAF と組み合わせて SQL インジェクションなどの Web 攻撃を防げます。",
  "en2-q-024": "WAF は Web Application Firewall の略で、OWASP Top 10 に代表される Web 攻撃への保護を提供します。負荷分散機能そのものとは分けて考えます。",
  "en2-q-025": "SQL Server 互換性が強く求められるアプリでは、Azure SQL Managed Instance や Azure VM 上の SQL Server が候補になります。単一 Azure SQL Database は互換性制約が残る場合があります。",
  "en2-q-026": "HTTP メソッドは API の操作意図を表します。GET は取得、POST/PUT/PATCH/DELETE は作成や変更に使われるため、読み取り専用要件では GET のみにします。",
  "en2-q-027": "Azure Functions の認証レベルは、関数キーが必要かどうかを制御します。誰でも読める公開 API なら Anonymous を選び、変更操作はメソッド側で防ぎます。",
  "en2-q-028": "Azure Data Factory のマッピング データ フローは、コードを書かずにデータ変換パイプラインを作る機能です。Blob から Data Lake への変換転送に適しています。",
  "en2-q-029": "Azure Table Storage は REST でアクセスできる NoSQL キー/属性ストアです。GRS は別リージョンへの冗長化を低コストで実現します。",
  "en2-q-030": "Elastic Pool は複数の Azure SQL Database が共有リソースを使うモデルです。負荷のピークがずれる多数の小規模データベースでコストを抑えやすくなります。",
  "en2-q-031": "SQL Server のデータ ファイルは読み取りキャッシュの恩恵を受けやすい一方、書き込み整合性も考慮します。一般にデータ ディスクは ReadOnly が推奨されます。",
  "en2-q-032": "トランザクション ログは書き込み順序と永続性が重要です。ホスト キャッシュを有効にすると整合性や性能上の問題につながるため None を選びます。",
  "en2-q-033": "Microsoft Entra ID 認証を使う Web アプリは、Entra ID にアプリ登録してクライアント ID、リダイレクト URI、権限などを構成します。",
  "en2-q-034": "条件付きアクセスは、ユーザー、デバイス状態、場所、アプリなどの条件でアクセスを制御します。Entra 参加済みデバイスだけに絞る要件に対応します。",
  "en2-q-035": "Azure Policy は定義と割り当てを分けて考えます。管理グループ、サブスクリプション、リソース グループなどに割り当てて、下位リソースへ適用します。",
  "en2-q-036": "Azure SQL Managed Instance は SQL Server との高い互換性を持つ PaaS です。SQL CLR など互換性が問題になりやすい移行で候補になります。",
  "en2-q-037": "カスタム COM コンポーネントなど OS レベルの依存があるアプリは、PaaS より VM ベースが適します。可用性ゾーン分散で単一データセンター障害に備えます。",
  "en2-q-038": "Microsoft Entra Application Proxy は、オンプレミス アプリを外部公開するためにコネクタとエンタープライズ アプリ設定を組み合わせます。構成順序が問われます。",
  "en2-q-039": "Azure CycleCloud は HPC クラスターを Azure 上で構築、管理するためのサービスです。Slurm など既存のスケジューラ利用を想定できます。",
  "en2-q-040": "Databricks は変換処理の実行基盤です。取り込みやワークフロー制御には Data Factory、分析用データの格納には Data Lake Storage を組み合わせます。",
  "en2-q-041": "Azure Migrate はオンプレミス環境の検出、依存関係分析、サイズ評価、移行計画に使います。VMware VM の Azure 移行評価に適しています。",
  "en2-q-042": "Azure Bastion は VM にパブリック IP を付けずに RDP/SSH 接続を提供します。MFA は Entra ID や条件付きアクセス側の設計も合わせて考えます。",
  "en2-q-043": "VM サインインに対する MFA 強制は、対象クラウド アプリを正しく選ぶ必要があります。Azure 管理プレーンではなく Azure Windows VM Sign-in を対象にします。",
  "en2-q-044": "Front Door はグローバルなレイヤー 7 入口です。WAF、URL ルーティング、Cookie アフィニティ、リージョン間フェールオーバーをまとめて扱えます。",
  "en2-q-045": "Archive アクセス層は保存コストが最も低い代わりに、取り出し前にリハイドレートが必要です。24 時間以内の取り出しでよい低頻度データに向きます。",
  "en2-q-046": "Microsoft Entra ID は認証とトークン発行を担います。Web API の入口でそのトークンを検証する構成と組み合わせます。",
  "en2-q-047": "Azure API Management は API の前段で認証、JWT 検証、レート制限、変換などのポリシーを適用できます。未承認リクエストを API 到達前に止める役割です。",
  "en2-q-048": "Microsoft Entra Domain Services は、クラウド上で LDAP、Kerberos、NTLM などのドメイン サービスを提供します。ドメイン依存のレガシー アプリ移行に使います。",
  "en2-q-049": "PIM は特権ロールを常時付与せず、承認、期限、監査付きで有効化するための機能です。特権アクセスの管理とレビューに対応します。",
  "en2-q-050": "マネージド ID は、アプリが資格情報を持たずに Key Vault などの Azure リソースへアクセスするための ID です。シークレット管理の負担を減らします。",
  "en2-q-051": "一時的な特権アクセスは PIM の代表的な用途です。必要な時間だけ昇格し、承認や監査を組み込めます。",
  "en2-q-052": "Azure Policy の modify 効果は、既存リソースや新規リソースのプロパティを追加、更新できます。タグ継承や修復タスクと組み合わせます。",
  "en2-q-053": "ポリシーの修復タスクがリソースを変更するには、割り当てに関連付いたマネージド ID と適切な RBAC 権限が必要です。",
  "en2-q-054": "Azure Container Registry の geo レプリケーションは Premium SKU の機能です。複数リージョンの AKS から近いレプリカを利用できます。",
  "en2-q-055": "Azure Monitor Private Link Scope は、Azure Monitor や Log Analytics への Private Link 接続をまとめるスコープです。ログ取り込みをインターネットに出さない要件に対応します。",
};

const CHOICE_TEXT_OVERRIDES = {
  "en2-q-008-c2": "Get-AzureADUserAppRoleAssignment コマンドレットを実行する Azure Automation Runbook を作成します。",
  "en2-q-042-c1": "Azure Bastion",
  "en2-q-045-c1": "Cool アクセス層を既定にした Blob Storage アカウントを作成し、Blob コンテナーへファイルをコピーして、各ファイルを Archive アクセス層に設定します。",
  "en2-q-045-c4": "Hot アクセス層を既定にした汎用 v2 ストレージ アカウントを作成し、Blob コンテナーへファイルをコピーして、各ファイルを Archive アクセス層に設定します。",
  "en2-q-049-c3": "Microsoft Entra Connect",
  "en2-q-050-c3": "Microsoft Entra Connect",
  "en2-q-051-c3": "Microsoft Entra Connect",
};

const CHOICE_TEXT_FIXES = {
  "en2-q-008-c2": "Get-AzureADUserAppRoleAssignment コマンドレットを実行する Azure Automation Runbook を作成します。",
  "en2-q-030-c2": "可用性セット内の Microsoft SQL Server 上にある 20 個のデータベース",
  "en2-q-030-c3": "20 個の Azure SQL Database サーバーレス インスタンス",
  "en2-q-030-c4": "Azure VM 上で実行される Microsoft SQL Server 上の 20 個のデータベース",
  "en2-q-045-c1": "既定のアクセス層を Cool にした Blob Storage アカウントを作成し、Blob コンテナーへファイルをコピーして、各ファイルを Archive アクセス層に設定します。",
  "en2-q-045-c4": "既定のアクセス層を Hot にした汎用 v2 ストレージ アカウントを作成し、Blob コンテナーへファイルをコピーして、各ファイルを Archive アクセス層に設定します。",
  "en2-q-045-c5": "既定のアクセス層を Cool にした汎用 v2 ストレージ アカウントを作成し、ストレージ アカウントにファイル共有を作成して、ファイルをファイル共有にコピーします。",
  "en2-q-049-c3": "Microsoft Entra Connect",
  "en2-q-050-c3": "Microsoft Entra Connect",
  "en2-q-051-c3": "Microsoft Entra Connect",
  "en2-q-054-c3": "地理冗長ストレージ (GRS) アカウント",
  "en2-q-055-c1": "Workspace1 のリンクされたストレージ アカウント",
  "en2-q-055-c2": "Azure Peering Service 接続",
  "en2-q-055-c3": "サービス コネクタ",
  "en2-q-055-c4": "Azure Monitor プライベート リンク スコープ (AMPLS)",
};

const EN2_INCORRECT_FIXES = {
  "en2-q-045-c2": "汎用 v1 ストレージ アカウントの Blob コンテナーでは、Archive アクセス層を使う要件に合いません。",
  "en2-q-045-c3": "Azure Files のファイル共有は、Blob の Archive アクセス層を使って保存コストを最小化する構成ではありません。",
  "en2-q-045-c5": "ファイル共有にコピーする構成では、Blob の Archive アクセス層をファイルごとに設定できないため、最小コスト要件に合いません。",
};

const SUPPLEMENTS = [
  [/監査ログ|SQLInsights|診断設定/,
    "Azure SQL の監査や診断ログは、保存先の種類、リージョン、既存の診断設定数を確認して判断します。診断設定は 1 リソースに複数構成できます。"],
  [/ARM|デプロイ|アクティビティ ログ/,
    "Azure アクティビティ ログには管理プレーンの操作が記録されます。Log Analytics に送れば、KQL で検索、集計、レポート化できます。"],
  [/Azure Policy|ポリシー|タグ|modify|変更/,
    "Azure Policy は、許可する構成の制限、タグの付与、非準拠リソースの検出や修復に使います。RBAC は誰が操作できるかを制御する仕組みで、構成内容の強制とは役割が異なります。"],
  [/アクセス レビュー|Privileged Identity Management|PIM|ID Protection|マネージド ID|Microsoft Entra/,
    "Microsoft Entra 系の機能は用途で分けます。PIM は特権アクセス、ID Protection はリスク検出、アクセス レビューは権限の棚卸し、マネージド ID はアプリの資格情報レス認証です。"],
  [/ブループリント|管理グループ|サブスクリプション/,
    "Azure Blueprint は定義の保存場所と割り当て先を分けて考えます。定義は管理グループで再利用しやすくできますが、割り当てはサブスクリプションに対して行います。"],
  [/高可用性|フェールオーバー|ゾーン|Premium|Front Door|Traffic Manager|Application Gateway/,
    "可用性設計では、リージョン内のゾーン障害に備えるのか、リージョン障害に備えるのかを分けます。Front Door はグローバル L7、Application Gateway はリージョン内 L7、Load Balancer は L4、Traffic Manager は DNS ベースです。"],
  [/Key Vault|バックアップ|復元/,
    "Key Vault のバックアップは暗号化された BLOB として出力され、復元先には制約があります。同じ地域内か、同じリージョンか、任意リージョンかを区別します。"],
  [/バックアップ ポリシー|保持|インスタント リカバリ/,
    "バックアップ ポリシーの問題では、日次、週次、月次、年次、インスタント リカバリ スナップショットのどれを問われているかを切り分けます。"],
  [/Bastion|条件付きアクセス|MFA|RDP|SSH/,
    "Azure Bastion は VM にパブリック IP を付けずに RDP/SSH 接続を提供します。MFA 強制は、Bastion だけでなくサインイン対象に対する条件付きアクセス設計も合わせて考えます。"],
  [/Blob|Archive|アーカイブ|アクセス層|ファイル/,
    "Azure Storage のアクセス層は、取り出し時間、アクセス頻度、コストのバランスで選びます。Archive は低コストですが、リハイドレートに時間がかかります。"],
  [/API 管理|API Management|OAuth|JWT|Web API/,
    "Microsoft Entra ID はトークン発行とアプリ権限を担当し、Azure API Management は入口でのポリシー適用や JWT 検証を担当します。"],
  [/Domain Services|LDAP|Kerberos|NTLM/,
    "Microsoft Entra Domain Services は、クラウド上でマネージド ドメインを提供し、LDAP、Kerberos、NTLM が必要なレガシー アプリの移行に使えます。"],
  [/Container Registry|コンテナー イメージ|AKS/,
    "Azure Container Registry Premium は geo レプリケーションをサポートし、複数リージョンの AKS から近いレジストリ レプリカを利用できます。"],
  [/Log Analytics|AMPLS|Private Link|ログ取り込み API/,
    "Azure Monitor Private Link Scope は、Log Analytics や Azure Monitor へのプライベート接続をまとめるスコープです。インターネットを避けてログを取り込む要件に対応します。"],
];

const SERVICE_HINTS = [
  [/Azure Log Analytics/, "ログを収集して KQL で検索、集計、レポート化できます。ARM デプロイ履歴の分析に使えます。"],
  [/Azure Arc/, "オンプレミスや他クラウドのリソースを Azure 管理下に置くためのサービスであり、Azure 内の ARM デプロイ月次レポートの主機能ではありません。"],
  [/Azure Analysis Services/, "分析モデルを提供する BI 向けサービスであり、Azure 管理操作ログの収集やレポート化の中心ではありません。"],
  [/アクション グループ/, "アラート発生時の通知先や自動アクションを定義する機能で、履歴データの集計レポートを作るものではありません。"],
  [/Application Insights/, "アプリケーション監視向けで、ARM デプロイの一覧化やガバナンス レポートには Log Analytics の方が直接的です。"],
  [/Azure Policy/, "リソースの場所、サイズ、タグなどの構成ルールを評価、強制できます。"],
  [/RBAC|ロールベース/, "ユーザーが実行できる操作を制御しますが、リージョンや SKU など作成されるリソースの内容を直接制限する用途ではありません。"],
  [/ABAC|属性ベース/, "属性条件に基づくアクセス制御であり、Azure リソース構成標準の強制には Azure Policy を使います。"],
  [/条件付きアクセス/, "サインイン条件や MFA など ID アクセス制御の機能であり、Azure VM のサイズやリージョン制限には使いません。"],
  [/アクセス レビュー/, "ユーザーやゲストのアクセス権を定期的に棚卸しし、不要な権限を検出、削除するための機能です。"],
  [/Get-AzRoleAssignment|Runbook/, "ロール割り当てを列挙できますが、レビュー依頼、判断、削除までを組み込みで管理する機能ではありません。"],
  [/Privileged Identity Management|PIM/, "特権アクセスを期限付き、承認付きで管理する機能です。一般的なアプリ アクセスの定期レビューとは目的が異なります。"],
  [/Front Door/, "グローバル L7 ロード バランサーとして、WAF、SSL 終端、URL ルーティング、リージョン間フェールオーバーを提供します。"],
  [/Load Balancer/, "L4 の負荷分散です。SSL 終端、WAF、URL ベース ルーティングの要件には対応しません。"],
  [/Traffic Manager/, "DNS ベースの分散です。WAF、Cookie アフィニティ、URL ルーティングは提供しません。"],
  [/Application Gateway/, "リージョン内 L7 ロード バランサーです。複数リージョンをまたぐグローバル可用性は Front Door が適しています。"],
  [/Azure Bastion/, "VM にパブリック IP を付けず、Azure portal 経由で RDP/SSH 接続を提供します。"],
  [/JIT/, "管理ポートを必要な時間だけ開ける機能ですが、すべての受信接続に MFA を強制する入口にはなりません。"],
  [/Web アプリケーション ファイアウォール|WAF/, "Web 攻撃対策の機能であり、VM への RDP/SSH 管理接続を提供するものではありません。"],
  [/Managed Identity|マネージド ID/, "アプリが資格情報を持たずに Azure リソースへアクセスするための ID です。人間の特権ロール管理には使いません。"],
  [/ID Protection/, "ユーザー リスクやサインイン リスクを検出し、リスクベースの制御に使います。"],
  [/Microsoft Entra Connect/, "オンプレミス AD と Microsoft Entra ID の同期に使います。特権管理やアプリの資格情報レス認証とは用途が異なります。"],
  [/Microsoft Entra ID$/, "ID プロバイダーとしてトークン発行や認証を担当します。ただし API の入口でブロックするにはゲートウェイ側の検証も必要です。"],
  [/API 管理|API Management/, "API の入口としてポリシー適用、JWT 検証、レート制限などを実施できます。"],
  [/Web API/, "バックエンド側で検証はできますが、未承認リクエストを API 到達前に止めるには API Management 側で検証する方が適しています。"],
  [/Domain Services/, "LDAP、Kerberos、NTLM をクラウドで提供するマネージド ドメイン サービスです。"],
  [/アプリケーション プロキシ/, "オンプレミス Web アプリ公開向けで、LDAP/Kerberos/NTLM のドメイン サービスを提供するものではありません。"],
  [/VPN ゲートウェイ/, "ネットワーク接続を提供しますが、マネージド ドメインや LDAP 認証機能は提供しません。"],
  [/追加|Append/, "新規作成時に不足プロパティを追加できますが、既存リソースの修復や変更には modify が適しています。"],
  [/EnforceOPAConstraint|EnforceRegoPolicy/, "AKS/Gatekeeper や OPA/Rego 向けで、Azure リソース タグの一般的な修復には modify を使います。"],
  [/共同作成者ロールを持つマネージド ID/, "Azure Policy の修復タスクがリソースを変更するために必要な権限を、資格情報管理なしで付与できます。"],
  [/ユーザー アクセス管理者/, "ロール割り当て管理用の権限であり、タグなどリソース プロパティ変更には過剰または不適切です。"],
  [/サービス プリンシパル/, "利用は可能ですが、資格情報管理が必要です。ポリシー修復ではマネージド ID の方が管理負荷を抑えられます。"],
  [/Premium SKU Azure Container Registry/, "geo レプリケーションによりコンテナー イメージを複数リージョンへ複製できます。"],
  [/Azure Cache for Redis/, "アプリケーション データのキャッシュであり、コンテナー イメージの保存やレプリケーションには使いません。"],
  [/GRS/, "Storage アカウントのデータ冗長化であり、コンテナー レジストリのイメージ配布には ACR を使います。"],
  [/CDN/, "静的コンテンツ配信向けで、AKS が pull するコンテナー イメージのレジストリではありません。"],
  [/AMPLS|プライベート リンク スコープ/, "Azure Monitor と Log Analytics への Private Link 接続を管理し、インターネットを経由しないログ取り込みに使えます。"],
  [/リンクされたストレージ アカウント/, "Log Analytics の一部データ保存に関連しますが、ログ取り込み API のプライベート接続要件を満たすものではありません。"],
  [/Peering Service|サービスコネクタ/, "Azure Monitor へのプライベート取り込み経路を提供する中心機能ではありません。"],
];

function applyEnglishSet2Rewrites(questions) {
  return questions.map((question) => {
    if (!question.questionId?.startsWith("en2-q-")) {
      return question;
    }

    const choices = question.choices.map((choice) => {
      const text = cleanChoiceText(CHOICE_TEXT_FIXES[choice.choiceId] ?? CHOICE_TEXT_OVERRIDES[choice.choiceId] ?? choice.text);
      return {
        ...choice,
        text,
        html: escapeHtml(text),
      };
    });

    const promptText = cleanPromptText(PROMPT_OVERRIDES[question.questionId] ?? question.promptText);
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

function buildExplanationHtml(question, choices, promptText) {
  const correctIds = new Set(question.correctChoiceIds);
  const correctChoices = choices.filter((choice) => correctIds.has(choice.choiceId));
  const correctLabel = correctChoices.map((choice) => choice.text).join("、");
  const reason = EN2_REASON_FIXES[question.questionId] || EN2_REASON_OVERRIDES[question.questionId] || deriveReason(question, correctChoices);
  const supplement = EN2_SUPPLEMENT_FIXES[question.questionId] || deriveSupplement(`${promptText}\n${choices.map((choice) => choice.text).join("\n")}\n${question.explanationText}`);

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
  const firstSentence = splitSentences(text).find((sentence) => {
    return !/誤り|不正解|不正確|正しくありません/.test(sentence);
  });
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
    .replace(/^(.+?)\s*は正しいためです。?/, `${correctLabel} が正解です。`)
    .replace(/^True は正解です。?/, "この提案は要件を満たします。")
    .replace(/^False は正解です。?/, "この提案は要件を満たしません。")
    .replace(/です。これは、/g, "です。")
    .trim();
}

function deriveSupplement(text) {
  const found = SUPPLEMENTS.find(([pattern]) => pattern.test(text));
  return found
    ? found[1]
    : "設問では、サービス名だけでなく、スコープ、リージョン、認証方式、管理オーバーヘッドなどの制約を組み合わせて判断します。";
}

function buildIncorrectReason(question, choice) {
  if (EN2_INCORRECT_FIXES[choice.choiceId]) {
    return EN2_INCORRECT_FIXES[choice.choiceId];
  }

  const hint = SERVICE_HINTS.find(([pattern]) => pattern.test(choice.text));
  if (hint) {
    return hint[1];
  }

  const original = findOriginalChoiceReason(question.explanationText, choice.text);
  if (original) {
    return original;
  }

  if (/^True$|^False$/.test(choice.text)) {
    return "設問の提案が要件を満たすかどうかの判定が、正解とは逆になります。";
  }

  return "設問の主要要件に直接対応する選択肢ではありません。正解の選択肢が、求められている機能またはスコープにより直接対応します。";
}

function findOriginalChoiceReason(explanationText, choiceText) {
  const token = choiceText.replace(/[。.]$/g, "").slice(0, 18);
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
    .replace(/^正解は[^。]+です。?\s*/, "")
    .replace(/^[^。]+?(?:は|が)?(?:誤り|不正解|正しくありません|不正確)[^。]*。?\s*/, "")
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

function cleanPromptText(text) {
  return cleanText(text)
    .replace(/注: この質問は、同じシナリオを使用する一連の関連質問の一部です。各質問は、指定された要件を満たす場合と満たさない場合がある異なる解決策を提案します。/g, "注: この問題は、同じシナリオを使う関連問題の一部です。各問題では、提案された解決策が要件を満たすかどうかを判定します。")
    .replace(/SQLsvr1 は次のとおりです。 RG1 は 米国東部/g, "SQLsvr1: RG1 にあり、リージョンは米国東部")
    .replace(/SQLsvr2 は RG2 にあり、米国西部/g, "SQLsvr2: RG2 にあり、リージョンは米国西部")
    .replace(/ストレージ 1/g, "storage1")
    .replace(/ストレージ 2/g, "storage2")
    .replace(/東部にデプロイされた、ストレージ \(汎用 v1\) タイプの Azure ストレージ アカウントです。米国 リージョン/g, "米国東部リージョンにデプロイされた Storage (汎用 v1) の Azure Storage アカウントです")
    .replace(/米国東部 リージョン/g, "米国東部リージョン")
    .replace(/利用不可です/g, "利用できなくなった場合")
    .replace(/Azure サービス をお勧めしますか/g, "どの Azure サービスを推奨しますか")
    .replace(/どの Azure かサービス/g, "どの Azure サービス")
    .replace(/Microsoft Entra テナント 内/g, "Microsoft Entra テナント内")
    .replace(/Azure webアプリ/g, "Azure Web アプリ")
    .replace(/という名前のLinux コンピュータを実行しているサーバーServer1/g, "Server1 という名前の Linux サーバー")
    .replace(/Workspace1\./g, "Workspace1")
    .replace(/にArchive/g, "にアーカイブ")
    .replace(/をArchive/g, "をアーカイブ")
    .replace(/storage2 はRG2 は米国中部に位置し、BlobStorage/g, "storage2 は RG2 にあり、リージョンは米国中部で、種類は BlobStorage です。")
    .replace(/SQLdb1 を使用しています。 RG1 は SQLsvr1 でホストされ、標準の価格レベルを使用します/g, "SQLdb1 は RG1 にあり、SQLsvr1 でホストされ、Standard 価格レベルを使用します。")
    .replace(/SQLdb2 は RG1 にあり、SQLsvr1 でホストされます。 スタンダードの価格帯を使用します。/g, "SQLdb2 は RG1 にあり、SQLsvr1 でホストされ、Standard 価格レベルを使用します。")
    .replace(/SQLdb3 は RG2 にあり、SQLsvr2 でホストされ、プレミアム価格帯を使用します。層/g, "SQLdb3 は RG2 にあり、SQLsvr2 でホストされ、Premium 価格レベルを使用します。")
    .replace(/必須最小限の開発労力。/g, "開発作業を最小限に抑える必要があります。")
    .replace(/次の要件を満たすAzure/g, "次の要件を満たす Azure")
    .replace(/単一のルート管理グループとその下に10 個/g, "単一のルート管理グループと、その下に 10 個")
    .replace(/要件:/g, "要件:")
    .trim();
}

function cleanChoiceText(text) {
  return cleanText(text)
    .replace(/Azure Bastian/g, "Azure Bastion")
    .replace(/Microsoft Entra接続/g, "Microsoft Entra Connect")
    .replace(/cmdlet\.?$/i, "コマンドレット")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanText(text) {
  return String(text ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/([A-Za-z0-9])。([A-Za-z0-9])/g, "$1.$2")
    .replace(/([A-Za-z0-9])、([A-Za-z0-9])/g, "$1,$2")
    .replace(/Azure API 管理/g, "Azure API Management")
    .replace(/Microsoft Entra ドメイン サービス/g, "Microsoft Entra Domain Services")
    .replace(/Azure マネージド ID/g, "Azure Managed Identity")
    .replace(/クールな/g, "Cool")
    .replace(/ホット/g, "Hot")
    .replace(/アーカイブ/g, "Archive")
    .replace(/BLOB/g, "Blob")
    .replace(/ウェブ API/g, "Web API")
    .replace(/保管庫/g, "Key Vault")
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
  return imageTags.length ? `${promptHtml}\n${imageTags.join("\n")}` : promptHtml;
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
  applyEnglishSet2Rewrites,
};
