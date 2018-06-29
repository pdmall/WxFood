// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightImg: '/images/public/right.svg',
    editImg: '/images/my/edit@3x.png',
    vipImg: '/images/my/member-active@3x.png',
    userid:'',
    myData: [
      { index: 0, img: '/images/my/merchan-order-icon-active@3x.png', text: '我的订单', url: '/pages/my/order/order' , recordType: '' },
      { index: 1, img: '/images/my/distribution@3x.png', text: '分销达人', url: '/pages/my/record/record', recordType: 'fenxiao' },
      { index: 2, img: '/images/my/expense@3x.png', text: '消费记录', url: '/pages/my/record/record', recordType: 'xiaofei'  },
      { index: 3, img: '/images/my/card@3x.png', text: '打卡记录', url: '/pages/my/record/record', recordType: 'daka'  },
      { index: 4, img: '/images/my/recharge@3x.png', text: '充值记录', url: '/pages/my/record/record', recordType: 'chongzhi'   },
      { index: 5, img: '/images/my/convert@3x.png', text: '兑换记录', url: '/pages/my/record/record', recordType: 'duihuan'  },
      { index: 6, img: '/images/my/withdrawDeposit@3x.png', text: '提现记录', url: '/pages/my/record/record', recordType: 'tixian' },
      { index: 7, img: '/images/my/share@3x.png', text: '分享中心', url: '/pages/my/record/record', recordType: 'fenx' },
      { index: 8, img: '/images/my/svip@3x.png', text: '超级会员', url: '/pages/my/vip/vip', recordType: '' },
      { index: 9, img: '/images/my/cashCcoupon@3x.png', text: '现金券', url: '', recordType: '' },
      { index: 10, img: '/images/my/help@3x.png', text: '帮助中心', url: '/pages/my/help/help', recordType: '' },
      { index: 10, img: '/images/my/help@3x.png', text: '成为商家', url: '/pages/my/business/business', recordType: '' },
    ],
    userData: { userIntegral: 0, status: 1, member : 1 }
  }, 
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.getUserinfo();
    that.money();
  },
  /**
   * 页面跳转
   */
  toPage: function(e){
    console.log(e);
    let cType = e.currentTarget.dataset.type;
    let url = e.currentTarget.dataset.url;
    console.log(url)
    wx.navigateTo({
      url: url + "?type=" + cType,
    })
    
  },
  /**
   * 获取用户信息
   */
  getUserinfo : function(){
    let token = app.fun.common.getStorage("token")
    if(!token)app.fun.common.showToast("请授权")
    app.fun.wxApi.wxGet("appuser/getUserAll",{ token :token})
    .then( res => {
      console.log(res)
      this.setData({
        userData:res.data,
        useruserid: res.data.userId
      })
    })
  },
  money:function(){
    let token = app.fun.common.getStorage("token")
    if (!token) app.fun.common.showToast("请授权")
    // app.fun.wxApi.wxGet("personal/getCashPurse", { token: token})
    // .then( res => {
    //   console.log(res)
    // })
  },
  // 查看余额详情页面
  yue:function(){
    wx.navigateTo({
      url: '/pages/my/yue/yue',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  dou:function(){
    wx.navigateTo({
      url: '/pages/my/yue/dou',
    })
  },
  loginOrRegister:function(){
    wx.navigateTo({
      url: '/pages/my/loginOrRegi/min',
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
    this.getUserinfo()
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