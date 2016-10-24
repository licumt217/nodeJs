var vue=new Vue({
    el: 'body',
    data: {
        orderId:'',
        order:{}
    },
    methods:{
        /**
         * 将优惠券相关日期等转换
         * @param coupons
         * @returns {*}
         */
        trans: function (coupons) {
            for(var i=0;i<coupons.length;i++){
                coupons[i].endDate=coupons[i].endDate.transEightDate2Str(".");
            }
            return coupons;
        },


        /**
         * 现金支付
         */
        cashPay:function () {
            tjdServices.request({
                method:'setCashPayWithHistoryOrder',
                parkInfoId:vue.orderId
            }).then(function () {
                $.showTjdModal({
                    errorMsg:'设置成功',
                    type:2,
                    callBack:'freshMain'
                });
            });
        },
        onlinePay: function () {
            location.href='payWithOrderDetail.html';
        },
        
        init: function () {
            var orderId=util.getItem('history_order_id');
            vue.orderId=orderId;
            tjdServices.request({
                method:'getOrderDetail',
                omParkinfoId:orderId
            }).then(function (data) {
                vue.order=data.detailInfo;
                vue.order.parkTime=vue.order.parkTime.transParkingTime2Str();
                vue.order.startDateTime=vue.order.startDate.transEightDate2Str(".")+" "+vue.order.startTime.transSixTime2Str();
                vue.order.endDateTime=vue.order.endDate.transEightDate2Str(".")+" "+vue.order.endTime.transSixTime2Str();
        
                util.setItem('openSideOnlinePayOrderInfo',JSON.stringify(vue.order));
                setTimeout(function () {
                    $(".detail").show();
                })
        
            });
        }
    }
});

tjdServices.getLoginInfo().then(function (data) {
    vue.init();
    util.loadFooter();
}, function (data) {
    if(data=="unbind"){
        util.return2Login();
    }
});


