/**
 * Created by liqiang on 2017/2/8.
 */
function* foo(x){
    var y=2*(yield (x+1));
    var z=yield (y/3);
    return x+y+z;
}

var b=foo(5);
console.log(b.next())
console.log(b.next(12));
console.log(b.next(13));


function* test1(){
    console.log(1)
    yield 'hello';
    console.log(2)
    yield 'world';
    console.log(3)
    return 'ending';
}
//var a=test1();
//a.next();
//a.next();
//a.next();
//


function * test2(){
    yield 1+22;
}

var c=test2();
console.log(c.next())
console.log(c.next())

function * test3(){
    console.log('test3')
}

var d=test3();
setTimeout(function () {
    d.next();
},2000)

function * test4(){
    for(var i=0;true;i++){
        var reset=yield i;
        if(reset){
            i=-1;
        }
    }
}

var g=test4();
console.log('-------------')
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next(true))
console.log(g.next())

function* test5(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    return 5;
}
for(var v of test5()){
    console.log(v)
}
































