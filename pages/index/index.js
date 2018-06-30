Page({
  /**
   * 页面的初始数据
   */
  data: {
    starNum: [0, 1, 2, 3, 4],
    searchImg: "/images/public/cate-search@3x.png", //搜索放大镜图片
    serverFull: app.globalData.serverFull, //满星图片
    serverHalf: app.globalData.serverHalf, //半星图片
    serverNo: app.globalData.serverNo, //无星图片
    sfxs: true, //是否显示
    flag: false,
    address: '成都',
    shopData: [],
    search: "",
    ishow: 'db',
    noshow: 'dn',
    shouquan: 'db',
    proData: [{
      index: 0,
      img: '/images/public/icon-cate@3x.png',
      text: '美食',
      appid: '',
      path: ''
    },
    {
      index: 1,
      img: '/images/public/icon-punchCard@3x.png',
      text: '天天打卡',
      
      path: '/pages/index/index'
    },
    {
      index: 2,
      img: '/images/public/icon-luckyBag@3x.png',
      text: '共享福袋',
      appid: '',
      path: ''
    },
    {
      index: 3,
      img: '/images/public/icon-RobStamps@3x.png',
      text: '会员抢卷',
      appid: '',
      path: ''
    },
    {
      index: 4,
      img: '/images/public/icon-source@3x.png',
      text: '众愿',
      path: '/pages/show/show'
    },
    {
      index: 5,
      img: '/images/public/icon-punchCard@3x.png',
      text: '天天打卡',
      appid: '',
      path: ''
    },
    {
      index: 6,
      img: '/images/public/icon-punchCard@3x.png',
      text: '天天打卡',
      appid: '',
      path: ''
    },
    {
      index: 7,
      img: '/images/public/icon-punchCard@3x.png',
      text: '天天打卡',
      appid: '',
      path: ''
    },
    {
      index: 8,
      img: '/images/public/icon-punchCard@3x.png',
      text: '天天打卡',
      appid: '',
      path: ''
    },
    {
      index: 9,
      img: '/images/public/icon-punchCard@3x.png',
      text: '天天打卡',
      appid: '',
      path: ''
    },
    ],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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