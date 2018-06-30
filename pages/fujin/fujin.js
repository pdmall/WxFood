// pages/fujin/fujin.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    starNum: [0, 1, 2, 3, 4],
    serverFull: app.globalData.serverFull, //满星图片
    serverHalf: app.globalData.serverHalf, //半星图片
    serverNo: app.globalData.serverNo, //无星图片
    rightImg: "/images/public/right.svg",
    searchImg: "/images/public/search.svg", //搜索放大镜图片
    sfxs: true, //是否显示
    dispaly: "none",
    xq: '',
    ishow: 'db',
    noshow: 'dn',
    ifshow: false,
    oneShow: false,
    twoShow: true,
    threeShow: false,
    fourShow: true,
    paix: [{
      id: 1,
      text1: "附近(智能范围内)",
      text2: "500米",
      text3: "1000米",
      text4: "2000米"
    }, {
      id: 1,
      text1: "附近(智能范围内)",
      text2: "500米",
      text3: "1000米",
      text4: "2000米"
    }, {
      id: 1,
      text1: "附近(智能范围内)",
      text2: "500米",
      text3: "1000米",
      text4: "2000米"
    }],
    // paix: [{ id: 1, data: [{ index: 0, text:  }, { index: 1, text:  }, { index: 2, text: }, { index: 3, text: },] },
    // { id: 2, data: [{ index: 0, text: "" }, { index: 1, text: "小吃快餐" }, { index: 2, text: "火锅" }, { index: 3, text: "川菜" },] },
    // { id: 3, data: [{ index: 0, text: "智能排序" }, { index: 1, text: "离我最近" }, { index: 2, text: "评价最好" }, { index: 3, text: "价位最高" },] }
    // ],
    paixuNum: [{
      index: 0,
      text: "附近"
    }, {
      index: 1,
      text: "美食"
    }, {
      index: 2,
      text: "智能排序"
    }],
    shopData: [{
        index: 0,
        img: '/images/shop/img1.png',
        shopname: '大侠行走江湖火锅',
        price: 102,
        place: '春熙路',
        range: '500米',
        juan: '60代80',
        tuan: "4人餐288元"
      },
      {
        index: 1,
        img: '/images/shop/img2.png',
        shopname: '老妈砂锅串串',
        price: 99,
        place: '桐梓林',
        range: '600米',
        juan: '20代30，50代100',
        tuan: "4人餐228元，6人餐298元"
      },
      {
        index: 2,
        img: '/images/shop/img1.png',
        shopname: '重庆火锅',
        price: 88,
        place: '春熙路',
        range: '800米',
        juan: '60代80',
        tuan: "4人餐288元"
      }
    ],
    conpon: [{
      conp: ["五元代金卷\n", "五元代金卷\n", "五元代金卷\n"]
    }, ],
    conpon2: [{
      conp2: ["五元团购卷\n", "五元团购卷\n", "五元团购卷\n"]
    }, ]
  },
  checkMore: function() {
    this.setData({
      oneShow: true,
      twoShow: false,
      threeShow: true,
      fourShow: true
    })
  },
  closeMore: function() {
    this.setData({
      oneShow: false,
      twoShow: true,
      threeShow: false
    })
  },
  checkMoreT: function() {
    this.setData({
      threeShow: true,
      fourShow: false
    })
  },
  closeMoreT: function() {
    this.setData({
      threeShow: false,
      fourShow: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let wxLogin = app.fun.wxApi.wxLogin();
    //授权登录，获取code
    wxLogin().then(res => {
        let data = {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          code: res.code
        }
        return app.fun.wxApi.wxPost("appuser/decodeUserInfoByMeiShi", data);
      }) //获取用户openid
      .then(res => {

        app.fun.common.storage('openid', res.data);
        let wxGetLocation = app.fun.wxApi.wxGetLocation();
        return wxGetLocation();
      }) //获取用户的经度、纬度
      .then(res => {
        let mapX = res.latitude;
        let mapY = res.longitude;
        let data = {
          "mapX": mapX,
          "mapY": mapY,
          //"distance" : 8000,
          //"T" : "3",
          //"type" : "火锅"
        }
        return app.fun.wxApi.wxPost("store/getStore", data);
      }) //获取商店信息
      .then(res => {
        if (res.statusCode == 201) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].sPhoto = app.globalData.imgUrl + res.data[i].sPhoto;
            if (res.data[i].sDistance >= 1000) {
              res.data[i].sDistance = (res.data[i].sDistance / 1000).toFixed(1) + "k";
            }
          }
          res.data[0].sLevel = 5
          that.setData({
            shopData: res.data
          });
        } else {
          app.fun.common.showToast("暂无数据");
        }
      })
  },
  swiperTab: function(e) {
    var that = this;
    console.log(e.detail.current)
    that.setData({
      ifshow: true,
      currentTba: e.detail.current
    });
  },
  clickTab: function(e) {

    var that = this;
    console.log(e)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        ifshow: true,
        currentTab: e.target.dataset.current
      })
    }
  },
  showOtherTuangou: function() {
    let showVal = this.data.ifshow
    if (showVal) {
      this.setData({
        ifshow: false
      })
    } else {
      this.setData({
        ifshow: true
      })
    }
  },
  shopInfo: function(e) {
    console.log(e);
    let url = e.currentTarget.dataset.url;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/shop/detail/detail?id=" + id,
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