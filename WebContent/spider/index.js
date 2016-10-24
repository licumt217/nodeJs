/**
 * Created by liqiang on 2016/10/13.
 */
var http = require('https');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var express = require('express');
var i = 0;
var app=new express();
var url = "https://shop666243.koudaitong.com/v2/showcase/feature?alias=1998abl27&reft=1474609754451&spm=f40823042&sf=wx_sm&from=singlemessage&isappinstalled=0";
//startRequest(url)

app.set('view engine', 'jade'); // 设置模板引擎
app.set('views', __dirname);  // 设置模板相对路径(相对当前目录)
app.get('/', function (req,res) {
    //res.send('nihao')
    startRequest(url,res)
    //res.render('includes/article',{
    //    name:'liq'
    //})


}).listen(3000, function () {
    console.log('服务器启动。。。。')
});

//初始url
function startRequest(x,response) {
    //采用http模块向服务器发起一次get请求
    http.get(x, function (res) {
        var html = '';        //用来存储请求网页的整个html内容
        var titles = [];
        res.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {

            var $ = cheerio.load(html); //采用cheerio模块解析html

            var list = $('.content-body .custom-image-single a');
            var videos=[];
            for(var i=0;i<list.length;i++){
                var ele=$(list[i]);
                var obj={
                    index:i,
                    videoUrl:ele.attr('href'),
                    title:ele.find('h3').text(),
                    imgUrl:ele.find('img').attr('src'),
                }
                videos.push(obj);

            }
            console.log(videos)
            //response.send(videos)
           //save(videos)
            response.render('includes/child',{
                videos:videos
            })

        });

    }).on('error', function (err) {
        console.log(err);
    });

}


/**
 * 保存到文件
 * @param arr
 */
function save(arr) {
    var huan='\n',tail='\n\n\n';
    arr.forEach(function (ele) {
        var line=ele.index+huan+ele.title+huan+ele.imgUrl+huan+ele.videoUrl+tail;

        fs.appendFileSync('data.txt', line, 'utf-8', function (err) {
        });
    })
    

}