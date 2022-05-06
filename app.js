App({
  onLaunch: function () {
    this.updateMP();
  },

  onShow: function () {
    var res = tt.getSystemInfoSync();
    // console.log('res', res);

    if (res.gadgetVersion) {
      this.globalData.envVersion = 'v' + res.gadgetVersion;
    }
  },

  // 版本更新提示
  updateMP() {
    const updateManager = tt.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log("是否有新版本更新:", res.hasUpdate)
    });
    updateManager.onUpdateReady(function () {
      tt.showModal({
        title: "更新提示",
        showCancel: false,
        content: "新版本已经准备好，是否重启应用？",
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    });
  },


  globalData: {
    envVersion: ''
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
