//app.js

//导入token类
import {Token} from 'utils/token.js';


App({
  onLaunch: function () {
  var token = new Token(); //实例化token对象
  token.verify(); //校验令牌
  },

})