// pages/me/me.js

//引入me类
import { Me } from '../me/me-model.js';

Page({
  data: {
    userInfo: {},
    follow_num:"5k",
    fans_num:"20"
  },
  
  onLoad: function (res) {
    this._loadData();
  },

  /**
   * 加载数据
   */
  _loadData: function () {
    var me = new Me(); //实例化Me类
    me.getUserInfo((res) => {
      this.setData({
        userInfo: res
      });
    });
    
  }
})
