// pages/my/yue/cz/cz.js

// 充值
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first:0
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  clearNoNum:function(obj){ 
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); 
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
    if(obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
      obj.value = parseFloat(obj.value);
    }
  },
  
  searchBox: function (e) {
    let that=this;
    let firsts = e.detail.value.jine
    let token = app.fun.common.getStorage("token")
     app.fun.wxApi.wxGet("appuser/getUserAll", { token: token })
      .then(res => {
        let openid = res.data.openId
        that.clearNoNum()
        if (firsts>0){
          app.fun.wxApi.wxPost("store/becomeMemberPay", { token: token, openid: openid, money: firsts * 100 })
            .then(res => {
              console.log(res)
              wx.requestPayment({
                'timeStamp': res.data.timeStamp,
                'nonceStr': res.data.nonceStr,
                'package': res.data.package,
                'signType': res.data.signType,
                'paySign': res.data.paySign,
                'success': function (res) {
                  app.fun.wxApi.wxGet("personal/rechargeBalance", { token: token, money: firsts })
                    .then(res => {
                      if (res.statusCode == 201) {
                        console.log(123)
                        wx.showModal({
                          title: '充值成功',
                          content: '是否继续充值',
                          success: function (res) {
                            that.setData({
                              form_info: '',
                              
                            })
                            if (res.confirm) {
                              console.log("用户继续充值")
                            } else if (res.cancel) {
                              wx.reLaunch({
                                url: '/pages/my/my',
                              })
                            }
                          }
                        })
                      } else {
                        app.fun.common.showToast("充值失败")
                      }
                      that.setData({
                        first: firsts
                      })
                    })
                },
                'fail':function(){
                  that.setData({
                    form_info: '',
                  })
                  app.fun.common.showToast("充值失败")
                }
              })
            })
        }else{
          wx.showModal({
            title: '提示',
            content: '只可输入0以上余额以下的数字',
            success: function (res) {
              if (res.confirm) {
                that.setData({
                  form_info: '',
                  
                })
              } else if (res.cancel) {
                wx.navigateTo({

                  url: '/pages/my/yue/yue',
                })
              }
            }

          })
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
    this.onLoad()
    this.setData({
      first: ""
    })
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