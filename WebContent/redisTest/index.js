/**
 * Created by liqiang on 2017/2/7.
 */
var redis=require('redis');
var RDS_PORT=6379;
var RDS_HOST='127.0.0.1';
var RDS_PWD="123";


var TEST_RDS_PORT=46001;
var TEST_RDS_HOST='172.16.2.11';
var TEST_RDS_PWD="tingcheeasy";



var RDS_OPTS={
    //auth_pass:RDS_PWD
};
var TEST_RDS_OPTS={
};
//var client=redis.createClient();

function getTestClient(){
    return redis.createClient(TEST_RDS_PORT,TEST_RDS_HOST,TEST_RDS_OPTS);
}
function getClient(){
    return redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
}

var client=getTestClient();

client.on('connect', function () {
    client.set('name','liqiang',redis.print);
    client.get('name',redis.print);

    //client.hset('thekey','xx','2',redis.print);
    //
    //client.hkeys('thekey', function (err,data) {
    //    console.log(data)
    //})


    //client.hmset(["key", "test keys 1", "test val 1", "test keys 2", "test val 2"], function (err, res) {});
    //// Works the same as
    //client.hmset("key", ["test keys 11", "test val 1", "test keys 2", "test val 2"], function (err, res) {});
    //// Or
    //client.hmset("key", "test keys 12", "test val 1", "test keys 2", "test val 2", function (err, res) {});
    //
    //
    //
    //client.hmset('key5',{
    //    "key":'li',
    //    "value":'qiang'
    //})
    //
    //client.hgetall('key5', function (err,obj) {
    //    console.dir(obj)
    //})
    //
    //
    //client.get("missingkey", function(err, reply) {
    //    // reply is null when the key is missing
    //    console.log(reply);
    //});
    //
    //
    //var key='skills';
    //client.sadd(key,'java');
    //client.sadd(key,'javascript');
    //client.sadd(key,'nodeJs');
    //
    //client
    //    .multi()
    //    .sismember(key,'java').smembers(key).exec(function (err,data) {
    //    console.log('got:'+data.length);
    //    data.forEach(function (item,i) {
    //        console.log(i+":"+item.toString());
    //    })
    //    client.quit();
    //})





    console.log('connect')
})

//client.auth(TEST_RDS_PWD, function () {
//    console.log("redis 通过认证！");
//})

client.on('ready', function (err) {
    console.log('ready')
})

