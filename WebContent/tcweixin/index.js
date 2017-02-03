/**
 * Created by liqiang on 2016/11/24.
 */
var express=require('express');
var app=express();
//app.use(express.bodyParser())
app.get('/', function (req,res) {
    res.send('hello');
});
app.listen(3000);