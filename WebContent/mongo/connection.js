/**
 * Created by liqiang on 2016/10/26.
 */
// 首先引入 mongoose 这个模块
var mongoose = require('mongoose');
//var Colleague = require('./models/colleague');
// 然后连接对应的数据库：mongodb://localhost/test
// 其中，前面那个 mongodb 是 protocol scheme 的名称；localhost 是 mongod 所在的地址；
// 端口号省略则默认连接 27017；test 是数据库的名称
// mongodb 中不需要建立数据库，当你需要连接的数据库不存在时，会自动创建一个出来。
// 关于 mongodb 的安全性，mongodb 我印象中安全机制很残废，用户名密码那套都做得不好，更
// 别提细致的用户权限控制了。不过不用担心，mongodb 的默认配置只接受来自本机的请求，内网都连不上。
// 当需要在内网中为其他机器提供 mongodb 服务时，或许可以去看看 iptables 相关的东西。


/**
 * 根据ip和数据库名称返回连接
 * @param ip
 * @param dbName
 * @returns {*|exports|module.exports}
 */
var getConn=function(ip,dbName){
    var db=mongoose.connect('mongodb://'+ip+'/'+dbName);
    db.on('error',console.error.bind(console,'连接mongodb数据库异常'));
    db.once('open', function () {
        console.log('打开数据库连接，数据库名称：'+dbName);
    })
    return mongoose;
}

module.exports=getConn;