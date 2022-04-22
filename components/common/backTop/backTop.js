Component({
    /**
     * 组件的属性列表
     */
    properties: {
        publicImgUrl:{
            type:String,
            value:''
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
        backTop(){
            //  let currentPage = getCurrentPages()[getCurrentPages().length - 1];
            // console.log("currentPage",currentPage)
            tt.pageScrollTo({
                scrollTop: 0,
                duration: 500,
                success () {
                    console.log(`PageScrollTo invoked successfully`);
                },
                fail () {
                    console.log(`Failed to invoke pageScrollTo`);
                }
            });
        }
    }
})