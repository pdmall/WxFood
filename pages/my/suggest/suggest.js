// pages/my/suggest/suggest.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 获取文本域内容，统计字数
   */
  getCont: function (e) {
    let val = e.detail.value;
    let that = this;
    let len = 0;
    if (val.length > 0) {
      len = val.length;
      if (len >= 300) len = 300;
    }
    that.setData({
      num: len
    });
    //return val.substring(0,300);
  },
  /**
   * 提交建议保存
   */
  tjjy: function(e){
    let cont = e.detail.value.content;
    if(!cont){
      app.fun.common.showToast("内容不能为空")
      return false
    }
    let token = app.fun.common.getStorage('token');
    console.log(token);
    app.fun.wxApi.wxPost("personal/addFeedback", { token: token, content: cont})
    .then(res => {
      if (res.statusCode == 201){
        app.fun.common.showToast("保存成功")
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          })
        },1500)
      }else{
        app.fun.common.showToast("保存失败")
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