# otamashelf

Otamashelf (o8f) は、Otamajakushi Bookshelf (o20f) の核となるプログラムです。

## デプロイ方法

```console
npm run build
./scripts/copy.sh # Windows では  .\scripts\copy.ps1 を実行
cd ./dist
npm publish
```

## otamashelf の仕組みとその拡張機能の説明

otamashelf は、人工言語の辞書を作成・閲覧するために開発されたライブラリです。
様々な形式の辞書を読み込んで、検索や閲覧を行うことができるように設計されています。

### Book

辞書は 本（`Book`） として表現されます。
`Book` は、以下の要素を持ちます。

| 名前             | 型                     | 説明                                   |
| ---------------- | ---------------------- | -------------------------------------- |
| `bookFormat`     | 文字列                 | 本の形式                               |
| `bookParameters` | ブックパラメータページ | 本が持つパラメータ、本の状態や設定など |
| `description`    | 説明ページ             | 本の説明                               |
| `fileFormat`     | ファイル形式           | 本のファイルパスやファイルの属性など   |
| `indexes`        | ページプロパティの配列 | 本の索引                               |
| `pages`          | 普通ページ             | 本のページや記事、単語、例文など       |
| `title`          | 文字列                 | 本のタイトル                           |

### Page

次に重要な概念であるページ（`Page`）について説明します。
ページは Wikipedia における記事のようなもので、一つのページが一つの単語や例文などに対応します。
