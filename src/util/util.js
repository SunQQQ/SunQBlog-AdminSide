import axios from 'axios'
import { Loading } from 'element-ui'

let CommonFunction = {}
CommonFunction.install = function (Vue) {
  /*将UTC格式时间转为2018-09-09 下午 08：00*/
  Vue.prototype.DateFormat = function (UTCDate) {
    return (new Date(UTCDate)).toLocaleString( );
  }

  Vue.prototype.SQAjax = function (Para) {
    var that = this;
    /*let AjaxLoading = Loading.service({ fullscreen: false });*/

    var Token = localStorage.getItem('SQBlog') ? JSON.parse(localStorage.getItem('SQBlog')).Token : '';

    if(!Token){
      this.$router.push({name:'LoginPage'});
      return false;
    }

    var PostData = Object.assign({},Para['RequestData'],{Token:Token});

    axios.post(Para['Url'], PostData).then(function (response) {
      // AjaxLoading.close();

      if(response.data.status == '0'){
        Para['Success'](response.data.data);
      }else if(response.data.status == '1'){
        that.$message({
          message: '令牌超时或失效，需重新登录',
          type: 'success'
        });
        that.$router.push({
          name:'LoginPage',
        });
      }else {
        that.$message.error(response.data.data.message);
      }
    }).catch(function (error) {
    });
  }

  /**
   * 获取当前时间
   * @returns {string:2021/11/18 16:45:39}
   */
  Vue.prototype.getSQTime = function (){
    let dateObject = new Date(),
      year = dateObject.getFullYear(),
      month = dateObject.getMonth() + 1,
      day = dateObject.getDate(),
      hour = dateObject.getHours(),
      min = dateObject.getMinutes(),
      second = dateObject.getSeconds(),
      result = '';

    if(min<10) min = '0' + min;
    if(second<10) second = '0' + second;

    result = ''+ year +'/'+month+'/'+ day +' '+ hour +':'+ min +':' + second;
    return result;
  };
}

export default CommonFunction
