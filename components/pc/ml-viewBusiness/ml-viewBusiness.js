Component({
    /**
     * 组件的属性列表
     */
    properties: {
        publicImgUrl: {
            type: String,
            value: ''
        },
        themColor: {
            type: Object,
            value: null
        },

        dataViewList: {
            type: Array,
            value: []
        },
        hasxj: {
            type: Boolean,
            value: false
        },
        hasyz: {
            type: Boolean,
            value: false
        },
        hastk: {
            type: Boolean,
            value: false
        },
        hasyd: {
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

        getDetail(e) {
            let { item } = e.currentTarget.dataset;

            if (item.isDefault) {
                return;
            }
            this.triggerEvent('change', { item });

        },
        businessAdd() {
            this.triggerEvent("businessAdd")
        }

    }
})