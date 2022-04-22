Component({
    /**
     * 组件的属性列表
     */
    externalClasses: ["filterBox_style", "filterBoxCon_title_style","filterBox_con_style","fbBox_btnRest_style","btnClass_style"],
    
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
        closeFilterBox() {
            this.triggerEvent("closeShowSildePanel")
        },
        btnRest(){
           this.triggerEvent("btnRest") 
        }
    }
})