// goal-model.js

//引入base类
import { Base } from '../../utils/base.js';

class Goal extends Base {
  constructor() {
    super();
  }

  /**
   * 提交表单
   */
  submitForm(callback) {
    var params = {
      url: 'show_target',
      type: 'POST',
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
export { Goal };