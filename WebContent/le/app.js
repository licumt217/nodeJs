/**
 * Created by liqiang on 2017/1/24.
 */
var express=require('express');
var utility=require('utility');
var app=express();
app.get('/', function (req,res) {
    var q=req.query.q;
    console.log(q)
    var md5=utility.md5(q);
    res.send(md5)


})


app.listen(3000, function () {
    console.log('is listening at 3000!')
})