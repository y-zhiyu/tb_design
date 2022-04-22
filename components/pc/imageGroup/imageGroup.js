Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgList:{
            type:Array,
            value:null,
        },
        width:{
            type:Number,
            value:90,
        },
         height:{
            type:Number,
            value:90,
        },
        top:{
            type:Number,
            value:12,
        },
        left:{
           type:Number,
           value:8, 
        },
        border:{
            type:Boolean,
            value:false
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
        previewImg(e){
            let _this=this, current= e.currentTarget.dataset.current
            // console.log("current:",e,current,_this.data.imgList)
            tt.previewImage({
                current,
                urls:_this.data.imgList
            })
        }
    }
})