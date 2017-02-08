/**
 * Created by liqiang on 2017/2/8.
 */
var EventEmitter=require('events').EventEmitter;
var event=new EventEmitter();

event.on('li', function () {
    console.log('text')
})

setTimeout(function () {
    event.emit('li')
},2000)