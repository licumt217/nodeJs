var vue=new Vue({
    el: 'body',
    data: {
        isUseBalance:false,
        isShowCoupons:false,
        payMinusCoupon:0,
        realPayAmount:0,
        theUsedCoupon:'',
        orderInfo:{},
        selectedCoupon:{},
        balance:0,
        payInBalance:0,
        coupons:[]
    
    },
    methods:{
        //$scope.$watch('isUseBalance',function(newVal){
        //    vue.isUseBalance=newVal;
        //    vue.reCal();
        //});
        showOrHideCoupons:function(){
            vue.isShowCoupons=!vue.isShowCoupons;
        },
        //重新计算实付金额
        reCal:function(){
        
            if(util.isEmpty(vue.selectedCoupon)){
                vue.payMinusCoupon=vue.orderInfo.parkAmount;
                vue.realPayAmount=vue.payMinusCoupon;
                vue.theUsedCoupon="暂无红包";
                $(".isUsedCoupon").hide();
                vue.reCalButtonValue();
            }else{
                vue.payMinusCoupon=vue.orderInfo.parkAmount-vue.selectedCoupon.sale;
                vue.payMinusCoupon=vue.payMinusCoupon<0?0:vue.payMinusCoupon;
                vue.realPayAmount=vue.payMinusCoupon;
                vue.theUsedCoupon=vue.selectedCoupon.sale;
                $(".isUsedCoupon").show();
                vue.reCalButtonValue();
        
            }
        
            if(vue.isUseBalance==true){
                if(vue.balance>=vue.payMinusCoupon){
                    vue.realPayAmount=0;
                    vue.payInBalance=vue.payMinusCoupon;
        
                }else{
                    vue.realPayAmount=vue.payMinusCoupon-vue.balance;
                    vue.payInBalance=vue.balance;
                }
            }else{
                vue.realPayAmount=vue.payMinusCoupon;
                vue.payInBalance=0;
            }
            vue.reCalButtonValue();
        },
        //支付首次请求
        payFirst:function(){
            tjdServices.request({
                method:'payParkFee',
                type:"0",
                omParkInfoId:sessionStorage.omParkInfoId_open_side
            }).then(function(data){
                vue.balance=data.balance;
                vue.payInBalance=0;
                vue.orderInfo=data.orderInfo;
                vue.coupons=data.couponInfo;
                if(!util.isEmpty(vue.coupons) && vue.coupons.length>0){
                    vue.selectedCoupon=vue.coupons[0];
                    vue.theUsedCoupon=vue.coupons[0].sale;
                }else{
                    vue.selectedCoupon=null;
                    vue.theUsedCoupon="暂无红包";
                }
                //订单金额减去红包
                vue.reCal();
            });
        
        },
        reCalButtonValue:function(){
            $(".paymoney").val("确认支付"+(vue.realPayAmount.toFixed())+"元");
        },
        go2MyOrder:function(){
            location.href="myOrder.html";
        },
        //用户选择优惠券
        selectCoupon:function(coupon,$event){
            vue.isShowCoupons=false;
            vue.selectedCoupon=coupon;
            vue.reCal(coupon);
        
        
        },
        //支付
        pay:function(){
            var couponId=util.isEmpty(vue.selectedCoupon)?null:vue.selectedCoupon.couponId;

            tjdServices.request({
                method:'payParkFee',
                type:"1",
                omParkInfoId:sessionStorage.omParkInfoId_open_side,
                outType:"1",
                isUserBalance:vue.isUseBalance,
                couponId:couponId,
            }).then(function(data){
                setTimeout(function () {
                    $.hideTjdMask();
                },200)
                if(data.isPay=="0"){//0,未完成支付需要跳转到第三方进行支付
                    if(util.isWeixin()){
                        WeixinJSBridge.invoke('getBrandWCPayRequest', data.secuParam,function(res){
                            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                vue.go2MyOrder();
                            }
                        });
                    }else{
                        location.href=data.secuParam;
                    }
                }else{// 1，已完成支付不需要跳转到第三方进行支付
                    $.showTjdModal({
                        errorMsg:"支付成功！",
                        type:2,
                        callBack:vue.go2MyOrder,
                    });
                }
            });
        
        }
    }
});


util.loadFooter();
vue.payFirst();