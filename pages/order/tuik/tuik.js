// pages/order/tuik/tuik.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    tuik: [{ index: 0, texts: '商家停业/装修/转让' }, { index: 1, texts: '去过了，不太满意' }, { index: 2, texts: '朋友/网上评价不太好' }, { index: 3, texts:'买多了/买错了'}]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  
  },
  getCont: function (e) {
    let val = e.detail.value;
    let that = this;
    let len = 0;
    if (val.length > 0) {
      len = val.length;
      if (len >= 100) len = 100;
    }
    that.setData({
      num: len
    });
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