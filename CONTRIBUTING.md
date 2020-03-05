# これを読んで開発に貢献しよう

開発に貢献するために目を通しておこう。  
開発に関することはこの紙にまとまっているよ。  

## ざっくり全体像

[Serverless Framework](https://serverless.com/)を使っています。  
よって、リソースや設定は原則Serverless Frameworkにて管理します。

## 開発の始め方

1. リポジトリをクローンしましょう

1. 以下の環境を整えましょう

    - Node.js 12.13.x
      - 2019/11/19時点のバージョン。[AWS Lambda ランタイム](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)で確認できます。
      - Node.jsの環境管理は「[nvs](https://github.com/jasongin/nvs/blob/master/README.md)」がおすすめです。
    - yarn 最新版
      - [Yarn](https://yarnpkg.com/en/docs/install)
      - npmは利用禁止です。必ずyarnを利用してください。
    - AWS CLI
      - [AWS CLI のインストール](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-chap-install.html)

1. 依存パッケージのインストールをしましょう

    ```bash
    yarn
    ```

1. AWS CLI用のプロファイルを準備しましょう（デプロイする場合は設定必須）

    - AWS CLIのプロファイル名ルール
      - AWSアカウントID
        - 例) 本番AWS 394625787166
        - 例) 開発AWS 733206583919
        - アカウントIDはこちら → [AWS 基本構成（アカウント, VPC, DNS）](https://docs.google.com/presentation/d/15Pk2vCQzSbgLJqXM8lA-6wHXPQg3LqgCNCN2ufIbPDk/preview?slide=id.g6437c175ee_0_10)

    - ★ スイッチロールで本番と開発を行き来している場合はこちら

        - 本番AWS（スイッチ元）

            ```bash
            aws configure --profile 394625787166

            AWS Access Key ID [None]: {{本番AWS（スイッチ元）のIAMのAccess Key}}
            AWS Secret Access Key [None]: {{本番AWS（スイッチ元）のIAMのSecret Access Key}}
            Default region name [None]: ap-northeast-1
            Default output format [None]: json
            ```

        - 開発AWS（スイッチ先）

            1. ~/.aws/credentials をにスイッチロール用の設定を追記

            ```~/.aws/credentials
            ～～～～ 既存の設定 ～～～～

            [733206583919]
            region = ap-northeast-1
            role_arn = arn:aws:iam::733206583919:role/Administrator
            source_profile = 394625787166
            ```

    - ☆ 本番と開発にそれぞれIAMユーザーがある場合はこちら

        - 本番AWS
          - ↑と同じ

        - 開発AWS

            ```bash
            aws configure --profile 733206583919

            AWS Access Key ID [None]: {{開発AWSのIAMのAccess Key}}
            AWS Secret Access Key [None]: {{開発AWSのIAMのSecret Access Key}}
            Default region name [None]: ap-northeast-1
            Default output format [None]: json
            ```

### ローカル開発の仕方

## コーディングルール

- [Airbnb JavaScript スタイルガイド](https://mitsuruog.github.io/javascript-style-guide/)に沿ってコーディングしてください。
- 静的コード解析は[ESLint](https://eslint.org/)を導入しています。
  - ルールは「[eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)」です。

## ユニットテストについて

- ユニットテストは[Jest](https://jestjs.io/ja/)を利用しています

## マージリクエストの仕方

1. ESLintを実行しエラーがないことを確認

    ```bash
    yarn lint
    ```

    ※ lintの自動修正を実行する場合はこちら

    ```bash
    yarn lint-fix
    ```

1. Jestを実行しエラーがないことを確認

    ```bash
    yarn test
    ```

1. マージリクエストを出す

## デプロイについて

1. AWS CLIプロファイルを[開発の始め方のAWS CLI用のプロファイルを準備](##-開発の始め方)に従って設定してあることを確認する。

1. 開発環境にデプロイ

    ```bash
    yarn sls-dev
    ```

1. 本番環境(⚠ 実行注意 ⚠)にデプロイ

    ```bash
    yarn sls-prod
    ```
