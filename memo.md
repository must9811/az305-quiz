# AZ-305 対策メモ

## Azure Automation

運用の自動化。システムの定期的な監視、パッチ管理やリソースの自動デプロイなどに使用する。powershellやpythonで書かれたrunbookを使用して繰り返し処理や複雑なプロセスを自動化できる。

## Azure Batch

大規模なデータ分析やレンダリング処理、複雑な計算処理に使用する。

## Azure Functions

HTTPリクエストに応答して動作するAPI、ファイルのアップロード時のデータ処理、スケジュールされたタスクに使用する。

## Azure Monitor

以下のリソースを統合し包括的な監視ソリューションを提供する。

### Application Insights

アプリケーションのパフォーマンス監視

### Log Analytics

ログデータの集約、分析、検索

## Compute Service

- VM/VMSS：フルコントロール。IaaSという意味。
- Azure Batch：Hy performance computing.
- App Service：フルマネージド。
- Azure functions：イベントドリブン
- Azure Service Fabric：ARMがAzure導入される前のAzureからWebアプリケーションを移行したいときの移行先として使われる。特殊。
- Azure Container Instance：検証用。

### Size

- 小文字のrが入っているサイズはRDMA対応。RDMAはとても高速なネットワークを使用可能
- infiniBard（RDMA）とシングルルートI/O Vのどちらを選ぶか問題が出る。コスト無視していニュアンスであれば前者を選ぶ。
- シングルルートI/O V（SR-IOV）とは高速ネットワークと同じ意味。20、30%くらいパフォーマンスが増加する。

### VMSS

- 運用を楽にしたい→VMSSを選ぶ。

### Azure Batch

- 金融、IoTデータを高速に処理する、3D画像のレンダリング→Azure Batchを選ぶ。
- プール割り当てモード ユーザサブスクリプション：自前のVMをAzure Batchに登録する。
- プール割り当てモード バッチサービス：Azure Batch側でVMを用意する。リザーブドインスタンス使ってるならこっち。
- 低優先度のVM：スポットVMの前身の仕組み。ユーザサブスクリプションモードでは選べない。

### Azure CycleCloud

PBS Pro、Slurmなど一般的に利用されるスケジューラが組み込まれたクラスターをオンプレから移行したい場合に使用する

## コンテナサービス

- Azure Container Registry：private docker hub
- Azure pipelines build pipeline：githubにコードやDockerfileがpushされたことをキーとしてACRに自動的にアップロードする仕組み。
- Azure pipelines release pipeline：ACRからAKSなどのContainer Serviceに自動的にデプロイする仕組み。Azure DevOps.
- App service for containers：80,443ポートしかサポートしていない。App Service Planベースの自動スケール
- Azure Container Instance：80,443以外のポートをサポートしている。ただし、スケールアウトできない。
- Azure Kubernetes Service：AKSからACIへのバーストが可能。

## App Service

- SKU：Freeからisolatedまである。VNET統合、プライベートエンドポイントなどの言葉の意味とどのSKUで何がサポートされているかはよく出るので確認する。これがApp Service Planのことだと思われる。
- デプロイメントスロット：ブルーグリーンデプロイメントが可能になる。また、開発時にProduction、Master、Stage、Devなどbranch（枝葉）ごとにスロットを作り、それぞれのbranchのコードをそれぞれのスロットのAppServiceにデプロイして、アジャイルのプロセスを回す。一連の流れをGitflowと呼ぶ。

## Azure Functions App

C#やPowershellで関数が記述可能。イベントドリブン。

- トリガーバインド（何によって関数が起動するのか）の種類を知っていた方が良い。HTTP、Timer、CosmosDB、Event hubsなど
- ホスティングプラン　Flex Consumption（推奨）：サーバーレスの新世代。既定30分タイムアウト、無制限に設定可能。VNet統合対応。
- ホスティングプラン　Consumption（レガシー）：最大10分でタイムアウトする。新規では非推奨。
- ホスティングプラン　Premium：タイムアウトは既定で30分だが無制限に設定できる。VNet統合したいときに使う。
- ホスティングプラン　専用プラン：
- Authlevelの種類

※ 従来のConsumption planはlegacy扱い。新規サーバーレスアプリにはFlex Consumption planが推奨される。

## Event Grid

システムイベントを処理する。ほとんどのAzureサービスで（Microsoft Entra ID以外）イベントサブスクリプションを作成可能で、それはEvent Gridが裏で動いている。

## Event Hubs

膨大な情報（IoT、Twitterのデータなど）を処理するのに使う。

## Service Bus

トランザクション処理をしたいときに使う。バックエンドにAPIがいるときにタイムアウトされると困るので、非同期で処理したいのでService Bus Queueを使ったりする

## Logic Apps

Functions APPと似ていると思うかもしれないが、ノンコーディングがポイント。Power Appsより前からある。

### Logic Appsの接続方式

