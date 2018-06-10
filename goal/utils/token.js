// token.js

//导入config类
import {Config} from '../utils/config.js';

class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'token/verify';
    this.tokenUrl = Config.restUrl + 'token/user';
  }
  /**
   * 检测令牌是否有效
   */
  verify() {
    var token = wx.getStorageSync('token'); //读取令牌
    if(!token && token == '') { //判断令牌是否存在
      this.getTokenFromServer(); //不存在则去服务器获取令牌
    }else {
      this._verifyFromServer(token); //校验令牌
    }
  }

  /**
   * 携带令牌去服务器校验令牌
   */
  _verifyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: token
      },
      success: function (res) {
        var vaild = res.data.isVaild; 
        if(!vaild) { //判断token是否有效
          that.getTokenFromServer();
        }
      }
    })
  }

  /**
   * 去服务器获取令牌
   */
  getTokenFromServer(callback) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.token);
            callback && callback(res.data.token);
          }
        })
      }
    })
  }

}

export {Token};