/**
 * Created by liqiang on 2016/10/26.
 */
/**
 * Created by liqiang on 2016/10/25.
 */
/**
 * Created by liqiang on 2016/10/10.
 */

//建model


var getModel= function (conn) {
    return conn.model('colleague', {
        name: String,
        area: String,
        totalPrice:Number,
        category:String,
        price:String,
        floor:String,
        year:String,
        position:String,
        date:String
    })
}

module.exports=getModel;
