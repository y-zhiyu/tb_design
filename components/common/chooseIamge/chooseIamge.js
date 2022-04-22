Component({
    /**
     * 组件的属性列表
     */
    properties: {
         urls: {
      type: Array,
      value: [],
    },
    cells: {
      type: Array,
      value: null
    },
    size: {
      type: Number,
      value: null
    },
    mode: {
      type: String,
      value: "aspectFit"
    },
    preview: {
      type: Boolean,
      value: !0
    },
    remove: {
      type: Boolean,
      value: !0
    },
    count: {
      type: Number,
      value: 9
    },
    sizeType: {
      type: Array | String,
      value: ["original", "compressed"]
    },
    maxImageSize: {
      type: Number,
      value: 0
    },
    clear: {
      type: Boolean,
      value: !1
    },
    custom: {
      type: Boolean,
      value: !1
    },
    value: {
      type: Array,
      value: []
    },
    publicImgUrl: {
      type: String,
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
        onChangeTap(){
            this.triggerEvent("onChangeTap")
        },
        onTapRemove(e){
            let index = e.currentTarget.dataset.id
            console.log("onTapRemove:",index)
             this.triggerEvent("remove",{index})
        },
    }
})