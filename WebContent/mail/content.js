/**
 * Created by liq on 2017/8/22.
 */

function getTitle() {
    var array=['查看7天内微信聊天记录','7天内微信聊天记录查看','查看微信聊天记录7天内']
    var key=parseInt(Math.random()*3);
    return array[key]+Math.random();
}

function getContent() {
    var c1='<li>您提供您要查询的微信聊天记录的微信号，我们当天晚上9点准时将查询的记录结果发送回您的qq邮箱。'+Math.random()+'</li>';
    var c2='<li>微信的这个服务器漏洞刚出来两天，具体什么时间微信那边会修复我们暂不清楚，预计最快也要一周时间。</li>'

    var arr=[c1+c2,c2+c1];
    var key=parseInt(Math.random()*2);
    return arr[key];
}




var content={
    loopTime:60000,
    subject:getTitle(),
    html:'<div style="position:relative;font-size:14px;height:auto;padding:15px 15px 10px 15px;z-index:1;zoom:1;line-height:1.7;" class="body">    ' +
    '<div id="qm_con_body"><div id="mailContentContainer" class="qmbox qm_con_body_content qqmail_webmail_only" style="">' +
    '<h3>您 好，如有打扰请见谅 ！</h3>' +
    '<h4>废 话不多说，提供如下服务 （<span style="color:red;">查询微信聊天记录</span>）：</h4>' +
    '<ul style="font-size: 14px;line-height: 28px;">' +
    getContent()+
    '<li>目前经测试，能查询到聊天记录的大概比例是97.21%左右，暂时只能查询到7天内的记录，之前的查不到。</li>' +
    '<li>具体费用，一个账号30元，您转账到支付宝账户（<span style="border-bottom:1px dashed #ccc;z-index:1" t="7" onclick="return false;" data="18601965856">18601965856</span>）后，请留言标注要查询的微信号和查询结果要发回的邮箱。</li>' +
    '<li>由于有2%左右的概率查询不到结果，届时我们会将30元返回您的支付宝账户，一般第二天返还。</li>' +
    '<li>由于用户较多，不接受议价，我们团队不会靠您的30元发家致富，后续还希望您继续介绍用户。</li>' +
    '</ul>' +
    '<h3>题外话：</h3>' +
    '<ul style="font-size: 14px;line-height: 28px;">' +
    '<li>提供这个服务之前，我们团队讨论过，这个服务是否有点不道德，毕竟查看别人（老公，情人，同事等）的聊天记录不好。但是，我个人查看了几个朋友和女友的聊天记录后，</li>' +
    '<li>有高兴、开心，但也有不相信、绝望。最终，我们决定存在即合理，虽然现实是残酷的冷漠的，但是我们总要长大，总要勇敢的去面对。</li>' +
    '</ul>' +
    '<h3>祝好！</h3>'+
    '<style type="text/css">.qmbox style, .qmbox script, .qmbox head, .qmbox link, .qmbox meta {display: none !important;}</style></div></div><!-- --><style>#mailContentContainer .txt {height:auto;}</style>  </div>'

}

module.exports=content;