// pages/goal/goal.js

//引入goal类
import { Goal } from '../goal/goal-model.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ["进行中", "成功", "失败"],
    currentIndex: 0,
    status: false,
    targets: []
  },

  /**
   * navbar切换
   */
  navbarTab: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });
  },

  /**
   * 跳转到打卡页面
   */
  SignIn: function (e) {
    var target_id = e.currentTarget.dataset.targetId;
    wx: wx.navigateTo({
      url: '../clock/clock?target_id=' + target_id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goal = new Goal();
    var that = this;
    goal.submitForm((res) => {
      that.setData({
        targets: res
      });
    });
  },

  onShow: function (options) {
    var goal = new Goal();
    var that = this;
    goal.submitForm((res) => {
      that.setData({
        targets: res
      });
    });
  }

 
})