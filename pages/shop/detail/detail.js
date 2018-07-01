// pages/shop/detail/detail.js
const app = getApp();
const wxApi = require("../../../utils/wxApi.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeImg: '/images/tabbar/time.png',  //时间图片
    placeImg: '/images/tabbar/add.png',  //地点图片
    id: 0,
    ishow: 'db',
    noshow: 'dn',
    tg:'db',
    starNum: [0, 1, 2, 3, 4],
    serverFull: app.globalData.serverFull, //满星图片
    serverHalf: app.globalData.serverHalf,  //半星图片
    serverNo: app.globalData.serverNo,  //无星图片
    telImg: '/images/shop/user-phone@3x.png',  //电话图片
    upImg: '/images/shop/top-arrow@3x.png',
    dianzanImg: '/images/public/good-nor@2x.png',
    dzData: [
      { index: 0, dzlx: "味道赞", dzNum: 12 },
      { index: 1, dzlx: "菜品不错", dzNum: 14 },
      { index: 2, dzlx: "干净卫生", dzNum: 15 },
      { index: 3, dzlx: "菜品不错", dzNum: 14 },
      { index: 4, dzlx: "好吃得很啊", dzNum: 22 },
      { index: 5, dzlx: "菜品不错", dzNum: 33 },
    ],
    tjData: [
      { id: '', img: '', sname: "火锅牛肉", tjNum: 22 },
      { id: '', img: '', sname: "千层毛肚", tjNum: 33 },
      { id: '', img: '', sname: "挂面鸭肠", tjNum: 44 },
    ],
    shopData: [],
    phone: "18202817160",
    pjsum: 0,
    pjlist: [],
    daijinquan: [],
    tuangou: [],
    vName: '', vScope: '', vSecurity: '', vText: '', vEffective: '', saleNum: 0, vFinalmoney: 0, vMoney: 0, vTimelimit: '', vType: 0,
    daijinShowOther: false,
    tuangouShowOther: false,
    commentShowOther: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.fun.common.navTitle("商户详情");
    let id = options.id;
    console.log(id);
    let that = this;
    that.setData({ id: id });
    that.getShopDetail(id);  //获取店铺详情
    that.getCommentList(1); //获取评论列表
  },
  /**
   * 获取店铺详情
   */
  getShopDetail: function (id) {
    let that = this;

    app.fun.wxApi.wxGet("store/getStoreDetailById", { sId: id })
      .then(res => {
        console.log(res)
        console.log(res.data.groupVoucher)
     
        if (res.statusCode == 200) {
          res.data.store.sPhoto = app.globalData.imgUrl + res.data.store.sPhoto;
          res.data.groupVoucher[1] = res.data.groupVoucher[0]  //测试用，后面删掉
          that.setData({
            daijinquan: res.data.daijinVoucher,
            tuangou: res.data.groupVoucher,
            shopData: res.data.store,
          })
          // if (res.data.groupVoucher == null) {
          //   console.log(11111)
          //   that.setData({ tg: 'dn' })
          // }
        } else {
          app.fun.common.showToast("网络错误");
        }
      })
  },
  /*
  * 获取评论列表
  */
  getCommentList: function (id) {
    let that = this
    wxApi.wxPost("store/getStoreCommentList", {storeId:1})
      .then(res => {
        console.log(res)
        if (res.statusCode == 200){
          for(let i = 0;i<res.data.length;i++){
            //console.log(app.globalData.imgUrl)
            //res.data[i].userPhoto = app.globalData.imgUrl + "/" + res.data[i].userPhoto
          }
          that.setData({ 
            pjlist: res.data,
            pjnum : res.data.length
          })
        }else{
          that.setData({
            ishow: 'dn',
            noshow: 'db',
          })
        }
      })
  },
  /*
  * 购买代金券
  */
  buyVoucher: function (e) {
    let that = this
  
    let id = e.currentTarget.dataset.id
    let token = app.fun.common.getStorage("token")
    console.log(id)
    let data = { 
      token: token ,
      orderpdtid : id,
      zhiFuType : 3,
      money : 120,
      finalmoney: 85
    }
    wxApi.wxPost("store/postUserOrderByToken", data)
      .then(res => {
        console.log(res)
        if (res.statusCode == 200) {
          return false
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': res.data.signType,
            'paySign': res.data.paySign,
            'success': function (res) {
              //成功支付，该条充值记录写入数据库
              // app.fun.wxApi.wxGet("store/ ", { token: token })
              //   .then(res => {
              // })
            },
            'fail': function (err) {
              console.log("充值失败")
            }
          })
        } else {
          app.fun.common.showToast("无数据")
        }
      })
  },
  /**
   * 拨打电话
   */
  callTel: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  /**
   * 团购套餐，查看其它
   */
  showOtherTuangou: function () {
    let showVal = this.data.tuangouShowOther
    console.log(showVal)
    if (showVal) {
      this.setData({ tuangouShowOther: false })
    } else {
      this.setData({ tuangouShowOther: true })
    }
  },
  /**
   * 代金券，查看其它
   */
  showOtherDaijin: function () {
    let showVal = this.data.daijinShowOther
    console.log(showVal)
    if (showVal) {
      this.setData({ daijinShowOther: false })
    } else {
      this.setData({ daijinShowOther: true })
    }
  },
  /**
   * 用户评论，查看更多
   */
  showOtherComment: function () {
    let showVal = this.data.commentShowOther
    console.log(showVal)
    if (showVal) {
      this.setData({ commentShowOther: false })
    } else {
      this.setData({ commentShowOther: true })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})