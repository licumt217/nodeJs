var tjdModalEntity={
	defaultErrorMsg:"网络繁忙请稍等",
	fadeOutTime:200,//模态窗关闭的动画时间
	messageBottom:"您确定吗？",//底部提示信息的默认值
	oneButtonMessage:"确定",//底部只有一个按钮时，按钮的默认文字
	autoCloseTime:2200,//弹出窗多久后自动关闭
	modalWidth:'80%',//模态窗默认宽度
	errorImgUrl:'../common/images/newfile.png',
	successImgUrl:'../common/images/newsuccess.png',
	noticeImgUrl:'../common/images/newnotice.png',
	maskClass:'.tjd_modal_mask',//遮罩类
	modalImgClass:'.tjd_modal_img',
	messageTopClass:".modal_info_top",
	messageBottomClass:".modal_info_bottom",
	tjd_modal_class:'.tjd_modal',
	modal_body_class:'.tjd_modal_body',
	nobutton_modalbody_class:'nobutton_modalbody_class',
	button_color_class:'.tjd_modal_footer input',
	one_button_class:'one_button_class'
};
var tjd_modal_footer=".tjd_modal_footer";
var modal_cancel_btn=".modal_cancel_btn";
var modal_confirm_btn=".modal_confirm_btn";
var modal_cancel_btn=".modal_cancel_btn";

