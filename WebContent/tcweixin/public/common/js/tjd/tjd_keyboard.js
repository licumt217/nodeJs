var tjdKbdCurActiveInput=null;
tjd_keyboard_start();
	
function tjd_keyboard_start(){
	showTjdKbdInputZone();
	tjdKbdCurActiveInput=$(".tjd_carnum_second");
	//在对应页面，调用此方法，传入对应的dom元素
	initTjdKeyboard(".tjd_carnum_input_div,.tjd_carnum_two,.tjd_carnum_one");
	bindTjdKeyboardEvents();
}
  /**
   * 绑定车牌号键盘操作相关事件
   */
  function bindTjdKeyboardEvents(){
  	//点击键盘外区域时隐藏键盘
  	$(document).bind('touchend',function(){
  		hideTjdAllKeyboards();
  	});
  	//点击第一位车牌号弹出选择省份键盘
  	$(".tjd_carnum_first").bind('touchend',function(e){
  		  showTjdKeyboardOne();
  	      $(this).addClass("tjd_keyboard_input_active").siblings().removeClass("tjd_keyboard_input_active");
  	      e.stopPropagation();
  	  });
  	//点击非第一位车牌号弹出选择字母数字键盘
  	$(".tjd_carnum_second,.tjd_carnum_third,.tjd_carnum_forth,.tjd_carnum_fivth,.tjd_carnum_sixth,.tjd_carnum_seventh").bind('touchend',function(e){
  		showTjdKeyboardTwo();
  	    $(this).addClass("tjd_keyboard_input_active").siblings().removeClass("tjd_keyboard_input_active");
  	    tjdKbdCurActiveInput=$(this);
  	    e.stopPropagation();
  	});
  	//中文键盘选择事件
  	$(".tjd_keyboard_one_btn").bind("touchend",function(e){
  		showTjdKeyboardTwo();
  	    $(".tjd_carnum_first:visible").val($(this).val());
  	    resetTjdKeyBoardActiveState();
  	    e.stopPropagation();
  	    return false;
  	});
  	//字母数字键盘选择事件
  	$(".tjd_keyboard_two_btn").bind("touchend",function(e){
  	    tjdKbdCurActiveInput.val($(this).val());
  	    if(!tjdKbdCurActiveInput.hasClass("tjd_carnum_seventh")){
  	        tjdKbdCurActiveInput=tjdKbdCurActiveInput.next();
  	        tjdKbdCurActiveInput.siblings().removeClass("tjd_keyboard_input_active").end().addClass('tjd_keyboard_input_active');
  	    }
  		e.stopPropagation();
  		return false;
  	});
  	//点击键盘内部但是不是具体键值上时，键盘不消失
  	$(".tjd_carnum_two,.tjd_carnum_one").bind("touchmove",function(e){
  	    e.stopPropagation();
  	    e.preventDefault();
  	    return false;
  	});
  	//数字字母键盘删除按钮的删除事件
  	$(".tjd_keyboard_del_btn").bind('touchend',function(e){
  	    if(!tjdKbdCurActiveInput.hasClass("tjd_carnum_first")){
  	    	tjdKbdCurActiveInput.val("");
  	        tjdKbdCurActiveInput=tjdKbdCurActiveInput.prev();
  	        if(tjdKbdCurActiveInput.hasClass("tjd_carnum_first")) {
    	    	showTjdKeyboardOne();
    	    };
  	    } 
  	    tjdKbdCurActiveInput.siblings().removeClass("tjd_keyboard_input_active").end().addClass('tjd_keyboard_input_active');
  	    e.stopPropagation();
  	    return false;
  	});
  }
  
  /**
   * 重置默认键盘光标位置
   */
  function resetTjdKeyBoardActiveState(){
  	tjdKbdCurActiveInput=$(".tjd_carnum_second");
  	tjdKbdCurActiveInput.addClass("tjd_keyboard_input_active").siblings().removeClass("tjd_keyboard_input_active");
  }
  
