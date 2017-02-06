/**
 * Created by liqiang on 2017/2/6.
 */
function login(){
    var phone=$("#phone").val();
    var yzm=$("#yzm").val();
    if(!phone){
        alert("请输入手机号！");
        $("#phone").focus();
    }else if(!yzm){
        alert("请输入验证码！");
        $("#yzm").focus();

    }else{
        $.get('http://localhost:3000?phone='+phone+"&yzm="+yzm, function (data) {
            if(data.isSuccess!='0'){
                alert(data.errorMsg)
            }else{
                location.href='http://localhost:3000';
            }
        })
    }

}