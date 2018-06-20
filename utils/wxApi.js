var Promise = require('../plugins/es6-promise.js')

// let apiUrl = 'http://192.168.0.125:8085/qian/'   //测试

let apiUrl = 'https://www.paiduikeji.com/smallcomment/qian/'   //测试

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}

//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
/**
 * 微信用户登录,获取code
 */
function wxLogin() {
  return wxPromisify(wx.login)
}
/**
 * 获取微信用户信息
 * 注意:须在登录之后调用
 */
function wxGetUserInfo() {
  return wxPromisify(wx.getUserInfo)
}
/**
 * 获取系统信息
 */
function wxGetSystemInfo() {
  return wxPromisify(wx.getSystemInfo)
}
/**
 * 获取位置信息
 */
function wxGetLocation(){
  return wxPromisify(wx.getLocation);
}

/**
 * get方法请求接口
 * url接口地址
 * data 为对象
 */
function getRequest(url, data) {
  var getRequest = wxPromisify(wx.request)
  return getRequest({
    url: apiUrl + url,
    method: 'GET',
    data: data,
    header: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * post方法请求接口
 * url接口地址
 * data 为对象
 */
function postRequest(url, data) {
  var postRequest = wxPromisify(wx.request)
  return postRequest({
    url: apiUrl + url,
    method: 'POST',
    data: data,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
  })
}

module.exports = {
  wxPromisify: wxPromisify,
  wxLogin: wxLogin,
  wxGetUserInfo: wxGetUserInfo,
  wxGetSystemInfo: wxGetSystemInfo,
  wxGet: getRequest,
  wxPost: postRequest,
  wxGetLocation: wxGetLocation,
}