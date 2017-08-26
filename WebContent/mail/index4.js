/**
 * 定时邮件发送
 */
var fs=require('fs')
var nodemailer=require('nodemailer')
var username='674902476';
var pass='819819819q';
var content=require('./content')
var number=fs.readFileSync('./data4.txt','utf8');
var successNum=0;
var errorNum=0;


/**
 * 发送邮件通知
 */
function sendMail(){
    var smtpConfig={
        host:'smtp.qq.com',
        auth:{
            user:username+'@qq.com',
            pass:pass
        }
    }
    var transporter=nodemailer.createTransport(smtpConfig);

    var opts={
        from:smtpConfig.auth.user,
        to:String(number)+'@qq.com',
        subject:content.subject,
        html:content.html,
    }
    transporter.sendMail(opts, function (err,info) {
        number++;
        if(err){
            console.log(err.responseCode)
            console.log(err.response)
            sendMail();

            console.log('-------------------------error-----------------------------:'+number)
            console.log('-------------------------errorNum-----------------------------:'+(++errorNum))
        }else{
            console.log('-------------------------success-----------------------------:'+number)
            console.log('-------------------------successNum-----------------------------:'+(++successNum))

            setTimeout(function () {
                sendMail();
            },content.loopTime)
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

