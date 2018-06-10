// index.js

//引入index类
import {Index} from '../index/index-model.js';

Page({
  data: {
    like_status: false,
    userInfo: {},
    targetItems: {},
  },

  onShow: function () {

    this._loadData();
    var index = new Index();
    var that = this;
    index.submitForm((res) => {
      that.setData({
        targetItems: res.data
      });
    });
  },

  /**
   * 点赞
   */
  toLike: function (e) {
    var that = this;
    var index = new Index();
    var like = e.currentTarget.dataset.like;
    console.log("like="+like);
    var data = that.setDatas(e.currentTarget.dataset.like, e.currentTarget.dataset.likeId, e.currentTarget.dataset.itemId);
    index.setLikeRequest(data, (res) => {
      if (res == 'ok') {
        var content = '点赞成功';
        that.showTips(content);
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) {
          return;
        }
        page.onLoad();
      } else {
        var content = '点赞失败';
        that.showTips(content);
      }
    });
  },

  /**
   * 设置提示
   */
  showTips: function (res) {
    wx.showToast({
      title: res,
      duration: 2000
    });
  },

  onLoad: function () {
    this._loadData();
    var index = new Index();
    var that = this;
    index.submitForm((res) => {
      that.setData({
        targetItems: res.data
      });
    });
    
  },
  
  /**
   * 设置数据
   */
  setDatas: function (like_status,like_id,item_id) {
    var data = {
      like_id: like_id,
      like_status: like_status,
      target_item_id: item_id,
    };
    console.log(data);
    return data;
  },

  /**
   * 加载数据
   */
  _loadData: function () {
    var index = new Index(); //实例化index类
    index.getUserInfo((res)=>{
      this.setData({
        userInfo: res
      });
    });
  },

  /**
   * 预览图片
   */
  previewImage: function (e) {
    var imgIdx = e.currentTarget.dataset.imgIndex;
    var imgs = e.currentTarget.dataset.imgs;
    var urls = [];
    for(var i in imgs) {
      urls[i] = imgs[i].picture_url;
    }
    wx.previewImage({
      current: urls[imgIdx], // 当前显示图片的http链接
      urls: urls
    })
  },
  
  /**
   * 打开目标详细界面
   */
  openGoalDetails: function () {
    wx: wx.navigateTo({
      url: '../detail/detail'
    })
  },

  /**
   * 打开目标项详情界面
   */
  openSpecifics: function (e) {
    let targetItems = JSON.stringify(e.currentTarget.dataset.items);
    wx: wx.navigateTo({
      url: '../specifics/specifics?targetItems=' + targetItems
    })
  }
  

  
})
