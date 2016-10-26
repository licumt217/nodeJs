/**
 * Created by liqiang on 2016/10/25.
 */
/**
 * Created by liqiang on 2016/10/10.
 */

//建model


var getModel= function (conn) {
    return conn.model('ChangPingHousePrice', {
        name: String,
        age: Number,
        position:String,
        gender:String,
        hometown:String,
        phone:String,
        books:[String],
        date:String
    })
}

module.exports=getModel;