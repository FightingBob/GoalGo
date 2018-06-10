// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: false,
    imgalist: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523525077&di=9f8e294dc3e7cc8694a75b56895a0ff1&imgtype=jpg&er=1&src=http%3A%2F%2Fp4.gexing.com%2Fshaitu%2F20120729%2F1056%2F5014a66cc640c.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522930358068&di=336c0cd0724830efe604ccca9747d56e&imgtype=0&src=http%3A%2F%2Fbcs.91.com%2Frbpiczy%2FWallpaper%2F2015%2F1%2F9%2Fd4b1ade76d3549bdbd94937201a32c0d-9.jpg',
      'http://img3.imgtn.bdimg.com/it/u=2331769312,1407126725&fm=27&gp=0.jpg',
      'http://img5.imgtn.bdimg.com/it/u=4005354471,1145908386&fm=27&gp=0.jpg',
      'http://img1.imgtn.bdimg.com/it/u=1770061353,1586993764&fm=27&gp=0.jpg',
      'http://img4.imgtn.bdimg.com/it/u=2143129435,3341545747&fm=27&gp=0.jpg'
    ],
    like_status:false
  },
  // 预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgalist // 需要预览的图片http链接列表  
    })
  },
  toLike: function () {
    this.setData({ like_status: !(this.data.like_status) })
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

  }
})