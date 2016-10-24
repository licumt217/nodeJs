/**
 * Created by liqiang on 2016/8/2.
 */
/**
 * 弹窗
 */
var tjdModalComponent = Vue.extend({
    template: '' +
    '<link rel="stylesheet" href="../common/css/tjd_modal.css"/>'+

    '<div class="tjd_modal_mask"></div>'+
    '<div class="tjd_modal" style="display: none">'+
    '<div class="tjd_modal_header">'+
    '</div>'+

    '<div class="tjd_modal_body">'+
    '<p class="tjd_modal_img"><img /></p>'+
    '<p class="modal_info_top"></p>'+
    '<p class="modal_info_bottom"></p>'+
    '</div>'+

    '<div class="tjd_modal_footer">'+
    '<input type="button" value="取消" class="modal_cancel_btn" />'+
    '<input type="button" value="确定"  class="modal_confirm_btn" />'+
    '</div>'+
    '</div>'
});
var _eventType="touchend";
if(util.isTest()){
    _eventType="click";
}
/**
 * 车牌号
 */
var tjdKbdComponent = Vue.extend({
    template: '' +
    '<link rel="stylesheet" href="../common/css/tjd_keyboard_vue.css"/>'+
        '<!-- 键盘输入区域 -->'+
        '<div class="tjd_carnum_input_div">'+
        '<div class="tjd_carnum_input_div_one" style="display:none">'+
            '<input type="button" onfocus="this.blur();" class="tjd_carnum_first carnum_btn"   v-on:click="showTjdKbd(1,$event)" value="京"/>'+
            '<input type="button" onfocus="this.blur();" class="tjd_carnum_second carnum_btn"  v-on:click="showTjdKbd(2,$event)"/>'+
            '<input type="button" onfocus="this.blur();" class="tjd_carnum_third carnum_btn"   v-on:click="showTjdKbd(3,$event)"  />'+
            '<input type="button" onfocus="this.blur();" class="tjd_carnum_forth carnum_btn"   v-on:click="showTjdKbd(4,$event)"  />'+
            '<input type="button" onfocus="this.blur();" class="tjd_carnum_fivth carnum_btn"   v-on:click="showTjdKbd(5,$event)"  />'+
            '<input type="button" onfocus="this.blur();" class="tjd_carnum_sixth carnum_btn"   v-on:click="showTjdKbd(6,$event)"  />'+
            '<input type="button" onfocus="this.blur();" class="tjd_carnum_seventh carnum_btn" v-on:click="showTjdKbd(7,$event)"/>'+
        '</div>'+
        '</div>'+

        '<!-- 中文键盘区域 -->'+
        '<div class="tjd_carnum_one" style="display:none;">'+
        '<div class="tjd_carnum_one_row">'+
            '<input type="button" class="tjd_keyboard_one_btn" value="京"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="津"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="冀"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="鲁"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="晋"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="蒙"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="辽"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="吉"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="黑"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="沪"/>'+
        '</div>'+
        '<div class="tjd_carnum_one_row">'+
            '<input type="button" class="tjd_keyboard_one_btn" value="苏"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="浙"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="皖"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="闽"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="赣"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="豫"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="鄂"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="湘"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="粤"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="桂"/>'+
        '</div>'+
        '<div class="tjd_carnum_one_row" >'+
            '<input type="button" class="tjd_keyboard_one_btn tjd_no_visible"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="渝"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="川"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="贵"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="云"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="藏"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="陕"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="甘"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="青"/>'+
            '<input type="button" class="tjd_keyboard_one_btn tjd_no_visible"/>'+
        '</div>'+

        '<div class="tjd_carnum_one_row">'+
            '<input type="button" class="tjd_keyboard_one_btn tjd_no_visible"/>'+
            '<input type="button" class="tjd_keyboard_one_btn tjd_no_visible"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="琼"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="新"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="港"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="澳"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="台"/>'+
            '<input type="button" class="tjd_keyboard_one_btn" value="宁"/>'+
            '<input type="button" class="tjd_keyboard_one_btn tjd_no_visible"/>'+
            '<input type="button" class="tjd_keyboard_one_btn tjd_no_visible"/>'+
        '</div>'+
        '</div>'+
        '<!-- 字母数字键盘区域 -->'+
        '<div class="tjd_carnum_two" style="display:none;">'+
        '<div class="tjd_carnum_two_row">'+
            '<input type="button" class="tjd_keyboard_two_btn" value="1"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="2"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="3"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="4"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="5"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="6"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="7"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="8"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="9"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="0"/>'+
        '</div>'+
        '<div class="tjd_carnum_two_row">'+
            '<input type="button" class="tjd_keyboard_two_btn" value="Q"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="W"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="E"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="R"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="T"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="Y"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="U"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="P"/>'+
        '</div>'+
        '<div class="tjd_carnum_two_row">'+
            '<input type="button" class="tjd_keyboard_two_btn tjd_no_visible"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="A"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="S"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="D"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="F"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="G"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="H"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="J"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="K"/>'+
            '<input type="button" class="tjd_keyboard_two_btn tjd_l" value="L"/>'+
            '<input type="button" class="tjd_keyboard_two_btn tjd_no_visible"/>'+
        '</div>'+

        '<div class="tjd_carnum_two_row">'+
            '<input type="button" class="tjd_keyboard_two_btn tjd_no_visible"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="Z"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="X"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="C"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="V"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="B"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="N"/>'+
            '<input type="button" class="tjd_keyboard_two_btn" value="M"/>'+
            '<span class="tjd_keyboard_del_btn"><img src="../common/images/buttondelete.png" /></span>'+
            '<input type="button" class="tjd_keyboard_two_btn tjd_no_visible"/>'+
        '</div>'+
    '</div>',
    data: function () {
        return {
            curActiveIndex:0,

        }
    },
    methods:{
        getClassByIndex: function (index) {
            var clazz="";
            switch(index){
                case 1:
                    clazz="tjd_carnum_first";break;
                case 2:
                    clazz="tjd_carnum_second";break;
                case 3:
                    clazz="tjd_carnum_third";break;
                case 4:
                    clazz="tjd_carnum_forth";break;
                case 5:
                    clazz="tjd_carnum_fivth";break;
                case 6:
                    clazz="tjd_carnum_sixth";break;
                case 7:
                    clazz="tjd_carnum_seventh";break;
            }
            return clazz;
        },
        getCurInput:function(){
            return $("."+this.getClassByIndex(this.curActiveIndex));
        },
        addActive:function(index){
            var clazz=this.getClassByIndex(index);

            $(".carnum_btn").removeClass('tjd_keyboard_input_active');
            if(index!=1){
                $("."+clazz).addClass('tjd_keyboard_input_active');
            }
            this.showKbd(index);
        },
        //判断显示首位省份键盘还是数字键盘
        showKbd:function(index){
            if(index>1){
                this.showKbdTwo();
            }else{
                this.showKbdOne();
            }
        },

        hideKbds:function(){
            $(".tjd_carnum_two").hide();
            $(".tjd_carnum_one").hide();
        },
        showTjdKbd:function(index){
            this.addActive(index);
            this.curActiveIndex=index;
            //$event.stopPropagation();
        },
        setValue:function(val){
            var clazz=this.getClassByIndex(this.curActiveIndex);
            $("."+clazz).val(val);
        },
        nextActive:function(){
            if(this.curActiveIndex<7){
                this.curActiveIndex++;
            }
            this.addActive(this.curActiveIndex);
        },
        prevActive:function(){
            if(this.curActiveIndex>1){
                this.curActiveIndex--;
            }
            this.addActive(this.curActiveIndex);
        },
        //将用户选择的键盘值赋值到对应的键盘输入区域
        setValCommon:function(val){
            this.setValue(val);
            this.nextActive();
        },
        initEventBind:function(){
            //中文键盘选择事件
            var self=this;
            setTimeout(function () {
                $(".tjd_keyboard_one_btn").bind(_eventType,function(e){
                    self.showKbdTwo();
                    self.setValCommon($(this).val());
                    e.stopPropagation();
                    return false;
                });

                //字母数字键盘选择事件
                $(".tjd_keyboard_two_btn").bind(_eventType,function(e){
                    self.setValCommon($(this).val());
                    e.stopPropagation();
                    return false;
                });

                //数字字母键盘删除按钮的删除事件
                $(".tjd_keyboard_del_btn").bind(_eventType,function(e){
                    var curInput=self.getCurInput();
                    if(util.isEmpty(curInput.val())){//当前光标位置有值的话删除，光标不动；没有值的话删除前一位的值，同时光标前移
                        self.prevActive();
                        curInput=self.getCurInput();
                        curInput.val("");
                        if(curInput.hasClass("tjd_carnum_first")) {
                            self.showKbdOne();
                        };
                    }else{
                        curInput.val("");
                    }

                    e.stopPropagation();
                    return false;
                });
            })

            //点击键盘外区域时隐藏键盘
            $(document).bind(_eventType,function(){
                self.hideKbds();
            });
        },
        reset:function(){
            this.curActiveIndex=1;
        },
        /**
         * 初始化停简单车牌号键盘，根据传入的参数选择器来实现touch除了这些地方以外隐藏键盘
         */
        setExceptDoms:function(selectors){
            $(selectors).bind(_eventType,function(e){
                e.stopPropagation();
                e.preventDefault();
            });
        },
        /**
         * 是否车牌输入了但是不全
         * @returns {Boolean}
         */
        isCarNumNotFull:function(){
            if(this.getTjdKbdCarnum().length>1 && this.getTjdKbdCarnum().length<7){
                return true;
            }
            return false;

        },
        resetActive:function(){
            var clazz="tjd_carnum_first";
            $("."+clazz).trigger("click");
        },
        resetKbd:function(){
            var clazz="tjd_carnum_first";
            //var thirdClazz="tjd_carnum_third";
            $("."+clazz).siblings().val('').end().val("");
            setTimeout(function(){
                $("."+clazz).trigger(_eventType);
            },50);
        },
        showKbdOne:function(){
            $(".tjd_carnum_one").show();
            $(".tjd_carnum_two").hide();
        },
        showKbdTwo:function(){
            $(".tjd_carnum_one").hide();
            $(".tjd_carnum_two").show();
        },
        /**
         * 车牌号是否为空，长度为0或1
         * @returns {Boolean}
         */
        isCarNumEmpty:function(){
            if(this.getTjdKbdCarnum().length<=1){
                return true;
            }
            return false;

        },

        /**
         * 是否车牌完全没有输入(只有第一位有值)
         * @returns {Boolean}
         */
        isCarNumFullEmpty:function(){
            if(util.isEmpty($(".tjd_carnum_first").val()) && util.isEmpty($(".tjd_carnum_second").val()) && util.isEmpty($(".tjd_carnum_third").val()) && util.isEmpty($(".tjd_carnum_forth").val()) && util.isEmpty($(".tjd_carnum_fivth").val()) && util.isEmpty($(".tjd_carnum_sixth").val()) && util.isEmpty($(".tjd_carnum_seventh").val())){
                return true;
            }
            return false;
        },

        /**
         * 获得停简单键盘用户输入的车牌号
         * @returns
         */
        getTjdKbdCarnum: function() {
            return $(".tjd_carnum_first").val()+ $(".tjd_carnum_second").val()+ $(".tjd_carnum_third").val()+ $(".tjd_carnum_forth").val()+ $(".tjd_carnum_fivth").val()+ $(".tjd_carnum_sixth").val()+ $(".tjd_carnum_seventh").val();

        },
        /**
         * 将车牌号设置到键盘
         */
        setTjdKbdCarnum: function(carNum) {
            if(!util.isEmpty(carNum)){
                $(".tjd_carnum_first").val(carNum.charAt(0));
                $(".tjd_carnum_second").val(carNum.charAt(1));
                $(".tjd_carnum_third").val(carNum.charAt(2));
                $(".tjd_carnum_forth").val(carNum.charAt(3));
                $(".tjd_carnum_fivth").val(carNum.charAt(4));
                $(".tjd_carnum_sixth").val(carNum.charAt(5));
                $(".tjd_carnum_seventh").val(carNum.charAt(6));
            }else{
                //$(".tjd_carnum_first").val("京");
            }
        }



    },
    created: function () {
        this.nextActive();
        this.setExceptDoms(".tjd_carnum_input_div,.tjd_carnum_two,.tjd_carnum_one");
        this.initEventBind();
        $(".tjd_keyboard_two_btn,.tjd_keyboard_one_btn,.tjd_carnum_two,.tjd_carnum_one,.tjd_carnum_one_row,.tjd_carnum_two_row").bind('focus',function(){
            $(this).blur();
        });

    },
    ready: function () {
        //首先隐藏，渲染完成后再显示。否则刚开始闪一下时没有样式，键盘很难看
        setTimeout(function () {
            $(".tjd_carnum_input_div_one").show();
        })
    }

})


// 注册
Vue.component('tjd-modal', tjdModalComponent)
Vue.component('tjd-kbd', tjdKbdComponent)