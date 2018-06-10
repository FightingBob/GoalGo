// set-model.js

//引入base类
import {Base} from '../../utils/base.js';

class Set extends Base{
  constructor() {
    super();
  }

  /**
   * 表单校验
   */
  testForm(formData, isAgree) {
    console.log(formData);
    var chooseMoney = parseInt(formData.chooseMoney);
    if (formData.target_name == '') {
      this.setModal('目标名称不能为空');
    } else if (formData.target_days == '') {
      this.setModal('目标完成天数不能为空');
    } else if (formData.target_delaydays == '') {
      this.setModal('休假天数不能为空');
    } else if (formData.target_purpose == '') {
      this.setModal('目标动机不能为空');
    } else if (chooseMoney == 3 && formData.testMoney == '') {
      this.setModal('目标押金不能为空');
    } else if (isAgree == false) {
      this.setModal('阅读并同意《相关条款》');
    } else {
      return true;
    }
  }

  /**
   * 设置弹窗
   */
  setModal(content) {
    wx.showModal({
      title: '警告',
      content: content,
      showCancel: false
    })
  }

  /**
   * 设置数据
   */
  setData(formData, isAgree, target_money) {
    var status = this.testForm(formData, isAgree);
    if(status) {
      var data = {
        target_name: formData.target_name,
        target_days: formData.target_days,
        target_delay: formData.target_delaydays,
        target_purpose: formData.target_purpose,
        target_money: target_money
      };
      
      return data;
    }
    return false;
    
  }

  /**
   * 提交表单
   */
  submitForm(data,callback) {
    var params = {
      url: 'target',
      type: 'POST',
      data: data,
      sCallback: function (res) {
        callback && callback(res.data.msg);
      }, eCallback(res) {
        callback && callback(res.data.msg);
      }
    };
    this.setRequest(params);
  }
   


}

//导出该类
export {Set};