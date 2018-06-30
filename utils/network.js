var secret = require('./secret.js')
var Promise = require('../plugins/es6-promise.js')


//GET请求  
function Get(requestHandler, LoadingFlag = true) {
  request('GET', requestHandler, LoadingFlag)
}

//POST请求  
function Post(requestHandler, LoadingFlag = true) {
  request('POST', requestHandler, LoadingFlag)
}


//GET请求  
function GetThen(requestHandler, LoadingFlag = true) {
  wx.showLoading({ title: '数据加载中'})
  return requestThen('GET', requestHandler)
}

//POST请求  
function PostThen(requestHandler, LoadingFlag = true) {
  return requestThen('POST', requestHandler)
}

function requestThen(method,requestHandler) {
  return httpsPromisify(wx.request)({
    url: requestHandler.url,
    data: requestHandler.data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: method
  })
}



function secritRequest(method, requestHandler, LoadingFlag) {
  //注意：可以对params加密等处理  
  let token = getApp().getToken();
  let timestamp = Date.parse(new Date());
  let data = [
    { key: 'token', value: token },
    { key: 'timestamp', value: timestamp },
  ];
  let params = requestHandler.data;
  if (params != null) {
    for (var attr in params) {
      data.push({ key: attr, value: params[attr] })
    }
  }
  requestHandler.sign = signature(data);
  requestHandler.data = data;
  request(method, requestHandler, LoadingFlag)
}

function httpsPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        wx.hideLoading();
        resolve(res)
      }
      obj.fail = function (res) {
        wx.hideLoading();
        reject(res)
      }
      fn(obj)
    })
  }
}


function signature(obj) {
  let data = obj.sort(sortJ);
  var strData = "";
  for (let i = 0; i < data.length; i++) {
    strData += data[i].key + "=" + data[i].value;
    if (i != data.length - 1) {
      strData += "&"
    }
  }
  return secret.sha1(strData);
}

function sortJ(a, b) {
  return a.key > b.key;
}

function request(method, requestHandler, LoadingFlag) {
  if (LoadingFlag) wx.showLoading({
    title: '数据加载',
  })
  wx.request({
    url: requestHandler.url,
    data: requestHandler.data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      'sign': requestHandler.sign
    },
    method: method,
    success: function (res) {
      //注意：可以对参数解密等处理  
      if (requestHandler.success)
        requestHandler.success(res)
    },
    fail: function (res) {
      if (requestHandler.fail)
        requestHandler.fail(res)
    },
    complete: function (res) {
      if (LoadingFlag) wx.hideLoading();
      if (requestHandler.complete)
        requestHandler.complete(res)
    }
  })
}

module.exports = {
  GET: Get,
  POST: Post,
  GetThen: GetThen,
  PostThen: PostThen
}  