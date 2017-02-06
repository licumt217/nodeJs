/**
 * Created by liqiang on 2016/11/24.
 */
var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var userSQL = require('./db/sql/User');
var carSQL = require('./db/sql/car');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

var db={};
db.query= function (sql,args,callback) {
    if(!sql){
        callback();
    }else{
        args=args||[];
        pool.query(sql,args, function (err,rows,fields) {
            if(err){
                console.log(err);
                callback(err)
            }else{
                callback(null,rows,fields);
            }

        })
    }
}

module.exports=db;
