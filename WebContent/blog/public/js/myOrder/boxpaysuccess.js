$(function(){
	initData();
});
//显示支付信息
function initData(){
	var payInfo = sessionStorage.payInfo;
	payInfo = JSON.parse(payInfo);
	$("#payAmount").html(payInfo.payAmount);
	$("#inTime").html(payInfo.inTime);
	$("#outTime").html(payInfo.outTime);
	$("#placeTime").html(payInfo.placeTime);
	sessionStorage.payInfo = "";
}