// index-model.js

//引入base类
import { Base } from '../../utils/base.js';

class Index extends Base {
  constructor() {
    super();
  }

  /**
   * 提交表单
   */
  submitForm(callback) {
    var params = {
      url: 'show_target_items',
      type: 'POST',
      sCallback: function (res) {
        callback && callback(res);
      }, eCallback(res) {
        callback && callback(res);
      }
    };
    this.setRequest(params);
  }

  /**
   * 设置点赞请求
   */
  setLikeRequest(data, callback) {
    var params = {
      url: 'like',
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

}
//导出该类
export { Index };