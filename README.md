# kintone-plugin-comment-viewer  
kintoneアプリのコメント一覧表示用プラグイン  
  
  
## 準備  
1. kintoneアプリの設定
    - フィールド設定等をせずに空の状態のkintoneアプリを作る。  
    - 一覧からカスタマイズビューを作成しHTMLに`customize_view.html`の内容をコピペする。  
  
1. CDNの設定
    - kintone全体のカスタマイズから下記のCDNを設定する。(PC・スマホ共に)  
        - https://js.cybozu.com/jquery/3.3.1/jquery.min.js
        - https://js.cybozu.com/jqueryui/1.12.1/jquery-ui.min.js
        - https://js.cybozu.com/momentjs/2.22.1/moment-with-locales.min.js
        - https://js.cybozu.com/vuejs/v1.0.28/vue.min.js
  
1. プラグインの設定
    - 作成したkintoneアプリにプラグインComment Viewerを追加する。
    - プラグインの設定画面から作成したカスタマイズビューIDを設定する。
  
## 使い方
1. 作成したカスタマイズビューを開き、アプリをリストから選択します。  
1. 日時・投稿者のヘッダーをクリックすると一覧が昇順ソートされます。