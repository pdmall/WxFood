// pages/ddDetail/ddDeail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightImg: '/images/public/right.svg',
    num: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 修改数量
   */
  updateNum: function(e){
    let upType = e.currentTarget.dataset.type;
    let num = this.data.num;
    //减少数量
    if(upType == 'jian'){
      if(num > 1){
        this.setData({ num: Number(num -1) });
      }else{
        return false;
      }
    }  
    //增加数量
    if (upType == 'add'){
      this.setData({ num: Number(num + 1) });
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