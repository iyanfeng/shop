// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
      value: '体验问题',
      active: true,
      id:0
    },{
      value: '商品、商家投诉',
      active: false,
      id:1
    }],
    chooseImgs:[],//选中图片的数组
    textValue:''//文本域的值
  },
  inputTimer:null,
  uploadImgs:[],//上传后的图片路径
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
  changeTab(event){
    const {currentIndex} = event.detail
    this.data.tabList .forEach((item,index)=>{
      item.active = index===currentIndex?true:false
    })
    this.setData({
      tabList:this.data.tabList
    })
  },
  //选择本地图片
  chooseImg(){
    wx.chooseImage({
      count: 9,
      success: (res)=>{
        const { tempFilePaths } = res
        this.setData({
          chooseImgs: [...this.data.chooseImgs,...tempFilePaths]
        })
      },
      fail(error){
        console.log(error)
      }
    })
  },
  //删除图片
  clearImg(event){
    const {index} = event.currentTarget.dataset
    this.data.chooseImgs.splice(index,1)
    this.setData({
      chooseImgs:this.data.chooseImgs
    })
  },
  //文本域中值的变化
  handleInput(event){
    if (this.inputTimer) clearInterval(this.inputTimer)
    this.inputTimer =setTimeout(() => {
      this.setData({
        textValue:event.detail.value
      })
    }, 1000)
  },
  //提交反馈
  handleSubmit(){
    //校验文本域的合法性
    const {textValue,chooseImgs} = this.data
    if(!textValue.trim()){
      wx.showToast({
        title: '输入不合法',
        icon: 'success'
      })
    }else{
      //如果有图片 需要将图片上传到开发服务起，获取在线图片地址
      if (chooseImgs.length>0){
        chooseImgs.forEach((item,index)=>{//只能一张一张的上传
          wx.uploadFile({
            url: 'https://imags.ac.cn/Home/index/UploadAction/', //todo :  木有接口
            filePath: item,
            name: 'file',
            success (res){
              // const data = res.data
              console.log(res)
              //uploadImgs

            }
          })
        })
      }else{
        //直接上传文本到服务器---木有接口
        console.log('反馈成功')
        this.setData({
          textValue:''
        })
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }
})