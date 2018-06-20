// pages/my/record/record.js
const app = getApp();
const common = require('../../../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cType : '',
    duihuanImg: '/images/my/convert@3x.png',  //兑换图片
    xiaofeiData: [ ], //消费记录
    dakaData: [],  //打卡记录
    chongzhiData: [],  //充值记录
    duihuanData: [],  //兑换记录
    tixianData: [],  //提现记录
    fxData: [],//分享中心
    userId:"",
    ishow:'dn'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //根据cType，设置页面标题
    let cType = options.type
    let title = '';
    if (cType == 'xiaofei') { title = "消费记录"}
    if (cType == 'daka') { title = "打卡记录" }
    if (cType == 'chongzhi') { title = "充值记录" }
    if (cType == 'duihuan') { title = "兑换记录" }
    if (cType == 'tixian') { title = "提现记录" }
    common.navTitle(title);
    that.setData({ cType: cType });

    that.getList()
    let userid = app.fun.common.getStorage("userId")
    that.setData({
      userId: userid
    })
  },
  /**
   * 获取记录数据
   */
  getList(){
    let api = ''
    let that = this
    let cType = this.data.cType;
    let token = common.getStorage('token');
    if (cType == 'xiaofei') api = 'personal/getConsumeRecord'
    if (cType == 'daka') api = 'personal/getDakaRecord'
    if (cType == 'chongzhi') api = 'personal/getRechargeRecord'
    if (cType == 'duihuan') api = 'personal/getExchangeRecord'
    if (cType == 'tixian') api = 'personal/getPutForwardRecord'
    app.fun.wxApi.wxGet(api, { token: token})
    .then( res => {
      console.log(res)
      if (res.statusCode == 200){
        if (cType == 'xiaofei') that.setData({xiaofeiData : res.data})
        if (cType == 'daka') that.setData({ dakaData: res.data })
        if (cType == 'chongzhi') that.setData({ chongzhiData: res.data })
        if (cType == 'duihuan') that.setData({ duihuanData: res.data })
        if (cType == 'tixian') that.setData({ tixianData: res.data }) 
      }else {
        that.setData({
          ishow: 'db',
          xiaofeiData:[],
          dakaData:[],
          chongzhiData:[],
          duihuanData:[],
          tixianData:[],
          fxData:[],
        })
        // common.showToast("暂无数据……")
      }
    })
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
    this.getList();
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