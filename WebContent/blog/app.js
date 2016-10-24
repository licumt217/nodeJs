/**
 * Created by liqiang on 2016/10/17.
 */
var express=require('express');
var util=require('util');
var fs=require('fs');
var routes=require('./routes/index');
var app=new express();
app.set('views', __dirname+'/views');  // 设置模板相对路径(相对当前目录)
app.set('view engine', 'jade');
app.use(express.static(__dirname+'/public'));

app.get('/',routes.index)

var users={
    'liq':{
        name:'liq',
        age:18
    },
    'liq2':{
        name:'liq2',
        age:18
    },
    'liq3':{
        name:'liq3',
        age:18
    },
    'liq4':{
        name:'liq4',
        age:18
    },
    'liq5':{
        name:'liq5',
        age:18
    },
}

//多个请求依次传递，可以做校验等操作
app.all('/user/:username', function (req,res,next) {
    if(users[req.params.username]){
        next();
    }else{
        next(new Error(req.params.username+' not exists'))
    }
})
app.get('/user/:username', function (req,res,next) {
    res.send('user:'+req.params.username)
})

//静态和动态视图助手
//app.locals({
//    inspect: function (obj) {
//        return util.inspect(obj,true)
//    },
//    title:'nihao'
//})
app.use(function (req,res,next) {
    res.locals.name = 'liqss';
    res.locals.session = req.session;
    next();
})
app.get('/helper', function (req,res) {
    res.render('helper',{
        title:'helper'
    })
})
app.get('/newcenter', function (req,res) {
    res.render('center/newcenter',{
        title:'个人中心'
    })
})
app.get('/login', function (req,res) {
    res.render('login/login',{
        title:'停简单登录'
    })
})
app.get('/myOrder', function (req,res) {
    res.render('myOrder/myOrder',{
        title:'我的订单'
    })
})
//浏览器查询指定图片
app.get('/queryImg/:imgName', function (req,res) {
    fs.createReadStream('common/images/'+req.params.imgName+'.png').pipe(res);
})





app.listen(3000, function () {
    console.log('started...')
});