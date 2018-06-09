//search.js
import utils from '../../utils/index'

Page({
  data: {
    dataArray: [],
    showOnce: false
  },
  onShow: function () {
    try {
      let starObj = wx.getStorageSync('star')
      if (starObj) {
        let starArr = []
        for(let key in starObj){
          starArr.push(key)
        }
        //  提交，接收后台数据
        utils.getData(this, '', (res) => {
          if (res.data.objects.length === 0) {
            wx.showToast({
              title: '暂无收藏',
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
            if(!this.data.showOnce){
              wx.showToast({
                title: '加载成功',
                icon: 'success',
                duration: 1000
              });
              this.setData({
                showOnce: true
              });
            }

          }
        }, '', '', '', starArr)
      }else{
        wx.showToast({
          title: '暂无收藏',
          icon: 'none',
          duration: 1000
        });
      }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
  },
  onShareAppMessage: function (res) {
    return {
      path: '/pages/index/index'
    }
  }
});