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
    inputCode: true,
    verCode:"",
    codeDisabled: true,
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
    let len = e.detail.cursor;
    let inputCode = true
    if (len > 3) {
      inputCode = false
    }
    this.setData({
      verCode: e.detail.value,
      inputCode: inputCode,
      color: "#000"
    })
  },

  clearValueIcode: function () {
    this.setData({
      icodevalue: "",
      codeDisabled: false,
      codeColor: "#000"
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onGotUserInfo();
  },

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
    app.net.GET({
      url: app.url.getVerCode,
      data: {
        phone: this.data.userPhoneNum
      }
    }).then(res=>{
      if(res.data.code == 200){
        this.startTime();
        that.setData({
          inputCode: false
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


  //发送验证码
  onLogin: function (e) {
    app.net.POST({
      url: app.url.register,
      data: {
        username: app.getUserInfo().nickName,
        verCode: this.data.verCode,
        icon: app.getUserInfo().avatarUrl,
        phone: this.data.userPhoneNum,
      }
    }).then(res => {
      if (res.data.code == 200) {
        this.startTime();
        that.setData({
          inputCode: false
        })
      } else {
        console.log(res)
        wx.showToast({
          title: res.data.message,
        })
      }
    })

  
  },

  sss() {


  }


})