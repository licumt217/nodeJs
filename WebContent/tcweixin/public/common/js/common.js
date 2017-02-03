/**
 * 百度、微信和支付宝渠道
 * @type {{baidu: string, alipay: string, weixin: string, ios: string, app: string}}
 */
var channels={
	baidu:"96",
	alipay:"86",
	weixin:"76",
	ios:"APPStore",
	app:'66'
}
/**
 * 百度、微信和支付宝等平台
 * @type {{baidu: string, alipay: string, weixin: string, ios: string, app: string, android: string}}
 */
var platforms={
	baidu:"baidu",
	alipay:"alipay",
	weixin:"weixin",
	ios:'ios',
	android:'android',
	app:'app',
	other:"other"
}
/**
 * 支付渠道号
 * @type {{baidu: string, alipay: string, weixin: string, other: string, alipayScan: string, weixinScan: string}}
 */
var payChannels={
	baidu:"3004",
	alipay:"3004",
	weixin:"3002",
	weixinScan:"3008",
	alipayScan:"3009",
	other:"other",
	app:'app'
}
/**
 * 授权code字段
 * @type {{baidu: string, alipay: string, weixin: string, other: string}}
 */
var authCodeColumns={
	baidu:"baidu_code",
	alipay:"auth_code",
	weixin:"code",
	other:""
}
var util={

};
var validates={

}
/**
 * 是否从微信推送进来的
 */
util.isPushFromWeixin= function () {
	var flag=true;
	if(util.isEmpty(sessionStorage.isPushFromWeixin)){
		flag=false;
	}
	return flag;
}
/**
 * 是否从app自己链接进来的
 */
util.isPushFromApp= function () {
	var flag=true;
	if(util.isEmpty(sessionStorage.isPushFromApp)){
		flag=false;
	}
	return flag;
}
/**
 * 是否从app ios链接进来的
 */
util.isPushFromIOS= function () {
	var flag=true;
	if(util.isEmpty(sessionStorage.isPushFromIOS)){
		flag=false;
	}
	return flag;
}
/**
 * 是否从app android链接进来的
 */
util.isPushFromAndroid= function () {
	var flag=true;
	if(util.isEmpty(sessionStorage.isPushFromAndroid)){
		flag=false;
	}
	return flag;
}
/**
 * 是否从支付宝推送进来的
 */
util.isPushFromAlipay= function () {
	var flag=true;
	if(util.isEmpty(sessionStorage.isPushFromAlipay)){
		flag=false;
	}
	return flag;
}
/**
 * 是否从微信城市服务的推送进来的
 */
util.isPushFromWeixinCityLife= function () {
	var flag=true;
	if(util.isEmpty(sessionStorage.isPushFromWeixinCityLife)){
		flag=false;
	}
	return flag;
}
util.setPushFromWeixin= function () {
	sessionStorage.isPushFromWeixin="1";
}
/**
 * app端自己生成链接[如优惠券说明等]
 */
util.setPushFromApp= function () {
	sessionStorage.isPushFromApp="1";
}
/**
 * app端android
 */
util.setPushFromAndroid= function () {
	sessionStorage.isPushFromAndroid="1";
}
/**
 * app端ios
 */
util.setPushFromIOS= function () {
	sessionStorage.isPushFromIOS="1";
}
util.setPushFromAlipay= function () {
	sessionStorage.isPushFromAlipay="1";
}
util.setPushFromWeixinCityLife= function () {
	sessionStorage.isPushFromWeixinCityLife="1";
}

util.isFromApp= function () {
	return (util.isFromAndroid() || util.isFromIOS());
}

/**
 * 当前链接是否ios app过来的
 */
util.isFromIOS=function(){
	if(util.getPlatform()==="ios"){
		return true;
	}

	//此处世月将相关信息放到浏览器配置中
	if(window.navigator.appVersion.indexOf("iosTJDAPPStore")!==-1){
		util.setChannel(channels.ios);
		util.setPlatform(platforms.ios);
		return true;
	}
	return false;
}
util.encodeUrl = function(url){

	return encodeURIComponent(url);
};
/**
 * 当前链接是否android app过来的
 */
util.isFromAndroid=function(){
	if(util.getPlatform()==="android"){
		return true;
	}
	if(window.navigator.appVersion.indexOf("android")!==-1){
		util.setChannel(window.navigator.appVersion.split("|")[1]);
		util.setPlatform("android");
		return true;
	}
	return false;
}
/**
 * 从url中取得渠道号：支付宝有channel,微信有code（暂时根据code区分，以后微信平台可能有多渠道！！！），百度地图什么都没有。
 */
