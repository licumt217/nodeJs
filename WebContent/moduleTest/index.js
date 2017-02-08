/**
 * Created by liqiang on 2017/2/8.
 */
var li=require('./li')
var Hello=require('./hello')
console.log(li.getName())
li.setName('zhang');
console.log(li.getName())

var hello=new Hello();
hello.say();
hello.setName('jj')
hello.say()