
$(function () {
	var vue=new Vue({
		el: 'body',
		data: {
			userInfo:{
			}
		},
		methods: {
			go2Balance:function() {
				location.href="../myWallet/balance.html?"+Math.random();
			},
			go2Credit:function() {
				location.href="../myWallet/credit.html?"+Math.random();
			},
			go2Coupon:function() {
				location.href="../myWallet/coupon.html?"+Math.random();
			},
			go2Score:function() {
				location.href="../myWallet/score.html?"+Math.random();
			},
			//解绑手机号
			unbindPhone:function(){
				var msg="您确定解绑么？";
				$.showTjdModal({
					errorMsg:msg,
					type:2,
					withTwoButtons:1,
					callBack:vue.realUnbindPhone,
				});
			},
			realUnbindPhone:function(){
				tjdServices.wxClearBind().then(function(data){
					var msg="解绑成功";
					$.showTjdModal({
						errorMsg:msg,
						type:1,
						callBack:"util.closeWindow"
					});
				});
			},
			initWxJsAPI:function () {
				tjdServices.initWxJsAPI(['closeWindow']).then(function(data){
				});
			},
			/**
			 *
			 * 取得用户钱包相关信息
			 */
			getWallet:function () {
				tjdServices.request({
					method:'getWallet'
				}).then(function (data) {
					vue.userInfo=data.userInfo;
					vue.userInfo.userImg=util.getHeadImgUrl();
					vue.userInfo.phone=util.getPhone();
				});
			},

		},

	});

	function test() {
		util.setUserId('9da233efc29a4479a7ae64795dee2d35');
		util.loadFooter(4);
		util.initScroll();
		if(util.isWeixin()){
			vue.initWxJsAPI();
		}
		vue.getWallet();
	}
	function init(){
		tjdServices.getLoginInfo().then(function (data) {
			util.loadFooter(4);
			util.initScroll();
			if(util.isWeixin()){
				vue.initWxJsAPI();
			}

			vue.getWallet();
		}, function (data) {
			if(data==="unbind"){
				util.return2Login();
			}
		});
	}
//init();
	test();
	//为了解决页面兼容性问题，暂时忘记具体作用了。
	document.body.addEventListener('touchstart', function () { });
})