util.getChannelFromUrl= function () {
	var url=window.location.href;
	var channel="";

	if(url.indexOf("auth_code=")!==-1){//支付宝菜单
		channel=channels.alipay;
	}else if(url.indexOf("code=")!==-1){//微信菜单
		channel=channels.weixin;
	}else if(url.indexOf("channelTjdApp")!==-1 ){//app端自己推送的链接【如优惠券规则等】__?data={channelTjdApp}tingjiandan{userId}tingjiandan{topic}
		if(util.isFromAndroid()){//安卓 APP
			util.setPushFromAndroid();
		}else if(util.isFromIOS()){//ios APP
			util.setPushFromIOS();
		}
		channel=util.getChannel();
	}else if(url.indexOf("channelapp")!==-1){//军哥app推送包月链接
		if(util.isFromAndroid()){//安卓 APP
			util.setPushFromAndroid();
		}else if(util.isFromIOS()){//ios APP
			util.setPushFromIOS();
		}
		channel=util.getChannel();
	}else if(url.indexOf("channel76")!==-1){//军哥微信推送链接
		util.setPushFromWeixin();
		channel=channels.weixin;
	}else if(url.indexOf("channel86")!==-1){//军哥支付宝推送链接
		util.setPushFromAlipay();
		channel=channels.alipay;
	}else if(url.indexOf("channel77")!==-1){//军哥微信城市服务推送链接[城市服务有可能单独加渠道号]
		util.setPushFromWeixinCityLife();
		channel=channels.weixin;
	}else{//百度地图
		channel=channels.baidu;
	}
	util.setChannel(channel);

	return channel;
}
/**
 * 支付宝app支付时回调url后边挂的参数
 */
util.getAlipayPayCallbackUrl= function (url) {
	if(util.isAlipay()){
		util.setCookie("alipayCallpackToPageUrl",constants.alipayAuthUrl+url+"?channel="+util.getChannel());
		var alipayCallbackUrl=constants.tcweixinUrl+"charge/alipayCallBack.html";
		return encodeURIComponent(alipayCallbackUrl);
	}
	return url;
}

/**
 * 根据渠道号设置平台/授权码/支付渠道
 * @param channel
 * @returns {*}
 */
util.setPlatformAuthcodePaychannelByChannel = function(channel){

	switch(channel){
		case channels.weixin:
			util.setAuthCodeColumn(authCodeColumns.weixin);
			util.setPlatform(platforms.weixin);
			util.setPayChannel(payChannels.weixin);
			break;
		case channels.alipay:
			util.setAuthCodeColumn(authCodeColumns.alipay);
			util.setPlatform(platforms.alipay);
			util.setPayChannel(payChannels.alipay);
			break;
		case channels.baidu:
			util.setAuthCodeColumn(authCodeColumns.baidu);
			util.setPlatform(platforms.baidu);
			util.setPayChannel(payChannels.baidu);
			break;
		default:
			util.setAuthCodeColumn(authCodeColumns.other);
			util.setPlatform(platforms.other);
			util.setPayChannel(payChannels.other);
			break;
	}

};

/**
 * 目前百度的没有鉴权，第一次登录需要把登录信息存入本地，以后读取cookie免登录
 */
util.setBaiduUserIdPhoneOpenId = function(userId,phone,openId){
	util.setCookie("baidu_user_id",userId);
	util.setCookie("baidu_phone",phone);
	util.setCookie("baidu_open_id",openId);
	util.setUserId(userId);
	util.setPhone(phone);
	util.setOpenId(openId);
};
/**
 * 判断在百度地图平台上之前是否有用户登录过，目前百度的没有鉴权，第一次登录需要把登录信息存入本地，以后读取cookie免登录
 */
util.isLoginedInBaiduBefore=function(){
	var flag=true;
	if(util.isEmpty(util.getCookie("baidu_user_id"))){
		flag=false;
	}else{
		//将持久缓存中的useId等信息放到临时页面缓存中
		var userId=util.getCookie("baidu_user_id");
		var phone=util.getCookie("baidu_phone");
		var openId=util.getCookie("baidu_open_id");
		util.setUserId(userId);
		util.setPhone(phone);
		util.setOpenId(openId);
		util.setChannel(channels.baidu);
		util.setPlatformAuthcodePaychannelByChannel(util.getChannel());
	}
	return flag;
}
/**
 * 构建一个类似java中的Map
 */
function Map() {
	var Struct = function(key, value) {
		this.key = key;
		this.value = value;
	};
	var put = function(key, value){
		for (var i = 0; i < this.arr.length; i++) {
			if ( this.arr[i].key === key ) {
				this.arr[i].value = value;
				return this;
			}
		}
		this.arr[this.arr.length] = new Struct(key, value);
		return this;
	};
	var get = function(key) {
		for (var i = 0; i < this.arr.length; i++) {
			if ( this.arr[i].key === key ) {
				return this.arr[i].value;
			}
		}
		return null;
	};
	//通过索引返回相应的key对应的value
	var getByIndex = function(index) {
		var exp = /^(([1-9])[\d]{0,15}|0)$/;
		var returnStr=null;
		if(exp.test(index) && (index < this.arr.length)){
			returnStr=this.arr[index].value;
		}
		return returnStr;
	};
	//通过索引返回对应的key
	var getKeyByIndex = function(index) {
		var exp = /^(([1-9])[\d]{0,15}|0)$/;
		var returnStr=null;
		if(exp.test(index) && (index < this.arr.length)){
			returnStr=this.arr[index].key;
		}
		return returnStr;
	};
	var remove = function(key) {
		//var v;
		for (var i = 0; i < this.arr.length; i++) {
			if(this.arr[i].key===key){
				//从数组删除此元素
				this.arr.splice(i,1);
				return;
			}
		}
	};
	var toJson = function(){
		var array = this;
		return JSON.stringify(new function(){
			if(array.size() >0){
				for(var i=0;i<array.size();i++){
					this[array.getKeyByIndex(i)]=array.getByIndex(i);
				}
			}
		});
	};
	var size = function() {
		return this.arr.length;
	};
	var isEmpty = function() {
		return this.arr.length <= 0;
	};
	this.arr = new Array();
	this.get = get;
	this.getByIndex = getByIndex;
	this.getKeyByIndex=getKeyByIndex;
	this.put = put;
	this.remove = remove;
	this.size = size;
	this.isEmpty = isEmpty;
	this.toJson = toJson;
}
util.closeWindow = function(){
	var isAlipay=util.isAlipay();
	var isWeixin=util.isWeixin();
	var channel=util.getChannel();
	util.clearAllCookies();//因为清除后缓存中信息都清空了，所以需要先将平台信息存到变量中去
	if(isAlipay){
		AlipayJSBridge.call('closeWebview');
	}else if(isWeixin){
		wx.closeWindow();
	}else{
		location.href = "../login/login.html?channel="+channel;
	}
}

