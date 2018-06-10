// pages/clock/clock.js 

//引入clock类，config类
import { Clock } from '../clock/clock-model.js';
import { Config } from '../../utils/config.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: null,
    filePaths: [],
    pictureOrders: [],
    pictureUrls: [],
    target_id: null
  },

  onLoad: function (options) {
    var target_id = options.target_id;
    this.setData({
      target_id: target_id
    });
  },

  /**
   * 选择照片
   */
  chooseImage: function (e) {
    var that = this;
    var order = 1;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          filePaths: that.data.filePaths.concat(res.tempFilePaths)
        });
      }
    })
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
   * 提交单张图片
   */
  submitPicture: function (filePath,callback) {
    var that = this;
    var uploadTask = wx.uploadFile({
      url: Config.restUrl + 'target_item_pictures',
      filePath: filePath,
      name: 'file',
      success: function (res) {
        callback && callback(res);
      }
    })
  },
  
  /**
   * 提交所有图片
   */
  submitPictures: function (callback) {
    console.log('提交');
    var that = this;
    var filePaths = this.data.filePaths;
    for(var i in filePaths) {
      this.submitPicture(filePaths[i],(res)=>{
        if(res.data != '' ){
          var data = JSON.parse(res.data);
          console.log(data);
          that.setData({
            pictureUrls: that.data.pictureUrls.concat(data.fileName),
            pictureOrders: that.data.pictureOrders.concat(that.data.pictureOrders.length)
          });
        }
        
        if (that.data.filePaths.length == that.data.pictureOrders.length) {
          var clock = new Clock();
          var data = that.setDatas();
          clock.setContentsRequest(data, (res) => {
            if (res == 'ok') {
              var content = '发布成功';
              that.showTips(content);
              setTimeout(function () {
                wx.switchTab({
                  url: '../index/index'
                })
              }, 1000) 
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
            } else {
              var content = '发布失败';
              that.showTips(content);
            }
          });
        }
      });
    }
   
    return true;
    
  },


  /**
   * 表单提交
   */
  submitForm: function () {
    
    if (this.judgeContent()) {
      
      if (this.data.filePaths.length >= 1 ) {
        this.submitPictures();
      }else {
        var that = this;
        var clock = new Clock();
        var data = that.setContents();
        clock.setContentRequest(data, (res) => {
          if (res == 'ok') {
            var content = '发布成功';
            that.showTips(content);
            setTimeout(function () {
              wx.switchTab({
                url: '../index/index'
              })
            }, 1000) 
            
          } else {
            var content = '发布失败';
            that.showTips(content);
          }
        });
      }
      
    }

  },

  /**
   * 设置内容
   */
  setContents: function () {
    var data = {
      target_content: this.data.content,
      target_id: this.data.target_id
    };
    return data;
  },

  /**
   * 设置数据
   */
  setDatas: function () {
    var data = {
      pictureOrders: this.data.pictureOrders,
      pictureUrls: this.data.pictureUrls,
      target_content: this.data.content,
      target_id: this.data.target_id
    };
    console.log(data);
    return data;
  },

  /**
   * 判断内容
   */
  judgeContent: function () {
    if (this.data.content == null || this.data.content == '') {
      this.setModal('内容不能为空');
      return false;
    }else {
      return true;
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
   * 设置内容
   */
  bindContent: function (e) {
    this.setData({
      content: e.detail.value
    });
  },

  /**
   * 预览图片
   */
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.filePaths // 需要预览的图片http链接列表
    })
  }
  
})