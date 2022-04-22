Component({
    externalClasses: ["title-class"],

    /**
     * 组件的属性列表
     */
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        publicImgUrl: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        leftText:{
            type: String,
            value: '确定'
        },
        rightText:{
             type: String,
            value: '取消'
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
        btnSubmit() {
            this.triggerEvent("btnSubmit")
        },
        btnCancel() {
            this.triggerEvent("btnCancel")
        },
        closeShowModalBbox() {
            this.triggerEvent("closeShowModalBbox")
        },
        stop() { }
    }
})