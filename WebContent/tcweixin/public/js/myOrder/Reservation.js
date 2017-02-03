
$(function(){
    //隐藏所有的dd
    $(".couponList dl dd").hide();
    //显示第一个dd
    //点击dt
    $(".couponList").on('click','dl dt',function(){
    	
       $(this).parent().siblings('dl').children('dd').slideUp(1);
//        //切换显示当前dt后面的dd,即若当前dd是隐藏，则变成显示，否则变成隐藏
    $(this).next().slideToggle(1);

    });
});































