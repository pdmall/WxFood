//获取应用实例
const app = getApp();
const common = require('../../common/common.js');
const QQMapWX = require("../../common/qqmap-wx-jssdk.min.js");
const wxApi = require("../../utils/wxApi.js")
var qqmapsdk;
Page({
  data: {
    starNum: [0, 1, 2, 3, 4],
    placeImg: "/images/public/icon-position@3x.png", //位置图片
    searchImg: "/images/public/cate-search@3x.png",  //搜索放大镜图片
    serverFull: app.globalData.serverFull, //满星图片
    serverHalf: app.globalData.serverHalf,  //半星图片
    serverNo: app.globalData.serverNo,  //无星图片
    
    sfxs: true,   //是否显示
    flag: false,
    address: '成都',
    shopData: [],
    search:"",
    ishow:'db',
    noshow:'dn',
    bnshow: 'dn',
    shouquan:'db',
    proData: [
      { index: 0, img: '/images/public/icon-cate@3x.png', text: '美食', appid: '', path: '' },
      { index: 1, img: '/images/public/icon-punchCard@3x.png', text: '天天打卡', appid: 'wx9d82360ba0304046', path: '/pages/index/index' },
      { index: 2, img: '/images/public/icon-luckyBag@3x.png', text: '共享福袋', appid: '', path: '' },
      { index: 3, img: '/images/public/icon-RobStamps@3x.png', text: '会员抢卷', appid: '', path: '' },
      { index: 4, img: '/images/public/icon-source@3x.png', text: '众愿', path: '/pages/show/show' }
    ],
  },
  onLoad: function () {
    let that = this;
    
    let wxLogin = app.fun.wxApi.wxLogin();
    //授权登录，获取code
    wxLogin().then(res => {
      let data = { encryptedData: e.detail.encryptedData, iv: e.detail.iv, code: res.code }
      return app.fun.wxApi.wxPost("appuser/decodeUserInfoByMeiShi", data);
    })    //获取用户openid
      .then(res => {
        app.fun.common.storage('openid', res.data);
        let wxGetLocation = app.fun.wxApi.wxGetLocation();
        return wxGetLocation();
        that.setData({
          flag: true,
          bnshow: 'db',
          shouquan: 'dn',
        })
      })    //获取用户的经度、纬度
   
    that.location()
  },
  location:function(){
    let that=this
    qqmapsdk = new QQMapWX({
      key: 'M3NBZ-CU3LU-G7QV3-BKIQU-WC5W3-FHBHU'
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {

            var address = addressRes.result.formatted_addresses.recommend;
            var add = address.substring(0, 3)
            that.setData({
              address: add
            })
            let lat = addressRes.result.location.lat;
            let lon = addressRes.result.location.lng;
            let data = {
              "mapX": lat,
              "mapY": lon,
              "distance": "",
              "T": "",
              "type": ""
              // 'list'

            }
            wxApi.wxPost("store/getStore", data)
              .then(res => {
                console.log(res)
                if (res.statusCode == 201) {

                  for (let i = 0; i < res.data.length; i++) {
                    res.data[i].sPhoto = app.globalData.imgUrl + res.data[i].sPhoto;
                    if (res.data[i].sDistance >= 1000) {
                      res.data[i].sDistance = (res.data[i].sDistance / 1000).toFixed(1) + "k";
                    }
                  }
                  that.setData({ shopData: res.data });
                } else {
                  app.fun.common.showToast("暂无数据");
                }
                that.setData({
                  shopData: res.data
                })
              })
          }
        })
      }
    });
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              // console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
          
        }
      if(res.authSetting['scope.userLocation']){
        wx.getLocation({
          success: function(res) {
            console.log(res)
            app.globalData.userLocation=res
          },
        })
      }
      }
    })
  },

  
  // 获取商铺信息
  getStore: function () {


  },
  gettuan: function () {


  },
  addres: function () {
    let that = this;
    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var name = res.name
        that.setData({
          address: name
        })
        let data = {
          "mapX": latitude,
          "mapY": longitude,
          "distance": "",
          "T": "",
          "type": ""
          // 'list'

        }
        wxApi.wxPost("store/getStore", data)
          .then(res => {
            if (res.statusCode == 201) {
              for (let i = 0; i < res.data.length; i++) {
                res.data[i].sPhoto = app.globalData.imgUrl + res.data[i].sPhoto;
                if (res.data[i].sDistance >= 1000) {
                  res.data[i].sDistance = (res.data[i].sDistance / 1000).toFixed(1) + "k";
                }
              }
              that.setData({ shopData: res.data });
            } else {
              that.setData({
                ishow: 'dn',
                noshow: 'db',
                })
             
            }
            that.setData({
              shopData: res.data
            })
          })

      }

    })

  },
