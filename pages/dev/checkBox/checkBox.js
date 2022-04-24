const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        article: {},  // 内容数据
        checked: false,
        checkBoxList: [
            { 'id': '1', 'text': '选项一', checked: false, disabled: true },
            { 'id': '2', 'text': '选项二', checked: true, },
            { 'id': '3', 'text': '选项三', checked: false, },
            { 'id': '4', 'text': '选项四', checked: false, }
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let source = require('./md/doc.js');
        let article = app.towxml(source, 'markdown');

        this.setData({
            article: article
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    getChange() {
        this.setData({
            checked: !this.data.checked
        })
    },

    getChangeValue(e) {
        let { checkBoxList } = this.data;
        let { item, index } = e.detail;
        console.log('item', item)

        this.setData({
            [`checkBoxList[${index}].checked`]: !checkBoxList[index].checked
        })
    }

})