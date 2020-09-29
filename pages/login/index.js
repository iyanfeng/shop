// pages/login/index.js
import utils from '../../utils/util'
import {getRequest} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  // 获取用户信息
  async handleGetUserInfo(event){
    try{
      const {userInfo} = event.detail
      wx.setStorageSync('userInfo',userInfo)
      const {encryptedData,rawData,iv,signature} = event.detail
      const loginRes = await utils.asyncLogin()
      const {code} = loginRes
      const params = {encryptedData,rawData,iv,signature,code}
      const resGettoken = await getRequest({
        url:'/users/wxlogin',
        data:params,
        method:'POST'
      })
      console.log(resGettoken)
      wx.navigateBack({
        delta: 1 // 返回个人中心
      })
    }catch(error){
      console.log(error)
    }
    
  }
})