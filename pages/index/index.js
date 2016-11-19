//index.js
//获取应用实例
const util = require('../../utils/util.js');

Page({
  data: {
    isOk:false,
    hidden:true,
    list:[],
    top_list:[],
    scrollHeight:0,    
    scrollTop : 0,
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000
  },
  onLoad: function () {
    var that = this

    //请求数据
    util.Ajax("news/latest", function (res) {
      var data = res.data
      console.log(data)
      that.setData({
        isOk:true,
        list:data.stories,
        top_list:data.top_stories
      })
    })

    //设置页面高度
    wx.getSystemInfo({
      success:function(res){
        console.log(res)
          console.info(res.windowHeight);
          that.setData({
              scrollHeight:res.windowHeight
          });
      }
    });
  },

  //下拉刷新
  refresh:function(){
    var that = this
    this.setData({
      hidden:false
    })
    setTimeout(function(){
      console.log("到顶啦")
      that.setData({
      hidden:true
    })    
    },3000)
  },

  //上拉加载
  loadMore:function(){
    console.log('到底啦')
  }
})
