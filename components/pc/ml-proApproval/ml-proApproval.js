Component({
    /**
     * 组件的属性列表
     */
    properties: {
        publicImgUrl: {
            type: String,
            value: '',
        },

        dynamicsList: {
            type: Array,
            value: '',
        },
        totalUseTime: {
            type: String,
            value: '',
        },
        approveUseTimeList:{
            type: Array,
            value: [],
        },
        themColor:{
            type:Object,
            value:null
        }
    },
    ready() {},

    /**
     * 组件的初始数据
     */
    data: {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        clickItem(e) {
            let item = e.currentTarget.dataset.item
            this.triggerEvent("getToggleApproval", {
                instanceId: item.fs_instance_code
            })
        },

        //sendChatGroup
        sendChatGroup(e) {
            let { item } = e.currentTarget.dataset;
            // console.log("sendChatGroup:", item)
            this.triggerEvent("sendChatGroup", { item })
        },

    }
})