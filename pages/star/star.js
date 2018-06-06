//search.js
import utils from '../../utils/index'

Page({
  data: {
    dataArray: [],
    showOnce: false
  },
  onShow: function () {
    try {
      let value = wx.getStorageSync('star')
      if (value) {
        // Do something with return value
        //  提交，接收后台数据
        utils.getData(this, '', (res) => {
          if (res.data.objects.length === 0) {
            wx.showToast({
              title: '暂无收藏',
              icon: 'none',
              duration: 3000
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
                duration: 3000
              });
              this.setData({
                showOnce: true
              });
            }

          }
        }, '', '', '', value)
      }else{
        wx.showToast({
          title: '暂无收藏',
          icon: 'none',
          duration: 3000
        });
      }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
  }
});