// components/upImg/upImg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clearImg(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('clearImg', myEventDetail, myEventOption)
    }
  }
})
