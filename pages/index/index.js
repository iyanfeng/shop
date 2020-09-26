import {
    getRequest
} from '../../request/index.js'
// https://www.showdoc.com.cn/128719739414963   接口文档
Page({
    data: {
        swiperList: [],
        navData:[],
        floorData:[]
    },
    onLoad: function () {
        this.getSwiperData() 
        this.getNavData()
        this.getFloordata()
    },
    //获取轮播图数据
    getSwiperData () {
        getRequest({
            url: '/home/swiperdata'
        })
        .then(res => {
            this.setData({
                swiperList: res
            })
        })
    },
    //获取导航栏数据
    getNavData () {
        getRequest({
            url: '/home/catitems'
        })
        .then(res => {
            this.setData({
                navData: res
            })
        })
    },
    //获取楼层数据
    getFloordata() {
        getRequest({
            url: '/home/floordata'
        })
        .then(res => {
            this.setData({
                floorData: res
            })
        })
    }
})