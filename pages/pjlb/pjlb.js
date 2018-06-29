// pages/pjlb/pjlb.js
const app = getApp();
const common = require('../../common/commonZy.js');
const wxApi = require("../../utils/wxApi.js");
const imgUrl = app.globalData.imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    photo: 'https://www.paiduikeji.com/uploadFiles/uploadFiles/2.jpg',
    ydzImg: '/images/public/good-active@3x.png', //已点赞图片
    wdzImg: '/images/public/good-nor@3x.png', //未点赞图片
    isHidden: 'dn', //影藏
    pjData: [],
    pjNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let id = options.id;

    let openid = common.user('openid');
    that.setData({ id: id });
    //获取评论列表数据
    that.getPllb(id);
    //参数id获取前面传递过来的相同页面信息
  },
  /**
   * 获取评论列表数据
   */
  getPllb: function (options) {
    let openid = common.user('openid');
    let data = { id: options, token: openid };
    this.setData({ isHidden: 'dn' });
    wxApi.wxGet("getCommentList", data)
      .then(res => {

        console.log(res)
        if (res.statusCode == 202) {  //没有评论
          this.setData({ isHidden: 'db' });
        }
        if (res.statusCode == 200) {
          if (res.data.length > 0) {
            //计算时间间隔
            for (let i = 0; i < res.data.length; i++) {
              let strTime = new Date(res.data[i].cTime).getTime();
              let nowTime = new Date().getTime();
              let timeVal = Number(nowTime) - Number(strTime)

              let hours = parseInt(timeVal / (60 * 60 * 1000));
              let minutes = parseInt(timeVal / (60 * 1000));
              let second = parseInt(timeVal /  1000);
              
              //用户头像
              var A = res.data[i].cTime
              var B = A.substring(10, 16)
              var C = A.substring(0, 10)
              res.data[i].cUserPhoto = res.data[i].cUserPhoto;
              //用户姓名为空、未定义显示匿名用户
              if (res.data[i].cUserName == '' || res.data[i].cUserName == 'undefined') {
                res.data[i].cUserName = "匿名用户"
              }
              //对评论时间处理
              if (hours == 0) {
                if (minutes > 0 && minutes <= 59) {
                  res.data[i].cTime = minutes + "分钟前"
                  
                } else if(second>0 && second<=59){
                  res.data[i].cTime = "刚刚"
                }
              } else if (hours == 0 && hours <= 24){
                res.data[i].cTime=hours+'小时前'

              } else if (hours <= 24 && hours<=48){
                res.data[i].cTime='昨天'+B
              }else if(hours<=48 && hours<72){
                res.data[i].cTime = '前天' + B
              }else{
                res.data[i].cTime = res.data[i].cTime.substring(0, 10)
              }

            }
            //评论列表数据显示
            this.setData({ pjData: res.data, isHidden : 'dn'});
          }
        } else {
          // common.showToast("获取数据失败");
        }
        
      })
  },
  /**
   * 对评论点赞
   */
  dianzan: function (e) {
    
    let that = this;
    let id = e.currentTarget.dataset.id;
    let openid = common.user('openid');
    let data = { token: openid, id: id, pictureId: that.data.id }
    if (that.data.pjData.length >0){
      for (let i = 0; i < that.data.pjData.length;i++){
        if (that.data.pjData[i].id == id){
          let oldFlag = that.data.pjData[i].flag
          if (oldFlag == 1) {
            that.data.pjData[i].flag = 0
            that.data.pjData[i].cNum --
          }else{
            that.data.pjData[i].flag = 1
            that.data.pjData[i].cNum ++
          }
          that.setData({ pjData: that.data.pjData})
        }
      }
    }
    wxApi.wxGet("commentDianZan", data)
      .then(res => {
        //点赞成功
        if (res.statusCode == 201) {
          that.getPllb(that.data.id);
        } else {
          commn.showToast("点赞失败");
        }
      })
  },
  /**
  * 跳转发布评论页面
  */
  pingjia: function () {
    wx.navigateTo({
      url: '/pages/fbpj/fbpj?id=' + this.data.id,
    })
  },
  /**
   * 监听下拉刷新
   */
  onPullDownRefresh: function () {
    this.getPllb(this.data.id);
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 2000);
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
    
    this.getPllb(this.data.id);

  
    // this.

    // this.onLoad(this.data.id);
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

  }
})