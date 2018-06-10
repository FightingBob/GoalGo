// welcome.js
//引入base类
import {Base} from '../../utils/base.js';

Page({
  data: {
    time: 3,
    status: false,
    flag: true,
  },

  onLoad: function () {

    // //授权处理
    // this._loadData();
  },

  /**
   * 加载数据
   */
  _loadData: function () {
    var base = new Base();//实例化base对象
    base.getPromission((res) => {
      if(res.status) {
        this.countDown(this); //倒计时
      }
    },this.data.status);
    
  },

  /**
   * 倒计时
   */
  countDown: function (that) {
    var time = that.data.time;
    if (time == 0) {
      wx.switchTab({
        url: '../index/index',
      })
      return ;
    }
    setTimeout(function () {
      that.setData({
        time: time - 1
      });
      that.countDown(that);
    },1000);
  },

  /**
   * 弹出层函数
   */
  //出现
  show: function () {

    this.setData({ flag: false })

  },
  //消失

  hide: function () {

    this.setData({ flag: true })

  },


})

