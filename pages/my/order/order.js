// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lxData: [
      { tname: '全部', lx: 'all', sfxz: 'yes'},
      { tname: '未消费', lx: 'wxf', sfxz: 'no'},
      { tname: '待评价', lx: 'dpj', sfxz: 'no' },
      { tname: '已退单', lx: 'ytd', sfxz: 'no' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 选择条件筛选
   */
  xuanze:function(e){
    let that = this;
    let idx = e.currentTarget.dataset.idx;
    let lx = e.currentTarget.dataset.lx;
    for(let i =0;i<that.data.lxData.length;i++){
      if(i == idx){
        that.data.lxData[i].sfxz = 'yes';
      }else{
        that.data.lxData[i].sfxz = 'no';
      }
    }
    that.setData({
      lxData: that.data.lxData
    });

    //调用接口获取数据
  },
// 申请退款
  tuik:function(){
      wx:wx.navigateTo({
        url: '/pages/order/tuik/tuik',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
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