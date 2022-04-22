Component({
    /**
     * 组件的属性列表
     * 
     *  搜索栏组件参数说明：
     * 
     *  接受参数：
     *         publicImgUrl  type:String      图片域名
     *         animation     type:Boolean     是否添加动画
     *         value         type:String      输入的文字
     *         focus         type:Boolean     是否获取焦点
     *         
     *  暴露事件：
     *          getSearchWord   获取 输入的文字
     *          getFocus        获取焦点
     *          blur            失去焦点 
     *          confirm         监听键盘的完成按钮别触发
     *         
     *      
     */
    properties: {
        publicImgUrl: {
            type: String,
            value: null
        },
        animation: {
            type: Boolean,
            value: false
        },
        searchWord: {
            type: String,
            value: null
        },
        placeholder: {
            type: String,
            value: '搜素'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        searchWord: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //获取焦点
        getFocus(e) {
            // console.log(e)
            this.setData({
                focus: true
            })
            this.triggerEvent("getFocus")
        },
        //失去焦点
        blur(e) {
            this.setData({
                focus: false
            })
            this.triggerEvent("blur")
        },
        //获取搜索的文字
        getSearchWord(e) {
            this.setData({
                searchWord: e.detail.value
            })
            this.triggerEvent("getSearchWord", { searchWord: e.detail.value })
        },
        confirm() {
            this.triggerEvent("confirm")
        },

        // 清除文字
        getClear() {
            this.triggerEvent("clear")
        }
    }
})