function enablePhone(){
	$("#phone").attr('disabled',false);
}
function disablePhone(){
	$("#phone").attr('disabled',true);
}
function enableConfirmBtn(){
	$("#determine").attr('disabled',false);
}
function disableConfirmBtn(){
	$("#determine").attr('disabled',true);
}

function go2CityLife(){
	location.href="../cityLife/main.html";
}

var vue=new Vue({
	el: 'body',
	data: {
		focusValue:false,
		isEnableYzm:false,
		newestYzm:"",
		wait:59,
		phone:'',
		yzm:''
	},
	methods:{
		//跳转到我的订单页面
		go2MyOrderPage:function(){
			util.go2Order();
		},
		checkFinal:function() {
			if(!validates.isValidPhone(vue.phone)){
				setTimeout(function () {
					$.showTjdModal({
						type:2,
						errorMsg:"手机号格式不正确！"
					});
					return false;
				},600)
			}else{
				util.setPhone(vue.phone);
				return true;
			}
		},
		/**
		 * 注册
		 */
		register:function(){
			if(vue.checkFinal()===false){
				return false;
			}

			tjdServices.request({
				method:'wxBind',
				phone:vue.phone,
				yzm:vue.yzm
			}).then(function(data){
				sessionStorage.userId=data.userid;
				sessionStorage.commonUserId=data.userid;
				sessionStorage.isLogin="1";
				//是否为新注册用户
				util.setCookie("isNewUser",data.isNewUser);
				if(util.isBaidu()){
					util.setBaiduUserIdPhoneOpenId(sessionStorage.userId,vue.phone,String(Math.random()));
				}
				if(!util.isEmpty(data.carCount) && data.carCount.length>0){
					constants.go2MyOrder();
				}else{
					//无论是否新注册用户，如果注册进来或重新登录进来没有车辆的话，转到汽车页面，汽车页面添加完汽车后跳转到我的订单页面
					window.location.href='../myCar/myCar.html?originFrom=login';
				}
			});
		},
		getRealYzm:function() {

			tjdServices.request({
				method:'getPhoneCode',
				phone:util.getPhone()
			}).then(function(data){
				vue.newestYzm=data.timeStamp+vue.phone;
				vue.isEnableYzm=false;
				$("#phone").attr("readonly",true);
				disablePhone()
				vue.time($("#btnCode")[0]);
			});
		},
		validatePhone:function(){
			if(!util.isEmpty(vue.phone) && vue.phone.length===11){
				vue.isEnableYzm=true;
			}else{
				vue.isEnableYzm=false;
			}
			vue.isEnableNextBtn();
		},
		isEnableNextBtn:function(){
			if(!util.isEmpty(vue.phone) && !util.isEmpty(vue.yzm) && vue.phone.length===11 && vue.yzm.length>=4){
				enableConfirmBtn();
				$("#determine").css('background','#4bc1cd');
			}else{
				disableConfirmBtn();
				$("#determine").css('background','#e0e0e0');
			}
		},
		/**
		 * 验证码倒计时
		 */
		time:function(o){
			if (vue.wait === 0) {
				o.innerHTML = "验证";
				vue.wait = 59;
				vue.isEnableYzm=true;
				$("#phone").removeAttr("readonly");
				enablePhone()
			} else {
				if(util.isEmpty(vue.wait)){
					vue.wait=59;
				}
				o.innerHTML =vue.wait + "秒";
				vue.wait--;
				setTimeout(function () {
					vue.time(o);
				},1000)
			}
		},
		getYzm:function($event){
			if(vue.isEnableYzm){
				//验证手机号格式
				if(!validates.isValidPhone(vue.phone)){
					setTimeout(function () {
						$.showTjdModal({
							type:2,
							errorMsg:"手机号格式不正确！"
						});
					},600)
				}else{
					util.setPhone(vue.phone);
					vue.getRealYzm();
					util.focus('yzm',$event);
				}

			}
		},
		/**
		 * 微信平台的话显示城市服务入口
		 */
		showWxCityLife: function () {
			if(util.isWeixin()){
				$(".citylifeDiv").show();
			}
		}
	}
});

tjdServices.getLoginInfo().then(function () {
	vue.go2MyOrderPage();
}, function (data) {
	$("body").show();
	vue.showWxCityLife();
	if(data==="unbind"){
		disableConfirmBtn();
		enablePhone();
	}
});
