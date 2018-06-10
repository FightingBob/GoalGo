// index-model.js

//引入base类
import { Base } from '../../utils/base.js';

class Specifics extends Base {
  constructor() {
    super();
  }

  /**
  * 设置纯内容请求
  */
  setContentRequest(data, callback) {
    var params = {
      url: 'comment',
      type: 'POST',
      data: data,
      sCallback: function (res) {
        callback && callback(res.data);
      }, eCallback(res) {
        callback && callback(res.data);
      }
    };
    this.setRequest(params);
  }

  /**
   * 提交表单
   */
  getCommentsRequest(data, callback) {

    var params = {
      url: 'show_comment',
      type: 'POST',
      data: data,
      sCallback: function (res) {
        callback && callback(res);
      }, eCallback(res) {
        callback && callback(res);
      }
    };
    this.setRequest(params);
  }

}
//导出该类
export { Specifics };