/**
 * 取得url后边的参数
 * @param name
 * @returns
 */
util.getUrlParam=function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r !== null) return unescape(r[2]); return null;
}
//取后台推送的链接中的参数数组
util.getUrlArray=function(){
	var arr=window.location.href.split("?")[1].split("=")[1].split("&")[0].split('tingjiandan');
	return arr;
}

/**
 * 返回通用的参数
 * @returns
 */
util.getCommonParam=function(){
	var commonMap=new Map();
	commonMap.put("platform",util.getPlatform());
	commonMap.put("version",constants.version);
	commonMap.put("channel",util.getChannel());
	commonMap.put("userId",util.getUserId());
	commonMap.put("openId",util.getOpenId());
	if(util.isFromAndroid() || util.isFromIOS()){
		commonMap.put("topic",util.getTopic());
	}else{
		commonMap.put("topic",constants.version);//非app暂时无用，暂时用版本号
	}
	var commonStr=util.makeJsonStr(commonMap);
	return commonStr;
}
/**
 * 返回通用参数的Map对象
 * @returns
 */
util.getCommonMap=function(){
	var commonMap=new Map();
	commonMap.put("platform",util.getPlatform());
	commonMap.put("version",constants.version);
	commonMap.put("channel",util.getChannel());
	commonMap.put("userId",util.getUserId());
	commonMap.put("payChannel",util.getPayChannel());
	commonMap.put("openId",util.getOpenId());
	commonMap.put("openid",util.getOpenId());
	commonMap.put("phone",util.getPhone());
	if(util.isFromAndroid() || util.isFromIOS()){
		commonMap.put("topic",util.getTopic());
	}else{
		commonMap.put("topic",constants.version);//非app暂时无用，暂时用版本号
	}
	return commonMap;
}

/**
 * 设置授权码字段
 */
util.setAuthCodeColumn = function(authCodeColumn){
	sessionStorage.authCodeColumn = authCodeColumn;
};
/**
 * 获取授权码字段
 */
util.getAuthCodeColumn = function(){
	var returnStr=sessionStorage.authCodeColumn;
	if(util.isEmpty(sessionStorage.authCodeColumn)){
		returnStr=authCodeColumns.baidu;
	}
	return returnStr;
};
util.setPlatform=function(form){
	sessionStorage.commonPlatform=form;
}
util.getPlatform=function(){
	var returnStr=sessionStorage.commonPlatform;
	if(util.isEmpty(sessionStorage.commonPlatform)){
		returnStr= platforms.baidu;
	}
	return returnStr;
}

util.getCookie = function(key){
	return localStorage.getItem(key);
};
util.getSession = function(key){
	return sessionStorage.getItem(key);
};
util.removeCookie= function (key) {
	if(key){
		localStorage.removeItem(key);
	}
}
util.setCookie = function(key,value){
	if(localStorage){
		try{
			if(value){
				localStorage.removeItem(key);
				localStorage.setItem(key,value);
			}

		}catch(oException){
			if(oException.name === 'QuotaExceededError'){
				//console.log('超出本地存储限额！');
				//如果历史信息不重要了，可清空后再设置
				localStorage.clear();
				localStorage.setItem(key,value);
			}
		}
	}

};
util.setSession = function(key,value){
	if(sessionStorage){
		try{
			sessionStorage.removeItem(key);
			sessionStorage.setItem(key,value);
		}catch(oException){
			if(oException.name === 'QuotaExceededError'){
				//console.log('超出本地存储限额！');
				//如果历史信息不重要了，可清空后再设置
				sessionStorage.clear();
				sessionStorage.setItem(key,value);
			}
		}
	}

};
util.removeSession = function(key){
	if(key){
		sessionStorage.removeItem(key);
	}
};

//是否是微信来源
util.isWeixin = function(){

	return parseInt(util.getChannel()) === parseInt(channels.weixin);
};
//是否是iosAPP
util.isIOS = function(){

	return parseInt(util.getChannel()) === parseInt(channels.ios);
};
//是否是androidAPP
util.isAndroid = function(){

	return parseInt(util.getChannel()) === parseInt(channels.android);
};

//是否是支付宝来源
util.isAlipay = function(){
	return parseInt(util.getChannel()) === parseInt(channels.alipay);
};

//是否是百度来源
util.isBaidu = function(){
	return parseInt(util.getChannel()) === parseInt(channels.baidu);
};

util.isIosDevice= function () {
	var u = navigator.userAgent;
	return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}
util.isAndroidDevice= function () {
	var u = navigator.userAgent;
	return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
}

