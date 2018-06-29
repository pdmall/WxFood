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

    var dsss = common.user('openid');
    if (dsss != '' && dsss != null) {
      that.getWishAll();
      that.flag = true;
      that.setData({
        flag: true
      })

    }



    //初始化页面，控制接口执行顺序，加载页面数据
    wxLogin().then(res => {
      common.showToast("页面加载中");
      common.storage('code', res.code);
    })

  },
  //获取规则
 
  /**
   * 获取众愿数据
   */
  getWishAll: function () {
    //获取众源数据
    let openid = common.user('openid');
    wxApi.wxGet("getWishAll", { token: openid })
      .then(res => {
        if (res.statusCode == 200) {
          this.setData({ data: res.data });
        } else {
          common.showToast("数据获取失败");
        }
      })
  },
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
   * 投票点赞
   */
  toupiao: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let typeid = e.currentTarget.dataset.typeid;
    let status = e.currentTarget.dataset.status;  //活动状态
    let voteType = e.currentTarget.dataset.voteType; //投票图片状态
    let openid = common.user('openid');

    if (status == 2) {
      common.showToast("活动已结束");
      return false;
    } else {
      if (voteType > 0) {
        common.showToast("你已投过票了");
        return false;
      } else {
        //投票
        let data = {
          token: openid,
          id: id,
          type_id: typeid,
        }
        wxApi.wxPost("addTouPiao", data)
          .then(res => {
            if (res.statusCode == 201) {
              common.showToast("投票成功！");
              //刷新页面数据
              that.getWishAll();
            }
            else if (res.statusCode == 202) {
              common.showToast("投票失败！");
            }
            else if (res.statusCode == 208) {
              common.showToast("你已经投过票了！");
            } else {
              common.showToast("网络错误");
            }
          })
      }
    }
  },
  /**
   * 监听下拉刷新
   */
  onPullDownRefresh: function () {
    this.getWishAll();
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
    
    this.getWishAll();

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