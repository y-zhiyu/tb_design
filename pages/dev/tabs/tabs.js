const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        article: {},
        tabsList: [
            { text: 'Tab 1', type: 'tab_1', },
            { text: 'Tab 2', type: 'tab_2', },
            { text: 'Tab 3', type: 'tab_3', },
        ],
        tabsList1: [
            { text: 'Tab 1', type: 'tab_1', imgUrl: '/components/images/icon_1.png' },
            { text: 'Tab 2', type: 'tab_2', imgUrl: '/components/images/icon_2.png' },
            { text: 'Tab 3', type: 'tab_3', imgUrl: '/components/images/icon_3.png' },
        ],
        tabsActiveType: 'tab_1',

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

    getTabs(e) {
        console.log('e', e.detail);
        let { type } = e.detail;
        this.setData({
            tabsActiveType: type,
        })
    },

})