//onlook.js 
const app = getApp()

Page({
  data: {
    userInfo: {},
    inputVal: "",
    imgalist: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523525077&di=9f8e294dc3e7cc8694a75b56895a0ff1&imgtype=jpg&er=1&src=http%3A%2F%2Fp4.gexing.com%2Fshaitu%2F20120729%2F1056%2F5014a66cc640c.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522930358068&di=336c0cd0724830efe604ccca9747d56e&imgtype=0&src=http%3A%2F%2Fbcs.91.com%2Frbpiczy%2FWallpaper%2F2015%2F1%2F9%2Fd4b1ade76d3549bdbd94937201a32c0d-9.jpg'],
    status:true
  },
  // 预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgalist // 需要预览的图片http链接列表  
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
})
