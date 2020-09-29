// pages/pay/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartArr: [],
    totalPrice: 0,
    tolalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
   /**
   * 生命周期回调—页面显示/切入前台时触发
   */
  onShow: function(){
    try {
      wx.getStorage({
        key: 'address',
        success:(res) => {
          this.setData({
            address: res.data
          })
        }
      })
    } catch (error) {
      console.log(error)
    }

    //获取缓存中的购物车数据
    const cartArr = wx.getStorageSync('cart')
    if (cartArr) {
      let checkedCart = cartArr.filter((item)=>{
        return item.checked
      })
      this.changeStatus(checkedCart)
    }
  },
  //动态修改allChecked，totalPrice，tolalNum的值
  changeStatus (cartArr) {
    let totalPrice = 0
    let tolalNum = 0
    cartArr.forEach((item) => {
      totalPrice += item.goods_price * item.num
      tolalNum += item.num
    })
    this.setData({
      cartArr,
      totalPrice,
      tolalNum
    })
  },
  handlePayment(){
    //判断缓存中有没有token值
    const token = wx.getStorageSync({
      key: 'token'
    })
    if (!token) {//没有则跳转到授权页面 获取
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return
    }
    console.log('获取到用户token')
  }
})