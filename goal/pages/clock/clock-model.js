// clock-model.js

//引入base类
import { Base } from '../../utils/base.js';

class Clock extends Base{
  constructor() {
    super();
  }

  /**
   * 设置纯内容请求
   */
  setContentRequest(data, callback) {
    var params = {
      url: 'target_item_content',
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
   * 设置内容请求
   */
  setContentsRequest(data, callback) {
    var params = {
      url: 'target_item_contents',
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
export { Clock };