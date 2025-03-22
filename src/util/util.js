import axios from 'axios'
import { Loading } from 'element-ui'

let CommonFunction = {}
CommonFunction.install = function (Vue) {
  /*将UTC格式时间转为2018-09-09 下午 08：00*/
  Vue.prototype.DateFormat = function (UTCDate) {
    return (new Date(UTCDate)).toLocaleString();
  }

  Vue.prototype.SQAjax = function (Para) {
    var that = this;
    let AjaxLoading = Loading.service({ 
      background: 'rgba(0,0,0,0.5)',
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      fullscreen: true
     });

    var Token = that.GetLocalStorage('SunqBlog') && that.GetLocalStorage('SunqBlog').token;
    if (!Token) {
      AjaxLoading.close(); // 中断代码前，注意关闭loading
      this.$router.push({ name: 'LoginPage' });
      return false;
    }

    // 设置请求头
    var config = {
      headers: {
          'Authorization': Token // 将 Token 放入 Authorization Header 中
      }
    };

    var PostData = Object.assign({}, Para['RequestData']);

    axios.post(Para['Url'], PostData,config).then(function (response) {
      AjaxLoading.close();

      if (response.data.statusCode == 200) {
        Para['Success'](response.data.data);
      } else { // 返参异常的场景处理
        that.$message({
          message: response.data.message,
          type: 'error',
          duration: 900
        });
      }
    }).catch(function (error) { // 接口不通的场景处理
      AjaxLoading.close();
      if (error.response) {
        // 服务器返回了非 2xx 状态码
        if (error.response.status == 401) {
          that.$message({
            message: error.response.data.message, // 修正此处
            type: 'error'
          });
          that.$router.push({
            name: 'LoginPage',
          });
        } else {
          that.$message({
            message: `服务错误: ${error.response.data.error}`,
            type: 'error',
            duration: 900
          });
        }
      } else if (error.request) {
        // 请求已发出但没有收到响应
        that.$message({
          message: "服务器无响应",
          type: 'error',
          duration: 900
        });
      } else {
        // 其他错误
        that.$message({
          message: `请求错误: ${error.message}`,
          type: 'error',
          duration: 900
        });
      }
    });
  }

  /**
   * 封装ajax，统一处理请求异常/loading等逻辑
   * @param Para
   * Para.Url 地址
   * Para.noLoading 非必传，参数值要求为任何非空字符串即可
   * Para.UploadData 参数
   * Para.Success 请求成功且反参正常的回调，回调函数接收response.data.data
   * @constructor
   */
  Vue.prototype.SQFrontAjax = function (Para) {
    // 如果设置了noLoading参数（有这个字段），则不再加载loading
    if (!Para.noLoading) Store.commit('ChangeLoading', true);

    if (!Para['UploadData']) {
      Para['UploadData'] = {};
    }

    axios.post(Para['Url'], Para['UploadData'], { timeout: 10000 }).then(function (response) {
      if (!Para.noLoading) Store.commit('ChangeLoading', false);

      if (response.data.status == '0') {
        Para['Success'](response.data.data);
      } else {
        Store.commit('ChangeTip', {
          Show: true,
          Title: response.data.data
        });
      }
    }).catch(function (error) {
      if (!Para.noLoading) Store.commit('ChangeLoading', false);

      if (error.response) { // 请求超时时，前端会终止http请求。故请求是没有响应值的，error.response为空
        if (error.response.status == '500') {
          Store.commit('ChangeTip', {
            Show: true,
            Title: '网络异常，请检查网络'
          });
        } else if (error.response.status == '404') { // 404时也是有response的
          Store.commit('ChangeTip', {
            Show: true,
            Title: '您访问的接口不存在...'
          });
        } else { // 500和404之外的状态码直接弹框展示statusText
          Store.commit('ChangeTip', {
            Show: true,
            Title: error.response.statusText
          });
        }
      } else if (error.request && error.request.readyState == 4 && error.request.status == 0) {
        Store.commit('ChangeTip', {
          Show: true,
          Title: '接口访问超时'
        });
      } else {
        Store.commit('ChangeTip', {
          Show: true,
          Title: error.message
        });
      }
    });
  };

  /**
   * 获取当前时间
   * @returns {string:2021/11/18 16:45:39}
   */
  Vue.prototype.getSQTime = function () {
    let dateObject = new Date(),
      year = dateObject.getFullYear(),
      month = dateObject.getMonth() + 1,
      day = dateObject.getDate(),
      hour = dateObject.getHours(),
      min = dateObject.getMinutes(),
      second = dateObject.getSeconds(),
      result = '';

    if (min < 10) min = '0' + min;
    if (second < 10) second = '0' + second;

    result = '' + year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + second;
    return result;
  };

  /**
   * 获取cookie
   * @param name cookie的名称
   */
  Vue.prototype.getSQCookie = function (cookName) {
    let name = cookName + '=',
      cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cleanItem = cookies[i].trim();
      if (cleanItem.indexOf(name) == 0) {
        return cleanItem.substring(name.length, cookies[i].length);
      }
    }
    return '';
  };

  /**
   * 根据IP获取用户所在城市 ip非必传
   * @param func 获取成功后的回调函数，该参数将接受一个城市名称
   * @constructor
   */
  Vue.prototype.GetLocation = function (func) {
    let that = this,
      locationCookie = this.getSQCookie('sunqBlogLocation');

    // 如果用户多次访问，一周内不会重复请求定位接口
    if (locationCookie) {
      func(locationCookie);
    } else {
      axios({
        url: 'https://restapi.amap.com/v3/ip',
        method: 'post',
        params: {
          key: 'ba5f9b69f0541123a4dbe142da230b4d'
        },
      }).then(function (resp) {
        func(resp.data.city);
        that.setSQCookie('sunqBlogLocation', '', 24 * 7); // 相隔一周同一浏览器再次访问时会重新定位
      }).catch();
    }
  };

  /**
   * 获取当前时间
   * @returns {string:2021/11/18 16:45:39}
   */
  Vue.prototype.getSQTime = function () {
    let dateObject = new Date(),
      year = dateObject.getFullYear(),
      month = dateObject.getMonth() + 1,
      day = dateObject.getDate(),
      hour = dateObject.getHours(),
      min = dateObject.getMinutes(),
      second = dateObject.getSeconds(),
      result = '';

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (hour < 10) hour = '0' + hour;
    if (min < 10) min = '0' + min;
    if (second < 10) second = '0' + second;

    result = '' + year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + second;
    return result;
  };

  /**
   * 种cookie
   * @param name cookie名称
   * @param value cookie值
   * @param exHour 过期时间,单位小时
   */
  Vue.prototype.setSQCookie = function (name, value, exHour) {
    var d = new Date();
    d.setTime(d.getTime() + exHour * 60 * 60 * 1000);
    var expires = 'expires=' + d.toGMTString(); // cookie的语法要求是这个标志，和这个时间格式
    document.cookie = name + '=' + value + '; ' + expires;
    console.log('种下cookie', name + '=' + value + '; ' + expires);
  };

  Vue.prototype.getSQBrowser = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf('Opera') > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf('compatible') > -1
      && userAgent.indexOf('MSIE') > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf('Edge') > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf('Firefox') > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf('Safari') > -1
      && userAgent.indexOf('Chrome') == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf('Chrome') > -1
      && userAgent.indexOf('Safari') > -1; //判断Chrome浏览器

    if (isIE) {
      var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp['$1']);
      if (fIEVersion == 7) {
        return 'IE7';
      } else if (fIEVersion == 8) {
        return 'IE8';
      } else if (fIEVersion == 9) {
        return 'IE9';
      } else if (fIEVersion == 10) {
        return 'IE10';
      } else if (fIEVersion == 11) {
        return 'IE11';
      } else {
        return '0';
      }//IE版本过低
      return 'IE';
    }
    if (isOpera) {
      return 'Opera';
    }
    if (isEdge) {
      return 'Edge';
    }
    if (isFF) {
      return 'FireFox';
    }
    if (isSafari) {
      return 'Safari';
    }
    if (isChrome) {
      return 'Chrome';
    }
  };

  Vue.prototype.createLog = function (log) {
    let that = this,
      dateString = this.getSQTime();

    that.SQAjax({
      Url: '/api/visitCreate/foreend',
      RequestData: {
        location: '',
        fromUrl: document.referrer,
        time: dateString,
        browser: window.navigator.platform.split(' ')[0] + '\n' + that.getSQBrowser() + '\n' + window.screen.width + "*" + window.screen.height,
        moduleType: log.moduleType,
        operateType: log.operateType,
        operateContent: log.operateContent ? log.operateContent : '',
      },
      Success: function (data) {
        console.log('jj');
      }
    });

    console.log('進入記錄日志方法');
  };

  /**
   * 获取本地数据
   * @param StorageName
   * @constructor
   * 返回对象类型
   */
  Vue.prototype.GetLocalStorage = function (StorageName) {
    var Storage = localStorage.getItem(StorageName);
    if (Storage) {
      return JSON.parse(Storage);
    } else {
      return {};
    }
  };

  /**
   * 修改/存储 本地数据
   * @param StorageName Storage表名字
   * @param Value Object类型，需要Key，Value两个字段。
   * @constructor
   */
  Vue.prototype.SetLocalStorage = function (StorageName, Data) {
    var Storage = localStorage.getItem(StorageName);
    // 如果表存在，修改表中字段名
    if (Storage) {
      // 将表的值转为对象，并装入传入的字段
      var StorageObject = JSON.parse(Storage);
      StorageObject[Data.Key] = Data.Value;
      // 重新将存储
      localStorage.setItem(StorageName, JSON.stringify(StorageObject));
    }
    //如果表不存在直接存储
    else {
      var Object = {};
      Object[Data.Key] = Data.Value;
      localStorage.setItem(StorageName, JSON.stringify(Object));
    }
  };
}

export default CommonFunction
