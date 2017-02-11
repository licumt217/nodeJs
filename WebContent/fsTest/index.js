/**
 * Created by liqiang on 2017/2/9.
 */
var fs=require('fs');
fs.readFile('../redisTest/index.js','utf8', function (err,data) {
    //console.log(data)
})

var b=fs.readFileSync('../redisTest/index.js','utf8');
console.log(';;:'+b)