/**
 * 从localStorage中取百度平台的uesrId,非空说明百度平台已有用户注册过，直接进入
 */
util.getBaiduUserId=function(){
	return util.getCookie("baidu_user_id");
}

/**
 * 百度平台用户注册后将userId保存到本地localStorage中
 */
util.setBaiduUserId=function(userId){
	util.setCookie("baidu_user_id",userId);
}


/**
 * 清空本地所有localStorage中的信息
 */
util.clearAllCookies=function(){
	localStorage.clear();
	sessionStorage.clear();
}

//设置支付渠道
util.setPayChannel = function(payChannel){
	sessionStorage.payChannel = payChannel;
};

//获取支付渠道
util.getPayChannel = function(){
	var returnStr=sessionStorage.payChannel;
	if(util.isEmpty(sessionStorage.payChannel)){
		returnStr=payChannels.baidu;
	}
	return returnStr;
};
util.setChannel=function(channel){
	sessionStorage.channel=channel;
}

util.getChannel=function(){
	var returnStr=sessionStorage.channel;
	if(util.isEmpty(sessionStorage.channel)){
		returnStr=channels.baidu;
	}
	return returnStr;
}
util.setAppTopic=function(form){
	sessionStorage.appTopic=form;
}
util.getAppTopic=function(){
	return sessionStorage.appTopic; 
}

/**
* 设置微信版本基本信息到sessionStorage
 */
util.setBaseWXInfo=function(){
	sessionStorage.commonSystemType = "weixin";//设备类型
	sessionStorage.commonAppVersion = "commonAppVersion";//应用版本号
	sessionStorage.commonPhoneType = "commonPhoneType";//手机型号
	sessionStorage.commonPhoneSystemVersion = "commonPhoneSystemVersion";//手机系统版本
}

/**
 * 判断当前浏览器是否支持html5
 * @returns
 */
util.isSupportH5=function(){
	var flag=false;
	if(window.sessionStorage){
		flag=true;
	}
	return flag;
}
/**
 *取得本地存储中的userId
 */
util.getUserId=function(){
	return sessionStorage.commonUserId;
}

util.setUserId=function(userId){
	sessionStorage.commonUserId=userId;
	sessionStorage.userId=userId;
}

/**
 *取得本地存储中的topic
 */
util.getTopic=function(){
	return sessionStorage.topic;
}
/**
 *
 */
util.setTopic=function(topic){
	sessionStorage.topic=topic;
}
/**
 * tjd的alert，方便统一禁用
 * @param msg
 */
util.alert=function(msg){
	if(constants.debug){
		if(typeof msg==='object'){
			alert(JSON.stringify(msg));
		}else{
			alert(msg);
		}
	}
}
/**
 * 判断当前是不是测试环境
 */
util.isTestEnv= function () {
	return constants.shortDomain==="test.tingjiandan.com";
}
/**
 * 判断当前是不是生产环境
 */
util.isProEnv= function () {
	return constants.shortDomain==="open.tingjiandan.com";
}

/**
 *取得本地存储中的phone
 */
util.getPhone=function(){
	return sessionStorage.phone;
}
/**
 *取得本地存储中的phone
 */
util.setPhone=function(phone){
	sessionStorage.phone=phone;
}

/**
 * 将angular的$http.post设置为类似jquery的$.post的形式
 * @param $httpProvider
 */
util.initHttpSet=function($httpProvider){
	// Use x-www-form-urlencoded Content-Type
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	/**
	 * The workhorse; converts an object to x-www-form-urlencoded serialization.
	 * @param {Object} obj
	 * @return {String}
	 */
	var param = function(obj) {
		var query = '', name=null, value=null, fullSubName=null, subName=null, subValue=null, innerObj=null, i=0;

		for(name in obj) {
			value = obj[name];

			if(value instanceof Array) {
				for(i=0; i<value.length; ++i) {
					subValue = value[i];
					fullSubName = name + '[' + i + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += param(innerObj) + '&';
				}
			}
			else if(value instanceof Object) {
				for(subName in value) {
					subValue = value[subName];
					fullSubName = name + '[' + subName + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += param(innerObj) + '&';
				}
			}
			else if(value !== undefined && value !== null)
				query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
		}
//	    query +=(Math.random());
		return query.length ? query.substr(0, query.length - 1) : query;
	};

	// Override $http service's default transformRequest
	$httpProvider.defaults.transformRequest = [function(data) {
		return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	}];
}

/**
 * 构造通用的对象，方便转换为json字符串。参数为map对象
 */
util.commObj=function(map){
	var obj={};
	if(map && map.size()>0){
		var curKey=null,curValue=null;
		for(var i=0;i<map.size();i++){
			curKey=map.getKeyByIndex(i);
			curValue=map.getByIndex(i);
			obj[curKey]=curValue;
		}
	}
	return obj;
}
/**
 * 返回对象的json字符串
 * @param map
 * @returns
 */
util.makeJsonStr=function(map){
	var commObj=util.commObj(map);

	return JSON.stringify(commObj);
}

/**
 * 返回当前日期的8位日期
 * @returns {String}
 */
