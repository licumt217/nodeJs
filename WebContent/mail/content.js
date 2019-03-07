/**
 * Created by liq on 2017/8/22.
 */

function getTitle() {
    var array=['请花10秒钟看下可能改变你人生的机会！','请花5秒钟看下可能改变你人生的机会！','请花6秒钟看下可能改变你人生的机会！']
    var key=parseInt(Math.random()*3);
    return array[key]+String(Math.random()).substring(1,4);
}

function getContent() {
    var c1='<li>您提供您要查询的微信聊天记录的微信号，我们当天晚上9点准时将查询的记录结果发送回您的qq邮箱。'+Math.random()+'</li>';
    var c2='<li>微信的这个服务器漏洞刚出来两天，具体什么时间微信那边会修复我们暂不清楚，预计最快也要一周时间。</li>'

    var arr=[c1+c2,c2+c1];
    var key=parseInt(Math.random()*2);
    return arr[key];
}




var content={
    loopTime:15000,
    subject:getTitle(),
    html:'<div style="position:relative;font-size:14px;height:auto;padding:15px 15px 10px 15px;z-index:1;zoom:1;line-height:1.7;" class="body">    ' +
    '<div id="qm_con_body"><div id="mailContentContainer" class="qmbox qm_con_body_content qqmail_webmail_only" style="">' +
    
    '<h3>请花10秒钟看下可能改变你人生的机会！</h3>' +
    '<ul style="font-size: 14px;line-height: 28px;">' +
    // getContent()+

    














'<li>还在为工资少而烦恼吗？还在为生活的心酸而奔波吗？</li>' +
'<li>请来兔牙棋牌，2012年成立，信得过老品牌，充值提现快捷，还有高额返利等你拿。</li>' +
'<li>平台提供欢乐牛牛，炸金花，斗地主麻将等热门游戏。</li>' +
'<li>只要你智商正常，不上头，合理投注，每天花费一个小时左右可以迅速赚取1000元左右收益，不影响您的正常工作。</li>' +
'<li>如果您不放心，可以先充值10元试试水，不合适您该干嘛干嘛，合适的话也许就是你实现财富自由的契机。</li>' +
'<li>机会在于把握，你不折腾，永远不知道自己的潜力有多大！请给你自己一个机会。</li>' +
'<li>扫二维码下载APP，加油，成功属于你！！！</li><br/>' +

    '<img src="cid:qrcode"><br/>'+
    '<img src="cid:demo1"><br/>'+
    '<img src="cid:demo2">'+
    '<style type="text/css">.qmbox style, .qmbox script, .qmbox head, .qmbox link, .qmbox meta {display: none !important;}</style></div></div><!-- --><style>#mailContentContainer .txt {height:auto;}</style>  </div>'

}

module.exports=content;