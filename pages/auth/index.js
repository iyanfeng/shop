// pages/auth/index.js
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 获取到用户信息---取不到 支付只能企业appid才可以
  async handlegetUserInfo(event){
    try{
      const {encryptedData,rawData,iv,signature} = event.detail
      const loginRes = await utils.asyncLogin()
      const {code} = loginRes
      const params = {encryptedData,rawData,iv,signature,code}
      console.log(params)
      const resGettoken = await getRequest({
        url:'/users/wxlogin',
        data:params,
        method:'POST'
      })
      console.log(resGettoken)
    }catch(error){
      console.log(error)
    }
  }
})