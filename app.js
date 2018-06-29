//app.js
var wxApi = require("/utils/wxApi.js");
var common = require("/common/common.js");
var service = "http://120.27.223.110/jack_shop/";
//var service="http://192.168.0.103/jack_shop/";
var upLoad ="pdkj.oss-cn-beijing.aliyuncs.com"

App({
  url: {
    getVerCode: service + "user/getVerCode",
    register: service +"user/register",
    shopRegister: service+"shop/addShop",
    upLoadFilePath:upload
  },


  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })

        }
      }
    })

  },
  globalData: {
    userLocation: null,
    userInfo: null,
    imgUrl: "https://www.paiduikeji.com",
    serverFull: "/images/public/bigFullStars@2x.png", //满星图片
    serverHalf: "/images/public/bigHalfStars@2x.png", //半星图片
    serverNo: "/images/public/bigNoStars@2x.png", //无星图片
  },
 getToken(){
   return wx.getStorageInfoSync("token");
 },
  fun: {
    wxApi: wxApi,
    common: common
  }
})