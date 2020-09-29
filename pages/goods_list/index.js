// pages/goods_list/index.js
import { getRequest } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
      value: '综合',
      active: true,
      id:0
    },{
      value: '销量',
      active: false,
      id:1
    },{
      value: '价格',
      active: false,
      id:2
    }],
    goodsList:[],
    pageCid:'',
    pageQuery:'',
    totalPage:null
  },
  paramQuery:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.pageCid = options.cid||''
    this.data.pageQuery = options.query||''
    this.getTabList()
  },
  //获取页面数据
 async getTabList(){
   this.paramQuery.cid = this.data.pageCid
   this.paramQuery.pageQuery = this.data.pageQuery
   const res = await getRequest({
      url:'/goods/search',
      data:this.paramQuery
    })
    this.data.totalPage = Math.ceil(res.total / this.paramQuery.pagesize)
    const dataList = [...this.data.goodsList,...res.goods]
    this.setData({
      goodsList:dataList
    })
    //停止当前页面的下拉刷新
    wx.stopPullDownRefresh()
  },
  changeTab(e){
    const {currentIndex} = e.detail
    this.data.tabList.forEach((item,index)=>{
      item.active = index===currentIndex?true:false
    })
    let {tabList} = this.data
    this.setData({
      tabList
    })
  },
  //下拉刷新获取下一页数据
  onReachBottom(){
    //判断还有没有数据
    if (this.paramQuery.pagenum < this.data.totalPage) {
      this.paramQuery.pagenum++
      this.getTabList()

    }else{
      wx.showToast({
        title:'没有数据了'
      })
    }
  },
  //监听用户下拉刷新事件：刷新即是获取第一页数据，页面重新渲染
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.paramQuery.pagenum = 1
    this.getTabList()
  },
  methods: {
  }
})