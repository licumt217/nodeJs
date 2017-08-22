/**
 * 定时邮件发送
 */
var http=require('http')
var fs=require('fs')
var cheerio=require('cheerio')
var request=require('request')
var nodemailer=require('nodemailer')
var schedule=require('node-schedule')
var pass='lovesilent520';



/**
 * 发送邮件通知
 */
function sendMail(){
    var authInfo={
        username:'447818666',
        password:pass,
        domain:'qq.com',
        getFullUsername: function () {
            return this.username+'@'+this.domain;
        }
    }
    var smtpConfig={
        host:'smtp.qq.com',
        auth:{
            user:'447818666@qq.com',
            pass:pass
        }
    }
    var transporter=nodemailer.createTransport(smtpConfig)
    var opts={
        from:smtpConfig.auth.user,
        to:'447818666@qq.com',
        subject:'查看7天内微信聊天记录',
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
                // path: 'images/noCoupon.png',
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

sendMail();
//execSchedule();

