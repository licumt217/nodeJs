angular.module("TjdService", []).factory('LoginS',["$q", "$http","$timeout", function($q, $http,$timeout){
    var getLoginInfo = function(){
        var deferred = $q.defer();
        var promise = deferred.promise;
        var result="";
        //分为微信、支付宝、百度地图（没有鉴权）
        //验证登录分两条线（从微信菜单和推送渠道）
        if(!util.isEmpty(sessionStorage.isLogin) && sessionStorage.isLogin=="1"){//已登录
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
			if(sessionStorage.isLogin!="1"){
				//通过渠道获取授权码
				var code = util.getUrlParam(util.getAuthCodeColumn());
				//百度没有授权码
				//code和openId都没有的话返回登录页面
				if(!util.isBaidu() && util.isEmpty(code) && util.isEmpty(sessionStorage.openId)){
					//没有授权码，可能是通过浏览器直接访问，需要特殊处理。。。。后期操作
					result="unbind";
					deferred.reject(result);
				}
				code = code?code:"baidu";
				$http.post(constants.wxControlUrl+'wechatPublic/isLogin',
					{
						code:code,
						openId:util.getOpenId(),
						platForm:util.getPlatform()
					}, null).success(function(data, status, headers, config) {
					if(data.isSuccess=="0"){

						data=data.result;
						sessionStorage.headimgurl=data.headimgurl;
						if(data.isBind=="true"){
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


						if(data.isSuccess=="1"){
							$.showTjdModal({
								errorMsg:data.errorMSG
							});
						}else{
							$.showTjdModal({
							});
						}
						deferred.reject(result);
					}
				});
			}


		}
		//IOS下按钮无按下的动态效果bug fix
		//document.body.addEventListener('touchstart', function () { });
        return promise;
    };

    return {
        LoginInfo: getLoginInfo
    };
}]);
