//welcome1.js

//引入clock类，config类
import { Welcome1 } from '../welcome1/welcome1-model.js';

//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  
  getUserInfo: function (e) {
    if (e.detail.errMsg == 'getUserInfo:ok') {
      this.uploadUserInfos(e.detail.userInfo);
      this.goToIndex();
    }else {
      this.setModal('请允许授权，否则无法使用该小程序，谢谢合作！');
    }

  },

  /**
   * 设置弹窗
   */
  setModal: function (content) {
    wx.showModal({
      title: '温馨提示',
      content: content,
      showCancel: false
    })
  },

  /**
   * 跳转到首页
   */
  goToIndex: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },

  /**
   * 上传用户信息
   */
  uploadUserInfos: function (userInfo) {
    var data = this.setDatas(userInfo);
    var that = this;
    var welcome1 = new Welcome1();
    var data = that.setDatas(userInfo);
    welcome1.setContentRequest(data, (res) => {
      if (res == 'ok') {
        var content = '发布成功';
        // that.showTips(content);

      } else {
        var content = '发布失败';
        // that.showTips(content);
      }
    });
  },

  /**
   * 设置数据
   */
  setDatas: function (userInfo) {
    var data = {
      user_icon: userInfo.avatarUrl,
      user_name: userInfo.nickName
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
   * 欢迎页面效果
   */
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
});