util.getNowEightDate=function(){
	var nowDate=new Date();
	
	var y=nowDate.getFullYear();
	var m=nowDate.getMonth()+1;
	var d=nowDate.getDate();
	var h=nowDate.getHours();
	var mi=nowDate.getMinutes();
	var s=nowDate.getSeconds();
	m=String(m);
	d=String(d);
	h=String(h);
	mi=String(mi);
	s=String(s);
	if(m.length<2){
		m="0"+m;
	}
	if(d.length<2){
		d="0"+d;
	}
	if(h.length<2){
		h="0"+h;
	}
	if(mi.length<2){
		mi="0"+mi;
	}
	if(s.length<2){
		s="0"+s;
	}
	return y+m+d;
}
/**
 * 返回当前日期，用给定分隔符分割，如果传入了日期，则用指定日期代替当前日期
 * @param symbol
 * @param nowDate
 * @returns {*}
 */
util.getNowDateStr=function(symbol,nowDate){
	if(util.isEmpty(nowDate)){
		nowDate=new Date();
	}
	if(util.isEmpty(symbol)){
		symbol="-";
	}

	var y=nowDate.getFullYear();
	var m=nowDate.getMonth()+1;
	var d=nowDate.getDate();
	var h=nowDate.getHours();
	var mi=nowDate.getMinutes();
	var s=nowDate.getSeconds();
	m=String(m);
	d=String(d);
	h=String(h);
	mi=String(mi);
	s=String(s);
	if(m.length<2){
		m="0"+m;
	}
	if(d.length<2){
		d="0"+d;
	}
	if(h.length<2){
		h="0"+h;
	}
	if(mi.length<2){
		mi="0"+mi;
	}
	if(s.length<2){
		s="0"+s;
	}
	return y+symbol+m+symbol+d;
}
/**
 * 返回当前日期或给定日期的用指定字符分割的时间字符串
 * @param symbol
 * @param nowDate
 * @returns {number}
 */
util.getNowSixTime=function(symbol,nowDate){
	if(util.isEmpty(symbol)){
		symbol=":";
	}
	if(util.isEmpty(nowDate)){
		nowDate=new Date();
	}

	var y=nowDate.getFullYear();
	var m=nowDate.getMonth()+1;
	var d=nowDate.getDate();
	var h=nowDate.getHours();
	var mi=nowDate.getMinutes();
	var s=nowDate.getSeconds();
	m=String(m);
	d=String(d);
	h=String(h);
	mi=String(mi);
	s=String(s);
	if(m.length<2){
		m="0"+m;
	}
	if(d.length<2){
		d="0"+d;
	}
	if(h.length<2){
		h="0"+h;
	}
	if(mi.length<2){
		mi="0"+mi;
	}
	if(s.length<2){
		s="0"+s;
	}
	return h+mi+s;
}


util.getHmsByTime=function(symbol,nowDate){
	if(util.isEmpty(symbol)){
		symbol=":";
	}
	if(util.isEmpty(nowDate)){
		nowDate=new Date();
	}

	var h=nowDate.getHours();
	var mi=nowDate.getMinutes();
	var s=nowDate.getSeconds();
	h=String(h);
	mi=String(mi);
	s=String(s);
	if(h.length<2){
		h="0"+h;
	}
	if(mi.length<2){
		mi="0"+mi;
	}
	if(s.length<2){
		s="0"+s;
	}
	return h+symbol+mi+symbol+s;
};

/**
 * 判断给定对象是否为空
 * @param str
 * @returns {Boolean}
 */
util.isEmpty=function(str){
	var flag=false;
	if( !str || str==="null" || str==="undefined" || str==="0"){
		flag=true;
	}
	return flag;
}
/**
 * 获取用户头像url(微信的话取用户头像，否则默认停简单LOGO)
 */
util.getHeadImgUrl=function(){
	var returnStr=sessionStorage.headimgurl;
	if(util.isEmpty(sessionStorage.headimgurl)){
		returnStr="../common/images/center.png";
	}
	return returnStr;
}

/**
 * 初始化允许页面上下滚动插件
 */
var theGlobalScroll="";
util.initScroll=function(){
			if(!util.isEmpty(theGlobalScroll) && typeof theGlobalScroll==="object"){
				theGlobalScroll.refresh();	
			}else{
				util.initGlobalScroll();
			}
}
util.initGlobalScroll=function(){
	setTimeout(function(){
		if(!util.isEmpty(theGlobalScroll) && typeof theGlobalScroll==="object"){
			theGlobalScroll.destroy();
			theGlobalScroll=null;
		}
		var scrollDom="";
		if(!util.isEmpty($("#wrapper").html())){
			scrollDom="#wrapper";
		}else if(!util.isEmpty($(".wrapper").html())){
			scrollDom=".wrapper";
		}
		theGlobalScroll = new IScroll(scrollDom, { 
			mouseWheel: true,
		    click:true,
		    fadeScrollbars:false,
		    scrollbars:false,
		    probeType:3
		});
	
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	}, 200); 
}

/**
 * 返回登录注册页面
 */
util.return2Login=function(){
	constants.go2Login();
};

/**
 * 判断给定字符是否是中文
 * @param temp
 * @returns {Boolean}
 */
validates.isChinese=function(s){
	var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
	var flag=true;
	if(!patrn.exec(s)){ 
		flag=false;
	}
	return flag;
}

/**
 * 验证给定字符是否是A-Za-z之间的英文字母
 */
validates.isEnglish=function(value){
	var str = /^[A-Za-z]*$/;
	var flag=false;
	if (str.test(value)){
		flag=true;
	}
	return flag;
}
/**
 * 设置文档标题
 * @param title
 */
