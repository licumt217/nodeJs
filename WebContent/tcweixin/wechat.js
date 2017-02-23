/**
 * Created by liqiang on 2017/2/4.
 */
/**
 * Created by liqiang on 2016/11/24.
 */
var express=require('express');
var app=express();
var superagent=require('superagent');
var schedule=require('node-schedule');


function getOpenIdsUrl(token){
    return 'https://api.weixin.qq.com/cgi-bin/user/get?access_token='+token;
}
function getSilentMsg(){
    return "亲爱的女王陛下，今天是阳光明媚的一天，希望你开开心心，笑靥如花。抱抱^_^";
}
function getWechatToken(){
    var url='http://test.tingjiandan.com/wxcontrol/wechatPublic/findWechatToken';
    superagent.get(url, function (err,data) {
        data=JSON.parse(data.text)
        var token=data.result.wechat_token;

        superagent.get(getOpenIdsUrl(token), function (err,data) {
            data=JSON.parse(data.text);
            var total=data.total;

            console.log('测试线公众号总关注人数：'+total)
            sendTemplateMsg(getSilentMsg());
            //sendTemplateMsg('停简单微信公众号测试线关注人数总和：'+total);
        });
    });
}

/**
 * 发送模板消息
 * @param msg
 */
function sendTemplateMsg(msg){
    var url='http://test.tingjiandan.com/wxcontrol/tcmpush/sendWechatMsg';
    var liqOpenId='oyaEAt50pCVmHcxNDJ8s43aZY7AU';
    var silentOpenId='oyaEAt-NoMA51MikANa6boPE-OAk';
    var obj={
        "msgType":"template",
        "platform" : "weixin",
        "commonMsg" : msg,
        "common" : "weixin",
        "openId" : silentOpenId,
        "dateSk" : "20160919",
        "templateName" : "common"

    }
    superagent.post(url).send("data="+JSON.stringify(obj)).end(function (err,data) {

    })
}
/**
 * 执行定时任务
 */
function execSchedule(){
    var str='0 20 8 * * *';
    //
    console.log('准备执行定时任务。。。')
    schedule.scheduleJob(str, function () {
        console.log('定时任务执行了。。。。'+new Date());
        getWechatToken();
    })
}
//sendTemplateMsg();

execSchedule();





