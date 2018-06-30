// pages/my/loginOrRegi/loginOrRegi.js
var interval = null //倒计时函数
var app = getApp();
const network = require("../../../../utils/network.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phonevalue: "请输入手机号",
    color: "#ccc",
    codeColor: "#ccc",
    icodevalue: "请输入验证码",
    btnvalue: "获取验证码",
    currentTime: "61",
    userPhoneNum: "",
    disabled: true,
    inputPhone: false,
    verCode:"",
    sendVerCode: false,//是否发送过验证码
    isAuth: false
  },
  //电话号码 获取焦点
  inputEvent(e) {
    let len = e.detail.cursor;
    let disabled = true
    if (len == 11) {
      disabled = false
    }
    this.setData({
      userPhoneNum : e.detail.value,
      disabled: disabled,
      color: "#000"
    })
  },

  codeEvent(e){
    this.setData({
      verCode: e.detail.value,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onGotUserInfo();
  },

/**
 * 获取用户信息权限
 */
  onGotUserInfo() {
    let that = this;
    let wxGetUserInfo = app.wxApi.wxGetUserInfo();
    //授权登录，获取code
    wxGetUserInfo().then(res => {
      that.setData({
        isAuth: true
      })
      app.setUserInfo(res.userInfo)
    }).catch(function (msg) {//如果没有授权就调研授权按钮
      that.setData({
        isAuth: false
      })
    })
  },

  //获取验证码请求
  onGetVerCode: function (e) {
    var that = this
    app.net.GetThen({
      url: app.url.getVerCode,
      data: {
        phone: this.data.userPhoneNum
      }
    }).then(res=>{
      if(res.data.code == 200){
        this.startTime();
        that.setData({
          sendVerCode:true
        })
      }else{
        wx.showModal({
          title: res.data.message,
        })
      }
    })
  },

  //获取验证码计时器
  startTime: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        btnvalue: currentTime + '秒',
        disabled:true,
        inputPhone: true
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          btnvalue: '重新发送',
          currentTime: 61,
          disabled: false,
          inputPhone: false
        })
      }
    }, 1000)
  },


  //开始注册
  onLogin: function (e) {
    if (this.data.verCode.length < 4) {
      wx.showToast({
        title: '验证码有误',
      })
      return;
    }
    app.net.PostThen({
      url: app.url.register,
      data: {
        username: app.getUserInfo().nickName,
        verCode: this.data.verCode,
        icon: app.getUserInfo().avatarUrl,
        phone: this.data.userPhoneNum,
      }
    }).then(res => {
      if (res.data.code == 200) {
        app.setToken(res.data.data);
        wx.navigateBack()
      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    })
  },

 



})