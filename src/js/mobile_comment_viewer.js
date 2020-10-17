jQuery.noConflict();

var comments = [];
var options = [];
var all_comments = [];
var sort_key = "";
var url = kintone.api.url('/k/v1/records', true);
var domain = url.substr( 0,url.indexOf("/k/"));
var record_url ="";

// Vueのインスタンスを作成
var vm = new Vue({
    data: {
        comments: comments
    }
});

(function ($, PLUGIN_ID) {
    'use strict';

    kintone.events.on('mobile.app.record.index.show', async function (event) {
        var customize_id = await get_customize_id();
        if (String(event.viewId) !== customize_id) {
            return event;
        }
        var app_ids = await get_app_ids();
        for (var i = 0; i < app_ids.length; i++) {
            options.push(
                {
                    name: app_ids[i]['name'],
                    id: app_ids[i]['appId']
                }
            )
            // Vueインスタンスをカスタマイズビューで用意した#appにマウントしデータをセット
            vm.$mount('#app');
            Vue.set(vm, 'options', options);
        }
        return event;
    });

    async function get_customize_id() {
        var config = await kintone.plugin.app.getConfig(PLUGIN_ID);
        return config['customize_id']
    }

    async function get_app_ids() {
        var resp = await kintone.api(kintone.api.url('/k/v1/apps', true), 'GET', {});
        return resp['apps']
    }

})(jQuery, kintone.$PLUGIN_ID);

function view_comments(sel_app) {
    var app_id = document.getElementById(sel_app).value;
    extract_comments(app_id)
}

async function extract_comments(app_id) {
    sort_key = "date";
    var total_count = await get_current_record_no(app_id);
    console.log('最新レコードNo：' + total_count);
    for (let record_id = total_count; record_id !== 0; record_id--) {
        var record = await get_record(app_id, record_id);
        if (record !== null) {
            all_comments = record['comments'];
            for (var i = 0; i < all_comments.length; i++) {
                record_url = domain + "/k/" + app_id + "/show#record=" + record_id
                comments.push(
                    {
                        record: record_url,
                        date: all_comments[i]['createdAt'],
                        user: all_comments[i]['creator']['name'],
                        comment: all_comments[i]['text']
                    }
                )
                comments.sort(compare);
                // 作成されたVueインスタンスをカスタマイズビューで用意した #app にマウント
                vm.$mount('#app');
                // データをセット
                Vue.set(vm, 'comments', comments);
            }
        }
    }
}

// 最新レコードNoを取得
async function get_current_record_no(app_id) {
    var resp = await kintone.api(kintone.api.url('/k/v1/records', true), 'GET', { "app": app_id, "id": 100, "totalCount": true });
    var current_record_no = resp['records'][0]['$id']['value'];
    return current_record_no
}

// レコードを取得
async function get_record(app_id, record_id) {
    console.log('レコード取得:' + record_id);
    try {
        var resp = await kintone.api(kintone.api.url('/k/v1/record/comments', true), 'GET', { "app": app_id, "record": record_id });
        return resp
    } catch (err) {
        return null
    }
}

function sortBy(columns){
    console.log("sortBy:"+columns)
    sort_key = columns;
    comments.sort(compare);
}

function compare( a, b ){
    var r = 0;
    if( a[sort_key] > b[sort_key] ){ r = -1; }
    else if( a[sort_key] < b[sort_key] ){ r = 1; }
    return r;
}