util.setTitle=function(title){
	if(util.isEmpty(title)){
		title="";
	}
	document.title=title;
}
/**
 * 获取当前文档标题
 * @returns {*|string}
 */
util.getTitle=function(){
	return document.title;
}

/**
 * 给html页面加载页脚部分菜单导航页面
 */
util.loadFooter=function(index){
	var footUrl=constants.tcweixinUrl+"common/footer.html?"+Math.random();
	jQuery("footer").load(footUrl,function(){
		if(util.isEmpty(index)){
			index="";
		}
		index=String(index);//"",2,3,4分别代表默认状态从左到右依次处于选中状态

		if(util.isEmpty(index) || index==="1"){
			jQuery(".icon").addClass('lis'+index);
		}else{
			jQuery(".icon"+index).addClass('lis'+index);
		}

	});
}


util.clone=function(obj) {
	if(typeof obj === "object") {
		var returnObj=null;
		if($.isArray(obj)) {
			returnObj = [];
			for(var i = 0; i < obj.length; i++) returnObj.push(obj[i]);
		} else {
			returnObj = {};
			for(var key in obj) {
				returnObj[key] = util.clone(obj[key]);
			}
		}
		return returnObj;
	}
	return obj;
};

util.go2Order=function(){
	constants.go2MyOrder();
}
util.go2Wallet=function(){
	constants.go2MyWallet();
}
util.go2Car=function(){
	constants.go2MyCar();
}
util.go2Cwsc=function(){
	location.href="../monthlyPayment/cwsc.html?"+Math.random();
}
util.go2Service=function(){
	location.href="../center/service.html?"+Math.random();
}
util.go2Center=function(){
	constants.go2MyCenter();
}
util.getRandom=function(){
	return String(Math.random());
}

/**
 * 如果是app访问，设置app相关信息
 */
util.setAppInfo=function(){
	var userId=util.getUrlParam("userId");
	var version=util.getUrlParam("version");
	var platform=util.getUrlParam("platform");
	var channel=util.getUrlParam("channel");
	var topic=util.getUrlParam("topic");
	
	if(!util.isEmpty(userId)){
		util.setUserId(userId);
	}
	if(!util.isEmpty(version)){
		util.setVersion(version);
	}
	if(!util.isEmpty(platform)){
		util.setPlatform(platform);
	}
	if(!util.isEmpty(channel)){
		util.setChannel(channel);
	}
	if(!util.isEmpty(topic)){
		util.setAppTopic(topic);
	}

}
util.setVersion= function (version) {
	constants.version=version;
}
function freshMain(){
	location.reload();
}


/**
 * 是否全是数字
 * @param p
 * @returns
 */
validates.isAllNum=function(p){
	var re =/^\d*$/;
	return re.test(p);
}
/**
 * 验证手机号
 */
validates.isValidPhone=function(p){
	var re =/^1\d{10}$/;
    return re.test(p);
}
/**
 * 验证身份证号
 */
validates.isValidID=function(p){
	p=String(p).toUpperCase();
	var re=/(^\d{15}$)|(^\d{17}([0-9]|X$))/;
	return re.test(p);
}
/**
 * 验证必须正数，小数点后两位
 */
validates.isNumberWith2AfterDot= function (p) {

	var re =/^[0-9]{0,5}(\.[0-9]{0,2})?$/;
	return re.test(p);
}
/**
 * 信用卡有效期输入是否合法01/18
 * @param p
 */
validates.isValidCreditCardExpireDate=function(p){
	var re =/^\d{2}\/\d{2}$/;
    return re.test(p);
}
/**
 * 返回转换后的信用卡过期时间
 * @param p
 * @returns
 */
util.getTransedCreditCardExpireDate=function(p){
	return String(p).substring(0,2)+String(p).substring(3,5);
}


util.setJoyCarNum=function(carNum){//大悦城商家扫码
	if(!util.isEmpty(carNum)){
		localStorage.joyCarNum=carNum;
	}
}

/**
 * 给定日期加减给定月份
 * @param date
 * @param num
 */
util.sysdateAddMons=function(num,symbol,date){
	if(util.isEmpty(symbol)){
		symbol=".";
	}
	if(util.isEmpty(date)){
		date=new Date();
	}
	date.setMonth(date.getMonth()+num);
	return date.getFullYear()+symbol+util.transNum2Two((date.getMonth()+1))+symbol+util.transNum2Two(date.getDate());
	
}

/**
 * 将给定的数字转换为01，02类的
 */
util.transNum2Two=function(num){
	var returnStr="";
	if(num<10){
		returnStr="0"+num;
	}else{
		returnStr=String(num);
	}
	return returnStr;
}

/**
 * 将毫秒数的时间戳转化日期Date型
 */
util.transMilli2Date=function(millis){
	var startDate=new Date();
		startDate.setTime(millis);
		return startDate;
}


/**
 *设置本地存储中的openId
 */
util.setOpenId=function(openId){
	sessionStorage.openId=openId;
}
/**
 *取得本地存储中的openId
 */
util.getOpenId=function(){
	return sessionStorage.openId;
}
/**
 * tjd日志输出，简单包装下console.log (这个有点长)，
 * @param msg
 */
util.log=function(msg){
	console.log("tjd_log_:"+msg);
}

