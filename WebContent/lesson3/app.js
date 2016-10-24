/**
 * Created by liqiang on 2016/10/8.
 */
//
var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

// 建立 express 实例
var app = express();
app.get('/', function (req,res,next) {
    superagent.get('http://www.imooc.com/learn/36').end(function (err,sres) {
        // 常规的错误处理
        if (err) {
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var items = [];
        $(".chapter  h3 strong").each(function (i,item) {
            var title,videos=[];
            title=$($(item).children()[1]).text();
            $(item).parent().next().find(" li a").each(function (i,item) {

                videos.push($($(item).children()[1]).text());

                items.push({
                    title:title,
                    videos:videos
                })
            });
            items.push()
        });

        console.log(items)
        res.send(items);
    })

})

app.listen(3000, function () {
    console.log('app is listening at port 3000');
});