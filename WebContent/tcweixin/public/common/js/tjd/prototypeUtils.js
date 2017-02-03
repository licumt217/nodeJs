/**
 * Created by liq on 2016/1/13.
 */
/**
 * 替换所有字符串
 */
String.prototype.replaceAll = function(s1,s2) {
    return this.replace(new RegExp(s1,"gm"),s2);

};
/**
 * 将字符串类型数字转为两位小数
 * @param count
 * @returns {string}
 */
String.prototype.toFixed = function(count) {
    var num=parseFloat(this)+0.00000001;//0.015四舍五入不准确，后边必须有数字才准确
    if(!count){
        count=2;
    }
    return num.toFixed(count);
};

/**
 * 将当前时间的毫秒转为年月日
 */
String.prototype.millisecondToYYYYMMDD = function(split) {
    var date = new Date(this*1);
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+split+(m<10?('0'+m):m)+split+(d<10?('0'+d):d);
};
/**
 * 将六位时分秒转为HH：mm:ss格式
 * @returns {string}
 */
String.prototype.transSixTime2Str = function() {
    var time=this;
    var h=time.substring(0,2);
    var m=time.substring(2,4);
    var s=time.substring(4,6);
    var str= h+":"+m+":"+s;
    return str;
};
/**
 * 将给定时分秒的数据库时长转为字符串，小时有可能大于2位；用于计算停车时长等
 * @returns {String}
 */
String.prototype.transTime2Str = function() {
    var time=this;
    var len=time.length;
    var cut=len-6;
    var h=time.substring(0,2*1+cut);
    var m=time.substring(2*1+cut,4*1+cut);
    var s=time.substring(4*1+cut,6*1+cut);
    var str= h+":"+m+":"+s;
    return str;
};
/**
 * 将给定时分秒的数据库的停放时长（一般为001248格式）转为字符串，小时有可能大于2位；用于计算停车时长等
 * @returns {String}
 */
String.prototype.transParkingTime2Str = function() {
    var time=this;
    var len=time.length;
    var cut=len-6;
    var h=time.substring(0,2*1+cut);
    var m=time.substring(2*1+cut,4*1+cut);
    var s=time.substring(4*1+cut,6*1+cut);
    var str= h+":"+m+":"+s;
    return str;
};
/**
 * 将给定时分秒的数据库时长转为字符串，小时有可能大于2位；用于计算停车时长等
 * @param time
 * @returns {String}
 */
String.prototype.transNum2Str = function() {
    var time=this;
    if(util.isEmpty(time)){
        return "00:00:00";
    }else{
        time=time*1;
        var h=parseInt((time/60)/60);
        var m=parseInt((time-h*60*60)/60);
        var s=(time-h*60*60-m*60)%60;
        if((h+"").length<2){
            h="0"+h;
        }
        if((s+"").length<2){
            s="0"+s;
        }
        if((m+"").length<2){
            m="0"+m;
        }
        return h+":"+m+":"+s;
    }
};
/**
 * 将给定整形的毫秒转为包含小时分钟和秒的对象
 * @param time
 */
Number.prototype.transMilliSec2Date = function() {
    var time=this;
    var obj={
        hour:"00",
        minute:"00",
        second:"00"
    };
    if(util.isEmpty(time)){
        return obj;
    }else{
        time=parseInt(time/1000);
        var h=parseInt((time/60)/60);
        var m=parseInt((time-h*60*60)/60);
        var s=(time-h*60*60-m*60);


        if((h+"").length<2){
            h="0"+h;
        }
        if((s+"").length<2){
            s="0"+s;
        }
        if((m+"").length<2){
            m="0"+m;
        }
        obj.hour=h;
        obj.minute=m;
        obj.second=s;
        return obj;
    }
};
/**
 * 将给定整形的毫秒转为包含小时分钟和秒的对象
 * @param time
 */
String.prototype.transMilliSec2Date = function() {
    var time=this;
    var obj={
        hour:"00",
        minute:"00",
        second:"00"
    };
    if(util.isEmpty(time)){
        return obj;
    }else{
        time=parseInt(time/1000);
        var h=parseInt((time/60)/60);
        var m=parseInt((time-h*60*60)/60);
        var s=(time-h*60*60-m*60);


        if((h+"").length<2){
            h="0"+h;
        }
        if((s+"").length<2){
            s="0"+s;
        }
        if((m+"").length<2){
            m="0"+m;
        }
        obj.hour=h;
        obj.minute=m;
        obj.second=s;
        return obj;
    }
};

/**
 * 将XX:XX:XX的时分秒字符串转为整形的秒数
 * @param time
 * @returns {String}
 */
String.prototype.transTimeStr2Num = function() {
    var time=this;
    if(util.isEmpty(time)){
        return 0;
    }else{
        var arr=time.split(":");
        return arr[0]*60*60+arr[1]*60+arr[2]*1;

    }
};
/**
 * 将xxxx-XX-XX 22:22:22格式的年月日时分秒字符串转为8位的年月日
 * @param time
 * @returns {String}
 */
String.prototype.transDateTimeStr2E = function() {
    var datetime=this;
    if(util.isEmpty(datetime)){
        return "00000000";
    }else{
        return datetime.substring(0,4)+datetime.substring(5,7)+datetime.substring(8,10);

    }
};
/**
 * 将将日期对象转为8位的年月日
 * @param time
 * @returns {String}
 */
