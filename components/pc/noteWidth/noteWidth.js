Component({
    /**
     * 组件的属性列表
     */
    properties: {
        currWidth:{
            type:Number,
            value:0,
            observer:function(newval,oldval){
                // console.log(newval,oldval)
                this.changClose()
            }
        },
        publicImgUrl:{
            type:String,
            value:'',
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
        changClose(){
           if(this.data.currWidth<1340){
               this.setData({
                  isClose:true 
               })
           }else{
              this.setData({
                  isClose:false 
               }) 
           }
        },
        closeNote(){
            this.setData({
                  isClose:false 
               })
        }
    }
})