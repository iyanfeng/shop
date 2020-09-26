import {
  getRequest
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenu: [],
    rightMenu: [],
    activeIndex: 0,
    scrollTop: 0
  },
  dataList: [], //页面保存所有的数据
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const storageData = wx.getStorageSync('categories')
    if (!storageData) {
      this.getCategoryData()
    } else {
      //判断时间是否过期
      if (storageData.time - Date.now < 1000 * 60 * 5) {
        //直接用缓存中的数据
        this.dataList = storageData.data
        const leftMenu = this.dataList.map((item) => {
          return item.cat_name
        })
        this.setData({
          leftMenu,
          rightMenu: this.dataList[0]['children']
        })
      } else {
        this.getCategoryData()
      }
    }
  },
  async getCategoryData() {
    const res = await getRequest({
      url: '/categories'
    })
    this.dataList = res
    //存数据
    wx.setStorage({
      key: "categories",
      data: {
        time: Date.now(),
        data: this.dataList
      }
    })
    const leftMenu = this.dataList.map((item) => {
      return item.cat_name
    })
    this.setData({
      leftMenu,
      rightMenu: this.dataList[0]['children']
    })
  },
  // 左侧菜单栏点击事件
  handleTapMenu(event) {
    const currenIndex = event.currentTarget.dataset.index
    console.log(event)
    const rightMenuData = this.dataList[currenIndex]['children']
    this.setData({
      activeIndex: currenIndex,
      rightMenu: rightMenuData,
      scrollTop: 0
    })
  }
})