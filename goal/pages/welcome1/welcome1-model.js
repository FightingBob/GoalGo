// welcome1-model.js

//引入base类
import { Base } from '../../utils/base.js';

class Welcome1 extends Base {
  constructor() {
    super();
  }

  /**
   * 提交表单
   */
  setContentRequest(data,callback) {

    var params = {
      url: 'user_info',
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
export { Welcome1 };