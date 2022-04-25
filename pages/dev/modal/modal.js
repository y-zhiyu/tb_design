const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},  // 内容数据
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
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },

  getClick() {
    console.log("点击button-----");
    this.setData({
      modalStatus: true,
    });
  },


  getClose() {
    this.setData({
      modalStatus: false,
    });
  },

  getClick1() {
    this.setData({
      modalStatus1: true,
    });
  },

  getClose1() {
    this.setData({
      modalStatus1: false,
    });

  },

  getLayout1() {
    this.getClose1();
  }

});
