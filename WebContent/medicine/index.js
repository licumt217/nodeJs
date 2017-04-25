/**
 * Created by liqiang on 2016/10/13.
 */
var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var express = require('express');
var i = 0;
var app=new express();
var url = "http://www.zysj.com.cn/zhongyaocai/index__1.html";
var domain='http://www.zysj.com.cn'
function getTopPageUrl(index){
    return "http://www.zysj.com.cn/zhongyaocai/index__"+index+".html";
}
var urlArray=[];
app.get('/', function (req,res) {
    getAllMedicineList(res);

}).listen(3000, function () {
    console.log('服务器启动。。。。')
});

function getAllMedicineList(res){
    startRequest(1)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(startRequest)
        .then(function () {
            console.log('总检索条数：',urlArray.length)
            res.send(urlArray);
        })

}

function queryRealData(){
    var i= 0,len=urlArray.length;
    //采用http模块向服务器发起一次get请求
    http.get(urlArray[i], function (res) {
        var html = '';        //用来存储请求网页的整个html内容
        res.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {
            html += chunk;
        });

        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {
            var $ = cheerio.load(html); //采用cheerio模块解析html
            var ul=$("#content");


            药材名称：bt
            图片：tp
            拼音：py
            英文名：ywm
            别名：bm
            出处：cc
            来源：ly
            原形态：yxt
            生境分部：sjfb
            性状:xz
            鉴别：jb
            含量测定：hlcd
            性味：xw
            归经：gj
            功能主治：gnzz
            用法用量：yfyl
            复方：ff
            注意：zy
            贮藏：zc
            各家论述:gjls
            摘录：zl



            if(ul.find('.bt span').next().text()){

            }
            index++;
            resolve(index)



        });

    }).on('error', function (err) {
        console.log(err)
    });
}

//初始url
function startRequest(index) {
    return new Promise(function (resolve,reject) {
        //采用http模块向服务器发起一次get请求
        http.get(getTopPageUrl(index), function (res) {
            var html = '';        //用来存储请求网页的整个html内容
            res.setEncoding('utf-8'); //防止中文乱码
            //监听data事件，每次取一块数据
            res.on('data', function (chunk) {
                html += chunk;
            });

            //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
            res.on('end', function () {
                var $ = cheerio.load(html); //采用cheerio模块解析html
                var ul=$("#tab-content");
                var aArray=Array.prototype.slice.call($(ul).find('li').find('a'));
                aArray.forEach(function (item) {
                    urlArray.push(domain+item.attribs.href)
                })
                console.log('第',index,'页')
                index++;
                resolve(index)



            });

        }).on('error', function (err) {
            console.log(err)
            reject(err)
        });
    })


}


/**
 * 保存到文件
 * @param arr
 */
function save(arr) {
    var huan='\n',tail='\n\n\n';
    arr.forEach(function (ele) {
        var line=ele.index+huan+ele.title+huan+ele.imgUrl+huan+ele.videoUrl+tail;

        fs.appendFileSync('pageList.json', line, 'utf-8', function (err) {
        });
    })
    

}