const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectArray: [
            { id: 1, value: '11111111' },
            { id: 2, value: '22222222' },
            { id: 3, value: '33333333' },
        ],
        value: '',

        selectArray1: [
            { option_key: 1, option_value: '选项一' },
            { option_key: 2, option_value: '选项二' },
            { option_key: 3, option_value: '选项三' },
            { option_key: 4, option_value: '选项四' },
        ],
        value1: '选项一',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let source = require('./md/doc.js');

        // console.log('source--------', source)
        let article = app.towxml(source, 'markdown');
        // console.log('article------', article)

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


    getSelectChange(e) {
        let { item } = e.detail;

        this.setData({
            value: item.value
        })
    },

    getSelectChange1(e) {
        let { item } = e.detail;

        this.setData({
            value1: item.value
        })
    }
})