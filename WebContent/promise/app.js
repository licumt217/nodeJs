/**
 * Created by liqiang on 2016/10/10.
 */
//var fs = require('fs');
//fs.readFile('none.txt', 'utf8', function (err, data) {
//    console.log(data);
//    fs.readFile('none2.txt', 'utf8', function (err,data) {
//        console.log(data);
//    });
//});

//var Q = require('q');
//var defer = Q.defer();
///**
// * 获取初始promise
// * @private
// */
//function getInitialPromise() {
//    return defer.promise;
//}
///**
// * 为promise设置三种状态的回调函数
// */
//getInitialPromise().then(function(success){
//    console.log(success);
//},function(error){
//    console.log(error);
//},function(progress){
//    console.log(progress);
//});
//defer.notify('in progress');//控制台打印in progress
//defer.resolve('resolve');   //控制台打印resolve
//defer.reject('reject');     //没有输出。promise的状态只能改变一次

var Q = require('q');
var defer = Q.defer();
/**
 * 通过defer获得promise
 * @private
 */
function getInputPromise() {
    return defer.promise;
}

/**
 * 当inputPromise状态由未完成变成fulfil时，调用function(fulfilled)
 * 当inputPromise状态由未完成变成rejected时，调用function(rejected)
 * 将then返回的promise赋给outputPromise
 * function(fulfilled) 和 function(rejected) 通过返回字符串将outputPromise的状态由
 * 未完成改变为fulfilled
 * @private
 */
var outputPromise = getInputPromise().then(function(fulfilled){
    //return 'fulfilled';
    throw new Error('fulfilled');
},function(rejected){
    //return 'rejected';
    throw new Error('rjected');
});

/**
 * 当outputPromise状态由未完成变成fulfil时，调用function(fulfilled)，控制台打印'fulfilled: fulfilled'。
 * 当outputPromise状态由未完成变成rejected, 调用function(rejected), 控制台打印'rejected: rejected'。
 */
outputPromise.then(function(fulfilled){
    console.log('fulfilled: ' + fulfilled);
},function(rejected){
    console.log('rejected: ' + rejected);
});

/**
 * 将inputPromise的状态由未完成变成rejected
 */
defer.reject(); //输出 fulfilled: rejected

/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
//defer.resolve(); //输出 fulfilled: fulfilled