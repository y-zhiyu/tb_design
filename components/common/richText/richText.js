Component({
    externalClasses: ["box-class", "img-class", "title-class", "value-class", "titlecon-class"],

    /**
     * 组件的属性列表
     */
    properties: {
        publicImgUrl: {
            type: String,
            value: ''
        },
        imgUrl: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        content: {
            type: String,
            value: ''
        },
        type: {
            type: String,
            value: 'default'
        },
        time: {
            type: String,
            value: ''
        },
        titleSlot: {
            type: Boolean,
            value: false
        },
        contentSlot: {
            type: Boolean,
            value: false
        },
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

    }
})