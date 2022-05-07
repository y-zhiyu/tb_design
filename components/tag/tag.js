Component({
    externalClasses: ["tag_class"],

    /**
     * 组件的属性列表
     */
    properties: {
        text: {
            type: String,
            value: ''
        },

        imgStatus: {
            type: Boolean,
            value: false
        },

        imgUrl: {
            type: String,
            value: ''
        },
        
        color: {
            type: String || Number,
            value: ''
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

        getDel() {
            this.triggerEvent("del");
        }

    },


})