Date.prototype.transDate2Eight = function() {
    var date=this;
    if(util.isEmpty(date)){
        return "00000000";
    }else{
        return date.getFullYear()+util.transNum2Two(((date.getMonth()+1)+""))+util.transNum2Two(date.getDate());
    }
};
/**
 * 给定的字符串时间格式加1秒
 * @param time
 * @returns {String}
 */
String.prototype.strTimePlusOne = function() {
    var str=this;
    var arr=str.split(":");
    var h=arr[0];
    var m=arr[1];
    var s=arr[2];
    var total=h*60*60+m*60+s*1+1*1;
    h=Math.floor(total/(60*60));
    m=Math.floor((total-h*60*60)/60);
    s=total-h*60*60-m*60;
    if(h<10){
        h="0"+h;
    }
    if(m<10){
        m="0"+m;
    }
    if(s<10){
        s="0"+s;
    }

    return h+":"+m+":"+s;
};
/**
 * 停放时长字符串时间格式加1秒
 * @param time
 * @returns {String}
 */
String.prototype.parkingTimePlusOne = function() {
    var str=this;
    var arr=str.split(":");
    var h=arr[0];
    var m=arr[1];
    var s=arr[2];
    var total=h*60*60+m*60+s*1+1*1;
    h=Math.floor(total/(60*60));
    m=Math.floor((total-h*60*60)/60);
    s=total-h*60*60-m*60;
    if(h<10){
        h="0"+h;
    }
    if(m<10){
        m="0"+m;
    }
    if(s<10){
        s="0"+s;
    }

    return h+":"+m+":"+s;
};

/**
 * 给定的字符串时间格式减1秒
 * @param time
 * @returns {String}
 */
String.prototype.strTimeMinusOne = function() {
    var str=this;
    var arr=str.split(":");
    var h=arr[0];
    var m=arr[1];
    var s=arr[2];
    var total=h*60*60+m*60+s*1-1*1;
    h=Math.floor(total/(60*60));
    m=Math.floor((total-h*60*60)/60);
    s=total-h*60*60-m*60;
    if(h<10){
        h="0"+h;
    }
    if(m<10){
        m="0"+m;
    }
    if(s<10){
        s="0"+s;
    }

    return h+":"+m+":"+s;
};
/**
 * 八位日期格式字符串加减天数
 */
String.prototype.eightDateStrPlusDays = function(plusDays) {
    var date=this;
    if(util.isEmpty(plusDays)){
        plusDays=0;
    }
    var years = date.substring(0,4);
    var months =  date.substring(4,6);
    var days =date.substring(6,8);
    //抓取前一天日期
    var dd=months + "/" + days + "/" + years;

    var a = new Date(dd);
    a = a.valueOf();
    a = a + plusDays * 24 * 60 * 60 * 1000;
    a = new Date(a);
    return util.getNowDateStr("",a);
};
/**
 * 将14位的日期时间串转为日期字符串
 * @param dateTime
 * @param symbol
 * @returns {String}
 */
String.prototype.trans14Datetime2Str = function(symbol) {
    var dateTime=this;
    var date=dateTime.substring(0,8);
    var time=dateTime.substring(8,14);

    return date.transEightDate2Str(symbol)+" "+time.transSixTime2Str();
};
/**
 * 将8位XXXXXXXX年月日格式转为XXXX-XX-XX的字符串
 * @param time
 * @returns {String}
 */
String.prototype.transEightDate2Str = function(symbol) {
    var date=this;
    var y=date.substring(0,4);
    var m=date.substring(4,6);
    var d=date.substring(6,8);
    if(util.isEmpty(symbol)){
        symbol="-";
    }
    return y+symbol+m+symbol+d;
};
/**
 * 防止字符显示过长导致排版错位，截取前n位返回
 * @param str
 * @returns
 */
String.prototype.cutStr = function(position) {
    var str=this;
    if(util.isEmpty(position)){
        position=8;
    }
    if(str && str.length>position){
        return str.substring(0,position);
    }else{
        return str;
    }
};
/**
 * 将9991212（小时有可能大于两位数）格式的停放时长的时间格式转为数值型
 * @param parkingTimeStr
 * @returns {*}
 */
String.prototype.transParkingTimeStr2Num = function() {

    var str=this;
    if(util.isEmpty(str) || str.length<=0){
        return 0;
    }
    if(str.length<8){
        var len=8-str.length;
        for(var i=0;i<len;i++){
            str='0'+str;
        }
    }
    var hLen=str.length-4;
    var secs=str.substr(-2,2)*1;
    var mins=str.substr(-4,2)*60;
    var hours=str.substr(0,hLen)*60*60;


    return hours+mins+secs;
};
/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
Number.prototype.subtract = function (arg1) {
    var arg2=this;

    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg2 * m - arg1 * m) / m).toFixed(n);
};

/**
 * js日期直接加一个月BUG Fix
 * @param month
 * @param day
 */
Date.prototype.setMonthLikeJava= function (month,day) {

    var date = this;
    var currentDate = date.getDate();
    date.setDate(1);
    date.setMonth(month);
    var daysInMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    date.setDate(Math.min(currentDate, daysInMonth));

}






