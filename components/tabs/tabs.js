Component({
  // 组件的对外属性
  properties: {
    tabList: {
      type: Array,
      value:[]
    }
  },
  /**
   * 页面的初始数据:组件的内部数据
   */
  data: {
  },
  lifetimes: {
    ready() {
    }
  },
  methods: {
    changeTab(event){
      const currentIndex = event.currentTarget.dataset.index
      //触发父组件的事件
      this.triggerEvent('changeTab',{currentIndex})
    }
  }
})