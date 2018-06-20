// pages/shop/pingjia/pingjia.js
const common = require('../../../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nosmil: '/images/public/scowl@3x.png',
    smil: '/images/public/smilingFace@3x.png',
    xing: '/images/public/bigFullStars@3x.png',
    upImg: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  cont : function(e){
    //console.log(e);
    console.log(e.detail.value.length);
  },

  uploadImg:function(){
    let that = this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        console.log(res);
        let tmpImg = res.tempFiles[0];
        if (tmpImg > 1024 * 1024 *2){
          common.showToast("图片需小于2M");
          return false;
        }
        that.data.upImg.push(tmpImg.path);
        that.setData({ upImg: that.data.upImg});
        wx.saveFile({
          tempFilePath: tmpImg.path,
          success:function(res){
            //console.log(res);
          }
        })

      },
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