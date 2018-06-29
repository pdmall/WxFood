// pages/my/business/business.js
var app = getApp()
var network = require("../../../utils/network.js")
var sss=""
Page({

      /**
       * 页面的初始数据
       */
      data: {
        region: ['请选择', '请选择', '请选择'],
        latitude: "",
        longitude: "",
        shop_address:"",
        markers:[{
          latitude: "",
          longitude: "",
          width: 50,
          height: 50
        }],
        shop_phone:"",
        buss_open: '请选择',
        buss_close:"请选择",
        license_img:""
      },
      //商家地址选择器发生变化时间
      bindRegionChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          region: e.detail.value
        })
      },
      //开门时间选择器
      bindOpenTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          buss_open: e.detail.value
        })
      },
      bindCloseTimeChange:function(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          buss_close:e.detail.value
        })
      },
      //根据地图坐标返回地址
      chooseLocation:function(){
        var that=this
          wx.chooseLocation({
            success: function(res) {

              that.setData({
               shop_address: res["address"]+res["name"],
                latitude:res['latitude'],
                longitude:res["longitude"],
                 markers:[{
                 latitude: res['latitude'],
                 longitude: res["longitude"],
               }]
             })
              console.log("地图发生纬度改变"+that.data.latitude)
              console.log("地图经度发生改变"+that.data.longitude)
            },
          })
      },
      //选择营业执照
      chooseImg:function(){
        var that=this
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片        
            that.setData({
              license_img: res.tempFilePaths
            })
            var tempFilePaths = res.tempFilePaths
            wx.saveFile({
              tempFilePath: 'tempFilePaths',
              success:function(res){
                console.log(ok)
              }
            })
            
            
          }
        })
      },
      //提交审核
      submitShopInfo: function(e) {
        var that=this
        console.log(e)
        network.GET({
           url:app.url.shopRegister,
          //url:"http://www.baidu.com",
          data: {
              shop_name:e.detail.value['shop_name'],
              shop_address: e.detail.value['shop_address'],
              province:e.detail.value.city[0],
              county: e.detail.value.city[1],
              city: e.detail.value.city[2],
              shop_phone:e.detail.value["shop_phone"],
              buss_open:e.detail.value["buss_open"],
              buss_close:e.detail.value["buss_close"],
              latitude: that.data.latitude,
              longitude:that.data.longitude,
              

          },
          success: function(res) {

            
          },
        })
      },
     
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        var that = this
        wx.getSetting({
          success: res => {
            wx.getLocation({
              success: function (res) {
                that.setData({
                  latitude: res["latitude"],
                  longitude: res["longitude"],
                  markers: [{
                    id: "1",
                    latitude: res.latitude,
                    longitude: res.longitude,
                  }]
                })
              
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
          onLaunch: function() {


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