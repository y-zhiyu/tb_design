Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title:{
            type:Array,
            value:null,
        },
        list:{
            type:Array,
            value:null,
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
        //表格按钮操作
        action(e){
            console.log("e=>",e.currentTarget.dataset.type)
        },
         previewImg(e){
            let _this=this, current= e.currentTarget.dataset.current
            // console.log("current:",e,current,_this.data.imgList)
            tt.previewImage({
                current,
                urls:[current]
            })
        }
    }
})