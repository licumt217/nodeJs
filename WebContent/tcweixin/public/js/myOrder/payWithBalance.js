var vue=new Vue({
    el: 'body',
    data: {
        order:JSON.parse(util.getItem('payWithBalanceOrder')),
        isUseBalance:true,
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
                var payMoney=parseFloat(vue.order.unPayAmount_orgin).subtract(vue.order.balance);
                if(payMoney<=0){
                    vue.order.payMoney=0;
                }else{
                    vue.order.payMoney=payMoney;
                }
            }else{
                vue.order.payMoney=vue.order.unPayAmount_orgin;
            }
            vue.order.unPayAmount=parseFloat(vue.order.unPayAmount)<0?0:vue.order.unPayAmount;
        },

        
        pay: function () {
            var returnUrl='';
            if(!util.isWeixin()){
                returnUrl=util.getAlipayPayCallbackUrl(constants.tcweixinUrl+'myOrder/myOrder.html');
            }
            tjdServices.request({
                method:'payOrder',
                parkInfoId:vue.order.parkInfoId,
                luckyMoneyId:vue.order.couponId,
                payAmount:vue.order.unPayAmount_orgin+'',
                isUseBalance:vue.isUseBalance,
                outType:'prepayment',
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
        }
    }
});



vue.calToPayMoney();

util.loadFooter();