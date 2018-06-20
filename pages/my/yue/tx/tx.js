// pages/my/yue/tx/tx.js
// 余额提现
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      datas:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserinfo()
  },
  getUserinfo: function () {
    let token = app.fun.common.getStorage("token")
    if (!token) app.fun.common.showToast("请授权")
    app.fun.wxApi.wxGet("appuser/getUserAll", { token: token })
      .then(res => {
        console.log(res)
        let moneys = res.data.money
        
        // let servicePrice= 
        let ye = moneys * 0.8
        console.log(ye)
        var dvs = ye.toFixed(2);//提现实际到账金额
        let txData={
          token: token,
          jine: moneys,
          moeny: dvs,
          servicePrice: moneys - dvs,
        }
        console.log(txData)
        app.fun.wxApi.wxPost("personal/getTiXian",txData)
        .then(res =>{
          console.log(res)
        })
        this.setData({
          datas: res.data
        })
      })
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  gettxMoney:function(){
    // this.getUserinfo()
    // let token = app.fun.common.getStorage("token")
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