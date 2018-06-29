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
        userPhoneNum:"",
        disabled: true,
        inputPhone: false,
        inputCode: true,
        codeDisabled: true
      },
      //input获取焦点
      clearValue: function() {
        this.setData({
          phonevalue: "",
          disabled: false,
          color: "#000"
        })
      },
      clearValueIcode: function() {
        this.setData({
          icodevalue: "",
          codeDisabled: false,
          codeColor: "#000"
        })
      },
      //获取验证码请求
      submitPhone: function(e) {
        var that = this
        console.log(app.globalData.userInfo)
        console.log(e.detail.value["phone"])
        this.setData({
          phonevalue: e.detail.value["phone"],
          inputCode: false
        })
        console.log(app.url.getVerCode)
        //请求后台发送手机短信验证码
        network.GET({
          url: app.url.getVerCode,
          data: {
            phone: e.detail.value["phone"]
          },
          success: function(res) {
           //启动计时器
          that.getVerificationCode(); 
          },
          complete: function (res) { 
           
          },
          
        })
      },
      //获取验证码计时器
      getCode: function(options) {
        var that = this;
        var currentTime = that.data.currentTime
        interval = setInterval(function() {
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
              inputPhone:false
            })
          }
        }, 1000)
      },
      getVerificationCode: function() {
        this.getCode();
        var that = this
        that.setData({
          disabled: true
        })
      },
      //发送验证码
      submitIcode: function(e) {
        var that = this;
        console.log(e.detail.value["idcode"])
        this.setData({
          icodevalue: e.detail.value["idcode"]
        })
        // 验证码验证请求
        network.POST({
          //url: app.url.register,
          url:"http://www.baidu.com",
          data: {
            username: app.globalData.userInfo['nickName'],
            verCode: e.detail.value["idcode"],
            icon: app.globalData.userInfo['avatarUrl'],
            phone: that.data.phonevalue
          },
          success: function (res) {
            console.log(res)
           wx.setStorageSync("token",res.data['data'])
            wx.showToast({
              title:res.data.message,
            }),
              wx.navigateTo({
                url: 'pages/my/my',
              })
          },
        })
        
      },


      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
      },
      
})