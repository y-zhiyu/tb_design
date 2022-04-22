Component({
    /**
     * 组件的属性列表
     */
    properties: {
        publicImgUrl: {
            type: String,
            value: ''
        },

        dataViewList: {
            type: Array,
            value: []
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

        getDetail(e) {
            let { item } = e.currentTarget.dataset;
            this.triggerEvent('change', { item });

        }

    }
})