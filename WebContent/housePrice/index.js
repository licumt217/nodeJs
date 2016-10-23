/**
 * Created by liq on 2016/10/23.
 */
/**
 * 北京昌平区实时二手房房价信息汇总
 */
var http=require('http')
var fs=require('fs')
var cheerio=require('cheerio')
var request=require('request')
var excelPort = require('excel-export');
var nodemailer=require('nodemailer')
var schedule=require('node-schedule')

var fileName='北京昌平区实时房价列表-'+new Date().toLocaleString().split(' ')[0];
var conf={};
var rows=[];
var marginPrice=1;
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

                if(marginPrice>=totalPrice){
                    rows.push([name,area,totalPrice,category,price,floor,year,position])
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
                    {caption:'位置',type:'string',width:60}
                ]
            }
            //下一页
            if($('.aNxt').attr('href')){
                var nextPage=curPage+1;
                fetch(getPageUrl(nextPage),nextPage,marginPrice);
            }else{
                conf.rows=rows;
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
/**
 * 发送邮件通知
 */
function sendMail(){
    var transporter=nodemailer.createTransport('smtps://447818666%40qq.com:liqianghello@smtp.qq.com')
    var opts={
        from:'447818666@qq.com',
        to:'447818666@qq.com',
        subject:'nodeJs邮件系统测试',
        text:'纯文本',
        html:'<h1 style="color:red">html文本h1</h1>'
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
//fetch(getPageUrl(1),1,marginPrice);
//sendMail();
execSchedule();