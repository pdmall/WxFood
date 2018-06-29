/**
 * 页面标题方法
 * @params title为页面标题
 * @params fontColor为字体颜色 (仅支持#000000和#ffffff)
 * @params bgColor为背景颜色
 * @author wf
 * **/
function navTitle(title, fontColor = '#000000', bgColor = '#ffffff') {
  wx.setNavigationBarTitle({
    title: title
  });
  wx.setNavigationBarColor({
    frontColor: fontColor,
    backgroundColor: bgColor
  })
}

function showMsg(msg) {

}
/**
 * 页面标题方法
 * @params content为消息内容
 * @params icon为图标
 * @author wf
 * **/
function showToast(content, icon = 'loading') {
  wx.showToast({
    title: content,
    icon: icon
  })
}
/**
 * 接口调用方法
 * @params api为请求的方法
 * @params data为传递的参数
 * @params method传参方式，默认为GET
 * @author wf
 * **/
function request(api, method = 'GET', data = {}) {
  let url = "https://www.paiduikeji.com/smallcomment/qian/user/";
  let apiUrl = url + api;
  let header = { 'content-type': 'application/json' }
  //GET方式传参
  if (method == 'POST') {
    header = { 'content-type': 'application/x-www-form-urlencoded' }
    method = 'GET';
  }
  return new Promise(function (resolve, reject) {
    wx.request({
      url: apiUrl,
      header: header,
      method: method,
      data: data,
      success: function (res) {
        app.netWorkData.result = res.data
        resolve(res)
      },
      fail: function (err) {
        reject(err);
      }
    })
  })

}

/**
 * 获取随机字符串方法
 * @params len为长度，默认32位
 * @author wf
 * **/
function randStr(len) {
  len = len || 32;
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var maxPos = chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
/** 设置缓存 */
function storage(key, val) {
  return wx.setStorageSync(key, val)
}
/** 获取缓存 */
function userId(storage) {
  return wx.getStorageSync(storage);
}

/**出口供调用**/
module.exports = {
  navTitle: navTitle,
  request: request,
  randStr: randStr,
  storage: storage,
  user: userId,
  showToast: showToast,
}
