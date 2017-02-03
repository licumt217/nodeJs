$(function () {
	var vue=new Vue({
		el: 'body',
		data: {
			isWxBrowser:true,
			isAdImgDone:false,
			//当前订单和代还款订单广告语等
			orderSetting:{},
			noAllOrders:false,
			isThereHistoryOrders:false,
			autoPayOrder:{},
			cashSwitchOrder:{},
			//无历史订单提示信息
			isShowNoHisOrders:false,
			//显示暂无当前订单的提示信息
			isShowNoCurOrderClass:true,
			toDelHistoryOrderIndex:-1,
			historyOrders:[],
			toDelHistoryOrder:{},
			curToDeleteOrderId:'',
			currentOrders:[],
			debtOrders:[],
			isLoadingMore:false,
			debtOrderIds:[],
			curPayOrder:{},
			curOrderCountData:{},
			curOrderPayData:{},
			lastHistoryDate:'',
			lastHistoryTime:''
		},
		methods:{
			transOrders: function () {
				var lastIndex=vue.historyOrders.length-1;

				vue.transCurOrders();
				vue.transToPayOrders();
				//记录最后一条历史订单的date,time
				if(lastIndex!==-1){
					if(!util.isEmpty(vue.historyOrders)){
						vue.lastHistoryDate=vue.historyOrders[lastIndex].endDate;
						vue.lastHistoryTime=vue.historyOrders[lastIndex].endTime;
					}
					$(".pullUp").removeClass('tjdHidden');
					vue.historyOrders=vue.transHistoryOrders(vue.historyOrders);
				}
			},
			/**
			 * 广告位的图片加载完全后重新初始scroll,否则可能页面底部不出现，iscroll导致的问题
			 */
			hasAdImgDone: function () {
				if(vue.isAdImgDone){
					vue.isAdImgDone=false;
					setTimeout(function () {
						initScroll();
					})
				}
			},
			watchAdImg: function () {
				setInterval(function () {
					vue.hasAdImgDone();
				},20)
			},
			/**
			 * 将当前订单对应的进出场日期时间和停放时长等转为需要的格式
			 */
			transCurOrders: function () {
				var i=0;

				for(;i<vue.currentOrders.length;i++){
					vue.currentOrders[i].startDate=vue.currentOrders[i].startDate.transEightDate2Str(".");
					vue.currentOrders[i].startTime=vue.currentOrders[i].startTime.transSixTime2Str();
					vue.currentOrders[i].startDateTime=vue.currentOrders[i].startDate+" "+vue.currentOrders[i].startTime;
					vue.currentOrders[i].parkTime=vue.currentOrders[i].parkTime.transParkingTime2Str();

					if(!util.isEmpty(vue.currentOrders[i].bindTicketDt)){
						vue.currentOrders[i].bindTicketDt=vue.currentOrders[i].bindTicketDt.trans14Datetime2Str();
					}
					if(!util.isEmpty(vue.currentOrders[i].payDt)){
						vue.currentOrders[i].payDt=vue.currentOrders[i].payDt.trans14Datetime2Str();
					}

					//判断是否需要显示优惠券以及如何显示[缓存中已有选择的优惠券，用缓存的;或用户选择不使用优惠券；或用后台推荐的]
					vue.showSelectedCoupon(i);
					//是否需要显示还需要支付多少停车费区域
					vue.currentOrders[i].isShowAmountLeftZone=vue.isShowAmountLeftZone(vue.currentOrders[i]);
					//微电影广告位
					vue.currentOrders[i].isShowMicroMovie=!util.isEmpty(vue.currentOrders[i].adverts);

					//2016年5月份每个周末的十个车场的待还款订单随机立减活动开关
				}
			},


			/**
			 * 跳转到选择优惠券页面
			 */
			go2SelectCoupon: function (order) {
				//已使用过红包的话不能再次选择
				if(util.isEmpty(order.luckyMoneyUrl) && !util.isEmpty(order.luckyAmount)){
					return;
				}

				util.setItem('selectCoupon_parkInfoId',order.parkInfoId);
				util.setItem('selectCoupon_parkId',order.parkId);
				util.setItem('selectCoupon_unPayAmount',order.unPayAmount);
				util.go2SelectCoupon();
			},
			/**
			 * 判断当前订单是否需要显示优惠券以及如何显示[缓存中已有选择的优惠券，用缓存的;或用户选择不使用优惠券；或用后台推荐的]
			 * 如果已使用过优惠券，则显示出优惠券金额，不能再次选择优惠券，同时将还需支付金额显示出来
			 */
			showSelectedCoupon: function (i) {
				var luckyMoneyId=util.getItem(vue.currentOrders[i].parkInfoId+"_coupon_id");
				var luckyAmount=util.getItem(vue.currentOrders[i].parkInfoId+"_coupon_amount");
				if(!util.isEmpty(vue.currentOrders[i].luckyMoneyUrl)){

					if(!util.isEmpty(luckyMoneyId) && luckyMoneyId!=='none'){

					}else if(!util.isEmpty(luckyMoneyId) && luckyMoneyId==='none'){
						util.setItem(vue.currentOrders[i].parkInfoId+"_coupon_amount",'0');
					}else{
						util.setItem(vue.currentOrders[i].parkInfoId+"_coupon_id",vue.currentOrders[i].luckyMoneyId);
						util.setItem(vue.currentOrders[i].parkInfoId+"_coupon_amount",vue.currentOrders[i].luckyMoneyAmount);
						luckyAmount=vue.currentOrders[i].luckyMoneyAmount;
					}

					vue.currentOrders[i].selectedCouponId=luckyMoneyId;//选择的红包id
					//还需要支付，前端自己算
					if(luckyMoneyId!=='none'){//只有用户自己选择了优惠券或则用了后台推荐了的优惠券，才需要计算还需支付，否则用后台返回的还需支付金额
						//vue.currentOrders[i].amountLeft=(parseFloat(vue.currentOrders[i].unPayAmount).subtract(parseFloat(luckyAmount)));
						//vue.currentOrders[i].luckyAmount=luckyAmount;

						vueUptArray('currentOrders',i,'amountLeft',(parseFloat(vue.currentOrders[i].unPayAmount).subtract(parseFloat(luckyAmount))));
						vueUptArray('currentOrders',i,'luckyAmount',luckyAmount);

					}else{
						//vue.currentOrders[i].amountLeft=vue.currentOrders[i].unPayAmount;
						vueUptArray('currentOrders',i,'amountLeft',vue.currentOrders[i].unPayAmount);
					}
					//还需支付如果负数，改为0
					if(parseFloat(vue.currentOrders[i].amountLeft)<0){
						//vue.currentOrders[i].amountLeft=0;
						vueUptArray('currentOrders',i,'amountLeft',0);
					}

				}else{
					//vue.currentOrders[i].amountLeft=vue.currentOrders[i].unPayAmount;
					vueUptArray('currentOrders',i,'amountLeft',vue.currentOrders[i].unPayAmount);
				}
			},
			/**
			 * 是否需要显示还需要支付多少停车费区域【商家扫码、预支付、优惠券任意一个或多个存在时就需要显示，都不存在时不需要显示】
			 */
			isShowAmountLeftZone:function (curOrder) {
				var result=false;
				if(curOrder.ticketAmount!=='0' || curOrder.onlinePrePayAmount!=='0' || curOrder.luckyMoneyUrl!=='' || curOrder.luckyAmount!=='0'){
					result=true;
				}
				return result;
			},
			/**
			 * 判断是否显示大悦城微电影广告位
			 */
			isShowMicroMovie: function (parkId) {
				var result=false;
				//大悦城微电影广告位
				//‘后台停车场Id’b8da039bb90d4569a0e8bdae0b37d8cd
				//‘海澜中苑Id’002a87f09fb94d55808324a0a1da4a6b
				//‘生产朝阳大悦城停车场Id’87630774154d4e84ac7321ba1cca9955
				var microMovieParkId="";
				if(util.isTestEnv()){
					microMovieParkId="002a87f09fb94d55808324a0a1da4a6b";
				}else {
					microMovieParkId="87630774154d4e84ac7321ba1cca9955";
				}
				if(microMovieParkId===parkId){
					result=true;
				}
				return result;
			},
			/**
			 * 将待还款订单对应的进出场日期时间和停放时长等转为需要的格式
			 */
			transToPayOrders:function () {
				var i=0;

				for(;i<vue.debtOrders.length;i++){
					vue.debtOrders[i].startDate=vue.debtOrders[i].startDate.transEightDate2Str(".");
					vue.debtOrders[i].startTime=vue.debtOrders[i].startTime.transSixTime2Str();
					vue.debtOrders[i].endTime=vue.debtOrders[i].endTime.transSixTime2Str();
					vue.debtOrders[i].parkTime=vue.debtOrders[i].parkTime.transParkingTime2Str();
					if(!util.isEmpty(vue.debtOrders[i].balanceAmountDt)){
						vue.debtOrders[i].balanceAmountDt=vue.debtOrders[i].balanceAmountDt.trans14Datetime2Str();
					}
					if(!util.isEmpty(vue.debtOrders[i].luckyMoneyDt)){
						vue.debtOrders[i].luckyMoneyDt=vue.debtOrders[i].luckyMoneyDt.trans14Datetime2Str();
					}
					if(!util.isEmpty(vue.debtOrders[i].creditAmountDt)){
						vue.debtOrders[i].creditAmountDt=vue.debtOrders[i].creditAmountDt.trans14Datetime2Str();
					}
					if(!util.isEmpty(vue.debtOrders[i].ticketAmountDt)){
						vue.debtOrders[i].ticketAmountDt=vue.debtOrders[i].ticketAmountDt.trans14Datetime2Str();
					}
					if(!util.isEmpty(vue.debtOrders[i].onlineAmountDt)){
						vue.debtOrders[i].onlineAmountDt=vue.debtOrders[i].onlineAmountDt.trans14Datetime2Str();
					}
				}
			},
			/**
			 * 将历史订单对应的进出场日期时间和停放时长等转为需要的格式
			 */
			transHistoryOrders: function (historyOrders) {
				var i=0;
				for(;i<historyOrders.length;i++){
					historyOrders[i].startDate=historyOrders[i].startDate.transEightDate2Str(".");
					historyOrders[i].startTime=historyOrders[i].startTime.transSixTime2Str();
					historyOrders[i].endTime=historyOrders[i].endTime.transSixTime2Str();
					historyOrders[i].parkTime=historyOrders[i].parkTime.transParkingTime2Str();
				}
				return historyOrders;
			},
			/**
			 * 后台数据加载完成后加载订单信息
			 */
			showOrders: function () {
				vue.showCurOrders();
				vue.showToPayOrders();
				vue.showHistoryOrders();
				setTimeout(function () {
					initScroll(vue.loadMoreHistoryOrders);
				})
			},
			/**
			 * 显示所有的当前订单
			 * @param orders
			 */
			showCurOrders: function () {

				setTimeout(function () {
					$(".currentOrder").removeClass("tjdHidden");
				})

				/**
				 * 停放时长动态变化
				 */
				util.dynamicParkingTime(".parkTime");

			},
			/**
			 * 显示所有的待还款订单
			 * @param orders
			 */
			showToPayOrders: function () {
				setTimeout(function () {
					$(".toPayOrderListUl").removeClass("tjdHidden");
				})
			},
			/**
			 * 显示最新的一条历史订单
			 * @param orders
			 */
			showHistoryOrders: function () {
				setTimeout(function () {

					$(".orderListUl").removeClass("tjdHidden");
				})
			},
			/**
			 * 大悦城活动，微电影
			 */
			go2MovieTicket:function(order){
				location.href=order.adverts[0].advertUrl;
			},
			/**
			 * 动态加载历史订单
			 */
			loadMoreHistoryOrders: function () {
				if(!vue.isLoadingMore){
					vue.isLoadingMore=true;
					tjdServices.request({
						method:'loadHistoryOrders',
						type:'2',
						debtParkInfoIds:vue.debtOrderIds,
						date:vue.lastHistoryDate,
						time:vue.lastHistoryTime
					}).then(function (data) {
						var index=data.historyOrders.length-1;

						//更新历史记录的最后一条记录的date/time
						if(!util.isEmpty(data.historyOrders)){
							vue.lastHistoryDate=data.historyOrders[index].endDate;
							vue.lastHistoryTime=data.historyOrders[index].endTime;
						}

						vue.historyOrders=vue.historyOrders.concat(vue.transHistoryOrders(data.historyOrders));
						setTimeout(function () {
							initScroll();
							vue.isLoadingMore=false;
							$(".historyLoading").addClass("tjdHidden");
						})
					});
				}
			},
			/**
			 * 当前订单场内支付
			 */
			payCurOrder: function (order) {
				vue.curPayOrder=order;
				//如果当前订单现金支付开关开的话，不允许支付
				if(order.isCash===1){
					return;
				}

				tjdServices.request({
					method:'accountOrder',
					parkInfoId:order.parkInfoId
				}).then(function (data) {
					vue.curOrderCountData=data;
					//如果订单金额为0的话不做任何操作
					if(data.isPay==='true'){
						//如果有余额则直接跳转到余额支付页面，不调用支付接口
						if(!(util.isEmpty(data.balance) || data.balance==='0' || data.balance==='0.00')){
							vue.go2PayWithBalance();
						}else{
							var couponId=order.selectedCouponId==='none'?'':order.selectedCouponId;

							//调用支付接口，根据返回分三种情况，0,1,2：直接支付成功（优惠券已够支付等）；三方支付；停车费变动需要用户确认
							var returnUrl='';
							if(!util.isWeixin()){
								returnUrl=util.getAlipayPayCallbackUrl(constants.tcweixinUrl+'myOrder/myOrder.html');
							}

							tjdServices.request({
								method:'payOrder',
								parkInfoId:order.parkInfoId,
								luckyMoneyId:couponId,
								payAmount:String(data.unPayAmount),
								isUseBalance:false,
								outType:'prepayment',
								returnUrl:returnUrl
							}).then(function (data2) {
								vue.curOrderPayData=data2;

								if(data2.prePayState==='0'){
									$.showTjdModal({
										type:1,
										errorMsg:"支付成功",
										callBack:'freshMain'
									})
								}else if(data2.prePayState==='1'){
									vue.realPayCurOrder();
								}else{
									$.showTjdModal({
										type:1,
										errorMsg:"停车费已变动，您确认支付吗？",
										callBack:vue.realPayCurOrder,
										withTwoButtons:1
									})
								}
							});
						}

					}else{
						$.showTjdModal({
							type:1,
							errorMsg:"您当前停车费为0.00元，无需支付"
						})
					}

				});
			},
			/**
			 * 跳转到余额支付页面
			 */
			go2PayWithBalance: function () {
				var order=vue.curPayOrder;
				var data=vue.curOrderCountData;
				var couponId=order.selectedCouponId==='none'?'':order.selectedCouponId;
				if(util.isEmpty(couponId)){
					order.unPayAmount=data.unPayAmount;
				}else{
					order.unPayAmount=parseFloat(data.unPayAmount).subtract(parseFloat(order.luckyAmount));
				}
				order.unPayAmount_orgin=data.unPayAmount;
				order.balance=data.balance;
				order.couponId=couponId;
				util.setItem('payWithBalanceOrder',JSON.stringify(order));
				location.href='../myOrder/payWithBalance.html';
			},
			/**
			 * 真正的场内支付
			 */
			realPayCurOrder: function () {
				var order=vue.curPayOrder;
				var data=vue.curOrderCountData;
				var data2=vue.curOrderPayData;
				var couponId=order.selectedCouponId==='none'?'':order.selectedCouponId;
				//首先判断是否有余额，有的话跳转到选择余额支付页面，没有的话直接三方支付
				if(util.isEmpty(data.balance) || data.balance==='0' || data.balance==='0.00'){

					if(util.isWeixin()){
						WeixinJSBridge.invoke('getBrandWCPayRequest', data2.secuParam,function(res){
							if(res.err_msg === "get_brand_wcpay_request:ok" ) {
								location.reload();
							}
						});
					}else{
						location.href=data2.secuParam;
					}
				}else{//跳转选择余额支付页面
					if(util.isEmpty(couponId)){
						order.unPayAmount=data.unPayAmount;
					}else{
						order.unPayAmount=parseFloat(data.unPayAmount).subtract(parseFloat(order.luckyAmount));
					}
					order.unPayAmount_orgin=data.unPayAmount;
					order.balance=data.balance;
					order.couponId=couponId;
					util.setItem('payWithBalanceOrder',JSON.stringify(order));
					location.href='../myOrder/payWithBalance.html';
				}
			},
			getDebtOrderIds: function () {
				vue.debtOrderIds=[];
				for(var i=0;i<vue.debtOrders.length;i++){
					vue.debtOrderIds.push(vue.debtOrders[i].omParkInfoId);
				}
			},
			/**
			 * 取得当前待还款和第一条历史订单
			 */
			getCurAndTopayAndHistoryOrders: function () {
				tjdServices.request({
					method:'getCurAndTopayAndHistoryOrders'
				}).then(function (data) {

					vue.currentOrders=data.order_getCurrentOrder.currentOrders;
					vue.debtOrders=data.order_getDebtOrder.debtOrders;
					vue.getDebtOrderIds();


					vue.historyOrders=data.order_getHistoryOrder.historyOrders;
					//vue.orderSetting.currentSlogan=data.order_getCurrentOrder.currentSlogan;
					//vue.orderSetting.debtSlogan=data.order_getDebtOrder.debtSlogan;

					vue.isLoadingMore=false;
					vue.transOrders();
					vue.showOrders();
					vue.handleOneCentActivity();
					vue.isShowNoAllOrders();
					vue.handleAdverts();
					vue.watchAdImg();


				});
			},
			/**
			 * 防止广告位返回值是控制导致页面错误
			 */
			handleAdverts:function(){
				for(var i=0;i<vue.currentOrders.length;i++){
					var cur=vue.currentOrders[i];
					cur.isCash=cur.isCash==="0"?1:0;//设置为整数，实现vue的checkbox选中效果
					cur.isOpen=cur.isOpen==='true'?1:0;//设置为整数，实现vue的checkbox选中效果
					if(util.isEmpty(cur.adverts)){
						cur.adverts[0]={
							advertPicUrl:''
						}
					}
				}
			},
			/**\
			 * 朝阳大悦城首小时一分钱停车活动
			 */
			handleOneCentActivity: function () {
				//目前一分钱活动只针对微信，
				if(!util.isWeixinBrowser()){
					return;
				}
				for(var i=0;i<vue.debtOrders.length;i++){

					(function (innerIndex) {
						var hOrder=vue.debtOrders[innerIndex];
						//判断是否大悦城折扣券的待还款，是的话显示‘折扣前’三个字
						tjdServices.request({
							method:'getDiscountAmount',
							omParkInfoId:hOrder.omParkInfoId,
							payAmount:hOrder.debt,
							ignoreRepeat:true
						}).then(function (data) {
							var settleDiscount=data.settleDiscount;
							//依次判断1分钱停车、5折活动、8折活动
							if(!util.isEmpty(settleDiscount)){//微信一分钱

								var tempObj={
									realPayAmount:settleDiscount.realPayAmount,
									type:settleDiscount.type,
									isOneCent:true
								};

								for(var v in vue.debtOrders[innerIndex]){
									tempObj[v]=vue.debtOrders[innerIndex][v];
								}
								//有一分钱活动且广告语有值时广告语下边需要加上下边框
								if(!util.isEmpty(hOrder.debtSlogan)){
									tempObj.isShowAdTopBorder=true;
								}
								vue.debtOrders.$set(innerIndex,tempObj)
								setTimeout(function () {
									$(".middle").show();
									$(".oneCent").show();
								})

							}
							setTimeout(function () {
								initScroll(vue.loadMoreHistoryOrders);
							})
						});
					})(i);


				}

			},
			isShowNoAllOrders: function () {
				if(util.isEmpty(vue.currentOrders.length) && util.isEmpty(vue.debtOrders.length) && util.isEmpty(vue.historyOrders.length) ){
					vue.noAllOrders=true;
					$(".noCurOrderClass").show();
				}
				if(!util.isEmpty(vue.historyOrders.length) ){
					vue.isThereHistoryOrders=true;
				}
			},
			//显示删除当前订单的弹出窗
			showDeleteCurModal:function(orderId){
				vue.curToDeleteOrderId=orderId;
				$("#curOrHistory").val("1");
				$.showTjdModal({
					errorMsg:"取消订单？",
					withTwoButtons:1,
					callBack:vue.removeCurrentOrder
				});
			},
			//删除当前订单
			removeCurrentOrder:function(){
				tjdServices.request({
					method:'removeCurrentOrder',
					omParkInfoId:vue.curToDeleteOrderId
				}).then(function(){
					$.showTjdModal({
						errorMsg:"取消成功！",
						type:1,
						callBack:'freshMain'
					});
				});
			},
			//显示删除历史订单的弹出窗
			showDeleteHisModal:function(order,$event,$index){
				vue.toDelHistoryOrder=order;
				vue.toDelHistoryOrderIndex=$index;
				$("#curOrHistory").val("");
				$.showTjdModal({
					errorMsg:"您确定删除吗？",
					withTwoButtons:1,
					callBack:vue.removeHistoryOrder
				});
				$event.stopPropagation();//阻止冒泡
			},
			//删除历史订单
			removeHistoryOrder:function(){
				tjdServices.request({
					method:'removeHistoryOrder',
					omParkInfoId:vue.toDelHistoryOrder.omParkInfoId
				}).then(function(){
					$.showTjdModal({
						errorMsg:"删除成功！",
						type:1,
						callBack:vue.refreshHistoryOrders
					});
				});
			},
			/**
			 * 删除历史订单后异步刷新前端页面
			 */
			refreshHistoryOrders:function () {
				vue.historyOrders.splice(vue.toDelHistoryOrderIndex,1);
				//如果当前历史订单数组为空（删除时只有默认的一条历史记录还未加载更多历史，此时需要刷新页面；其它情况异步刷新）
				if(util.isEmpty(vue.historyOrders)){
					freshMain();
				}else{
					setTimeout(function () {
						initScroll();
					})
				}

			},
			//开放端当前订单的预支付
			prepay_open_side:function(order){
				//跳转到支付页面
				sessionStorage.omParkInfoId_open_side=order.omParkinfoId;
				location.href="payParkFee.html";


			},
			//待还款订单还款，直接吊出微信支付
			pay2PayOrder:function(order){
				var returnUrl='';
				if(!util.isWeixin()){
					returnUrl=util.getAlipayPayCallbackUrl(constants.tcweixinUrl+'myOrder/myOrder.html');
				}
				//暂时只有1分钱停车活动
				var discountId='',discountType='';
				if(!util.isEmpty(order.isOneCent)){
					discountType=order.type;
				}

				tjdServices.request({
					method:'repayment',
					amount:String(order.debt),
					omParkInfoId:order.omParkInfoId,
					returnUrl:returnUrl,
					discountType:discountType,
					discountId:discountId
				}).then(function(data){
					if(util.isWeixin()){
						WeixinJSBridge.invoke('getBrandWCPayRequest', data.secuParam,function(res){
							if(res.err_msg === "get_brand_wcpay_request:ok" ) {
								location.href="myOrder.html?"+Math.random();
								//location.reload();
							}
						});
					}else{
						location.href=data.secuParam;
					}
				});
			},


			/**
			 * 跳转到订单详情
			 * @param orderNumber
			 */
			go2OrderDetail:function(orderNumber){
				util.setItem('history_order_id',orderNumber)
				location.href="orderDetail.html";
			},


			/**
			 * 现金支付开关
			 */
			realDoCurOrderCashPay:function(){
				var order=vue.cashSwitchOrder;
				var onoff=(order.isCash?"YES":"NO");
				tjdServices.request({
					method:'setPayCashOrder',
					omParkinfoId:order.parkInfoId,
					onOff:onoff
				}).then(function(){
					order.isCash=(order.isCash?1:0);
					$.showTjdModal({
						errorMsg:"设置成功！",
						type:1
					});
				});
			},
			/**
			 * 自动付款开关（有余额或绑定了信用卡时）
			 */
			realDoCurOrderAutoPay:function(){
				var order=vue.autoPayOrder;
				var onoff=String(order.isOpen);
				tjdServices.request({
					method:'setAutoPayOrder',
					parkInfoId:order.parkInfoId,
					onOff:onoff
				}).then(function(){
					order.isOpen=order.isOpen==='true'?1:0;
					$.showTjdModal({
						errorMsg:"设置成功！",
						type:1
					});
				});
			},


			//当前订单现金支付开关
			doCurOrderCashPay:function(order){
				vue.cashSwitchOrder=order;
				if(order.isCash===1){
					$.showTjdModal({
						errorMsg:"您确定要关闭现金支付吗？",
						callBack:vue.realDoCurOrderCashPay,
						withTwoButtons:1,
						type:2,
						callBackForCancel: function () {
							order.isCash=1;
						}
					});
				}else{
					$.showTjdModal({
						errorMsg:"您确定要打开现金支付吗？",
						callBack:vue.realDoCurOrderCashPay,
						withTwoButtons:1,
						type:2,
						callBackForCancel: function () {
							order.isCash=0;
						}
					});
				}

			},
			//当前订单自动支付开关
			doCurOrderAutoPay:function(order){
				vue.autoPayOrder=order;
				if(order.isOpen===0){
					$.showTjdModal({
						errorMsg:"您确定要打开自动支付吗？",
						callBack:vue.realDoCurOrderAutoPay,
						withTwoButtons:1,
						type:2
					});
				}else{
					$.showTjdModal({
						errorMsg:"您确定要关闭自动支付吗？",
						callBack:vue.realDoCurOrderAutoPay,
						withTwoButtons:1,
						type:2
					});
				}

			},
			/**
			 * 跳转到16年5月份周六日待还款订单还款随机立减说明页面
			 */
			go2RandomCutRule: function () {
				location.href='randomCutActivityRule.html';
			},
			/**
			 * 百度新用户送12元红包图片提示
			 */
			showBaiduRegisterCouponTip:function () {
				var isNewUser = util.getCookie("isNewUser");
				//如果是百度新注册用户，提示送的红包
				if(!util.isEmpty(isNewUser) && 'true'===isNewUser && util.isBaidu()){
					$(".bdhb,.hb_img").show();
					$(".bdhb,.hb_img").bind("touchstart",function(){
						$(".bdhb,.hb_img").hide();
						util.removeCookie("isNewUser");
					});

				}
			},

			go2MyCar: function () {
				constants.go2MyCar();
			},
			stayHere: function () {
				util.loadFooter();
				vue.showBaiduRegisterCouponTip();
				vue.getCurAndTopayAndHistoryOrders();
			},

			isGo2MyCarPage: function () {
				//每次进订单都先判断，如果没有车辆，则让用户进我的汽车页面[此功能暂时先注释掉，可能3.0的时候再加]
				tjdServices.request({
					method:'getCarList'
				}).then(function(data){
					var cars=data.carList;
					if(util.isEmpty(cars) || cars.length===0){
						$.showTjdModal({
							errorMsg:"请您先添加车辆然后再查看订单",
							callBack:vue.go2MyCar,
							callBackForCancel:vue.stayHere,
							withTwoButtons:1,
							type:2
						})
					}else{
						vue.stayHere();
					}
				});
			},
			defeatPercent:function(){
				var num = 0;
				var realNum=90;
				var et = setInterval(function(){
					num++;
					if(num>realNum){
						clearInterval(et);
					}else{
						document.getElementById('show').innerHTML = num;
					}
				},10)
			}
		}
	});
	//if(util.isTestEnv() || util.isProEnv()){
	//	init();
	//}else{
	//	test();
	//}
	test();

	function loadAdDone(){
		vue.isAdImgDone=true;
	}

	function init(){
		tjdServices.getLoginInfo().then(function () {
			vue.isWxBrowser=util.isWeixinBrowser();
			vue.stayHere();
		}, function (data) {
			if(data==="unbind"){
				util.return2Login();
			}
		});
	}
	function test(){
		util.setUserId('fd78b5c961614333adec83e498b1dd9d');
		vue.isWxBrowser=util.isWeixinBrowser();
		vue.stayHere();
	}

	function vueUptArray(data,index,key,newVal){
		if(vue[data][index]){
			var tmp=vue[data][index];
			tmp[key]=newVal;
			vue[data][index]={};
			vue[data][index]=tmp;
		}
	}
})


