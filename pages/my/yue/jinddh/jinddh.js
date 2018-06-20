// pages/my/yue/jinddh/jinddh.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:[],
    userIntegral:0,
    form_info: '',
    sxf: 0,
    jine: 0,
    jindou: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserinfo()
  },
  clearNoNum: function (obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
    if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
      obj.value = parseFloat(obj.value);
    }
  },
  getUserinfo: function () {
    let token = app.fun.common.getStorage("token")
    if (!token) app.fun.common.showToast("请授权")
    app.fun.wxApi.wxGet("appuser/getUserAll", { token: token })
      .then(res => {
        this.setData({
          datas: res.data,
          userIntegral: res.data.userIntegral
        })
      })
  },
  searchBox: function (e) {
    let that = this;
    console.log(e)
    let token = app.fun.common.getStorage("token")
    let firsts = e.detail.value.jindou
    let userIntegral = that.data.datas.userIntegral
    console.log(firsts, userIntegral)
    console.log(firsts)
    let type = "jindou"
    if (firsts <= userIntegral && firsts >=100){
      app.fun.wxApi.wxGet("personal/getInsertRate", { type: type })
        .then(res => {
          console.log(res)
          let lilv = res.data.rate;

          let money = firsts * (1 - lilv);
          let servicePrice = firsts - money
          let data = {
            token: token,
            duihuan: firsts,
            type: 2,
          }
          that.setData({
            sxf: servicePrice.toFixed(2),
            jine: firsts,
            jindou: money.toFixed(2),
          })
          app.fun.wxApi.wxPost("personal/getExchangeGold", data)
            .then(res => {
              if (res.statusCode == 201) {
                wx.showModal({
                  title: '兑换成功',
                  content: '是否继续兑换',
                  success: function (res) {
                    that.getUserinfo();
                    that.setData({
                      form_info: '',
                      sxf: 0,
                      jine: 0,
                      jindou: 0,
                      datas: that.data.datas,
                      userIntegral: that.data.datas.userIntegral
                    })
                    if (res.confirm) {
                      e.detail.value.jine = ""
                      console.log("用户继续兑换")
                    } else if (res.cancel) {
                      wx.reLaunch({
                        url: '/pages/my/my',
                      })
                    }
                  }
                })
              }
            })
        })
    }else{
      wx.showModal({
        title: '提示',
        content: '只可输入100以上余额以下的数字',
        success: function (res) {
          if (res.confirm) {
            that.setData({
              form_info: '',
              sxf: 0,
              jine: 0,
              jindou: 0,
              datas: that.data.datas,
              userIntegral: that.data.datas.userIntegral
            })
          } else if (res.cancel) {
            wx.reLaunch({
              url: '/pages/my/my',
            })
          }
        }

      })
    }
    

    that.getUserinfo()

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