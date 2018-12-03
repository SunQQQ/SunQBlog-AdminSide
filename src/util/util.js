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
}

export default CommonFunction
