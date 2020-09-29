// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
      value: '商品收藏',
      active: true,
      id:0
    },{
      value: '品牌收藏',
      active: false,
      id:1
    },{
      value: '店铺收藏',
      active: false,
      id:2
    },{
      value: '浏览足迹',
      active: false,
      id:3
    }],
    collect:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const collect = wx.getStorageSync('collect')
    this.setData({
      collect
    })
  },
  changeTab(event){
    const { currentIndex } = event.detail
    const tabList = this.data.tabList
    tabList.forEach((item,index)=>{
      item['active'] = index===currentIndex?true:false
    })
    this.setData({
      tabList
    })
  }
})