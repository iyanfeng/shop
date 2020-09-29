
import utils from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartArr: [],
    totalPrice: 0,
    tolalNum: 0,
    allChecked: false
  },

  /**
   * 生命周期函数--监听页面加载--只触发一次
   */
  onLoad: function (options) {},
  /**
   * 生命周期回调—页面显示/切入前台时触发
   */
  onShow: function (options) {
    const _that = this
    try {
      wx.getStorage({
        key: 'address',
        success(res) {
          _that.setData({
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
      this.changeStatus(cartArr)
    }
  },
  //获取用户地址---todo 还没测试成功拒绝地址之后得
  async handleChooseAdress() {
    //先获取用户曾经的地址授权 权限状态
    try {
      const res = await utils.asyncGetSetting()
      const scopeAddress = res.authSetting['scope.address'] //是否授权通讯地址
      //true:曾经授权过，undefined：还没有授权过
      if (scopeAddress === false) {
        const resOpenSetting = await utils.asyncOpenSetting()
        console.log(resOpenSetting)
      }
      let resChooseAdress = await utils.asyncChooseAddress()
      console.log('asyncChooseAddress', resChooseAdress)
      this.storageAddress(resChooseAdress)
    } catch (error) {
      console.log('报错了', error)
    }
  },
  storageAddress(resChooseAdress) {
    const totalAddress = resChooseAdress.provinceName + resChooseAdress.cityName + resChooseAdress.countyName + resChooseAdress.detailInfo
    resChooseAdress['totalAddress'] = totalAddress
    //存入缓存
    wx.setStorage({
      key: "address",
      data: resChooseAdress
    })
  },
  //商品复选框改变选中状态--单选
  checkboxChange(event) {
    const goods_id = event.target.dataset.id
    const cartArr = wx.getStorageSync('cart')
    const index = cartArr.findIndex((item) => {
      return item.goods_id === goods_id
    })
    cartArr[index].checked = !cartArr[index].checked
    this.changeStatus(cartArr)
    //存入缓存
    wx.setStorage({
      key: "cart",
      data: cartArr
    })
  },
  //动态修改allChecked，totalPrice，tolalNum的值
  changeStatus (cartArr,allChecked=true) {
    let totalPrice = 0
    let tolalNum = 0
    cartArr.forEach((item) => {
      if (item.checked) {
        totalPrice += item.goods_price * item.num
        tolalNum += item.num
      } else { //有一个没有选中 则为false
        allChecked = false
      }
    })
    if (cartArr.length === 0){
      allChecked = false
    }
    this.setData({
      cartArr,
      totalPrice,
      tolalNum,
      allChecked
    })
  },
  //全选
  handleAllcheck(event){
    const allChecked = !this.data.allChecked
    const cartArr = wx.getStorageSync('cart')
    const newArrange =cartArr.map((item,index)=>{
      item.checked = allChecked
      return item
    })
    this.changeStatus(newArrange,allChecked)
    //存入缓存
    wx.setStorage({
      key: "cart",
      data: cartArr
    })
  },
  //点击加号和减号
  async handlenumer(event){
    const { opration, id } = event.target.dataset
    const {cartArr} = this.data
    const index = cartArr.findIndex((item)=>{
      return item.goods_id === id
    })
    let num = cartArr[index].num
    if (num === 1 && opration!= 1) {//  最后一个 再继续操作就是删除了
      const resShowModal = await utils.asyncshowModal({content:'您确定删除？'})
      if (resShowModal.confirm) {
        cartArr.splice(index,1)
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }else{
      cartArr[index].num += Number(opration)
    }
    this.changeStatus(cartArr)
    //存入缓存
    wx.setStorage({
      key: "cart",
      data: cartArr
    })
  },
  //结算功能
  handlePayment(){
    //地址--数量-跳转倒支付页面
    const {address} = this.data
    if(!address.userName){
      wx.showToast({
        title: '没有添加地址',
        icon: 'success'
      })
      return
    }
    const {tolalNum} = this.data
    if (!tolalNum){
      wx.showToast({
        title: '没有商品',
        icon: 'success'
      })
      return
    }

    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }
})