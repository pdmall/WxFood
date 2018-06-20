// let api = 'http://192.168.0.125:8085/qian/store/'   //测试

let api = 'https://www.paiduikeji.com/smallcomment/qian/'   //测试

function wxRequest(url, cb, data = {}, stu = "get") {
  let method = '';
  let apiUrl = "";
  let header = { 'content-type': 'application/json' }
  if (stu == "get") {
    method = 'GET';
    apiUrl = api + url;
  } else {
    header = { 'content-type': 'application/x-www-form-urlencoded' }
    method = 'POST';
    apiUrl = api + url;
  }
  wx.request({
    url: apiUrl,
    header: header,
    method: method,
    data: data,
    success: function (res) {
      return typeof cb == 'function' && cb(res)
    },
    fail: function (err) {
        wx.showLoading({
          title: '获取数据失败',
          icon: 'loading',
          duration: 3000
        })
    }
  })
}

/**
 * 页面标题方法
 * @params title为页面标题
 * @params fontColor为字体颜色 (仅支持#000000和#ffffff)
 * @params bgColor为背景颜色
 * @author wf
 * **/
function navTitle(title, fontColor = '#ffffff', bgColor = '#000000') {
  wx.setNavigationBarTitle({
    title: title
  });
  wx.setNavigationBarColor({
    frontColor: fontColor,
    backgroundColor: bgColor
  })
}
/**
 * 提示消息
 * @params content为提示的内容
 * @params icon为图标
 * @author wf
 * **/
function showToast(content, icon = 'loading') {
  wx.showToast({
    title: content,
    icon: icon
  })
}
/** 设置缓存 */
function storage(key, val) {
  return wx.setStorageSync(key, val)
}
/** 获取缓存 */
function getStorage(storage) {
  return wx.getStorageSync(storage);
}


/**出口供调用**/
module.exports = {
  navTitle: navTitle,
  storage: storage,
  getStorage: getStorage,
  showToast: showToast,
  wxRequest: wxRequest,
}