const app = getApp();
const common = require('../../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat: 0,
    lng: 0,
    redList: [],
    imgurl: 'https://www.paiduikeji.com/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //获取经纬度
    wx.getLocation({
      success: function(res) {
        that.setData({
          lat: res.latitude,
          lng: res.longitude
        })
        app.fun.wxApi.wxPost("bag/selectStoreBag", {
            mapX: res.latitude,
            mapY: res.longitude,
            Uptype: 0
          })
          .then(res => {
            console.log(res);
            that.setData({
              redList: res.data
            })
          })
      }
    })



  },
  //抢红包
  toQhb: function(e) {
    let token = common.getStorage("token");
  
    var redp = e.currentTarget.dataset.obj;
    var redp2 = JSON.stringify(redp);
    wx.navigateTo({
      url: "/pages/qhb/qhb?token=" + token + "&redp=" + redp2
    })
    return;
    wx.showModal({
      title: '确认使用',
      content: '你是否确认抢该红包？', 
      success: function(res) {
        if (res.confirm) {
          app.fun.wxApi.wxGet("bag/getBagGold", {
              token: token,
              id: id
            })
            .then(res => {
              console.log(res)
              if(res.statusCode==202){
                   wx.showToast({
                     title: '你已抢过该福袋',
                     icon:'none'
                   })
              }
            })
        }
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