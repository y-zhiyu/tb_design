Component({
    /**
     * 组件的属性列表
     */
    properties: {
        header: {
            type: Array,
            value: null
        },
        listData: {
            type: Array,
            value: null
        },
        taskListStatus: {
            type: Number,
            value: ""
        },
        publicImgUrl: {
            type: String,
            value: ""
        },
        themColor:{
            type:Object,
            value:null
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
        showItem(e) {
            let _this = this, listData = _this.data.listData;
            let { show, index } = e.currentTarget.dataset;
            // console.log("show,index", show, index)
            this.setData({
                [`listData[${index}].isShow`]: !show
            })
        },
        selectList(e) {
            let { item } = e.currentTarget.dataset;
            //  console.log(item)
            this.triggerEvent('selectList', { item })
        },
        getTime(e) {
            let { item, type } = e.currentTarget.dataset;
            console.log("getTime:", item);
            
            this.data.curTaskItem = item
            this.data.changeTimeType = type
        },

        pickerChangeDate(e) {
            let { value } = e.detail
            let { curTaskItem, changeTimeType } = this.data;
            this.triggerEvent("pickerChangeDate", { curTaskItem, changeTimeType, value })
            //  console.log("pickerChangeDate:", this.data.changeTimeType,this.data.curTaskItem,value)
        }
    }
})