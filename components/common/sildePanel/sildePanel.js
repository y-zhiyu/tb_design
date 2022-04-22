Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: {
            type: Boolean,
            value: false,
            observer: function (flg) {
                if (flg) {
                    this.showProp();
                } else {
                    this.hiddenProp();
                }
            }
        },
        publicImgUrl: {
            type: String,
            value: ''
        },
        top:{
           type: Number,
            value: 0  
        },
        title:{
            type: String,
            value: '' 
        },
        themColor:{
            type:Object,
            value:null
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        closeShowSildePanel() {
            this.triggerEvent("closeShowSildePanel")
        },
        stop() { },
        showProp: function () {
            // 遮罩层动画
            var mask = tt.createAnimation({});
            mask.opacity(1).width("100%").step({
                duration: 1
            })// 菜单层动画

            var center = tt.createAnimation({});
            center.width("398px").right(398).step({
                duration: 300
            });
            this.setData({
                maskAnimation: mask.export(),
                centerAnimation: center.export()
            });
        },

        /**
         * 关闭菜单动画
         *
         */
        hiddenProp: function () {
           
            var center = tt.createAnimation({});
           center.width("0px").right(0).step({
                duration: 100
            });
            var mask = tt.createAnimation({});
            mask.opacity(0).step({
                duration:100
            });
             mask.width("0%").step({
                duration: 100
            });
            
            this.setData({
                centerAnimation: center.export(),
                maskAnimation: mask.export(),
            });
        },
    }
})