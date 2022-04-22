Component({
    /**
     * 组件的属性列表
     */

    // activeType="{{sidebarListActiveType}}" 
    // activeIndex="{{sidebarListActive}}" 
    // list="{{sidebarList}}"
    properties: {
        activeType: {
            type: String,
            value: '',
        },
        activeIndex: {
            type: Number,
            value: 0,
        },
        list: {
            type: Array,
            value: null
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
        selectSildbar(e) {
            let _this = this, list = _this.data.list;
            let { type } = e.currentTarget.dataset
            let findIndex = list.findIndex(item => item.type == type)
            this.triggerEvent('selectSildbar', { type, findIndex })
        }
    }
})