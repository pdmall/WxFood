//获取应用实例
const app = getApp();
const common = require('../../common/common.js');
const QQMapWX = require("../../common/qqmap-wx-jssdk.min.js");
const wxApi = require("../../utils/wxApi.js")
var qqmapsdk;
Page({
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
        path: ''
      },
      {
        index: 1,
        img: '/images/public/icon-punchCard@3x.png',
        text: '天天打卡',
        appid: 'wx9d82360ba0304046',
        path: '/pages/index/index'
      },
      {
        index: 2,
        img: '/images/public/icon-luckyBag@3x.png',
        text: '共享福袋',
        appid: '',
        path: ''
      },
      {
        index: 3,
        img: '/images/public/icon-RobStamps@3x.png',
        text: '会员抢卷',
        appid: '',
        path: ''
      },
      {
        index: 4,
        img: '/images/public/icon-source@3x.png',
        text: '众愿',
        path: '/pages/show/show'
      }
    ],
  },

  onLoad: function() {
    app.net.GET
  },

  // 获取商铺信息
  getStore: function() {


  },
  gettuan: function() {


  },


  onShow: function() {

  },

  /**
   * 检测搜索框是否有内容输入
   */
  checkVal: function(e) {
    let that = this;
    let val = e.detail.value;
    if (!val) { //空值显示放大镜图标
      that.setData({
        sfxs: true
      });
    } else { //非空值隐藏
      that.setData({
        sfxs: false
      });
    }
  },

  // 个人中心
  my: function() {
    wx.reLaunch({
      url: '/pages/my/my',
    })
  },

  /**
   * 查看店铺详情
   */
  shopInfo: function(e) {
    let url = e.currentTarget.dataset.url;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/shop/detail/detail?id=" + id,
    })
  },
  search: function(e) {
    let search = e.detail.value.search;
    let that = this;

    qqmapsdk = new QQMapWX({
      key: 'M3NBZ-CU3LU-G7QV3-BKIQU-WC5W3-FHBHU'
    });
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(addressRes) {

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
                  that.setData({
                    shopData: res.data
                  });
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
  
})