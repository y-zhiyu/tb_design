Component({
    /**
     * 组件的属性列表
     */
    properties: {
        publicImgUrl: {
            type: String,
            value: ''
        },
        top: {
            type: Number,
            value: null
        },
        noDateText: {
            type: String,
            value: '暂无数据～'
        },
        imgUrl: {
            type: String,
            value: ''
        },
        buttonText: {
            type: String,
            value: ''
        },
        noDateText1: {
            type: String,
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
        onclickButton() {
            this.triggerEvent('button');
        }

    }
})