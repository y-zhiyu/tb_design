Component({
    externalClasses: ['btnClass',"button-box_style"],
    /**
     * 组件的属性列表
     */
    properties: {
        saveText: {
            type: String,
            value: '保存'
        },
        cancelText: {
            type: String,
            value: '取消'
        },
         width:{
            type:Number,
            value:108,
        },
         height:{
            type:Number,
            value:44,
        },
        showText:{
            type:String,
            value:'',
        },
        btnType:{
            type:String,
            value:'',
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
        getSubmit() {
            this.triggerEvent('submit')
        },

        getCancel() {
            this.triggerEvent('cancel');

        },
        click(){
            this.triggerEvent("click")
        }

    }
})