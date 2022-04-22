Component({

    /**
     * 组件的属性列表
     */
    properties: {
         publicImgUrl: {
            type: String,
            value: ''
        },
        listArray: {
            type: Array,
            value: false
        },
        placeType: {
            type: String,
            value: 'left'
        },
        placeStatus: {
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
        lookEnclosure(e){
            // console.log(e)
            let { url ,extension} = e.currentTarget.dataset;
            this.triggerEvent('lookEnclosure',{ failePath:url,extension})
        }
    }
})