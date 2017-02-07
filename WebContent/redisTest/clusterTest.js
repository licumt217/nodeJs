/**
 * Created by liqiang on 2017/2/7.
 * 测试线的redis是集群
 */
var Redis=require('ioredis');

var client=new Redis.Cluster([{
    port:46001,
    host:'172.16.2.11'
},{
    port:46001,
    host:'172.16.2.12'
},{
    port:46001,
    host:'172.16.2.13'
}]);



client.on('connect', function () {
    client.set('name','liqiang', function () {
        console.log(1)
    });
    client.get('name', function () {
        console.log(2)
    });






    console.log('connect')
})


client.on('ready', function (err) {
    console.log('ready')
})

