// pages/specifics/specifics.js

//引入index类
import { Specifics } from '../specifics/specifics-model.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    like_status: false,
    CommentBox_status: true,
    inputBoxShow: false,
    isScroll: true,
    targetItems:[],
    
  },

  showInputBox: function () {
    this.setData({ inputBoxShow: true });
    this.setData({ isScroll: false });
    this.setData({ CommentBox_status: false });
  },

  invisible: function () {
    this.setData({ inputBoxShow: false });
    this.setData({ isScroll: true });
    this.setData({ CommentBox_status: true });
  },

  /**
   * 获取评论信息
   */
  getComments: function (itemId) {
    var data = this.setDatas(itemId);
    var that = this;
    var specifics = new Specifics();
    var data = {
      target_item_id: itemId
    };
    specifics.getCommentsRequest(data, (res) => {
      var length = res.data.length;
      that.setData({
        comments: res.data,
        length:length
      });
      console.log(this.data.comments);
    });
  },

  /**
  * 预览图片
  */
  previewImage: function (e) {
    var imgIdx = e.currentTarget.dataset.imgIndex;
    var imgs = e.currentTarget.dataset.imgs;
    var urls = [];
    for (var i in imgs) {
      urls[i] = imgs[i].picture_url;
    }
    wx.previewImage({
      current: urls[imgIdx], // 当前显示图片的http链接
      urls: urls
    })
  },

  /**
   * 点赞
   */
  toLike: function () {
    this.setData({ like_status: !(this.data.like_status) })
  },

  /**
   * 设置弹窗
   */
  setModal: function (content) {
    wx.showModal({
      title: '警告',
      content: content,
      showCancel: false
    })
  },

  /**
    * 加载数据
    */
  _loadData: function () {
    var that = this;
    var specifics = new Specifics(); //实例化index类
    specifics.getUserInfo((res) => {
      that.setData({
        userInfo: res
      });
    });
  },

  /**
   * 设置评论
   */
  setComment: function (e) {
    var comment = e.detail.value;
    this.setData({
      comment: comment
    });
  },

  /**
  * 设置数据
  */
  setDatas: function () {
    var data = {
      comment_content: this.data.comment,
      target_item_id: this.data.targetItems.target_item_id
    };
    return data;
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

  /**
   * 发送评论
   */
  sendComment: function () {
    if (this.data.comment != null && this.data.comment != '') {
      var that = this;
      var specifics = new Specifics();
      var data = that.setDatas();
      specifics.setContentRequest(data, (res) => {
        if (res == 'ok') {
          var content = '发布成功';
          that.showTips(content);
          setTimeout(function () {
            that.invisible();
            that.getComments(that.data.targetItems.target_item_id);
          }, 1000) 
          
        } else {
          var content = '发布失败';
          that.showTips(content);
        }
      });
    }else {
      this.setModal('评论内容不能为空');
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
    var targetItems = JSON.parse(options.targetItems);
    this.setData({
      targetItems: targetItems
    });
    this.getComments(targetItems.target_item_id);
  },

})