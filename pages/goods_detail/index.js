// pages/goods_detail/index.js
import { getRequest } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: {},
    goods_id:null,
    isCollect: false,
    collectArr:[]
  },
  goodInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.goods_id = options.goods_id
    this.getDetailData()
    console.log('onLoad',options)
  },
  onShow: function(){
    const pages = getCurrentPages()
    const {goods_id} = pages[pages.length-1]['options']
    const collected = wx.getStorageSync('collect')||[]
    if (collected.length>0) {
      const isCollect = collected.some((item,index)=>{
        return item.goods_id === goods_id
      })
      this.setData({
        isCollect
      })
    }
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
        pics:res.pics,
        goods_small_logo:res.goods_small_logo
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
      this.goodInfo['checked'] = true //商品是否选中，购物车页面用到
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
  },
  //点击收藏
  handleCollect(){
    let isCollect = !this.data.isCollect
    this.setData({
      isCollect
    })
    //存入缓存
    const collected = wx.getStorageSync('collect')||[]
    if (isCollect) { //关注
      this.goodInfo['isCollect'] = isCollect
      collected.push(this.goodInfo)
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      })
    }else{ //取关
      const index =  collected.findIndex((item,index)=>{
        return item.goods_id === this.data.goods_id
      })
      collected.splice(index,1)
      wx.showToast({
        title: '取消成功',
        icon: 'success'
      })
    }
    wx.setStorageSync('collect', collected )
  }
})