util.setItem= function (key,value) {
	sessionStorage.setItem(key,value);
}
util.getItem= function (key) {
	return sessionStorage.getItem(key);
}
util.removeItem= function (key) {
	sessionStorage.removeItem(key);
}

/**
 * 根据传入的class名称动态计算停放时长
 * @param className
 */
util.dynamicParkingTime= function (className) {
	setInterval(function() {
		$(className).each(function(){
			var nowTime = $(this).text();
			$(this).text(nowTime.parkingTimePlusOne());
		});
	}, 1000);
}

/**
 * 选择优惠券页面
 */
util.go2SelectCoupon= function () {
	location.href='../myWallet/selectCoupon.html';
}
/**
 * 我的订单页面
 */
util.go2MyOrder= function () {
	location.href='../myOrder/myOrder.html';
}
/**
 * 戴参数调转到app
 */
util.go2App= function (method,params) {
	if(util.isFromAndroid()){
		var paramLength=params.length;
		if(paramLength===0){
			android[method]();
		}else if(paramLength===1){
			android[method](params[0]);
		}else if(paramLength===2){

			android[method](params[0],params[1]);
		}else if(paramLength===3){
			android[method](params[0],params[1],params[2]);
		}else if(paramLength===4){
			android[method](params[0],params[1],params[2],params[3]);
		}else if(paramLength===5){
			android[method](params[0],params[1],params[2],params[3],params[4]);
		}else if(paramLength===6){
			android[method](params[0],params[1],params[2],params[3],params[4],params[5]);
		}else if(paramLength===7){
			android[method](params[0],params[1],params[2],params[3],params[4],params[5],params[6]);
		}
	}else if(util.isFromIOS()){
		var url="",splitBegin="://",split="/tingjiandan/";
		url+=method;
		url+=splitBegin;
		for(var i=0;i<params.length;i++){
			url+=params[i];
			if(i!==(params.length-1)){
				url+=split;
			}
		}
		location.href=url;
	}
}
/**
 * 当前页面是否在微信浏览器中打开的
 * @returns {boolean}
 */
util.isWeixinBrowser= function () {
	var flag=false;
	var ua = window.navigator.userAgent.toLowerCase();
	if(!util.isEmpty(ua.match(/MicroMessenger/i)) && ua.match(/MicroMessenger/i)[0] === 'micromessenger'){
		util.setPlatformAuthcodePaychannelByChannel(channels.weixin);
		flag=true;
	}
	return flag;
}
/**
 * 当前页面是否在支付宝浏览器中打开的
 * @returns {boolean}
 */
util.isAlipayBrowser= function () {
	var flag= (typeof AlipayJSBridge)==='object';
	if(flag){
		util.setChannel(channels.alipay);
		util.setPlatformAuthcodePaychannelByChannel(channels.alipay);
	}
	return flag;
}


//联系人手机号：EXTINFO001 必填
//联系人姓名：EXTINFO002
//联系人住址： EXTINFO003
//联系人身份证号：EXTINFO004
//其他：EXTINFO005
//联系人身份证照片附件：EXTINFO006
//联系人驾驶证照片附件 :  EXTINFO007
//车辆照片附件 ：  EXTINFO008

/**
 * 将给定class或id的input表单元素获得焦点（同时自动弹出输入法软键盘）
 * @param clazz
 * @param e 导致focus的事件
 */
util.focus= function (clazz,e) {
	var obj=$("#"+clazz)?$("#"+clazz):$("."+clazz);

	if(util.isIosDevice()){
		obj.trigger('click');
		obj.trigger('focus');
	}else{
		//安卓浏览器，如果没有以下两句的话，只获取到光标，却无法显示输入法
		e.stopPropagation();
		e.preventDefault();
		obj.focus();
	}
}

