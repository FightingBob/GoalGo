// base.js

//引入Config类，token类
import {Config} from '../utils/config.js';
import {Token} from '../utils/token.js';

class Base {
  constructor() {
    this.baseRequestUrl = Config.restUrl;
  }

  /**
   * 设置基类的请求方法
   *  判断以2（2xx)开头的状态码为正确
   *  异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
   */
  setRequest(params, noRefetch) { //当noRefetch为true时，不做未授权重试机制，默认为false
    var that = this;
    var url = this.baseRequestUrl + params.url;

    //设置默认请求方式
    if (!params.type) {
      params.type = 'GET';
    }
    // 不需要再次组装地址
    if(params.setUpUrl == false) {
      url = params.url;
    }

    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: { //消息头
        'content-type': 'application/json',  // 消息主体编码方式
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        var code = res.statusCode.toString(); //获取http状态码
        var startChar = code.charAt(0); //获取第一个字符

        if (startChar == '2') { //方法调用成功  判断以2（2xx)开头的状态码为正确
          params.sCallback && params.sCallback(res); //简洁写法
        }else {
          //AOP思想
          if(code == '401') {
            if(!noRefetch) { //判断是否要重发
              that._refetch(params);
            }
            
          }
          that._processError(res);
          params.eCallback && params.eCallback(res); //简洁写法
        }
        
      },
      fail: function (err) {
        that._processError(err);
      }
    })
  }

  /**
   * 重新获取令牌，并重新请求
   */
  _refetch(params) {
    var token = new Token();
    token.getTokenFromServer((token)=>{
      this.setRequest(params, true);
    });
  }
_processError(err) {
  console.log(err);
}


  /**
   * 获取元素绑定的值
   */
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }

  /**
   * 授权处理
   */
  getPromission(callback, status) {
    var that = this;

    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            typeof callback == 'function' && callback({
              userInfo:res.userInfo,
              status: true
            });
          },
          fail: function (res) {
            wx.showModal({
              title: '警告',
              content: '您点击了拒绝授权，将无法正常使用该小程序功能，',
              showCancel: false,
              confirmText: '确定授权',
              success: function (res) {
                if(res.confirm) {
                  status = true;
                  wx.openSetting({
                    complete: function (res) {
                      if (!res.authSetting["scope.userInfo"]) {
                        that.setReGetPromission(callback, status);
                      }else {
                        status = false;
                        that.setReGetPromission(callback, status);
                      }
                    }
                  }) 
                }else{
                  status = false;
                  that.setReGetPromission(status);
                }
              }
            })
            
          }
        })
      }
    })
  }

  /**
   * 再次授权处理
   */
  setReGetPromission(callback,status) {
    this.getPromission(callback,status);
  }

  /**
   * 获取用户信息
   */
  getUserInfo(callback) {
    wx.getUserInfo({
      success: function (res) {
        callback && callback(res.userInfo);
      }
    });
    
  }

}

//输出该类
export { Base };