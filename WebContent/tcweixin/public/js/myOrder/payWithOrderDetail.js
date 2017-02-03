var vue=new Vue({
    el: 'body',
    data: {
        isUseBalance:true,
        order:{},
    },
    methods:{
        selectBalance: function () {
            vue.isUseBalance=!vue.isUseBalance;
            vue.calToPayMoney();
        },
        /**
         * 计算是否使用余额后还需要支付金额
         */
        calToPayMoney: function () {
            if(vue.isUseBalance){
                var payMoney=parseFloat(vue.order.parkAmount).subtract(vue.order.balance);
                if(payMoney<=0){
                    vue.order.payMoney=0;
                }else{
                    vue.order.payMoney=payMoney;
                }
            }else{
                vue.order.payMoney=vue.order.parkAmount;
            }
        },

        /**
         * 跳转到选择优惠券页面
         */
        go2SelectCoupon: function (order) {
        
            util.setItem('selectCoupon_parkInfoId',order.parkInfoId);
            util.setItem('selectCoupon_parkId',order.parkId);
            util.setItem('selectCoupon_unPayAmount',order.parkAmount);
            util.setItem('fromPayWithOrderDetail',"true");
            util.go2SelectCoupon();
        },
        pay: function () {
            var returnUrl='';
            if(!util.isWeixin()){
                returnUrl=util.getAlipayPayCallbackUrl(constants.tcweixinUrl+'myOrder/orderDetail.html');
            }
            tjdServices.request({
                method:'payOrder',
                parkInfoId:vue.order.omParkInfoId,
                luckyMoneyId:vue.order.selectedCouponId,
                payAmount:vue.order.parkAmount+'',
                isUseBalance:vue.isUseBalance,
                outType:'normal',
                returnUrl:returnUrl
            }).then(function (data) {
                if(data.prePayState=='0'){//全用余额，已支付成功
                    $.showTjdModal({
                        type:1,
                        errorMsg:'支付成功！',
                        callBack:'util.go2MyOrder'
                    });
        
                }else{
                    if(util.isWeixin()){
                        WeixinJSBridge.invoke('getBrandWCPayRequest', data.secuParam,function(res){
                            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                util.go2MyOrder();
                            }
                        });
                    }else{
                        location.href=data.secuParam;
                    }
                }
        
            });
        },
        /**
         * 判断当前订单是否需要显示优惠券以及如何显示[缓存中已有选择的优惠券，用缓存的;或用户选择不使用优惠券；或用后台推荐的]
         * 如果已使用过优惠券，则显示出优惠券金额，不能再次选择优惠券，同时将还需支付金额显示出来
         */
        showSelectedCoupon: function () {
            if(!util.isEmpty(vue.order.luckyMoneyUrl)){
                //选择使用优惠券
                if(!util.isEmpty(util.getItem(vue.order.parkInfoId+"_coupon_id")) && util.getItem(vue.order.parkInfoId+"_coupon_id")!='none'){
                    console.log(1)
                }else if(!util.isEmpty(util.getItem(vue.order.parkInfoId+"_coupon_id")) && util.getItem(vue.order.parkInfoId+"_coupon_id")=='none'){
                    util.setItem(vue.order.parkInfoId+"_coupon_amount",'0');
                }else{//用默认的
                    util.setItem(vue.order.parkInfoId+"_coupon_id",vue.order.luckyMoneyId);
                    util.setItem(vue.order.parkInfoId+"_coupon_amount",vue.order.luckyMoneyAmount);
                }
                var luckyMOneyId=util.getItem(vue.order.parkInfoId+"_coupon_id");
                var luckyAmount=util.getItem(vue.order.parkInfoId+"_coupon_amount");
                vue.order.luckyMoney=luckyAmount;
        
                vue.order.selectedCouponId=luckyMOneyId;//选择的红包id
        
            }else{
                //vue.order.amountLeft=vue.order.unPayAmount;
        
            }
        },
        
        getOrderDetail: function () {
            vue.order=JSON.parse(util.getItem('openSideOnlinePayOrderInfo'));
            //判断是否需要显示优惠券以及如何显示[缓存中已有选择的优惠券，用缓存的;或用户选择不使用优惠券；或用后台推荐的]
            vue.showSelectedCoupon();
        }
    }
});


vue.getOrderDetail();
vue.calToPayMoney();

util.loadFooter();