util.forbidFooterMove= function () {
	$("footer").bind('touchmove', function (e) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
}
/**
 * 微信授权页面
 * @param pageUrl 重定向页面地址
 * @param paramArray 页面需要挂载的参数
 * @returns {string}
 */
util.getWechatAuthUrl= function (pageUrl,paramArray) {
	var str="https://open.weixin.qq.com/connect/oauth2/authorize?appId="+constants.wechatAppId+"&redirect_uri=";
	var tail="&response_type=code&scope=snsapi_base&state=about#wechat_redirect";
	var paramStr="";
	str+=constants.tcweixinUrl;
	str+=pageUrl;
	if(!util.isEmpty(paramArray)){
		for(var i=0;i<paramArray.length;i++){
			if(i===0){
				paramStr+="?data=";
				paramStr+=paramArray[i];
			}else{
				paramStr+=(constants.splitParam+paramArray[i]);
			}
		}
	}

	str+=paramStr;
	str+=tail;
	return str;

}
/**
 * 支付宝授权页面
 * @param pageUrl 重定向页面地址
 * @param paramArray 页面需要挂载的参数
 * @returns {string}
 */
util.getAlipayAuthUrl= function (pageUrl,paramArray) {
	var str=constants.alipayAuthUrl;
	var paramStr="";
	str+=constants.tcweixinUrl;
	str+=pageUrl;
	if(!util.isEmpty(paramArray)){
		for(var i=0;i<paramArray.length;i++){
			if(i===0){
				paramStr+="?data=";
				paramStr+=paramArray[i];
			}else{
				paramStr+=(constants.splitParam+paramArray[i]);
			}
		}
	}

	str+=paramStr;
	return str;

}
/**
 * 微信城市生活业务完成后重定向微信的成功页面
 * @param resultData
 */
util.getWechatCityLifeJudgeSuccessUrl= function (resultData) {
	return "https://city.weixin.qq.com/cgi-bin/entry#wechat_redirect?result_data="+resultData;
}
/**
 * 检查当前网络是否可用
 */
util.isNetOnline= function () {
	return navigator.onLine;
}
/**
 * 当前页面用的计时器的时间是否和系统当前时间一致（为了解决锁屏或退出微信重新打开后，页面计时器显示的时间还是最后一次的时间bug）
 */
util.isTimeSyncWithSys= function () {
	var timeCountOwn=parseInt(util.getSession('timeCountOwn'))
	var sysTimeCount=new Date().getTime();
	if(Math.abs(timeCountOwn-sysTimeCount)>10){
		window.location.reload();
	}
}


/**
 * 当前页面用的计时器的时间是否和系统当前时间一致（为了解决锁屏或退出微信重新打开后，页面计时器显示的时间还是最后一次的时间bug）
 */
util.isTimerSyncWithSys= function () {
	if(util.getSession('timeCountOwn')){
		var timeCountOwn=parseInt(util.getSession('timeCountOwn'))
		var sysTimeCount=new Date().getTime();

		if(Math.abs(timeCountOwn-sysTimeCount)>10000){
			util.setSession('timeCountOwn',new Date().getTime());
			window.location.reload();
		}else{
			util.setSession('timeCountOwn',parseInt(util.getSession('timeCountOwn'))+1000);
		}
	}else{
		util.setSession('timeCountOwn',new Date().getTime());
	}

}

/**
 * 替换所有字符串
 */
String.prototype.replaceAll = function(s1,s2) {
	return this.replace(new RegExp(s1,"gm"),s2);

};
if(sessionStorage.isTest){
	var a=$("*[v-on\\:touchend]");
	console.log(a.length)
	for(var i=0;i< a.length;i++){
		var origin=$(a[i]).parent().html();
		if(!util.isEmpty(origin)){
			$(a[i]).parent().html(origin.replaceAll('v-on:touchend','@click'));
		}

	}
}
/**
 * 是否在进行python脚本测试
 */
util.isTest= function () {
	var flag=false;
	if(sessionStorage.isTest){
		flag=true;
	}
	return flag;
}
util.handleTest= function () {
	if(sessionStorage.isTest){
		var a=$("*[v-on\\:touchend]");
		console.log(a.length)
		for(var i=0;i< a.length;i++){
			var origin=$(a[i]).parent().html();
			if(!util.isEmpty(origin)){
				$(a[i]).parent().html(origin.replaceAll('v-on:touchend','@click'));
			}

		}
	}
}
/**
 * 是否是本地环境
 */
util.isLocalEnv= function () {
	var flag=true;
	if(util.isTestEnv() || util.isProEnv()){
		flag=false;
	}
	return flag;
}
/**
 * 是否当前页面链接来自于c端app，是的话将相关信息放到本地,如c端扫描二维码直接转发链接过来
 */
util.initIsFromAndroidApp=function(){
	if(typeof android!=='undefined'){
		if(util.isAndroidDevice() && !util.isEmpty(android)){
			var data=android.getUserInfo();
			if(data){
				util.setPushFromAndroid();
				util.setChannel(channels.app);
				util.setPlatform(platforms.android);
				util.setPayChannel(payChannels.app);
				data=JSON.parse(data);

				util.setUserId(data.userId);
				util.setTopic(data.topic);
				sessionStorage.isLogin="1";
				util.setDispatchFromAndroid();
			}
		}
	}

}
util.initIsFromIOSApp=function(){
	if(util.isIosDevice()){
		document.location='objCommon://';
	}

}

/**
 * 获取ios通用信息回掉函数
 * @param data
 */
function commonFromOC(data){
	if(data){
		util.setPushFromIOS();
		util.setChannel(channels.ios);
		util.setPlatform(platforms.ios);
		util.setPayChannel(payChannels.app);
		data=JSON.parse(data);

		util.setUserId(data.userId);
		util.setTopic(data.topic);
		sessionStorage.isLogin="1";
		util.setDispatchFromIOS();
	}

}
/**
 * 初始化链接来源相关信息（主要处理链接来自于app的情况）
 */
util.initAPPCommInfo= function () {
	util.initIsFromAndroidApp();
	util.initIsFromIOSApp();
}

util.isDispatchPushFromAndroid= function () {
	var flag=false;
	if(util.getSession('dispatchFromAndroid')){
		flag=true;
	}
	return flag;
}
util.isDispatchPushFromIOS= function () {
	var flag=false;
	if(util.getSession('dispatchFromIOS')){
		flag=true;
	}
	return flag;
}
util.setDispatchFromIOS= function () {
	util.setSession('dispatchFromIOS','1');
}
util.setDispatchFromAndroid= function () {
	util.setSession('dispatchFromAndroid','1');
}
/**
 * vue插件手动让dom实时刷新
 * @param data
 * @param key
 * @param newVal
 */
util.vueUpt=function(parentKey,keyStr,newVal){
	if(vue[parentKey]){
		var tmp=vue[parentKey];
		tmp[keyStr]=newVal;
		vue[parentKey]={};
		vue[parentKey]=tmp;
	}
}