import { showToast } from '../../../utils/interactive';

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        broadcastList: {
            typeof: Array,
            value: null
        },
        publicImgUrl: {
            typeof: String,
            value: ''
        },
        showPassIndex: {
            typeof: Number,
            value: -1
        },
        showIndex: {
            typeof: Number,
            value: -1
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        showPassIndex: -1,
        showIndex: -1

    },

    /**
     * 组件的方法列表
     */
    methods: {
        viewFile(e) {
            let file = e.currentTarget.dataset.file
            this.triggerEvent("viewFile", { file })
        },
        gotoReport(e) {
            let item = e.currentTarget.dataset.item
            this.triggerEvent("gotoReport", { item })
        },
        // 是否可见
        selectShow(e) {
            let _showIndex = e.currentTarget.dataset.index, id = e.currentTarget.dataset.id, broadcastList = this.data.broadcastList;
            this.setData({
                [`broadcastList[${id}].showIndex`]: _showIndex
            })
        },

        // 收否合格
        selectPassShow(e) {
            let _showPassIndex = e.currentTarget.dataset.index, id = e.currentTarget.dataset.id, broadcastList = this.data.broadcastList;
            this.setData({
                [`broadcastList[${id}].showPassIndex`]: _showPassIndex,
            })
        },
        //确认验收
        sumAcceptance(e) {
            let activity_id = e.currentTarget.dataset.id, index = e.currentTarget.dataset.index, broadcastList = this.data.broadcastList;
            if (broadcastList[index].showIndex == -1) {
                showToast({
                    msg: "请选择是否可见"
                })
                return false
            }
            if (broadcastList[index].showPassIndex == -1) {
                showToast({
                    msg: "请选择是否合格"
                })
                return false
            }

            if (broadcastList[index].showPassIndex == 2) {
                if (!broadcastList[index].commentText) {
                    showToast({
                        msg: "请输请输入评价"
                    })
                    return false
                }
            }
            this.triggerEvent("sumAcceptance", {
                activity_id: broadcastList[index].id,
                comment_result: broadcastList[index].showPassIndex,
                is_public: broadcastList[index].showIndex,
                comment_content: broadcastList[index].commentText
            })
            // console.log("sumAcceptance:")
            this.setData({
                [`broadcastList[${index}].commentText`]: '',
                [`broadcastList[${index}].showIndex`]: -1,
                [`broadcastList[${index}].showPassIndex`]: -1,
            })
        },
        getComment(e) {
            let index = e.currentTarget.dataset.index, broadcastList = this.data.broadcastList;
            this.setData({
                [`broadcastList[${index}].commentText`]: e.detail.value
            })
        }
    }
})