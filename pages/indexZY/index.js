//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {



    wx.showToast({
      title: '请稍后...',
      icon: 'loading'
    })

  


    setTimeout(function(){
      wx.reLaunch({
        url: '/pages/show/show',
      })
    },800);
  },
  getUserInfo: function(e) {
   
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