- Logic Apps Standard（シングルテナント）：VNet統合が必要な場合はこちらを選ぶ。VNet統合によりプライベートネットワーク内のリソースにアクセス可能。
- オンプレミスデータソースへの接続：VNetの構成がない場合。接続ゲートウェイリソースというゲートウェイで接続する。

※ 旧方式の「統合サービス環境（ISE）」は2024年8月31日に廃止済み。新規作成不可。

## API Management

ポリシーを構成することで色々できる。レート制限、JWT、応答ヘッダーの修正（API要求の中に隠したいパラメータがある場合にそれを隠す）などがよくでる。

- VNet injection：classic tierのDeveloperプランとPremiumプランで対応
- VNet integration（アウトバウンド接続）：Standard v2とPremium v2で対応
- VNet injection（Premium v2）：Premium v2で対応

## Network

- プライベートエンドポイントとサービスエンドポイントの違いが出る

### Azure Load Balancer

- レイヤ4の負荷分散

### Azure Application Gateway

- レイヤ7
- 証明書をアップロードできる

### Azure Frontdoor

- WAFが利用できる

### Traffic Manager

- WAFは利用できない

### Express Route

- パブリックピアリングは廃止済み。Microsoftピアリングに移行されている。選んではいけない。

### Azure Virtual WAN

- planがBasicとStandardがあり、StandardでないとExpress routeがサポートされない。

## Identity, Governance

### Microsoft Entra ID（旧Azure AD）

- パスワードハッシュ同期：オンプレのADDSのパスワードをMicrosoft Entra IDにコピーしてくるようなサービス。パススルー認証との違いが良く出る。
- パススルー認証
- ゲストユーザアカウント：違うMicrosoft Entra IDテナントからユーザを招待するとこう呼ばれる。MFAを適用可能。まとめて複数ユーザに対してMFAを適用したいときはPowershellスクリプトを利用するか、
- オンプレにあるADDSをAzureに拡張する問題がでる。ExpressRouteが必要なのと、Azure上でADDSを冗長化させて構築する必要がある。
- もっと良い方法として、Microsoft Entra Domain Servicesがある。Express RouteがなくてもオンプレのADをAzureに拡張できる。管理負荷が少ないフルマネージドサービス。
- アプリケーションプロキシ：アプリケーションのプロキシとしてMicrosoft Entra IDを使用可能である。portalのエンタープライズアプリケーションからは既存のSaaSなどを登録可能。アプリの登録からは自分で作ったアプリを登録可能。
- Free（無料）のMicrosoft Entra IDのセキュリティ構成として、セキュリティの既定値群という設定値がある。例えば、管理者に多要素認証を要求する、レガシ認証プロトコル（多要素認証がサポートされていない場合に使用する）をブロックする、などの設定が自動的に有効化されている。また、スマートロックアウト設定（アカウントのロックを1分後に解除するなど）を有効化する。
- シグナル（ユーザ、ロケーション、デバイス、アプリケーション）を設定して、特定のシグナルの条件でアクセスを拒否することができる。

### ID保護ポリシー

- ユーザリスクポリシー：パスワードが漏洩している可能性のあるユーザからのアクセスを拒否する
- サインインリスクポリシー：普段会社からログインしているユーザが海外からログインしたときなど普段と違うときにアクセスを拒否する

### Microsoft Entra ID認証（旧Azure AD認証）

SQL Server認証だとDBへの接続文字列がportal上平文で見えてしまう（App Serviceであれば「構成」から確認可能）。そんな時はマネージドIDを使用してMicrosoft Entra ID認証することで「ID」から設定可能。

試験によく出る組み合わせは以下。

- アクセス元：App service, VM/VMSS, function
- アクセス左記：PaaS DB、Key Vault、CosmosDB

認証においてIMDS（Instance Metadata Service）が裏で動いていることを理解しておくこと。

- システム割り当てマネージドIDは複数のリソース間で共有できない。ユーザ割り当てマネージドIDは共有できる。後者は複数のリソースで1つのkeyになるので認証が一回で済む。

### Key Vault

- キー：秘密鍵を置く場所、シークレットは接続文字列を置く場所。
- アクセスポリシーの意味と種類を覚えておくこと。
- Key Vaultは重要なのでペアリージョンで冗長化されている。フェイルオーバ中は読み取り専用になる。
- カスタマーマネージドキーについて、StorageAccountとKeyは同一リージョンである必要がある。unwrap key（=キーの折り返しを解除）操作によってキーの使用が可能になる。

### Azureのロール

Azureのロールにはサブスクリプション、リソースグループ、リソースの世界の"リソースロール"と、Microsoft Entra IDの世界（管理グループ）の"ディレクトリロール"の2種類ある。

- リソースロールの最大権限は"サービス管理者"（owner）。

### セキュリティプリンシパルの種類

- ユーザ：人に付与する
- グループ：ユーザ、サービスプリンシパル、マネージドIDをまとめる。
- サービスプリンシパル：アプリに付与する
- マネージドID：アプリに付与できるID。サービスプリンシパルより最近できた。

### Azure Policy

