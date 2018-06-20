// pages/voucher/loot/loot.js
const app = getApp();
const common = require('../../../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightImg: "/images/public/right.svg",
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getQuanList();
  },
  getQuanList: function() {
    let openid = common.getStorage("token");
    var that = this;
    app.fun.wxApi.wxGet("store/getVocherList", {
        token: openid
      })
      .then(res => {
        that.setData({
          list: res.data
        })
      })
  },
  /**
   * 跳转到规则页面
   */
  useRules: function(e) {

    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/voucher/rules/rules?id=' + id,
    })
  },
  /**
   * 立即领取会员卷

   */
  receive: function(e) {
    var id = e.currentTarget.dataset.id;

    let openid = common.getStorage("token");
    var that = this;
    console.log(openid)
    app.fun.wxApi.wxPost("store/getVocher", {
        token: openid,
        uptype: 0,
        id: id
      })
      .then(res => {
        console.log(res);
        if (res.data == 2) {
          wx.showToast({
            title: '谢谢参与！',
            icon: 'none'
          })
          return;
        }
        if (res.data == 3) {
          wx.showToast({
            title: '券已抢完，明天赶早',
            icon: 'none'
          })
          return;
        }
        if (res.data == 5) {
          wx.showToast({
            title: '请先购买超级会员！',
            icon: 'none'
          })
          that.superMember();
          return;
        }
        if (res.data == 4) {
          wx.showToast({
            title: '会员过期重新购买',
            icon: 'none'
          })
          that.superMember();
          return;
        }
        if (res.data == 6) {
          wx.showToast({
            title: '您已经抢过了！',
            icon: 'none'
          })
          return;
        }
        if (res.data == 1) {
          wx.showToast({
            title: '恭喜抢券成功！',
            icon: 'none'
          })
          that.getQuanList();
        }
      })
  },

  superMember: function() {
    let that = this;
    let token = app.fun.common.getStorage("token")
    let openid = app.fun.common.getStorage("openId")
    console.log(openid)
    if (!token) app.fun.common.showToast("请授权")
    return app.fun.wxApi.wxGet("appuser/getUserAll", {
        token: token
      })
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
            success: function(res) {
              if (res.confirm) {
                app.fun.wxApi.wxPost("store/becomeMemberPay", {
                    token: token,
                    openid: openid,
                    money: money
                  })
                  .then(res => {
                    wx.requestPayment({
                      'timeStamp': res.data.timeStamp,
                      'nonceStr': res.data.nonceStr,
                      'package': res.data.package,
                      'signType': res.data.signType,
                      'paySign': res.data.paySign,
                      'success': function(res) {
                        app.fun.wxApi.wxGet("store/becomeMember", {
                            token: token
                          })
                          .then(res => {
                            if (statusCode == 201) {
                              that.setData({
                                isVip: true
                              })
                            }
                          })
                      },
                      'fail': function(err) {

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