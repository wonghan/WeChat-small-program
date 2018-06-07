//search.js
import utils from '../../utils/index'

Page({
  data: {
    dataArray: []
  },
  onLoad: function () {
    try {
      let value = wx.getStorageSync('history')
      if (value) {
        // Do something with return value
        //  提交，接收后台数据
        utils.getData(this, '', (res) => {
          if (res.data.objects.length === 0) {
            wx.showToast({
              title: '暂无足迹',
              icon: 'none',
              duration: 1000
            });
            this.setData({
              dataArray: res.data.objects
            });
          } else {
            this.setData({
              dataArray: res.data.objects
            });
            wx.showToast({
              title: '加载成功',
              icon: 'success',
              duration: 1000
            });

          }
        }, '', '', '', value)
      }else{
        wx.showToast({
          title: '暂无足迹',
          icon: 'none',
          duration: 1000
        });
      }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
  },
  tapClean: function(){
    try {
      wx.removeStorageSync('history')
      this.setData({
        dataArray: ''
      });
      wx.showToast({
        title: '清除成功',
        icon: 'none',
        duration: 1000
      });
    } catch (e) {
      // Do something when catch error
      console.log(e)
      wx.showToast({
        title: '清除失败',
        icon: 'none',
        duration: 1000
      });
    }
  },
  onShareAppMessage: function (res) {
    return {
      path: '/pages/index/index'
    }
  }
});