Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [
      { label: '菜单项一', children: [], imgSrc: 'https://tb-test-erp.oss-cn-beijing.aliyuncs.com/img/pcPAlark/pc_view_default.png', type: 'one' },
      { label: '菜单项二', children: [], imgSrc: 'https://tb-test-erp.oss-cn-beijing.aliyuncs.com/img/pcPAlark/pc_view_default.png', type: 'two' },
      { label: '菜单项三', children: [], imgSrc: 'https://tb-test-erp.oss-cn-beijing.aliyuncs.com/img/pcPAlark/pc_view_default.png', type: 'three' },
      { label: '菜单项四', children: [], imgSrc: 'https://tb-test-erp.oss-cn-beijing.aliyuncs.com/img/pcPAlark/pc_view_default.png', type: 'four' },
    ],
    itemSelectedType: "one",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  getItemChange(e) {
    let { type, index } = e.detail;
    this.setData({
      selectedType: type
    })

    tt.redirectTo({ 'url': `/pages/dev/${type}/${type}` });
  },

  getItemChange1(e) {
    let { type, index } = e.detail;
    this.setData({
      itemSelectedType: type
    })
  }

})