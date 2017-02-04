/**
 * Created by liqiang on 2017/2/3.
 * 抓取北京链家二手房信息
 */

var express=require('express');
var superagent=require('superagent');
var cheerio=require('cheerio');
var schedule=require('node-schedule');
var nodemailer=require('nodemailer');
var app=new express();



var result=[];

/**
 * 构建查询参数字符串
 * @param curPage
 * @returns {string}
 */
function getQueryUrl(curPage){
    curPage=curPage||1;
    var headUrl='http://bj.lianjia.com/ershoufang/changping/';//昌平
    var param='x1tf1l2l3a2a3p1';//不限购(x1)二居三居250万以下50-90平方(满二或满五tf1)
    param='hu1tf1l2l3a2a3p1p2';//不看商住两用(hu1)二居三居250万以下50-90平方(满二或满五tf1)
    if(curPage==1){
        headUrl+=param;
        headUrl+='/';
    }else{
        headUrl+=('pg'+curPage);
        headUrl+=param;
        headUrl+='/';
    }
    return headUrl;
}
/**
 * 发送邮件通知
 */
function sendMail(content){


    console.log(content);

    var authInfo={
        username:'447818666',
        password:'liqianghello',
        domain:'qq.com',
        getFullUsername: function () {
            return this.username+'@'+this.domain;
        }
    }
    var smtpConfig={
        host:'smtp.qq.com',
        auth:{
            user:'447818666@qq.com',
            pass:'liqianghello'
        }
    }
    //var transporter=nodemailer.createTransport(getTransportOpts(authInfo))
    var transporter=nodemailer.createTransport(smtpConfig)
    var opts={
        from:authInfo.getFullUsername(),
        to:'447818666@qq.com',
        subject:'链家昌平二手房价',
        text:content,
        //html:'<h1 style="color:red">html文本h1🐴</h1>',
        html: content,
        //html: 'Embedded image: <img src="cid:unique@kreata.ee"/>',
        attachments:[
            {
                filename:'text1.txt',
                content:content
            },
            {
                filename: 'i am name',//显示图片。。。
                path: 'images/noCoupon.png',
                cid: 'unique@kreata.ee' //same cid value as in the html img src
            }
        ]
    }
    transporter.sendMail(opts, function (err,info) {
        if(err){
            console.log(err)
        }else{
            console.log(info.response);
        }
    })
}
/**
 * 格式化输出结果
 * @param result
 * @param total
 * @returns {string}
 */
function handleResult(result,total){
    var str='昌平不看商住两用(hu1)二居三居250万以下50-90平方(满二或满五tf1)';
    str+=('查询总套数：'+total)

    result.forEach(function (ele,index) {
        for(var i in ele){
            str+=(i+':'+ele[i]+'<br />')
        }
        str+='<hr/>';
    })
    return str;
}


function doTask(){
    app.get('/', function (req, res, next) {
        /**
         * 执行定时任务
         */
        function execSchedule(){
            var date=new Date(2016,9,23,23,56,1);
            var str='0 04 12 * * *';
            //
            console.log('准备执行定时任务。。。')
            schedule.scheduleJob(str, function () {
                console.log('定时任务执行了。。。。');
                fetch(1);
            })
        }
        //根据筛选条件组合查询url，总价，200万以下，200-250,250-300,300-400,400-500,500-800分别为p1,p2,p3,p4,p5,p6；
        //面积，50以下，50-70，70-90,90-110,110-130,130-150分别为a1,a2,a3,a4,a5,a6
        //房型，1室，2室，3室，4室，5室，分别l1,l2,l3,l4,l5
        /**
         * 实际抓取
         */
        function fetch(curPage){
            superagent
                .get(getQueryUrl(curPage))
                //.query({type:1})
                //.query({query:paramUrl})
                .end(function (err, sres) {

                    // 常规的错误处理
                    if (err) {
                        return next(err);
                    }
                    var $ = cheerio.load(sres.text);


                    var pageBox=JSON.parse($('.house-lst-page-box').attr('page-data'));
                    var totalPage=pageBox.totalPage;
                    var curPage=pageBox.curPage;
                    var total=$('.total').find('span').text();
                    if(curPage==1){
                        console.log('昌平不看商住两用(hu1)二居三居250万以下50-90平方(满二或满五tf1)')
                        console.log('查询总套数：',total)
                    }


                    var items = $("ul.sellListContent").children('li.clear');
                    $(items).each(function (index,item) {
                        result.push({
                            '简介':$(item).find('.title a').text(),
                            '户型':$(item).find('.houseInfo').text(),
                            '位置':$(item).find('.positionInfo').text(),
                            '带看信息':$(item).find('.followInfo').text(),
                            '满5满2':$(item).find('.five').text(),
                            '总价':$(item).find('.totalPrice').text(),
                            '单价':$(item).find('.unitPrice').text(),
                        })

                    })

                    if(curPage<totalPage){
                        fetch(++curPage);
                    }else{
                        var str=handleResult(result,total);
                        sendMail(str);//将发送邮件的内容格式化一下
                        res.send(str);
                        console.log('抓取完毕！！！')
                    }
                });
        }


        execSchedule();




    });
}

doTask();


app.listen(3000, function () {
    console.log('running')
});