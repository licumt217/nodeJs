/**
 * Created by liqiang on 2016/11/24.
 */
var express=require('express');
var app=express();

var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var userSQL = require('./db/sql/User');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({     code:'-200',     msg: '操作失败'
        });
    } else {
        res.json(ret);
    }};





/**
 * 静态资源和模板引擎
 */
app.use(express.static('public'));
app.set('views','./views');
app.set('view engine','jade');

//app.use(express.bodyParser())
app.get('/', function (req,res) {

    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        if(err){
            console.log(err)
        }else{

            connection.query(userSQL.getByPhone, '18601965856', function(err, rows,fields) {
                console.log(rows[0].CM_USER_ID);//区分大小写


                //console.log(fields)
            });

        }





    })









        //res.send('hello, welcome to tjd!!!');
    res.render('login/login',{
        title:'tjd'
    })
});

app.listen(3001, function () {
    console.log('停简单微信项目启动。。。')
});
