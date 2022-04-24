Component({
    /**
     * 组件的属性列表
     */
    properties: {

        publicImgUrl: {
            type: String,
            value: ""
        },
        radioTabs: {
            type: Array,
            value: ""
        },
        tabType: {
            type: String,
            value: ""
        },
        isProgress: {
            type: Boolean,
            value: false
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
        tabsChange(e) {
            // console.log(e);

            let { index, item } = e.currentTarget.dataset;
            let type = item.type;

            this.triggerEvent('change', {
                item, type
            })
        }

    }
})