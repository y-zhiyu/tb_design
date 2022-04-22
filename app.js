App({
  onLaunch: function () {
  },

  onShow: function () {

  },

  globalData: {
  },

  // 引入`towxml3.0`解析方法
  towxml: require('/towxml/index'),

  //声明一个数据请求方法
  getText: (url, callback) => {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/octet-stream'
      },
      success: (res) => {
        if (typeof callback === 'function') {
          callback(res);
        };
      }
    });
  },

})
