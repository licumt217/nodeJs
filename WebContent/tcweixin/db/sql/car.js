/**
 * Created by liqiang on 2017/2/3.
 */
var CarSQL = {
    getCarsByUserId:'select * from cc_car where cc_car_id in (select CC_CAR_ID from cm_userandcar where cm_user_id=?) '
};

module.exports=CarSQL;