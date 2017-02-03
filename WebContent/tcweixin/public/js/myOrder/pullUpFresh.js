var _scroll;
var theDistance2Reload=150;//上啦多少距离后开始加载数据



/**
 * 初始化余额页面滚动动态加载明细
 */
function initScroll (fresh) {
	if(!util.isEmpty(_scroll) && typeof _scroll=="object"){
		_scroll.refresh();
	}else{
		_scroll = new IScroll('.wrapper', {
			mouseWheel: true,
			click:true,
			fadeScrollbars:false,
			scrollbars:false,
			probeType:3
		});
		_scroll.on('scroll', function(){
			if(this.maxScrollY-this.y>theDistance2Reload){
				$(".historyLoading").removeClass("tjdHidden");
				if(!util.isEmpty(fresh)){
					if(typeof fresh =='function'){
						fresh();
					}
				}
			}
		});
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	}

}
