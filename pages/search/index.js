// pages/search/index.js
import { getRequest } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList:[],
    isHidden:true,
    inputValue:''
  },
  timer:null,
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
  //输入框值改变了 
  handleInput(e){
    const {value} = e.detail
    if (value.trim()) { //空格也转成true,因此要去掉空格
      this.setData({
        inputValue:value,
        isHidden:false
      })
      if (this.timer) clearInterval(this.timer)
      this.timer = setTimeout(() => {
        this.searchIng(value)
      }, 1000);
    }else{
      if (this.timer) clearInterval(this.timer)
      this.setData({
        isHidden:true,
        searchList :[],
        inputValue:''
      })
    }
  },
  async searchIng(value){
    const res = await getRequest({
      url:'/goods/qsearch',
      data:{
        query: value
      }
    })
    this.setData({
      searchList:res
    })
  },
  //处理取消
  handleCancle(){
    this.setData({
      isHidden:true,
      searchList:[],
      inputValue:''
    })
  }
})