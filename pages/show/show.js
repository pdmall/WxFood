// pages/show/show.js
const app = getApp();
const common = require('../../common/commonZy.js');
const imgUrl = app.globalData.imgUrl;
var wxApi = require('../../utils/wxApi');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pjImg: '/images/public/pj.png',
    pkImg: '/images/public/PK.png',
    activeImg: '/images/public/active.png',
    norImg: '/images/public/nor.png',
    winLeft: '/images/public/win-left.png',
    winRight: '/images/public/win-right.png',
    imgUrl: imgUrl,
    rules: [],
    data: [],
    commentSum: [],
    flag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var wxLogin = wxApi.wxLogin();
    // var dsss = common.user('openid');

    //获取规则
    that.getRules();

    //初始化页面，控制接口执行顺序，加载页面数据
    wxLogin().then(res => {
      common.showToast("页面加载中");
      common.storage('code', res.code);
    })

  },
  onGotUserInfo: function (e) {
    var that = this;
    var res = e.detail.userInfo;
    var ddddd = e.detail;
    var codes = common.user('code');
    wx.request({
      url: 'https://www.paiduikeji.com/smallcomment/qian/appuser/decodeUserInfoZhongYuan',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      data: { encryptedData: ddddd.encryptedData, iv: ddddd.iv, code: codes },
      success: function (res) {
        common.storage('openid', res.data.token);
        var token = res.data.token;
        var user = res.data.userInfo;
        var sex = user.gender;
        if (sex == 0) {
          sex = '女'
        } else if (sex == 1) {
          sex = '男'
        } else {
          sex = '男'
        }
        wx.request({
          url: 'https://www.paiduikeji.com/smallcomment/qian/appuser/updateUserInfoByUserToken',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          data: { token: token, name: user.nickName, headPortrait: user.avatarUrl, city: user.country, sex: sex, ip: "22.22.22.22" },
          success: function (res) {
            that.setData({
              flag: true
            })
            common.showToast("保存成功");

          }
        })
        wx: wx.navigateTo({
          url: '../vote/vote',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })

  },
  //获取规则
  getRules: function () {
    //获取规则
    wxApi.wxGet("getRules")
      .then(res => {
        let ruleStr = '';
        if (res.statusCode == 200) {
          //获取配置的参加挑战规则
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].rType == 2) {
              ruleStr = res.data[i].rule
            }
          }
          let rules = ruleStr.split('；');
          this.setData({
            rules: rules
          });
        } else {
          common.showToast("网络错误");
        }
      })
  },
  /**
   * 获取众愿数据
   */

  /**
   * 跳转到评价列表，加载对应商品的评价数据
   */
  pjlb: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/pjlb/pjlb?id=' + id,
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
    this.getRules();

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})