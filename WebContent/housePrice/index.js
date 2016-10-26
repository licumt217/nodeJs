/**
 * Created by liq on 2016/10/23.
 */
/**
 * 北京昌平区实时二手房房价信息汇总
 */
var ip='localhost',dbName='tjd';
var http=require('http')
var fs=require('fs')
var cheerio=require('cheerio')
var request=require('request')
var excelPort = require('excel-export');
var nodemailer=require('nodemailer')
var schedule=require('node-schedule')

var conn=require('../mongo/connection')(ip,dbName);
var ChangPingHousePriceModel=require('../mongo/models/ChangPingHousePrice')(conn);


var fileName='北京昌平区实时房价列表-'+new Date().toLocaleString().split(' ')[0];
var conf={};
var rows=[];
var marginPrice=320;
function getPageUrl(index){
    return 'http://beijing.anjuke.com/sale/changping/p'+index+'/#filtersort';
}
/**
 *
 * @param url
 * @param curPage
 * @param marginPrice
 */
function fetch(url,curPage){
    if(!marginPrice){
        marginPrice=9999;
    }
    console.log(curPage);
    http.get(url, function (res) {
        var html='';
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            html+=chunk;
        })
        res.on('end', function () {
            var $=cheerio.load(html);
            var list=$('#houselist-mod .list-item');

            list.each(function (i,item) {
                item=$(item);
                var name=item.find('.houseListTitle').text();
                var area=item.find('.details-item').eq(0).find('span').eq(0).text();
                var totalPrice=item.find('.pro-price .price-det strong').text()*1;
                var category=item.find('.details-item').eq(0).find('span').eq(1).text();
                var price=item.find('.details-item').eq(0).find('span').eq(2).text();
                var floor=item.find('.details-item').eq(0).find('span').eq(3).text();
                var year=item.find('.details-item').eq(0).find('span').eq(4).text();
                var position=item.find('.details-item').eq(1).find('span').text();
                var date=new Date().toLocaleString();

                if(marginPrice>=totalPrice){
                    rows.push([name,area,totalPrice,category,price,floor,year,position,date])
                }

            });


            if(curPage==1){
                conf.cols=[
                    {caption:'名称',type:'string',width:50},
                    {caption:'面积',type:'string',width:15},
                    {caption:'总价',type:'number',width:15},
                    {caption:'类别',type:'string',width:15},
                    {caption:'单价',type:'string',width:15},
                    {caption:'楼层',type:'string',width:15},
                    {caption:'年份',type:'string',width:15},
                    {caption:'位置',type:'string',width:60},
                    {caption:'查询日期',type:'string',width:20}
                ]
            }
            //下一页
            if($('.aNxt').attr('href')){
                var nextPage=curPage+1;
                fetch(getPageUrl(nextPage),nextPage,marginPrice);
            }else{
                conf.rows=rows;
                save2Db(rows);
                var result=excelPort.execute(conf);
                var genFilePath='result/'+fileName+".xlsx";
                fs.writeFile(genFilePath,result,'binary', function (err) {
                    if(err){
                        console.log(err)
                    }else{
                        console.log('done!');
                        //发送邮件
sendMail();
                    }
                })
            }


        })
    })
}
function save2Db(datas){

    datas.forEach(function (item) {
        // new 一个新对象，名叫 kitty
        // 接着为 kitty 的属性们赋值
        var c = new ChangPingHousePriceModel({
            name: item[0],
            area: item[1],
            totalPrice:item[2],
            category:item[3],
            price:item[4],
            floor:item[5],
            year:item[6],
            position:item[7],
            date:item[8]
        });

        // 调用 .save 方法后，mongoose 会去你的 mongodb 中的 test 数据库里，存入一条记录。
        c.save(function (err) {
            if (err){
            }else{
                console.log('saved!');
            }
        });
    })
}
function getTransportOpts(obj){
    return 'smtps://'+obj.username+'@'+obj.domain+':'+obj.password+'@smtp.'+obj.domain;
}
/**
 * 发送邮件通知
 */
function sendMail(){
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
        to:'licumt217@126.com',
        subject:'nodeJs邮件系统测试',
        text:'纯文本',
        //html:'<h1 style="color:red">html文本h1🐴</h1>',
        html: 'Embedded image: <img src="cid:unique@kreata.ee"/>',
        attachments:[
            {
                filename:'text1.txt',
                content:'hello world'
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
 * 执行定时任务
 */
function execSchedule(){
    var date=new Date(2016,9,23,23,56,1);
    schedule.scheduleJob(date, function () {
        console.log('定时任务执行了。。。。');
    })
}
function findAll(){
    ChangPingHousePriceModel.find({}, function (err,datas) {
        console.log(datas)
    })
}
/**
 * 根据条件对象筛选
 * @param obj
 */
function findByValue(obj){
    ChangPingHousePriceModel.find(obj, function (err,datas) {
        console.log(datas)
    })
}
//fetch(getPageUrl(1),1,marginPrice);
//sendMail();
//execSchedule();
//findAll();
findByValue({
    price:'46153元/m²',
    area:'65平方米'
})