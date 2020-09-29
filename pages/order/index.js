// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
      value: '全部',
      active: true,
      id:0
    },{
      value: '待付款',
      active: false,
      id:1
    },{
      value: '代发货',
      active: false,
      id:2
    },{
      value: '退款/退货',
      active: false,
      id:3
    }]
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
    //获取页面栈  最长为10
    const pages = getCurrentPages()
    const {type} = pages[pages.length-1]['options']
    //https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all   获取数据
    //动态修改tab选中状态
    this.changeActiveIndex(type-1)
  },
  changeTab(event){
    const {currentIndex} = event.detail
    this.changeActiveIndex(currentIndex)
  },
  changeActiveIndex(currentIndex){
    this.data.tabList.forEach((item,index)=>{
      item.active = index === currentIndex? true:false
    })
    this.setData({
      tabList:this.data.tabList
    })
  }
})