// pages/my/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightImg: '/images/public/right.svg',
    
    pData: [
      { tname: "共享福袋玩法", url: "/pages/my/help/helpruter/fud" },
      { tname: "天天抢卷玩法", url: "/pages/my/help/helpruter/qiangq"},
      { tname: "金豆金额的转换", url: ""},
      { tname: "意见建议", url: "/pages/my/suggest/suggest" },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 页面跳转
   */
  otherPage: function(e){
    let url = e.currentTarget.dataset.url;
    console.log(url)
    wx.navigateTo({
      url: url,
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