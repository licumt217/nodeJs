
/**
 * Created by liq on 2016/1/7.
 * 所有调用tcserver的接口
 */
/*
angular.module('servicesM', []).factory('commonS', ['$http','$q','$timeout', function($http,$q,$timeout) {
    var initWxJsAPI=function(array){

        var deferred = $q.defer();
        var promise = deferred.promise;
        $http.post(constants.wxControlUrl+'wechatPublic/findWxJsSignature',
            {
                url : location.href,
                timestamp : '20150907',
                noncestr : 'liqiang'
            }, null).then(function(data){
            data=data.data;
            if(data.isSuccess==="0"){
                data=data.result;
                wx.config({
                    debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId : data.appId, // 必填，公众号的唯一标识
                    timestamp : data.timestamp, // 必填，生成签名的时间戳
                    nonceStr : data.noncestr, // 必填，生成签名的随机串
                    signature : data.signature,// 必填，签名，见附录1
                    jsApiList : array// 必填，需要使用的JS接口列表
                });
                deferred.resolve(data);
            }else if (data.isSuccess === "1") {
                $.showTjdModal({
                    errorMsg:data.errorMSG
                });
                deferred.reject();
            }else{
                deferred.reject();
                $.showTjdModal({
                });
            }
        });
        return promise;
    };

    var getActivityRewardList=function(currentPage,showCount){
        var objMap=new Map();
        objMap.put("userId",util.getUserId());
        objMap.put("currentPage",currentPage+"");
        objMap.put("showCount",showCount+"");
        var jsonStr=util.makeJsonStr(objMap);
        if(!_isCanRequestAgain){
            return;
        }else{
            _isCanRequestAgain=false;
            setTimeout(function () {
                _isCanRequestAgain=true;
            },400);
        }
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http.post(constants.tcserverUrl+'cport/msg/getByUserId',
            {
                common:util.getCommonParam(),
                data:jsonStr
            }, null).then(function(data){
            _isCanRequestAgain=true;
            data=data.data;
            if(data.isSuccess==="0"){
                deferred.resolve(data);
            }else if (data.isSuccess === "1") {
                $.showTjdModal({
                    errorMsg:data.errorMSG
                });
                deferred.reject();
            }else{
                deferred.reject();
                $.showTjdModal({
                });
            }
        });
        return promise;
    };

    //猫库用
    var validateVerifyCode=function(phone,yzm){
        if(!_isCanRequestAgain){
            return;
        }else{
            _isCanRequestAgain=false;
            setTimeout(function () {
                _isCanRequestAgain=true;
            },400);
        }
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http.get(constants.tcserverUrl+'cport/LoginCUser/validate/'+phone+'/'+yzm,
            {
            }, null).then(function(data){
            _isCanRequestAgain=true;
            data=data.data;
            if(data.isSuccess==="0"){
                deferred.resolve(data);
            }else if (data.isSuccess === "1") {
                $.showTjdModal({
                    errorMsg:data.errorMSG
                });
                deferred.reject();
            }else{
                deferred.reject();
                $.showTjdModal({
                });
            }
        });
        return promise;
    };

    var registerAndBindCar=function(phone,token){
        var objMap=new Map();
        objMap.put("openId", util.getOpenId());
        objMap.put("phone", phone);
        objMap.put("paySecret", token);
        var jsonStr=util.makeJsonStr(objMap);

        if(!_isCanRequestAgain){
            return;
        }else{
            _isCanRequestAgain=false;
            setTimeout(function () {
                _isCanRequestAgain=true;
            },400);
        }
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http.post(constants.tcserverUrl + "cport/LoginCUser/registerAndBindCar",
            {
                common : util.getCommonParam(),
                data : jsonStr
            }, null).then(function(data){
            _isCanRequestAgain=true;
            data=data.data;
            if(data.isSuccess==="0"){
                deferred.resolve(data);
            }else if (data.isSuccess === "1") {
                $.showTjdModal({
                    errorMsg:data.errorMSG
                });
                deferred.reject();
            }else{
                deferred.reject();
                $.showTjdModal({
                });
            }
        });
        return promise;
    };

    var mpPayWithDiscount=function(token,discountType,discountId,payChannel){
        var objMap=new Map();
        objMap.put("userId", util.getUserId());
        objMap.put("openId", util.getOpenId());
        objMap.put("paySecret", token);
        objMap.put("discountType",discountType);
        objMap.put("discountId",discountId);
        objMap.put("payChannel", payChannel+"");
        var jsonStr=util.makeJsonStr(objMap);

        if(!_isCanRequestAgain){
            return;
        }else{
            _isCanRequestAgain=false;
            setTimeout(function () {
                _isCanRequestAgain=true;
            },400);
        }
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http.post(constants.tcserverUrl + "cport/pay/mpPayWithDiscount",
            {
                common : util.getCommonParam(),
                data : jsonStr
            }, null).then(function(data){
            _isCanRequestAgain=true;
            data=data.data;
            if(data.isSuccess==="0"){
                deferred.resolve(data);
            }else if (data.isSuccess === "1") {
                $.showTjdModal({
                    errorMsg:data.errorMSG
                });
                deferred.reject();
            }else{
                deferred.reject();
                $.showTjdModal({
                });
            }
        });
        return promise;
    };

*/
//
//    return {
//
//        /**
//         * 初始化微信jsAPI
//         * @param array ：要使用的微信js方法数组
//         */
//        initWxJsAPI : function(array) {
//            return initWxJsAPI(array);
//        },
//
//
//        /**
//         * 获取活动奖励列表
//         * @param currentPage
//         * @param showCount
//         */
//        getActivityRewardList : function(currentPage,showCount) {
//            return getActivityRewardList(currentPage,showCount);
//        },
//
//        /**
//         * 验证手机号验证码的有效性
//         * @param phone
//         * @param yzm
//         * @returns {*}
//         */
//        validateVerifyCode : function(phone,yzm) {
//            return validateVerifyCode(phone,yzm);
//        },
//        /**
//         * 如果会员不是我司用户，自动注册并返回对应 的userId(需要token)，返回优惠券列表（5折或8折券）[猫库]
//         * @param phone
//         * @param token
//         */
//        registerAndBindCar : function(phone,token) {
//            return registerAndBindCar(phone,token);
//        },
//        /**
//         * 猫库大悦城支付停车费（可以有5折或8折停车券）
//         * @param token
//         * @param discountType
//         * @param discountId
//         * @param payChannel
//         */
//        mpPayWithDiscount : function(token,discountType,discountId,payChannel) {
//            return mpPayWithDiscount(token,discountType,discountId,payChannel);
//        },
//
//
//        //---------------------------------------------新接口------------------------------------------------
//
//
//        /**
//         * 绑定支付宝代扣
//         * @returns {*}
//         */
//        alipaySign:function(payBindId) {
//            return alipaySign(payBindId);
//        },
//
//    };
//}]);
var tjdServices={
    /**
     * 通用ajax访问对象
     * @param obj
     * @returns {*}
     */
    commonAjax: function (obj) {
        var deferred = $.Deferred();
        var promise = deferred.promise();
        var myRandom="?"+Math.random();
        var requestType='post',urlPrefix=constants.tcserverUrl+ "gateway"+myRandom;
        obj.params=util.isEmpty(obj.params)?{}:obj.params;
        if(!util.isEmpty(obj.requestType)){
            requestType=obj.requestType;
        }
        //区分是通用的还是大接口
        //默认是老接口
        if(!obj.isBigInterface){//老接口
            if(obj.isWxControl){
                urlPrefix= constants.wxControlUrl+obj.method;
            }else if(obj.isTcroute){
                urlPrefix= constants.tcrouteUrl+obj.method;
            }else{
                urlPrefix= constants.tcserverUrl+obj.method;
            }
            if(urlPrefix.indexOf('?')!==-1){
                urlPrefix=urlPrefix +"&xxx="+Math.random();
            }else{
                urlPrefix=urlPrefix +myRandom;
            }


            var commonParam=util.getCommonMap();
            if(obj.data){
                if(obj.data.hasOwnProperty('channel')){
                    commonParam.remove('channel')
                }
                if(obj.data.hasOwnProperty('payChannel')){
                    commonParam.remove('payChannel')
                }
                if(obj.data.hasOwnProperty('platform')){
                    commonParam.remove('platform')
                }
                if(obj.data.hasOwnProperty('phone')){
                    commonParam.remove('phone')
                }
            }


            obj.params={
                common:commonParam.toJson(),
                data:JSON.stringify(obj.data)
            }
            if(obj.isWxControl){
                obj.params=JSON.parse(obj.params.data);
            }
            if(obj.data && obj.data.isParamRaw){//嘉宾那边接口需要直接传具体参数的key-value
                obj.params=obj.data;
            }
        }

        $[requestType](urlPrefix,obj.params, function (data) {

            _isCanRequestAgain=true;
            if(obj.data && obj.data.successKey){//有些接口返回的成功失败值不是isSuccess
                data.isSuccess=data[obj.data.successKey];
            }

            if(data.isSuccess==="0"){
                deferred.resolve(data);
            }else if (data.isSuccess === "1") {
                if(obj.data && obj.data.handleExpOwn){
                    deferred.reject(data);
                }else{
                    if(util.getSession('isPcModal')){
                        $.showTjdPcModal({
                            errorMsg:data.errorMSG
                        });
                    }else{
                        setTimeout(function () {
                            $.showTjdModal({
                                errorMsg:data.errorMSG
                            });
                        },150)
                    }
                    deferred.reject();
                }

            }else{
                deferred.reject();
                if(util.getSession('isPcModal')){
                    $.showTjdPcModal({
                    });
                }else{
                    setTimeout(function () {
                        $.showTjdModal({
                        });
                    },150)
                }
            }
        });
        return promise;

    },
    /**
     * 前端通用请求接口
     */
    request : function(obj) {
        //预处理，无论查询还是更新操作在400毫秒内只能请求1次
        if(_isCanRequestAgain || obj.ignoreRepeat){
            _isCanRequestAgain=false;
            setTimeout(function () {
                _isCanRequestAgain=true;
            },400);
            return tjdServices[obj.method](obj);
        }

    },
    /**
     * 登录验证
     */
    getLoginInfo : function() {
        var deferred = $.Deferred();
        var promise = deferred.promise();
        var result="";
        //分为微信、支付宝、百度地图（没有鉴权）
        //验证登录分两条线（从微信菜单和推送渠道）
        if(!util.isEmpty(sessionStorage.isLogin) && sessionStorage.isLogin==="1"){//已登录
            util.forbidFooterMove();
            deferred.resolve(result);
        }else{
            //获取渠道
            var channel="";
            if(util.isEmpty(sessionStorage.channel)){
                channel=util.getChannelFromUrl();
            }else{
                channel=util.getChannel();
            }
            util.setPlatformAuthcodePaychannelByChannel(channel);
            if(util.isBaidu()){//如果是百度来源，判断缓存中是否登录过，是的话直接进入
                if(util.isLoginedInBaiduBefore()){
                    sessionStorage.isLogin="1";
                    util.forbidFooterMove();
                    deferred.resolve(result);
                }else{
                    result="unbind";
                    deferred.reject(result);
                }
            }else if(util.isPushFromWeixin() || util.isPushFromAlipay()){//微信或支付宝推送；取得openId验证是否已注册
                if(util.isEmpty(util.getOpenId())){//如果用户未登陆，且从推送进入到业务页面，经过业务页面的登录验证后openId已经有值了。此时返回到登录页面再次进行登录验证时url已经没有参数了，且openId已经有值
                    util.setOpenId(util.getUrlArray()[1]);
                }

            }else if(util.isPushFromWeixinCityLife()){//微信城市服务推送；取得openId参数，不用验证是否注册
                util.setOpenId(util.getUrlArray()[1]);
                sessionStorage.isLogin="1";
                util.forbidFooterMove();
                deferred.resolve(result);
            }else if(util.isFromAndroid() || util.isFromIOS()) {//默认从app过来的都是已登录了


                util.setUserId(util.getUrlArray()[1]);
                util.setTopic(util.getUrlArray()[2]);
                //从app的车位市场和停车服务包进来都先调用此方法，同时军哥给app的推送经戴总他们包装后进入服务详情页面后也调用此方法【下边这句不确定暂时有用没】
                //if(!util.isEmpty(util.getUrlParam('omRentId'))){
                //	sessionStorage.omRentId_rent=util.getUrlParam('omRentId');
                //}
                sessionStorage.isLogin="1";
                util.forbidFooterMove();
                deferred.resolve(result);
            }
            //此处加if判断是因为：有些手机在上边代码resolve后还继续执行之后代码
            if(sessionStorage.isLogin!=="1" && result!=="unbind"){
                //通过渠道获取授权码
                var code = util.getUrlParam(util.getAuthCodeColumn());
                //百度没有授权码
                //code和openId都没有的话返回登录页面
                if(!util.isBaidu() && util.isEmpty(code) && util.isEmpty(sessionStorage.openId)){
                    //没有授权码，可能是通过浏览器直接访问，需要特殊处理。。。。后期操作
                    result="unbind";
                    deferred.reject(result);
                }
                code = code||"baidu";
                $.post(constants.wxControlUrl+'wechatPublic/isLogin',{
                    code:code,
                    openId:util.getOpenId(),
                    platForm:util.getPlatform()
                }, function (data) {
                    if(data.isSuccess==="0"){
                        data=data.result;
                        sessionStorage.headimgurl=data.headimgurl;
                        if(data.isBind==="true"){
                            sessionStorage.commonUserId=data.cmUserId;
                            sessionStorage.userId=data.cmUserId;
                            sessionStorage.phone=data.phone;
                            sessionStorage.openId=data.openId;
                            util.setBaseWXInfo();
                            sessionStorage.isLogin="1";
                            util.forbidFooterMove();
                            deferred.resolve(result);
                        }else{
                            result="unbind";
                            sessionStorage.openId=data.openId;
                            deferred.reject(result);
                        }
                    }else{

                        if(data.isSuccess==="1"){
                            $.showTjdModal({
                                errorMsg:data.errorMSG
                            });
                        }else{
                            $.showTjdModal({
                            });
                        }
                        deferred.reject(result);
                    }
                })


            }


        }
        return promise;
    },
    /**
     * 获取用户车辆列表
     */
    getCarList : function() {
        var command='carOperation';
        var method1='getCarList';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 获取所有当前活动列表
     */
    getAllEffective : function() {
        var a=util.getCommonMap()
            .toJson();
        return tjdServices.commonAjax({
            method:'activity/getAllEffective',
        });
    },
    /**
     * 获取活动奖励列表
     */
    getActivityRewardList : function(obj) {


        return tjdServices.commonAjax({
            method:'cport/msg/getByUserId',
            data:{
                currentPage:String(obj.currentPage),
                showCount:String(obj.showCount),
                userId:util.getUserId(),
            }
        });
    },
    /**
     * 激活车辆
     * @param obj
     * @returns {*}
     */
    activateCar:function(obj){
        var command='carOperation';
        var method1='pluseCar';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('carId',obj.carId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 发动机号验证相关信息
     * @param obj
     * @returns {*}
     */
    getCarViolateNeeds:function(obj){
        var command='carOperation';
        var method1='getCarViolateNeeds';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('carNum',obj.carNum)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });

    },
    /**
     * 验证发动机号
     * @param obj
     * @returns {*}
     */
    verifyMotorNum:function(obj){
        var command='carOperation';
        var method1='updateCarMotorNumInfo';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('carId',obj.carId)
            .put('motorNum',obj.motorNum)
            .put('viNum',obj.viNum)
            .put('trafficMb',obj.trafficMb)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 删除汽车
     * @param obj
     * @returns {*}
     */
    deleteCar:function(obj){
        var command='carOperation';
        var method1='deleteCar';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('carId',obj.carId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 添加汽车
     * @param obj
     * @returns {*}
     */
    addCar:function(obj){
        var command='carOperation';
        var method1='addCar';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('carNum',obj.carNum)
            .put('carNumColor',obj.carNumColor)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },

    /**
     * 修改汽车
     * @param obj
     * @returns {*}
     */
    modifyCar:function(obj){
        var command='carOperation';
        var method1='updateCarInfo';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('carId',obj.carId)
            .put('newCarNum',obj.newCarNum)
            .put('newCarNumColor',obj.newCarNumColor)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 初始化微信jsAPI
     * @param array ：要使用的微信js方法数组
     * @returns {*}
     */
    initWxJsAPI:function(array){
        var deferred = $.Deferred();
        var promise = deferred.promise();
        $.post(constants.wxControlUrl+'wechatPublic/findWxJsSignature',{
            url : location.href,
            timestamp : '20150907',
            noncestr : 'liqiang'
        }, function (data) {
            if(data.isSuccess==="0"){
                data=data.result;
                wx.config({
                    debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId : data.appId, // 必填，公众号的唯一标识
                    timestamp : data.timestamp, // 必填，生成签名的时间戳
                    nonceStr : data.noncestr, // 必填，生成签名的随机串
                    signature : data.signature,// 必填，签名，见附录1
                    jsApiList : array// 必填，需要使用的JS接口列表
                });
                deferred.resolve(data);
            }else if (data.isSuccess === "1") {
                $.showTjdModal({
                    errorMsg:data.errorMSG
                });
                deferred.reject();
            }else{
                deferred.reject();
                $.showTjdModal({
                });
            }
        });
        return promise;

    },
    /**
     * 解绑微信和停简单账户绑定
     * @returns {*}
     */
    wxClearBind : function() {
        return tjdServices.commonAjax({
            method:'cport/LoginCUser/wxClearBind',
            data:{
                openid:util.getOpenId(),
            }
        });

    },
    /**
     * 用户钱包信息
     * @param obj
     * @returns {*}
     */
    getWallet:function(obj){
        var command='wallet';
        var method1='getWallet';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 查询可预约停车场列表和个人的预约信息
     */
    getAllParkAndReserveDetail:function(){
        return tjdServices.commonAjax({
            method:'reserve/getAllParkAndReserveDetail/'+util.getUserId(),
            data:{
            }
        });
    },
    /**
     * 预约车位
     * @param userId
     * @param parkId
     * @param reserveDate
     * @param reserveTime
     */
    appoint:function(obj){
        return tjdServices.commonAjax({
            method:'reserve/appoint',
            data:{
                parkId:obj.parkId,
                reserveDate:obj.reserveDate,
                reserveTime:obj.reserveTime
            }
        });
    },
    /**
     * 取消预约车位
     * @returns {*}
     */
    cancelAllReserve:function(){
        return tjdServices.commonAjax({
            method:'reserve/cancelAllReserve/'+util.getUserId(),
            data:{
            }
        });
    },
    /**
     * 查询信用
     * @returns {*}
     */
    getCredit:function(){
        var command='wallet';
        var method1='getCredit';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });

    },
    /**
     * 查询用户所有可用的红包
     * @returns {*}
     */
    getValidLuckyMoney:function(){
        var command='luckyMoney';
        var method1='getValidLuckyMoney';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 查询用户所有可用的优惠券
     * @returns {*}
     */
    getValidCoupon:function(){
        var command='luckyMoney';
        var method1='getValidDiscountCoupon';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });

    },
    /**
     * 查询用户不可用红包
     * @returns {*}
     */
    getInvalidLuckyMoney:function(obj){
        if(util.isEmpty(obj) || util.isEmpty(obj.limit)){
            obj={};
            obj.limit="10"
        }else{
            obj.limit=String(obj.limit);
        }
        var command='luckyMoney';
        var method1='getInvalidLuckyMoney';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('limit',obj.limit)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });

    },
    /**
     * 查询用户不可用折扣券
     * @returns {*}
     */
    getInvalidCoupon:function(obj){
        if(util.isEmpty(obj) || util.isEmpty(obj.limit)){
            obj={};
            obj.limit="10"
        }else{
            obj.limit+="";
        }
        var command='luckyMoney';
        var method1='getInvalidDiscountCoupon';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('limit',obj.limit)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });

    },
    /**
     * 查询个人余额明细
     * @param type
     * @param lastBalanceDate
     * @param lastBalanceTime
     */
    getBalanceDetail:function(obj){
        var data={};
        obj.type=String(obj.type);
        if(obj.type===0){//初次加载
            data={
                type:obj.type
            }
        }else if(obj.type===2){//加载更多
            //日期时间改为服务器时间
            data={
                type:obj.type,
                date:obj.date,
                time:obj.time
            }
        }else{
            obj.type='0';
            data={
                type:obj.type
            }
        }
        return tjdServices.commonAjax({
            method:'cport/CBalance?method=getBalanceDetail',
            data:data
        });


    },
    /**
     * 信用明细
     * @param type
     * @param lastBalanceDate
     * @param lastBalanceTime
     */
    getCreditDetail:function(obj){
        obj.type=String(obj.type);
        var command='wallet';
        var method1='getCreditDetail';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('type',obj.type);
        if(obj.type==='2' || obj.type==='1'){
            //日期时间改为服务器时间
            a.put("date",obj.date);
            a.put("time",obj.time);
        }
        a= a.toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });

    },
    /**
     * 根据用户输入的手机号获取验证码
     */
    getPhoneCode:function(obj){
        return tjdServices.commonAjax({
            method:'cport/LoginCUser.do?method=getPhoneCode',
            data:{
                phone:obj.phone
            }
        });

    },
    /**
     * 将微信账户或支付宝账户绑定停简单账户
     * @param obj
     * @returns {*}
     */
    wxBind:function(obj){
        return tjdServices.commonAjax({
            method:'cport/LoginCUser/wxBind',
            data:{
                openid:util.isEmpty(util.getOpenId())?String(Math.random()):util.getOpenId(),
                phone:obj.phone,
                phoneCode:obj.yzm
            }
        });
    },
    /**
     * 自动付款优先级开关开
     * @returns {*}
     */
    prioritySwitchOn:function(obj){
        var command='wallet';
        var method1='autoPaySwitchOn';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('payBindId',obj.payBindId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 自动付款优先级开关关
     * @returns {*}
     */
    prioritySwitchOff:function(obj){
        var command='wallet';
        var method1='autoPaySwitchOff';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('payBindId',obj.payBindId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 自动付款签约【百度/支付宝】
     * @param signType
     * @param returnUrl
     * @param accessInfo 支付宝签约用到，不同的签约类型
     */
    autoPaySign:function(obj){
        return tjdServices.commonAjax({
            method:'cport/pay/sign',
            data:obj
        });
    },
    /**
     * 查询用户自动付款列表
     * @returns {*}
     */
    getAllAutoPay:function(){
        var command='wallet';
        var method1='getAllAutoPay';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 快钱已签约信用卡解绑
     * @param signType
     * @param storableCardNo
     * @returns {*}
     */
    cancelSignKq:function(obj){
        return tjdServices.commonAjax({
            method:'creditCard/cancelSign',
            data:obj
        });
    },
    /**
     * 自动付款相关解约
     * @param signType
     */
    autoPayCancelSign:function(obj){
        return tjdServices.commonAjax({
            method:'cport/pay/cancelSign',
            data:obj
        });
    },
    /**
     * 快钱已签约信用卡查询
     * @param signType
     */
    getAllSignedKq:function(obj){
        return tjdServices.commonAjax({
            method:'creditCard/getAllSigned',
            data:obj
        });
    },
    /**
     * 快钱信用卡信息查询
     * @param cardNo
     * @returns {*}
     */
    queryCardInfoKq:function(obj){
        return tjdServices.commonAjax({
            method:'creditCard/queryCardInfo',
            data:obj
        });
    },
    /**
     * 快钱信用卡信息校验
     * @param cardNo
     * @param signType
     * @param name
     * @param idType
     * @param idCard
     * @param expireDate
     * @param cvv
     * @param phone
     */
    validateKqCreditCard:function(obj){
        return tjdServices.commonAjax({
            method:'creditCard/validate',
            data:obj
        });

    },
    /**
     * 当前订单自动支付（有余额或绑定了信用卡时）设置开关
     * @param omParkinfoId
     * @param onOff
     */
    setAutoPayOrder:function(obj){
        var command='order';
        var method1='orderWXDiscountSet';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('parkInfoId',obj.parkInfoId)
            .put('onOff',obj.onOff)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 当前订单现金支付设置开关
     * @param omParkinfoId
     * @param onOff
     */
    setPayCashOrder:function(obj,omParkinfoId,onOff){
        return tjdServices.commonAjax({
            method:'cport/CUserParkOrder/setPayCashOrder',
            data:obj
        });
    },
    /**
     * 待还款订单还款
     * @param amount
     * @param omParkInfoId
     * @param returnUrl
     * @param discountId
     * @param discountType //大悦城1分钱活动
     * @returns {*}
     */
    repayment:function(obj){
        return tjdServices.commonAjax({
            method:'cport/pay/repayment',
            data:obj
        });
    },
    /**
     * 删除历史订单
     * @param omParkInfoId
     */
    removeHistoryOrder:function(obj){
        return tjdServices.commonAjax({
            method:'cport/CUserParkHistoryOrder/removeHistoryOrder',
            data:obj
        });
    },
    /**
     * 根据订单ID移除当前订单
     * @param omParkInfoId
     */
    removeCurrentOrder:function(obj,omParkInfoId){
        return tjdServices.commonAjax({
            method:'cport/CUserParkOrder/removeCurrentOrder',
            data:obj
        });
    },
    /**
     * 根据订单id和待还款金额查询此订单相关的折扣券信息（首小时1分钱停车、5折8折停车活动等）
     * @param omParkInfoId
     * @param payAmount
     */
    getDiscountAmount:function(obj,omParkInfoId,payAmount){
        return tjdServices.commonAjax({
            method:'activity/discount/getDiscountAmount',
            data:obj
        });

    },
    /**
     * 获取当前订单和代还款订单信息
     * @param command
     * @param methodArray
     * @returns {*}
     */
    getCurAndTopayAndHistoryOrders:function(){
        var command='order';
        var method1='getCurrentOrder';
        var method2='getDebtOrder';
        var method3='getHistoryOrder';
        var historyOrderNums=3;
        var a=util.getCommonMap().put('command',command).put('method',method1).toJson()+
            "|"+util.getCommonMap().put('command',command).put('method',method2).toJson()+
            "|"+util.getCommonMap().put('command',command).put('method',method3).put('type',"0")
                .put('limit',String(historyOrderNums))
                .put('debtParkInfoIds',"$.order_getDebtOrder.debtOrders[*].omParkInfoId")
                .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 当前订单核算接口
     * @param orderId
     */
    accountOrder:function(obj){
        var command='order';
        var method1='accountOrder';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('parkInfoId',obj.parkInfoId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 当前订单支付接口
     * @param orderId
     * @param luckyMoneyId
     * @param outType 出场类型"normal","prepayment"
     */
    payOrder:function(obj,orderId,luckyMoneyId,payAmount,isUseBalance,outType,returnUrl){
        if(util.isEmpty(obj.isUseBalance)){
            isUseBalance="false";
        }else{
            isUseBalance="true";
        }
        var command='order';
        var method1='payOrder';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('parkInfoId',obj.parkInfoId)
            .put('luckyMoneyId',obj.luckyMoneyId)
            .put('payAmount',obj.payAmount)
            .put('isUseBalance',obj.isUseBalance)
            .put('outType',obj.outType)
            .put('returnUrl',obj.returnUrl)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 历史订单接口，排除掉给定的待还款订单
     * @param type
     * @param date
     * @param time
     * @param debtOrderIds
     * @returns {*}
     */
    loadHistoryOrders:function(obj){
        var command='order';
        var method1='getHistoryOrder';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('type',obj.type)
            .put('debtParkInfoIds',obj.debtParkInfoIds);
        if(!util.isEmpty(obj.type) && obj.type==='0'){
            //首次
        }else{
            //之后
            a= a.put('date',obj.date).put('time',obj.time);
        }
        a= a.toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });

    },
    /**
     * 快钱信用卡签约
     * @param cardNo
     * @param signType
     * @param name
     * @param idType
     * @param idCard
     * @param expireDate
     * @param cvv
     * @param validCode
     * @param token
     * @returns {*}
     */
    creditCardSignOfKq:function(obj,cardNo,signType,name,idType,idCard,expireDate,cvv,validCode,token){
        return tjdServices.commonAjax({
            method:'creditCard/sign',
            data:obj
        });
    },
    /**
     * 充值前首次核算
     * @param amount
     * @param payChannel
     */
    countTopUpFee:function(obj,amount,returnUrl){
        return tjdServices.commonAjax({
            method:'cport/pay/countTopUpFee',
            data:obj
        });
    },
    /**
     * 待还款订单详情
     * @param omParkinfoId
     * @returns {*}
     */
    getOrderDetailWithDebt:function(obj){
        return tjdServices.commonAjax({
            method:'cport/CUserParkOrderDetail/getOrderDetailWithDebt',
            data:obj
        });
    },
    /**
     * 查询订单详情
     * @param orderId
     */
    getOrderDetail:function(obj){
        return tjdServices.commonAjax({
            method:'cport/CUserParkOrderDetail/getOrderDetail',
            data:obj
        });
    },
    /**
     * 开放停车场历史订单设置现金支付
     * @returns {*}
     */
    setCashPayWithHistoryOrder:function(obj){
        var command='order';
        var method1='setCashPayWithHistoryOrder';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('parkInfoId',obj.parkInfoId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 查询可开发票金额
     * @returns {*}
     */
    applyBill:function(obj){
        return tjdServices.commonAjax({
            method:'cport/bill/applyBill',
            data:obj
        });
    },
    /**
     * 提交开发票申请
     * @param phone
     * @param recieveName
     * @param recievePhone
     * @param billAmount
     * @param recieveAddress
     */
    applyCommit:function(obj){
        return tjdServices.commonAjax({
            method:'cport/bill/applyCommit',
            data:obj
        });
    },
    /**
     * 查询已开发票列表
     * @param type
     * @param pageCount
     */
    queryBill:function(obj,type,pageCount){
        if(util.isEmpty(obj.pageCount)){
            obj.pageCount=String(20);
        }
        return tjdServices.commonAjax({
            method:'cport/bill/queryBill',
            data:obj
        });
    },
    /**
     * 场内订单预付费（微信城市服务等用）
     * @param amount
     * @param payChannel
     * @param omParkInfoId
     * @returns {*}
     */
    mpCityPrePay:function(obj){
        return tjdServices.commonAjax({
            method:'cport/pay/mpCityPrePay',
            data:obj
        });

    },
    /**
     * 查询某用户某车牌的在场订单信息（微信城市服务等）
     * @param openId
     * @param carNum
     * @returns {*}
     */
    currentOrderCityLife:function(obj,carNum){
        return tjdServices.commonAjax({
            method:'cport/CUserParkOrder/city/currentOrder',
            data:obj
        });
    },
    /**
     * 微信城市服务预付费退款操作
     * @param omPrePayId
     * @returns {*}
     */
    mpCityRefund:function(obj,omPrePayId){
        return tjdServices.commonAjax({
            method:'cport/pay/mpCityRefund',
            data:obj
        });
    },
    /**
     * 根据code取openId
     * @param code
     * @returns {*}
     */
    findOnlyOpenIdByCode:function(obj,code){
        return tjdServices.commonAjax({
            method:'wechatPublic/findOnlyOpenIdByCode',
            data:obj,
            isWxControl:true
        });
    },
    /**
     * 根据经纬度获取停车场信息[微信城市服务]
     * @param lng
     * @param lat
     * @param scope
     * @param limit
     * @returns {*}
     */
    getParkInfoWithoutCs:function(obj,lng,lat,scope,limit){
        if(util.isEmpty(obj.limit)){
            obj.limit="20";
        }
        obj.random=String(Math.random());
        return tjdServices.commonAjax({
            method:'cport/CPark/getParkInfoWithoutCs',
            data:obj
        });
    },
    /**
     * 查询用户场内订单信息和商家优惠券信息【商家扫码，从微信扫码进入】
     * @param tjdSign
     */
    scanCodeFromWx:function(obj,tjdSign){
        return tjdServices.commonAjax({
            method:'cport/QRcode/wxScanCode/'+util.getOpenId()+'/'+obj.sign,
            data:obj
        });
    },
    /**
     * 查询用户场内订单信息和商家优惠券信息【商家扫码，从非微信扫码进入】
     * @param tjdSign
     */
    scanCodeFromNoWx:function(obj){
        return tjdServices.commonAjax({
            method:'cport/QRcode/wxScanCode/'+obj.sign,
            data:obj
        });
    },
    /**
     * 查询用户场内订单信息和商家优惠券信息【商家扫码，从APP扫码进入】
     * @param tjdSign
     */
    scanCodeFromApp:function(obj,tjdSign){
        return tjdServices.commonAjax({
            method:'cport/QRcode/scanCodeByUser/'+util.getUserId()+'/'+obj.sign,
            data:obj
        });
    },
    /**
     * 将优惠券绑定到场内订单上【商家扫码】
     * @param omParkinfoId
     * @param mmMerqrcodeId
     * @returns {*}
     */
    confirmBind:function(obj,omParkinfoId,mmMerqrcodeId){
        return tjdServices.commonAjax({
            method:'cport/QRcode/confirm/'+obj.omParkinfoId+"/"+obj.mmMerqrcodeId,
            data:obj
        });
    },
    /**
     * 查询用户场内订单，如果多个订单则让用户选，否则调用将优惠券绑定到场内订单接口【商家扫码】
     * @param carNum
     * @param mmMerqrcodeId
     * @param pmParkId
     */
    bind:function(obj,carNum,mmMerqrcodeId,pmParkId){
        return tjdServices.commonAjax({
            method:'cport/QRcode/bind',
            data:obj
        });
    },
    /**
     * 查询订单信息和此订单关联的商家优惠券信息【商家扫码】
     * @param omParkInfoId
     */
    queryOrderInfoSC:function(obj,omParkInfoId){
        return tjdServices.commonAjax({
            method:'cport/QRcode/query/'+obj.omParkInfoId,
            data:obj
        });
    },
    /**
     * 根据token获取订单信息（金地（调嘉宾接口））
     * @param amount
     * @param returnUrl
     */
    getOrderInfoByTokenInJindi:function(obj,params){
        return tjdServices.commonAjax({
            method:"authInfo/selectOrderByToken",
            data:obj,
            isTcroute:true

        });
    },
    /**
     * 金地支付
     * @param params
     * @returns {*}
     */
    jindiPay:function(obj,params){
        return tjdServices.commonAjax({
            method:"authInfo/wxPay",
            data:obj,
            isTcroute:true
        });
    },
    /**
     * 自助缴费机心跳检测
     * @returns {*}
     */
    autoPayMachineHeartCheck:function(){
        var command='selfPay';
        var method1='heartBeat';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('selfMacId',localStorage.selfMacId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 根据缴费机id查询车场id
     */
    getParkIdBySelfMacId:function(params){
        var command='selfPay';
        var method1='getParkId';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('selfMacId',localStorage.selfMacId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 查询在场订单
     * @param parkId
     * @param carNum
     */
    getParkInfos:function(obj){
        var command='selfPay';
        var method1='getParkInfos';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('selfMacId',localStorage.selfMacId)
            .put('carNum',obj.carNum)
            .put('carNumColor',obj.carNumColor)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 车位查询（反向寻车）
     * @returns {*}
     */
    getCarPorts:function(obj){
        var command='selfPay';
        var method1='getCarPorts';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('selfMacId',localStorage.selfMacId)
            .put('carNum',obj.carNum)
            .put('carNumColor',obj.carNumColor)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });

    },
    /**
     * 获取订单未支付金额（自助缴费机）
     * @param parkId
     * @param parkinfoId
     * @returns {*}
     */
    getUnPayAmount:function(obj,params){
        var command='selfPay';
        var method1='account';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('selfMacId',localStorage.selfMacId)
            .put('vipUserId',util.getSession('vipUserId'))
            .put('parkInfoId',obj.parkInfoId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 查询订单信息和支付二维码图片信息（自助缴费机）
     * @param payChannel
     * @param amount
     * @param parkinfoId
     * @param parkId
     */
    getQrecode:function(obj,params){
        var command='selfPay';
        var method1='getQrecode';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('selfMacId',localStorage.selfMacId)
            .put('amount',obj.amount)
            .put('parkInfoId',obj.parkInfoId)
            .put('payChannel',obj.payChannel)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 登录三方积分会员系统
     * @param obj
     */
    scoreSysLoginByPhone:function(obj,params){
        var command='selfPay';
        var method1='vipLoginByPhone';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('selfMacId',localStorage.selfMacId)
            .put('phone',obj.phone)
            .put('phoneCode',obj.phoneCode)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 会员等级兑换(会员系统)
     * @param obj
     */
    vipLevelExchange:function(obj,params){
        var command='selfPay';
        var method1='exchangeLevel';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('selfMacId',localStorage.selfMacId)
            .put('vipUserId',util.getSession('vipUserId'))
            .put('parkInfoId',obj.parkInfoId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 获取可兑换的券列表
     * @param obj
     */
    getCanExchangeScoreList:function(obj,params){
        var command='selfPay';
        var method1='getAllTickets';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('selfMacId',localStorage.selfMacId)
            .put('vipUserId',util.getSession('vipUserId'))
            .put('parkInfoId',obj.parkInfoId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 积分兑换
     * @param obj
     */
    exchangeScores:function(obj,params){
        var command='selfPay';
        var method1='exchangeScore';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('selfMacId',localStorage.selfMacId)
            .put('vipUserId',util.getSession('vipUserId'))
            .put('parkInfoId',obj.parkInfoId)
            .put('tickets',obj.tickets)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 积分会员系统登录
     * @param params
     * @returns {*}
     */
    scoreSysLoginByCard:function(obj,params){
        var command='selfPay';
        var method1='vipLoginByCard';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('selfMacId',localStorage.selfMacId)
            .put('cardNo',obj.cardNo)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 积分会员系统注册
     * @param params
     * @returns {*}
     */
    scoreSysRegister:function(obj,params){
        var command='selfPay';
        var method1='vipUserRegister';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('selfMacId',localStorage.selfMacId)
            .put('phone',obj.phone)
            .put('phoneCode',obj.phoneCode)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 查询订单支付状态（自助缴费机）
     * @param orderId
     */
    getWxPayState:function(obj,params){
        var command='selfPay';
        var method1='getPayState';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('selfMacId',localStorage.selfMacId)
            .put('prePayId',obj.prePayId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 根据车牌号和停车场id查询在场订单（微信和支付宝扫码后输入车牌号进行场内支付时调用,车场二维码场内支付）
     * @param parkId
     * @param carNum
     */
    insidePrePayGetOrder:function(obj){
        var command='order';
        var method1='insidePrePayGetOrder';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('carNum',obj.carNum)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 根据当前订单id获取此订单可用的红包列表，第一个为推荐的红包
     * @param parkId
     * @param payAmount
     * @returns {*}
     */
    getCouponsByOrderId:function(obj,parkId,payAmount){
        var command='luckyMoney';
        var method1='getOrderLuckyMoney';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('parkId',obj.parkId)
            .put('payAmount',obj.payAmount)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 根据openId或code查询用户微信个人信息
     * @param openId
     * @param code
     */
    getWxUserInfo:function(obj,openId,code){
        return tjdServices.commonAjax({
            method:"wechatPublic/getUserInfo",
            data:obj,
            isWxControl:true
        });
    },
    /**
     * 场内扫码预支付确认支付
     * @returns {*}
     */
    insidePrePay:function(obj){
        if(util.isEmpty(obj.isUseBalance)){
            obj.isUseBalance='false';
        }
        var command='order';
        var method1='insidePrePay';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('parkInfoId',obj.parkInfoId)
            .put('channel',obj.channel)
            .put('payChannel',obj.payChannel)
            .put('payAmount',String(obj.payAmount))
            .put('platform',obj.platform)
            .put('openId',obj.openId)
            .put('returnUrl',obj.returnUrl)
            .put('isUseBalance',obj.isUseBalance)
            .put('topic',util.getTopic())
            .put('luckyMoneyId',obj.luckyMoneyId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });

    },
    /**
     * 场内扫码预支付查询订单详情并核算
     * @returns {*}
     */
    insidePrePayGetOrderInfo:function(obj,orderId){
        var command='order';
        var method1='insidePrePayGetOrderInfo';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('parkInfoId',obj.parkInfoId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },
    /**
     * 查询预付费订单详情
     * @param omParkInfoId
     * @param prePayType
     * @returns {*}:
     */
    getPrePayOrderDetail:function(obj,omParkInfoId,prePayType){
        return tjdServices.commonAjax({
            method:"cport/CUserParkOrder/getPrePayOrderDetail",
            data:obj
        });
    },
    /**
     * 预付费
     * @param amount
     * @param payChannel
     * @param omParkInfoId
     * @param prePayType
     * @returns {*}
     */
    prePay:function(obj,amount,payChannel,omParkInfoId,prePayType){
        return tjdServices.commonAjax({
            method:"cport/pay/prePay",
            data:obj
        });

    },
    /**
     * 订单支付【type=0是首次核算，此时只需要传递前两个参数即可,type=1是二次核算】
     * @param type
     * @param omParkInfoId
     * @param outType
     * @param isUserBalance
     * @param couponId
     * @returns {*}
     * //在当前订单支付算预支付，在出场推送算正常结算（推送的等出场推送进入的订单详情页面高宝做好后再做）
     */
    payParkFee:function(obj,type,omParkInfoId,outType,isUserBalance,couponId){
        return tjdServices.commonAjax({
            method:"cport/pay/payParkFee",
            data:obj
        });
    },
    //---------------------------------------违章查询-----------------------------------
    /**
     * 发动机号验证相关信息
     * @param obj
     * @returns {*}
     */
    queryPeccancy:function(obj){
        var command='carOperation';
        var method1='queryPeccancy';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('carNum',obj.carNum)
            .put('motorNum',obj.motorNum)
            .put('viNum',obj.viNum)
            .put('trafficMb',obj.trafficMb)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });

    },


    /**
     * 大B进场后吐出小票，用户扫描订单后，查看订单详细信息(大B用户扫码场内支付)
     * @param parkId
     * @param orderId 大B本地的订单号
     */
    insideLocalGetOrder:function(obj){
        var command='order';
        var method1='insideLocalGetOrder';
        var a=util.getCommonMap()
            .put('command',command)
            .put('method',method1)
            .put('orderId',obj.orderId)
            .put('parkId',obj.parkId)
            .toJson();
        return tjdServices.commonAjax({
            params:a,
            isBigInterface:true
        });
    },











}