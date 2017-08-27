/**
 * Created by liq on 2017/8/22.
 */

function getTitle() {
    var str='7年累积2T精品资源，各种类型，包你喜欢^^'
    return str+Math.random();
}

function getContent() {
    var c1='<div id="mailContentContainer" class="qmbox qm_con_body_content qqmail_webmail_only" style="">&nbsp; &nbsp; &nbsp; 本人大学4年加工作3年，共7年时间，积攒的将近2T的资源。<div>&nbsp; &nbsp; &nbsp; 各种类型几乎都有，现分享出来造福人类。</div><div>&nbsp; &nbsp; &nbsp; （小弟整理上传也不容易，还废了辣么多的硬盘，赞助10元到支付宝【<span style="border-bottom:1px dashed #ccc;z-index:1" t="7" onclick="return false;" data="18601965856">18601965856</span>】，网盘地址支付宝发您）</div><div>&nbsp; &nbsp; &nbsp; &nbsp;大家好才是真的好。。</div><div>&nbsp; &nbsp; &nbsp; <img src="/cgi-bin/viewfile?f=3B93BACF1779BF0D39C1B9A9ACAC7204C69909E75E84E469551F371FCB72D95D1CB723131415ED584B61A9D4C7B95D766370C06234C5120013EE320551A8B4E58FC7BDA03CE358BE864A931BB1872B874D3BC3858B51DAD35845D36307805CDB&amp;mailid=ZL0727-xG4rcln7kSCBc2kwPMT0a78&amp;sid=e9GdWXL7G6oLZnwl&amp;net=3547822346"><img src="/cgi-bin/viewfile?f=3B93BACF1779BF0D39C1B9A9ACAC7204C69909E75E84E469551F371FCB72D95D1CB723131415ED584B61A9D4C7B95D766370C06234C512008C09DC041D58311A35CF59E172A7B474C686AE3D331095DC74394C7945F65E143144369E88A91E18&amp;mailid=ZL0727-xG4rcln7kSCBc2kwPMT0a78&amp;sid=e9GdWXL7G6oLZnwl&amp;net=3547822346"><img src="/cgi-bin/viewfile?f=3B93BACF1779BF0D39C1B9A9ACAC7204C69909E75E84E469551F371FCB72D95D1CB723131415ED584B61A9D4C7B95D766370C06234C51200704796FAA39191779575519B3D1C1976A4E76230F0340C095FC6D8210B329C5EB272820AA1183B0F&amp;mailid=ZL0727-xG4rcln7kSCBc2kwPMT0a78&amp;sid=e9GdWXL7G6oLZnwl&amp;net=3547822346"></div><style type="text/css">.qmbox style, .qmbox script, .qmbox head, .qmbox link, .qmbox meta {display: none !important;}</style></div>';
    return c1;
}




var content={
    loopTime:60000,
    subject:getTitle(),
    html:getContent()

}

module.exports=content;