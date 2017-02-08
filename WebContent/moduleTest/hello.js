/**
 * Created by liqiang on 2017/2/8.
 */
function Hello(){
    var name;
    this.setName= function (a) {
        this.name=a;
    }
    this.say= function () {
        console.log(this.name)
    }
}

module.exports=Hello;