管理グループの単位（サブスクリプションのうえ）で、特定のSKUのみしか許可しないなどの制限が可能。

### Azure Blueprints（2026年7月廃止予定→後継：Template Specs + Deployment Stacks）

リソースグループ、ロール、ポリシー、ARMテンプレートを作成する際にBlueprintの画面で一括で作成できる。これを使用しないとアクティブな結びつきが失われる。

Blueprintsの定義は管理グループに保存されるが、適用するのはサブスクリプションである。

※ 2026年7月11日に廃止予定。後継はTemplate Specs（テンプレートの管理）とDeployment Stacks（デプロイの管理とアクティブな結びつきの維持）に移行する。

## Azure Monitor（詳細）

VMのOSやOS上のアプリケーション、Azureサブスクリプション全体やApp Service（portalのApplication Insightsから設定可能）に対して監視が可能。

- portalの「診断設定」からLog Analyticsワークスペースを作成して監視可能。
- VMに組み込む必要のあるエージェント
  - Azure Monitor Agent（AMA）：現在の推奨エージェント（GA済み）。すべての監視シナリオで使用する。

※ 旧Log Analytics Agentは2024年8月31日に廃止済み。AMAへの移行が必須。

### Azure Network Watcher

- IPフロー検証：オンプレミスを含めた構成ではこちらを選ぶ。
- トラフィック分析
- Azure Load Balancerのメトリックの意味を理解しておく。

## コストの最適化

### 計画段階でつかうもの

- 料金計算ツール
- 総保有コスト（TCO）計算ツール

### 運用時に使うもの

- Azure Cost management：アラート起動
- Azure Advisor

### コスト削減

- Reserved Instance
- ストレージライフサイクルポリシー
- スポットインスタンスなど

## データストレージ設計

### ストレージアカウント

- blob：RESTでアクセスするとき（アプリが使用するとき）
- ファイル：SMBでアクセスすっるとき（人が使用するとき）
- テーブル：NoSQL
- キュー

すべてのストレージに対応しているのはStandardv2（汎用v2）だがHDDなので高速でない。v1は旧バージョン。アーカイブにすると取り出しに15時間かかる。PremiumはSSD。

### セキュリティ

- 通常はアクセスキーは使用しない。付与される権限が強いから。
- Shared Access Signatureをよく使う。
- アクセスポリシー：不変ポリシーをコンテナ単位にかけられる。"時間ベースの保持"は有効期限付きで権限付与したいとき。逆にそうでないときは"訴訟ホールド"を選ぶ。

### Azure Data Lake Storage

ビッグデータの保管先を使用したいときに使う

### Azure Databricks Data Science & Engineering

- 資格情報パススルー：DatabricksのPremiumプラン。

### SQL Serverの移行先

- IaaS（Windows/Linux対応）
  - キャッシュの有効化。ログファイルはキャッシュを有効化するものではない。
- PaaS：管理が楽になる。
  - Azure SQL Managed Instance
  - Azure SQL Database (single Database)
  - Azure SQL Databas (Elastic database pool)
  - synapse analytics：データウェアハウス
- DTUベース：DTUとはDBの処理能力のこと。データベースエンジニアがいないときなどに使用する
- vCoreベース：coreやメモリサイズでプランを選べる。vCoreの"汎用目的"プランのみサーバーレスを選べる。Reserved Instanceが選べる。データベースエンジニアがいるときにオンプレのときと同じサイズでプランを選びたいときなどに使用する。
- セキュリティの構成についてすべての機能を説明できるように理解しておく。エラスティックデータベースプールは複数のDBの課金を束ねることができる。

### NoSQL

json形式、表形式（リレーショナルでない。キーバリューストア）、Graph（ほとんどAZ-305ではでない。Gremlinなど）

- Cosmos DBでもRDSを選べる。PostgreSQLが最近サポートされた。コア（SQL）というのがJSON形式のDBである。
- どこかのカラムを使ってパーテーションがきられ、DBが分散されて構成されることでパフォーマンスを確保する。該当のカラムには「/year」のようにスラッシュがつく。
- 整合性レベル：CosmosDBの「既定の整合性」からどのリージョンに配置するとどのくらい遅延があるか、どのような順序性で書き込みが行われるかについてデモが音符形式で見られる。

## キャッシュ

- Azure Front Door（CDN機能統合）：静的コンテンツ（htmlなど）のキャッシュを行う。リージョンの近くに配置される。WAFやPrivate Link統合も可能。
- Azure Cache for Redis：動的コンテンツ（動画など）のキャッシュを行う。アプリケーションの近くに配置される。

※ Azure CDN Standard from Microsoft (classic)は2027年9月30日に廃止予定。後継はAzure Front Door Standard/Premium。

## データ移行

- Azcopy：オンプレミスからのデータ移行において、簡単かつコストがかからない方法。

## ビジネス継続性

### 高可用性構成

- Azure Migrate：大量のVMを移行しなければいけないようなときに使用する。オンプレミスにて仮想アプライアンスをインストールすることで移行できるかどうかを判定してくれる。
