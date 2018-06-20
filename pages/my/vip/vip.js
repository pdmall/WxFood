// pages/my/vip/vip.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isVip: false,
    an: "display: none;",
    ab: "display: block;",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = app.fun.common.getStorage("token")
    if (!token) app.fun.common.showToast("请授权")
    app.fun.wxApi.wxGet("appuser/getUserAll", { token: token })
      .then(res => {
        if (res.data.member == 1) {
          that.setData({
            an: "display:block",
            ab: "display:none",
          })
        } else {
          that.setData({
            an: "display:none",
            ab: "display:block",
          })

        }
      })

  },
  /**
   * 成为超级会员
   */

  superMember: function () {
    let that = this;
    let token = app.fun.common.getStorage("token")
    let openid = app.fun.common.getStorage("openId")
    if (!token) app.fun.common.showToast("请授权")
  
    return app.fun.wxApi.wxGet("appuser/getUserAll", { token: token })
      .then(res => {
        console.log(res)
        let openid = res.data.openId
        console.log(openid)
        if (res.data.member == 1) {
          that.setData({
            isVip: true
          })
          app.fun.common.showToast("您已经是超级会员")
        } else {
          let money = 1;
          wx.showModal({
            title: '提示',
            content: '是否充值2元成为超级会员？',
            success: function (res) {
              if (res.confirm) {
                app.fun.wxApi.wxPost("store/becomeMemberPay", { token: token, openid: openid, money: money })
                  .then(res => {
                     wx.requestPayment({
                      'timeStamp': res.data.timeStamp,
                      'nonceStr': res.data.nonceStr,
                      'package': res.data.package,
                      'signType': res.data.signType,
                      'paySign': res.data.paySign,
                      'success': function (res) {
                        app.fun.wxApi.wxGet("store/becomeMember", { token: token })
                          .then(res => {
                            if (statusCode == 201) {
                              that.setData({
                                isVip: true
                              })
                           
                        
                            }
                          })
                      },
                      'fail': function (err) {

                      }
                    })

                    // 支付接口 调取失败后台原因
                  })
              } else if (res.cancel) {
                app.fun.common.showToast("您取消了操作")
              }
            }
          })
        }
      })

  },
  hyqj:function(){
    wx.navigateTo({
      url: '/pages/voucher/loot/loot',
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
    this.onLoad();
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