var secret = require('./secret.js')
var Promise = require('../plugins/es6-promise.js')

function httpsPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (res) {
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

//GET请求  
function GET(requestHandler) {
  request('GET', requestHandler)
}
//POST请求  
function POST(requestHandler) {
  request('POST', requestHandler)
}

function request(method,requestHandler) {
  httpsPromisify(wx.request)({
    url: requestHandler.url,
    data: requestHandler.data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: method
  })
}

function secritRequest(method, requestHandler) {
  //注意：可以对params加密等处理  
  let token = getApp().globalData.token;
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
  let sign = signature(data);
  wx.request({
    url: requestHandler.url,
    data: data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      'signatrue': sign
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
      if (requestHandler.complete)
        requestHandler.complete(res)
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST
}  