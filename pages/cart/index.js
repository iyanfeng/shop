// pages/cart/index.js
import { getRequest } from '../../request/index'
import utils from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期回调—页面显示/切入前台时触发
   */
  onShow: function(options){
    const _that = this
    try{
      wx.getStorage({
        key: 'address',
        success (res) {
          _that.setData({
            address: res.data
          })
        }
      })
    }catch(error){
      console.log(error)
    }
  },
  //获取用户地址
  async handleChooseAdress(){
    //先获取用户曾经的地址授权 权限状态
    try{
      const res = await utils.asyncGetSetting()
      const scopeAddress = res.authSetting['scope.address']   //是否授权通讯地址
      //true:曾经授权过，undefined：还没有授权过
      if (scopeAddress === false) {
        const resOpenSetting = await utils.asyncOpenSetting()
        console.log(resOpenSetting)
      }
      let resChooseAdress = await utils.asyncChooseAddress()
      console.log('asyncChooseAddress',resChooseAdress)
      this.storageAddress(resChooseAdress)
      }catch(error){
        console.log('报错了',error)
    }
  },
  storageAddress (resChooseAdress) {
    const totalAddress = resChooseAdress.provinceName+resChooseAdress.cityName+resChooseAdress.countyName+resChooseAdress.detailInfo
    resChooseAdress['totalAddress'] = totalAddress
    //存入缓存
    wx.setStorage({
      key:"address",
      data:resChooseAdress
    })
  }
})