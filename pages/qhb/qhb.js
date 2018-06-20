// pages/qhb/qhb.js
const app = getApp();
var imageUtil = require('../../utils/img.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toggle: true,
    toggle2: false,
    hbobj: {},
    baseUrl: "",
    dsds: '-',
    sec: '8',
    animationData: {},
    hbw: true,
    selfInfo: null,
    advertiseId: '',
    temp: false,
    imagewidth: 0,
    imageheight: 0,
    advertiseImg: '',
    wd: false,
    qhb: true,
    adsAnswer: '',
    typeads: 0,
    imgurl: 'https://www.paiduikeji.com/',
    token:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var token = options.token;

    var _this = this;

    var obj = options.redp;
    var redp = JSON.parse(obj);
    _this.setData({
      hbobj: redp,
      token:token,
      advertiseImg: _this.data.imgurl + redp.tImg
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
    var _this = this
    var p = setInterval(function() {
      if (_this.data.advertiseImg == '' || _this.data.sec == '') {
        return false
      } else {
        clearInterval(p)
        var r = setInterval(function() {
          _this.setData({
            sec: _this.data.sec - 1
          })
          if (_this.data.sec == 0) {
            clearInterval(r)
            _this.setData({
              toggle2: !_this.data.toggle2,
              toggle: !_this.data.toggle
            })
          }
        }, 1000)
      }
    }, 1000)

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

  },
  toggle() {
    this.setData({
      toggle: !this.data.toggle
    })
  },
  toggle2() {
    this.setData({
      toggle2: !this.data.toggle2
    })
  },
  dh() {
    var _this = this
    if (this.data.temp) {
      return
    } else {
      var animation = wx.createAnimation({
        duration: 2000,
        timingFunction: 'linear',
      })
      this.animation = animation

      animation.rotateY(180).step()
      this.setData({
        animationData: animation.export(),
        hbw: true,
        temp: true
      })
      setTimeout(function() {
        app.fun.wxApi.wxGet("bag/getBagGold", {
          token: _this.data.token,
          id: _this.data.hbobj.id
        })
          .then(res => {
            console.log(res)
            if (res.statusCode == 202) {
              wx.showToast({
                title: '你已抢过该福袋',
                icon: 'none'
              })
            } else if (res.statusCode == 201) {
              wx.showToast({
                title: '成功抢到福袋',
                icon: 'success',
                duration: 2000
              })
              wx.redirectTo({
                url: '../../pages/share/share?storeId=' + _this.data.hbobj.storeId+"&bag="+res.data.getBag+"&storeName="+res.data.storeName
              })
            }
          })
      }, 2000)
    }
  },
  imageLoad: function(e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  }
})