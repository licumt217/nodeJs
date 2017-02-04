/**
 * Created by liqiang on 2017/2/3.
 */
var request=require('superagent');
var http=require('http');
var queryString = require('queryString');

var url='http://test.tingjiandan.com/tcserver/gateway'
function useSuperAgent(){
    request
        .post('http://test.tingjiandan.com/tcserver/gateway')
        .send('{"platform":"baidu","version":"3.0.0","channel":"96","userId":"f7a4ff3703af4c4aa65bdcc936a9cc83","payChannel":"3004","openId":"0.33130548694138273","openid":"0.33130548694138273","phone":"12150000001","topic":"3.0.0","command":"order","method":"getCurrentOrderList"}|{"platform":"baidu","version":"3.0.0","channel":"96","userId":"f7a4ff3703af4c4aa65bdcc936a9cc83","payChannel":"3004","openId":"0.33130548694138273","openid":"0.33130548694138273","phone":"12150000001","topic":"3.0.0","command":"order","method":"getDebtOrderList"}|{"platform":"baidu","version":"3.0.0","channel":"96","userId":"f7a4ff3703af4c4aa65bdcc936a9cc83","payChannel":"3004","openId":"0.33130548694138273","openid":"0.33130548694138273","phone":"12150000001","topic":"3.0.0","command":"order","method":"getHistoryOrder","type":"0","limit":"3","debtParkInfoIds":"$.order_getDebtOrderList.debtOrders[*].omParkInfoId"}')
        //.set('X-API-Key', 'foobar')
        //.set('Accept', 'application/json')
        .end(function (err,res) {
            var data=res.text;
            data=JSON.parse(data);
            if(data.isSuccess!='0'){
                console.log(data.errorMsg)
            }else{
                console.log(data)
            }

        })
}
function useRequest(){
    var postData='{"platform":"baidu","version":"3.0.0","channel":"96","userId":"f7a4ff3703af4c4aa65bdcc936a9cc83","payChannel":"3004","openId":"0.33130548694138273","openid":"0.33130548694138273","phone":"12150000001","topic":"3.0.0","command":"order","method":"getCurrentOrderList"}|{"platform":"baidu","version":"3.0.0","channel":"96","userId":"f7a4ff3703af4c4aa65bdcc936a9cc83","payChannel":"3004","openId":"0.33130548694138273","openid":"0.33130548694138273","phone":"12150000001","topic":"3.0.0","command":"order","method":"getDebtOrderList"}|{"platform":"baidu","version":"3.0.0","channel":"96","userId":"f7a4ff3703af4c4aa65bdcc936a9cc83","payChannel":"3004","openId":"0.33130548694138273","openid":"0.33130548694138273","phone":"12150000001","topic":"3.0.0","command":"order","method":"getHistoryOrder","type":"0","limit":"3","debtParkInfoIds":"$.order_getDebtOrderList.debtOrders[*].omParkInfoId"}';
    var options={
        host:'test.tingjiandan.com',
        path:'/tcserver/gateway',
        method:'POST',
        port:80,
        headers:{
             //'Accept':'*/*',
             //'Accept-Encoding':'gzip, deflate',
             //'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
             //Connection:'keep-alive',
             //'Content-Length':888,
             //'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
             //Cookie:'SERVERID=638bb5a66173d0ada71aa23ee18a32a5|1486104465|1486104465',
             //Host:'test.tingjiandan.com',
             //Origin:'http://test.tingjiandan.com',
             //Referer:'http://test.tingjiandan.com/tcweixin/letter/myOrder/myOrder.html?0.10198951886232233',
             //'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
             //'X-Requested-With':'XMLHttpRequest'
        }
    }

    var req=http.request(options, function (res) {
        if(res.statusCode==200){
            var result='';
            res.on('data',function (data) {
                result+=data;
            }).on('end', function () {
                result=JSON.parse(result)
                console.log(result.isSuccess)
                console.log('end')
            })
        }else{

        }

    })
    req.on('error', function (err) {
        console.log(err)
    })

    req.write(postData);
    req.end();
}

//useRequest();
useSuperAgent