onShow:function(){
  this.onLoad()
  this.onGotUserInfo()
  let token = app.fun.common.getStorage("token")
  if(token!=null && token!=""){
    console.log(11111)
    this.setData({
      bnshow: 'db',
      shouquan: 'dn',
    })
  }
},
  /**
   * 检测搜索框是否有内容输入
   */
  checkVal: function (e) {
    let that = this;
    let val = e.detail.value;
    if (!val) {  //空值显示放大镜图标
      that.setData({
        sfxs: true
      });
    } else {  //非空值隐藏
      that.setData({
        sfxs: false
      });
    }

  },
  // 个人中心
  my:function(){
    wx.reLaunch({
      url: '/pages/my/my',
    })
  },
  /**
   * 查看店铺详情
   */
  shopInfo: function (e) {
    let url = e.currentTarget.dataset.url;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/shop/detail/detail?id=" + id,
    })
  },
  /**
   * 跳转其他小程序
   */
  linkOther: function (e) {

    let appid = e.currentTarget.dataset.appid;

    let path = e.currentTarget.dataset.path;

    let index = e.currentTarget.dataset.index;
    if (index == 1 || index == 4) {
      wx.navigateToMiniProgram({
        appId: appid,
        path: path,
        envVersion: "develop",
        success: function (res) {
        }
      })
    } else if (index == 0) {
      wx.navigateTo({
        url: '/pages/fujin/fujin',
      })
    } else if (index == 2) {
      wx.navigateTo({
        url: '/pages/redp/redp',
      })
    } else if (index == 3) {
      wx.reLaunch({
        url: '/pages/voucher/loot/loot',
      })
    }
  },
  search:function(e){
    let search = e.detail.value.search;
    let that=this;
    
    qqmapsdk = new QQMapWX({
      key: 'M3NBZ-CU3LU-G7QV3-BKIQU-WC5W3-FHBHU'
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {

            var address = addressRes.result.formatted_addresses.recommend;
            var add = address.substring(0, 3)
            that.setData({
              address: add
            })
            let lat = addressRes.result.location.lat;
            let lon = addressRes.result.location.lng;
            let data = {
              "mapX": lat,
              "mapY": lon,
              "distance": "",
              "T": "",
              "type": search
              // 'list'

            }
            console.log(data)
            wxApi.wxPost("store/getStore", data)
              .then(res => {
                console.log(res)

                if (res.statusCode == 201) {

                  for (let i = 0; i < res.data.length; i++) {
                    res.data[i].sPhoto = app.globalData.imgUrl + res.data[i].sPhoto;
                    if (res.data[i].sDistance >= 1000) {
                      res.data[i].sDistance = (res.data[i].sDistance / 1000).toFixed(1) + "k";
                    }
                  }
                  that.setData({ shopData: res.data });
                } else {
                  that.setData({
                    ishow: 'dn',
                    noshow: 'db',
                  })
                }
                that.setData({
                  shopData: res.data
                })
              })
          }
        })
      }
    });
  },
  onGotUserInfo: function (e) {

    let that = this;
    var wxLogin = app.fun.wxApi.wxLogin();
    wxLogin().then(res => {
      console.log(res)
      let data = { encryptedData: e.detail.encryptedData, iv: e.detail.iv, code: res.code }
      return app.fun.wxApi.wxPost("appuser/decodeUserInfoByMeiShi", data)
    }).then(res => {  //保存用户信息
        console.log(res)
      that.setData({ 
        flag: true,
        bnshow: 'db',
        shouquan: 'dn', 
        })
      common.storage("token", res.data.token)

      let data = {
        token: res.data.token,
        name: res.data.userInfo.nickName,
        headPortrait: res.data.userInfo.avatarUrl,
        city: res.data.userInfo.country,
        sex: res.data.userInfo.gender,
        ip: '22.22.22'
      }

      return app.fun.wxApi.wxPost("appuser/updateUserInfoByUserToken", data)
    })
      .then(res => {

      })

    return false;
    var res = e.detail.userInfo;
    var ddddd = e.detail;
    var codes = common.user('code');
    wx.request({
      url: 'https://www.paiduikeji.com/smallcomment/qian/wish/decodeUserInfo',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      data: { encryptedData: ddddd.encryptedData, iv: ddddd.iv, code: codes },
      success: function (res) {
        common.storage('openid', res.data.token);
        var token = res.data.token;
        var user = res.data.userInfo;
        var sex = user.gender;
        wx.request({
          url: 'https://www.paiduikeji.com/smallcomment/qian/appuser/updateUserInfoByUserToken',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          data: { token: token, name: user.nickName, headPortrait: user.avatarUrl, city: user.country, sex: sex, ip: "22.22.22.22" },
          success: function (res) {
            that.setData({
              flag: true,
              bnshow: 'db',
              shouquan: 'dn',
            })
            common.showToast("保存成功");
            that.getWishAll();
          }
        })
      }
    })
  },
})