//隐藏所有键盘
  function hideTjdAllKeyboards(){
  	$(".tjd_carnum_two").hide();
      $(".tjd_carnum_one").hide();
  }
  function showTjdKbdInputZone(){
	  $(".tjd_carnum_input_div_parent").show();
  }
  /**
   * 显示键盘1
   */
  function showTjdKeyboardOne(){
  	$(".tjd_carnum_two").hide();
  	$(".tjd_carnum_one").show();
  }
  /**
   * 显示键盘2
   */
  function showTjdKeyboardTwo(){
  	$(".tjd_carnum_two").show();
  	$(".tjd_carnum_one").hide();
  }
  
  /**
   * 获得停简单键盘用户输入的车牌号
   * @returns
   */
  function getTjdKbdCarnum(){
  	return $(".tjd_carnum_first:visible").val()+ $(".tjd_carnum_second:visible").val()+ $(".tjd_carnum_third:visible").val()+ $(".tjd_carnum_forth:visible").val()+ $(".tjd_carnum_fivth:visible").val()+ $(".tjd_carnum_sixth:visible").val()+ $(".tjd_carnum_seventh:visible").val();
  }
  /**
   * 将车牌号设置到键盘
   */
  function setCarNum2Board(carNum){
	  if(util.isEmpty(carNum)){
			$(".tjd_carnum_first:visible").val("京");
		}else{
			$(".tjd_carnum_first:visible").val(carNum.charAt(0));
		    $(".tjd_carnum_second:visible").val(carNum.charAt(1));
		    $(".tjd_carnum_third:visible").val(carNum.charAt(2));
		    $(".tjd_carnum_forth:visible").val(carNum.charAt(3));
		    $(".tjd_carnum_fivth:visible").val(carNum.charAt(4));
		    $(".tjd_carnum_sixth:visible").val(carNum.charAt(5));
		    $(".tjd_carnum_seventh:visible").val(carNum.charAt(6));
		}
  }
  /**
   * 重置停简单键盘
   * @param type 0代表重置可见的键盘，1代表重置不可见的键盘
   */
  function resetTjdKdb(type){
	  if(util.isEmpty(type) || type==0){
		  $(".tjd_carnum_first:visible").val("京");
		    $(".tjd_carnum_second:visible").val("");
		    $(".tjd_carnum_third:visible").val("");
		    $(".tjd_carnum_forth:visible").val("");
		    $(".tjd_carnum_fivth:visible").val("");
		    $(".tjd_carnum_sixth:visible").val("");
		    $(".tjd_carnum_seventh:visible").val("");
	  }else{
		  $(".tjd_carnum_first:hidden").val("京");
		    $(".tjd_carnum_second:hidden").val("");
		    $(".tjd_carnum_third:hidden").val("");
		    $(".tjd_carnum_forth:hidden").val("");
		    $(".tjd_carnum_fivth:hidden").val("");
		    $(".tjd_carnum_sixth:hidden").val("");
		    $(".tjd_carnum_seventh:hidden").val("");
	  }
  }
  /**
   * 是否车牌输入了但是不全
   * @returns {Boolean}
   */
  function isCarNumNotFull(){
	  if(getTjdKbdCarnum().length>1 && getTjdKbdCarnum().length<7){
		  return true;
	  }
	  return false;
	  
  }
  /**
   * 车牌号是否为空，长度为0或1
   * @returns {Boolean}
   */
  function isCarNumEmpty(){
	  if(getTjdKbdCarnum().length<=1){
		  return true;
	  }
	  return false;
	  
  }

  /**
   * 是否车牌完全没有输入(只有第一位有值)
   * @returns {Boolean}
   */
  function isCarNumFullEmpty(){
  	if(util.isEmpty($(".tjd_carnum_second:visible").val()) && util.isEmpty($(".tjd_carnum_third:visible").val()) && util.isEmpty($(".tjd_carnum_forth:visible").val()) && util.isEmpty($(".tjd_carnum_fivth:visible").val()) && util.isEmpty($(".tjd_carnum_sixth:visible").val()) && util.isEmpty($(".tjd_carnum_seventh:visible").val())){
  		return true;
  	}
  	return false;
  }
  /**
   * 初始化停简单车牌号键盘，根据传入的参数选择器来实现touch除了这些地方以外隐藏键盘
   */
  function initTjdKeyboard(selectors){
  	$(selectors).bind('touchend',function(e){
  		  e.stopPropagation();
  	  });
  }