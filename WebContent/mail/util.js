/**
 * Created by liq on 2017/8/22.
 * QQ邮件定时发送客户端
 */

var path=require('path');
var fs=require('fs');
var nodemailer=require('nodemailer')
var content=require('./content')
var successNum=0;
var errorNum=0;
let logFileName='log.js';

const util={
    appendFile:function (filename,data,callback) {
        if(typeof data!='string'){
            data=JSON.stringify(data)
        }


        data=(new Date().toLocaleString())+" "+data;
        data+='\n';//换行

        fs.appendFile(path.join(__dirname, filename), data, function (err) {
            if (err) {
                console.log("写文件错误：filename:"+filename);
            }else{
                if(callback){
                    callback()
                }
            }

        });
    },
    /**
     * 发送邮件通知
     */
    sendMail:function(fromUsername,fromPass,fileIndex){
        let toUsername=util.getToUserName(fileIndex);
        var smtpConfig={
            host:'smtp.qq.com',
            auth:{
                user:fromUsername+'@qq.com',
                pass:fromPass
            }
        }
        var transporter=nodemailer.createTransport(smtpConfig);
        var opts={
            from:smtpConfig.auth.user,
            to:String(toUsername)+'@qq.com',
            subject:content.subject,
            html:content.html,
        }
        transporter.sendMail(opts, function (err,info) {
            //动态改变收件人地址到文件存储
            fs.writeFile('data'+fileIndex+'.txt', ++toUsername, function (e) {
                if(err){
                    let errCode=err.responseCode,errResponse=err.response;
                    console.log(errCode)
                    console.log(errResponse)
                    let isContinue=true;
                    if(errResponse.indexOf('Mailbox not found or access denied')!=-1){
                        console.log("地址不存在")
                    }else if(errResponse.indexOf('frequency limited')!=-1){
                        console.log("发送数量超限或频率超限")
                        isContinue=false;
                    }else{

                    }


                    if(isContinue){
                        setTimeout(function () {
                            util.sendMail(fromUsername,fromPass,fileIndex);
                        },1000)
                    }else{
                        console.log("程序终止。。。。。。。..............................................。。。。。")
                    }


                    console.log('-------------------------error-----------------------------:'+toUsername)
                    console.log('-------------------------errorNum-----------------------------:'+(++errorNum))
                }else{
                    console.log('-------------------------success-----------------------------:'+toUsername)
                    console.log('-------------------------successNum-----------------------------:'+(++successNum))

                    //写文件
                    util.appendFile(logFileName,{
                        filename:'index'+fileIndex+' ',
                        successNum:successNum,
                        errorNum:errorNum,
                        nowNumber:toUsername
                    })

                    setTimeout(function () {
                        util.sendMail(fromUsername,fromPass,fileIndex);
                    },content.loopTime)
                }
            });



        })

    },
    /**
     * 获取收件人的起始地址
     * @param fileIndex
     * @returns {*}
     */
    getToUserName:function (fileIndex) {
        return fs.readFileSync('./data'+fileIndex+'.txt','utf8');
    }


}

module.exports=util;