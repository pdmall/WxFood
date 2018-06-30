const QQMapWX = require("/../../common/qqmap-wx-jssdk.min.js");
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    starNum: [0, 1, 2, 3, 4],
    searchImg: "/images/public/cate-search@3x.png", //搜索放大镜图片
    serverFull: app.globalData.serverFull, //满星图片
    serverHalf: app.globalData.serverHalf, //半星图片
    serverNo: app.globalData.serverNo, //无星图片
    sfxs: true, //是否显示
    flag: false,
    address: '成都',
    shopData: [],
    search: "",
    ishow: 'db',
    noshow: 'dn',
    shouquan: 'db',
    proData: [{
        index: 0,
        img: '/images/public/icon-cate@3x.png',
        text: '美食',
        appid: '',
        path: '../fujin/fujin'
      },
      {
        index: 1,
        img: '/images/public/icon-punchCard@3x.png',
        text: '天天打卡',

        path: '/pages/index/index'
      },
      {
        index: 2,
        img: '/images/public/icon-luckyBag@3x.png',
        text: '共享福袋',
        appid: '',
        path: ''
      },
    ],
  },


  location: function () {
    let that = this
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
                  that.setData({
                    shopData: res.data
                  });
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
        if (res.authSetting['scope.userLocation']) {
          wx.getLocation({
            success: function (res) {
              console.log(res)
              app.globalData.userLocation = res
            },
          })
        }
      }
    })
  },

  address: function (res) {
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
        }
      }
    })

  },


  navgitoPage: function() {
    var that = this
    wx.navigateTo({
      url: that.data.proData[0].path
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // getAllShopType: service + "shop/getAllShopType",
    //   searchShop: service + "shop/search",
    //     getHomeBanner: service + "banner/getHomeBanner",

    this.getShopList();
    //this.getHomeBanner();
  },

  gotoserach(){
    wx.navigateTo({
      url: './searchShop/searchShop',
    })
  },

  getShopList() {
    app.net.GET({
      url: app.url.getShopList,
      success(res) {

      },
      fail(res) {

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})