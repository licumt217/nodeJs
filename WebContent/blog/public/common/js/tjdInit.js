

var _isCanRequestAgain=true;//为了防止多次提交后台请求，必须在当前请求返回后才能发送下次请求。
var constants={
	success:"0",
	business_error:"1",
	system_error:"2",
	syserror_msg:"网络繁忙请稍等",
	version:"2.9.0",
	debug:true,
	splitParam:"tingjiandan"
};
if(sessionStorage.isLogin && sessionStorage.isLogin=="1"){//已登录的话就不用再加载js相关文件了

}
/**
 * 初始化全局配置
 */
(function initGlobalConfig(){
	var runtimeDomain="",wechatAppId="",alipayAppid = "";
	if(window.location.href.indexOf("open.tingjiandan.com")!=-1){//生产环境
		runtimeDomain="http://open.tingjiandan.com/";
		wechatAppId="wxf5933e1fde90fd6e";
		alipayAppid="2015091600291075";
		constants.shortDomain="open.tingjiandan.com";
	}else if(window.location.href.indexOf("test.tingjiandan.com")!=-1){//测试环境
		runtimeDomain="http://test.tingjiandan.com/";
		wechatAppId="wx3f4d5fb5a289355d";
		alipayAppid="2015091600291029";
		constants.shortDomain="test.tingjiandan.com";
	}else{//本地环境或其它环境
		runtimeDomain="http://test.tingjiandan.com/";
		wechatAppId="wx3f4d5fb5a289355d";
		alipayAppid="2015091600291029";
		constants.shortDomain="test.tingjiandan.com";
	}

	constants.tcserverUrl=runtimeDomain+"tcserver/";
	constants.openapiUrl=runtimeDomain+"openapi/";
	constants.tcrouteUrl=runtimeDomain+"tcroute/";
	constants.tjdAppId=wechatAppId;
	constants.wechatAppId=wechatAppId;
	constants.alipayAppid=alipayAppid;
	//支付宝获取authcode地址
	constants.alipayAuthUrl = "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id="+constants.alipayAppid+"&auth_skip=false&scope=auth_base&redirect_uri=";
	constants.tcweixinUrl=runtimeDomain+"tcweixin/letter/";
	constants.wxControlUrl=runtimeDomain+"wxcontrol/";
	constants.go2Login= function () {
		window.location.href=constants.tcweixinUrl+"login/login.html?"+Math.random();
	};
	constants.go2MyOrder= function () {
		window.location.href=constants.tcweixinUrl+"myOrder/myOrder.html?"+Math.random();
	}
	constants.go2MyCar= function () {
		window.location.href=constants.tcweixinUrl+"myCar/myCar.html?"+Math.random();
	}
	constants.go2MyCenter= function () {
		window.location.href=constants.tcweixinUrl+"center/newcenter.html?"+Math.random();
	}
})();






