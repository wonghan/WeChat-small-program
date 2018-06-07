//user.js
Page({
  data: {
  },
  onLoad: function(){
    try {
      let country = wx.getStorageSync('country')
      let province = wx.getStorageSync('province')
      let city = wx.getStorageSync('city')
      let description = wx.getStorageSync('description')
      if (country) {
        // Do something with return value
        this.setData({
          country: country
        })
      }
      if (province) {
        // Do something with return value
        this.setData({
          province: province
        })
      }
      if (city) {
        // Do something with return value
        this.setData({
          city: city
        })
      }
      if (description) {
        // Do something with return value
        description = description.split(',')
        this.setData({
          description: description[0]
        })
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  onShareAppMessage: function (res) {
    return {
      path: '/pages/index/index'
    }
  }
});