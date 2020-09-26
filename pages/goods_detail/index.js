// pages/goods_detail/index.js
import { getRequest } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: {},
    goods_id:null
  },
  goodInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.goods_id = options.goods_id
    this.getDetailData()
  },
  //获取页面数据
  async getDetailData () {
    const res = await getRequest({
      url: "/goods/detail",
      data: {
        goods_id: this.data.goods_id
      }
    })
    this.setData({
      dataObj: {
        goods_id:this.data.goods_id,
        goods_name: res.goods_name,
        goods_price:res.goods_price,
        goods_introduce:res.goods_introduce,
        pics:res.pics
      }
    })
    this.goodInfo = this.data.dataObj
  },
  //点击预览图片
  handlePreviewImg(event){
    const urls = this.data.dataObj.pics.map((item)=>{
      return item.pics_mid
    })
    wx.previewImage({
      current: event.currentTarget.dataset.url, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  //加入购物车
  handleTocar(){
    let cart = wx.getStorageSync('cart') || [] //本地缓存点击的
    const index = cart.findIndex((value)=>{
        return value.goods_id === this.data.goods_id
    })
    if (index === -1) {//不存在
      this.goodInfo['num'] = 1 //添加点击次数
      cart.push(this.goodInfo)
    }else{
      cart[index]['num']++
    }
    wx.setStorage({
      key:"cart",
      data:cart
    })
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true
    })
  }
})