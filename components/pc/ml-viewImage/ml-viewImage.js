Component({
    /**
     * 组件的属性列表
     */
    properties: {
        publicImgUrl: {
            type: String,
            value: ''
        },
        viewType: {
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
        getViewPage(e) {
            // console.log(e);
            let { type } = e.currentTarget.dataset;

            this.triggerEvent('click', {
                type
            })

        }


    }
})