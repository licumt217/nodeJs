/**
 * Created by liqiang on 2016/10/10.
 */

var ip='localhost',dbName='tjd';
var conn=require('./connection')(ip,dbName);
var Colleague=require('./models/colleague')(conn);


function add(){
    var users=[
        {
            name:'张玉龙',
            age:18
        },
        {
            name:'张帅军',
            age:15
        },
        {
            name:'张欢',
            age:17
        },
        {
            name:'周晓东',
            age:26
        }
    ];
    users.forEach(function (item) {
        // new 一个新对象，名叫 kitty
        // 接着为 kitty 的属性们赋值
        var c = new Colleague(item);

        // 调用 .save 方法后，mongoose 会去你的 mongodb 中的 test 数据库里，存入一条记录。
        c.save(function (err) {
            if (err){
            }else{
                console.log('saved!');
            }
        });
    })


}
/**
 * 查询
 */
function query(){
    Colleague.find({}, function (err,docs) {
        var users=[];
        //docs.forEach(function (item) {
        //    console.log(item)
        //    users.push(item)
        //});
        console.log(docs)

    })
}

/**
 * 查找并更新
 * @param id
 */
function findById(id){
    Colleague.findById(id, function (err,c) {
        console.log('c:'+c);
        c.age=200;
        c.save(function () {
            
        })
    })
}

//add();

findById('580f563dcf53f31b54f4a6ed');
query();