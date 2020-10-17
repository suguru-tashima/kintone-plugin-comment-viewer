
/*
 * checkvalue Plug-in
 * Copyright (c) 2017 Cybozu
 *
 * Licensed under the MIT License
 */
jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';

  // プラグインIDの設定
  var KEY = PLUGIN_ID;
  var CONF = kintone.plugin.app.getConfig(KEY);
  // 入力モード
  var MODE_ON = '1'; // 変更後チェック実施
  var MODE_OFF = '0'; // 変更後チェック未実施
  function escapeHtml(htmlstr) {
    return htmlstr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  $(document).ready(function() {

    // 既に値が設定されている場合はフィールドに値を設定する
    if (CONF) {
      $('#check-plugin-change_mode').prop('checked', false);
      // changeイベント有り
      if (CONF.mode === MODE_ON) {
        $('#check-plugin-change_mode').prop('checked', true);
      }
    }

    // 「保存する」ボタン押下時に入力情報を設定する
    $('#check-plugin-submit').click(function() {
      var config = [];
      var customize_id = $('#customize_id').val();
      var mode = $('#check-plugin-change_mode').prop('checked');
      // 必須チェック
      if (customize_id === '') {
        alert('必須項目が入力されていません');
        return;
      }
      config.customize_id = customize_id;
 
      // 重複チェック
      var uniqueConfig = [customize_id];
      var uniqueConfig2 = uniqueConfig.filter(function(value, index, self) {
        return self.indexOf(value) === index;
      });
      if (Object.keys(config).length !== uniqueConfig2.length) {
        alert('選択肢が重複しています');
        return;
      }

      config.mode = MODE_OFF;
      if (mode) {
        config.mode = MODE_ON;
      }
      kintone.plugin.app.setConfig(config);
    });

    // 「キャンセル」ボタン押下時の処理
    $('#check-plugin-cancel').click(function() {
      history.back();
    });
  });

})(jQuery, kintone.$PLUGIN_ID);
