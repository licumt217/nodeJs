/**
 * Created by liqiang on 2016/11/24.
 */
var express=require('express');
var app=express();
var cookieParser=require('cookie-parser');
var session=require('express-session');
var redisStore=require('connect-redis')(session)

var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var userSQL = require('./db/sql/User');
var carSQL = require('./db/sql/car');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
var db=require('./db');
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
app.use(cookieParser());
app.use(session({
    secret:'our tjd secret',
    cookie:{
        //maxAge:60*60*1000*60
    }
}));
//app.use(session({
//    secret:'our tjd secret',
//    store:new redisStore()
//}));
app.set('views','./views');
app.set('view engine','jade');



app.get('/addUser', function (req,res) {

    //验证登录，如果已登录，转到已登录页面
    if(!req.session.hasLogin){
        res.render('login',{
            title:'tjd'
        })
    }else{
        var  userAddSql = 'INSERT INTO zhsj_test(TEST_ID,STATUE) VALUES(?,?)';
        var  userAddSql_Params = [Math.floor(Math.random()*100002232), 2];
        db.query(userAddSql,userAddSql_Params, function (err,rows) {
            if(err){
                console.log(err.message)
                res.send({
                    isSuccess:'1',
                    errorMsg:err.message
                })
            }else{
                console.log('result:'+rows)
                res.send({
                    isSuccess:'0',
                })
            }
        })
    }

});
app.get('/updateUser', function (req,res) {
    //验证登录，如果已登录，转到已登录页面
    if(!req.session.hasLogin){
        res.render('login',{
            title:'tjd'
        })
    }else{
        var  userAddSql = 'update zhsj_test set STATUE=3 where TEST_ID=?';
        var  userAddSql_Params = [1];

        // 从连接池获取连接

        db.query(userAddSql,userAddSql_Params, function (err,rows) {
            if(err){
                console.log(err.message)
                res.send({
                    isSuccess:'1',
                    errorMsg:err.message
                })
            }else{
                console.log('result:'+rows)
                res.send({
                    isSuccess:'0',
                    errorMsg:rows.affectedRows
                })
            }
        })


    }

});
app.get('/deleteUser', function (req,res) {
    //验证登录，如果已登录，转到已登录页面
    if(!req.session.hasLogin){
        res.render('login',{
            title:'tjd'
        })
    }else{
        var  userAddSql = 'delete from zhsj_test where  STATUE=?';
        var  userAddSql_Params = [3];

        db.query(userAddSql,userAddSql_Params, function (err,rows) {
            if(err){
                console.log(err.message)
                res.send({
                    isSuccess:'1',
                    errorMsg:err.message
                })
            }else{
                console.log('result:'+rows)
                res.send({
                    isSuccess:'0',
                    errorMsg:rows.affectedRows
                })
            }
        })
    }

});


//app.use(express.bodyParser())
app.get('/', function (req,res) {

    //验证登录，如果已登录，转到已登录页面
    if(req.session.hasLogin){
        res.render('home',{
            title:'tjd'
        })
    }else{
        //首次进来的话进行登录验证，是用户的话存cookie，否则提示错误信息
        //登录页过来的话验证相关信息
        if(req.query.phone){
            var phone=req.query.phone;
            var yzm=req.query.yzm;
            console.log('接收到参数手机号：'+phone+ " 验证码："+yzm);
            db.query(userSQL.getByPhone,[phone], function (err,rows) {
                if(rows.length>0){
                    req.session.hasLogin="liCookie";
                    req.session.userId=rows[0].CM_USER_ID;
                    res.send({
                        isSuccess:'0',
                    })
                }else{
                    res.send({
                        isSuccess:'1',
                        errorMsg:'用户不存在！'
                    })
                }
            })

        }else{//其它页面过来的话转发到登录页
            res.render('login',{
                title:'tjd'
            })
        }
    }

});

/**
 * 根据用户id取得该用户所有车辆
 */
app.get('/findCars', function (req,res) {


    //验证登录，如果已登录，转到已登录页面
    if(!req.session.hasLogin){
        console.log(1)
        res.render('login',{
            title:'tjd'
        })
    }else{
        db.query(carSQL.getCarsByUserId,[req.session.userId], function (err,rows) {
            if(rows.length>0){
                res.send({
                    isSuccess:'0',
                    cars:rows
                })
            }else{
                res.send({
                    isSuccess:'0',
                    cars:[]
                })
            }
        })

    }

});

/**
 * 退出登录
 */
app.get('/logout', function (req,res) {

    req.session.hasLogin=null;
    req.session.userId=null;
    res.send({
        isSuccess:'0',
    })

});

app.listen(3000, function () {
    console.log('停简单微信项目启动。。。')
});
