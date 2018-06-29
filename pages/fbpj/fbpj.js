// pages/fbpj/fbpj.js
const app = getApp();
const common = require('../../common/commonZy.js');
var wxApi = require('../../utils/wxApi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    id : '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this;
    let id = options.id;
    that.setData({ id: id });
 
  },
  /**
   * 获取文本域内容，统计字数
   */
  getCont: function(e){
    let val = e.detail.value;
    let that = this;
    let len = 0;
    if (val.length > 0){
      len = val.length;
      if(len >= 100) len = 100;
    }
    that.setData({
      num: len
    });
  },
  /**
   * 发布评论完成，返回展示页面
   */
  fbpl: function(e){
    
    let cont = e.detail.value.content;
    let openid = common.user('openid');
    let id = this.data.id;
    console.log(this.data)
    let data = { token: openid, id: id, content: cont }
    if (!cont){
      common.showToast("评论不能为空");
      return false;
    }
    //发布评价保存
    wxApi.wxPost("adcomment",data)
    .then( res => {
      //评论成功
      if (res.statusCode == 201) {
        common.showToast("评论成功！");
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
            

          })
          this.setData({ isHidden: 'db' });
        }, 1500);
      }
      else if (res.statusCode == 202) {  //已经评论过了
        common.showToast("你已评论过了");
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
          clearTimeout();
        }, 1500);

      } else {
        common.showToast("网络错误");
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