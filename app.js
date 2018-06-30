//app.js
var network = require("/utils/network.js");
var wxApi = require("/utils/wxApi.js");
var common = require("/common/common.js");

var service = "http://120.27.223.110/jack_shop/";
//var service="http://192.168.0.103/jack_shop/";
var upLoad = "pdkj.oss-cn-beijing.aliyuncs.com"

App({
  url: {
    getVerCode: service + "user/getVerCode",
    register: service + "user/register",
    shopRegister: service + "shop/addShop",
    upLoadFilePath: upload
  },
  

  globalData: {
    userLocation: null,
    userInfo: null,
    imgUrl: "https://www.paiduikeji.com",
    serverFull: "/images/public/fullStar.jpg", //满星图片
    serverHalf: "/images/public/halfStar.jpg", //半星图片
    serverNo: "/images/public/noneStar.jpg", //无星图片
  },

  getToken() {
    return wx.getStorageInfoSync("token");
  },

  setUserInfo(userInfo){
    this.userInfo = userInfo
  },

  getUserInfo() {
    return this.userInfo
  },

  net: network,
  wxApi: wxApi,

})