// set.js

//引入set类
import {Set} from '../set/set-model.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //休假天数为目标天数的1/3
    testError: false,
    targetDaysTips: '至少一天以上',
    target_name: null,
    target_days: null,
    target_delaydays: null,
    target_purpose: null,
    target_money: 188,
    RMB: '',
    isAgree: false,
    testMoney: null,
    vacation: 0,
    currentNoteLen: 0,
    NoteLen: 50,
    custom: false,
    radioItems: [
      { name: '18元', value: '0' },
      { name: '88元', value: '1' },
      { name: '188元', value: '2', checked: true },
      { name: '自定义金额', value: '3' }
    ],
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 去空格
   */
  verification: function (e) {
    this.setData({
      target_name: e.detail.value.replace(/\s+/g, '')
    });
  },  

  /**
   * 表单提交
   */
  formSubmit: function (e) {
    var that = this;
    var set = new Set(); //实例化set类
    var formData = e.detail.value;
    var data = set.setData(formData, this.data.isAgree, this.data.target_money);
    if(data != false) {
      set.submitForm(data,(res)=>{
        if(res == 'ok') {
          res = '目标创建成功';
          that.showTips(res);
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index',
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) {
                  return;
                }
                page.onLoad();
              }
            })
          }, 1000)
        }else {
          res = '目标创建失败';
          that.showTips(res);
        }
      });
    }
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
   * 单选按钮变化
   */
  radioChange: function (e) {

    if (e.detail.value == 0) {
      this.setData({
        custom: false,
        target_money: 18
      });
    } else if (e.detail.value == 1) {
      this.setData({
        custom: false,
        target_money: 88
      });
    }else if (e.detail.value == 2) {
      this.setData({
        custom: false,
        target_money: 188
      });
    }else if (e.detail.value == 3) {
      this.setData({
        custom: true 
      });
    }
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems
    });
  }, 
  
  /**
   * 同意协议
   */
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

  /**
   * 设置剩余字数
   */
  setWordNums: function (e) {
    this.setData({
      target_purpose: e.detail.value.replace(/\s+/g, '') //去空格
    });

    var value = e.detail.value;
    var len = parseInt(value.length);
    this.setData({
      currentNoteLen: len
    });
  },

  /**
   * 同意协议变化
   */
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

  /**
   * 押金设置
   */
  setMoney: function (e) {
    var target_money = parseInt(e.detail.value);
    this.setData({
      target_money: target_money
    });
    if (target_money == 0) {
      return {
        value: null
      };
    }
    
    
  },

  /**
   * 完成天数设置
   */
  bindVacation: function (e) {
    var target_days = parseInt(e.detail.value);
    var pos =e.detail.cursor; 
    if (pos == 0) {
      this.setData({
        vacation: 0,
        target_delaydays: null
      });
    }else if(target_days == 0) {
      return {
        value: null
      };
    }else if (target_days < 5) {
      this.setData({
        vacation: 0,
        target_delaydays: 0
      });
    }else if(target_days == 5) {
      this.setData({
        vacation: 1,
        target_delaydays: null
      });
    }else if(target_days > 5) {
      this.setData({
        vacation: parseInt(target_days/5) + 1,
         target_delaydays: null
      });
    }
    this.setData({
      target_days: target_days
    });
  },
  
  /**
   * 设置休假天数
   */
  setVacation: function (e) {
    var set = new Set();
    var target_delaydays = parseInt(e.detail.value);
    var vacation = parseInt(this.data.vacation);
    var target_days = this.data.target_days;
    if (target_days == null || target_days == '') {
      set.setModal('请先填写完目标完成天数，才能设置休假天数');
      this.setData({
        target_delaydays: null
      });
    }else if(target_delaydays > vacation) {
      return {
        value: '',
        cursor: 0
      };
    }
  }

})