(function($){

	/**
	 * 提示弹出窗，失败、成功、警告
	 *  errorMsg:可以自定义第一行的提示信息,
	 messageBottom:自定义第二行的提示信息,
	 type:0,//0是错误信息，1是成功信息，2是警告信息。对应不同的提示图标
	 withTwoButtons:0,//是否带有关闭和确定两个按钮
	 buttonColor:"#4EA8B1",按钮的颜色
	 bodyColor:"#FFF",弹出窗主体的颜色
	 withMessageBottom:0,是否显示第二行的提示信息
	 withOneButton:1,是否只显示一个确定按钮，0否，1是。默认1
	 oneButtonMessage:oneButtonMessage,只显示一个按钮时此按钮上的信息
	 width:""弹出窗的宽度，可以百分比或em或px
	 */
	$.extend({
		showTjdModal:function(options){
			var defaults={
				errorMsg:tjdModalEntity.defaultErrorMsg,
				type:0,//0是错误信息，1是成功信息，2是警告信息  3自定义图片信息
				titleimg:"",
				imgdivcss:"",
				withTwoButtons:0,//是否带有关闭按钮
				buttonColor:"#FFF",
				bodyColor:"#FFF",
				withMessageBottom:0,//是否有底部提示信息，默认没有
				messageBottom:tjdModalEntity.messageBottom,//底部提示信息
				withOneButton:1,//是否只有一个按钮，默认是。0不是，1是
				oneButtonMessage:tjdModalEntity.oneButtonMessage,//只有一个按钮时，按钮的文字
				width:tjdModalEntity.modalWidth,
				noButton:0,//是否不显示按钮，1不显示按钮,
				callBack:'',
				callBackForCancel:'',//有取消和确定按钮时给取消按钮添加回调函数
				scope:''
			};
			$.reset();
			var opts=$.extend(defaults,options);
			$.showModalImg(opts);
			$.showModalMessages(opts);
			$.adjustModalWidth(opts);
			$.showButtons(opts);
			$.setColors(opts);
			$(modal_cancel_btn).bind('touchstart',function(e){//
				$(this).css('background','#E3E3E3');
				e.preventDefault();
			});
			setTimeout(function(){
				$.bindTjdModalEvent(opts);
			},17);//直接绑定事件的话，有可能点击某按钮弹出弹窗时，直接出发弹窗的关闭事件！
			//},500);//直接绑定事件的话，有可能点击某按钮弹出弹窗时，直接出发弹窗的关闭事件！
			$.showModalDom();
			if(opts.imgdivcss){
				$(tjdModalEntity.modalImgClass).css(opts.imgdivcss);
			}
		},
		showButtons:function(opts){
			if(opts.withTwoButtons==1){//带确定和取消按钮
				$(tjd_modal_footer).show();
			}else if(opts.noButton==1){//没有按钮，2.2秒后自动关闭
				$(tjd_modal_footer).hide();
				$(tjdModalEntity.modal_body_class).addClass(tjdModalEntity.nobutton_modalbody_class);
				setTimeout(function(){
					$.hideTjdModal();
				},tjdModalEntity.autoCloseTime);
			}else{//默认只有一个确定按钮
				$(modal_confirm_btn).hide();
				$(modal_cancel_btn).addClass(tjdModalEntity.one_button_class).val(opts.oneButtonMessage);
			}
		},
		reset:function(){
			$(tjd_modal_footer).show();
			$(modal_cancel_btn).show();
			$(modal_confirm_btn).show();
			$(tjdModalEntity.messageTopClass).text("");
			$(tjdModalEntity.messageBottomClass).text("");
			$(tjdModalEntity.modal_body_class).removeClass(tjdModalEntity.nobutton_modalbody_class);
			$(modal_cancel_btn).removeClass(tjdModalEntity.one_button_class);
			$(tjdModalEntity.messageBottomClass).hide();
			$(modal_cancel_btn).val("取消");
			$(modal_confirm_btn).unbind('touchend');
			$(modal_cancel_btn).unbind('touchend');
		},
		setColors:function(opts){
			$(tjdModalEntity.button_color_class).css('backgroundColor',opts.buttonColor);
			$(tjdModalEntity.tjd_modal_class).css('backgroundColor',opts.bodyColor);
			$(tjdModalEntity.modal_body_class).css('backgroundColor',opts.bodyColor);
		},
		showModalDom:function(){
			//设置样式让弹窗垂直居中
			var webViewTopHeight=48;//微信支付宝等顶部容器标题栏的高度
			var clientHeight=document.body.clientHeight*1;
			var modalHeight=$(tjdModalEntity.tjd_modal_class).height()*1;
			var absoluteTop=(clientHeight-modalHeight)/2-webViewTopHeight;
			$(tjdModalEntity.maskClass).show();
			$(tjdModalEntity.tjd_modal_class).css('top',absoluteTop+"px").show();
		},
		bindTjdModalEvent:function(opts){

			if(opts.callBack){
				if(opts.withTwoButtons=="1"){
					$(modal_confirm_btn).bind('touchend',function(e){
						e.preventDefault();
						e.stopPropagation();
						$.hideTjdModal();
						setTimeout(function(){
							if(opts.scope){
								opts.scope[opts.callBack]();
							}else{
								try{
									eval(opts.callBack+"()");
								}catch(e){
									opts.callBack();
								}

							}
						},tjdModalEntity.fadeOutTime);
					}).bind('touchstart', function () {
						$(this).css('background','#E3E3E3');
					});
					if(sessionStorage.isTest){
						$(modal_confirm_btn).bind('click', function () {
							$(this).trigger('touchend')
						});
					}
					if(opts.callBackForCancel){
						$(modal_cancel_btn).bind('touchend',function(e){
							e.preventDefault();
							e.stopPropagation();
							$.hideTjdModal();
							setTimeout(function(){
								if(opts.scope){
									opts.scope[opts.callBackForCancel]();
								}else if(typeof opts.callBackForCancel=='function'){
									opts.callBackForCancel();
								}else{
									try{
										eval(opts.callBackForCancel+"()");
									}catch(e){
										opts.callBackForCancel();
									}
								}
							},tjdModalEntity.fadeOutTime);
						});
						if(sessionStorage.isTest){
							$(modal_cancel_btn).bind('click', function () {
								$(this).trigger('touchend')
							});
						}
					}else{
						//如果有取消按钮，则绑定关闭弹出窗事件n
						$(modal_cancel_btn).bind('touchend',function(e){
							e.preventDefault();
							e.stopPropagation();
							$.hideTjdModal();
						});
						if(sessionStorage.isTest){
							$(modal_cancel_btn).bind('click', function () {
								$(this).trigger('touchend')
							});
						}
					}


				}else{
					$(modal_cancel_btn).bind('touchend',function(e){
						e.preventDefault();
						e.stopPropagation();
						$.hideTjdModal();
						setTimeout(function(){
							if(opts.scope){
								opts.scope[opts.callBack]();
							}else{
								try{
									eval(opts.callBack+"()");
								}catch(e){
									opts.callBack();
								}
							}
						},tjdModalEntity.fadeOutTime);
					});
					if(sessionStorage.isTest){
						$(modal_cancel_btn).bind('click', function () {
							$(this).trigger('touchend')
						});
					}
				}
			}else{
				//如果有取消按钮，则绑定关闭弹出窗事件n
				$(modal_cancel_btn).bind('touchend',function(e){
					e.preventDefault();
					e.stopPropagation();
					$.hideTjdModal();
				});
				if(sessionStorage.isTest){
					$(modal_cancel_btn).bind('click', function () {
						$(this).trigger('touchend')
					});
				}
			}


		},
		hideTjdModal:function(){
			$(tjdModalEntity.maskClass).fadeOut(tjdModalEntity.fadeOutTime);
			$(tjdModalEntity.tjd_modal_class).fadeOut(tjdModalEntity.fadeOutTime);
		},
		showModalImg:function(opts){
			var imgSrc=tjdModalEntity.errorImgUrl;//失败
			if(opts.type==1){
				imgSrc=tjdModalEntity.successImgUrl;//成功
			}else if(opts.type==2){
				imgSrc=tjdModalEntity.noticeImgUrl;//警告
			}else if(opts.type == 3){
				imgSrc = opts.titleimg;
			}
			$(tjdModalEntity.modalImgClass).find('img').attr('src',imgSrc);
		},
		showModalMessages:function(opts){
			$(tjdModalEntity.messageTopClass).html(opts.errorMsg);
			//判断是否显示第二条信息
			if(opts.withMessageBottom==1){
				$(tjdModalEntity.messageBottomClass).html(opts.messageBottom).show();
			}
		},
		adjustModalWidth:function(opts){//判断是否需要调整弹出窗的宽度
			if(opts.width){
				var toAdjustWidth=0;
				var toCal="0";
				if(opts.width.indexOf('%')!=-1){
					toAdjustWidth=opts.width.substring(0,opts.width.length-1);
					toCal=toAdjustWidth/2+"%";
				}else{
					toAdjustWidth=opts.width.substring(0,opts.width.length-2);
					toCal=toAdjustWidth/2+opts.width.substring(opts.width.length-2);
				}
				$(tjdModalEntity.tjd_modal_class).css({
					width:opts.width,
					left: document.body.clientWidth*0.1+"px"
				});
			}
		},

		showTjdMask:function(){
			$(tjdModalEntity.maskClass).show();
		},
		hideTjdMask:function(){
			$(tjdModalEntity.maskClass).hide();
		},


	});

})(jQuery);

