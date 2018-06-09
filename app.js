//app.js

App({
  onLaunch: function () {
    let that = this

    // 引入 BaaS SDK
    require('./utils/sdk-v1.3.0')


    let clientId = this.globalData.clientId

    wx.BaaS.init(clientId)

    // 打开调试
    wx.setEnableDebug({
      enableDebug: true
    })

    // 微信用户登录小程序，获取用户ID
    wx.BaaS.login(false).then(res => {
      // 登录成功
      try {
        wx.setStorageSync('id', res.id)
        let MyUser = new wx.BaaS.User()
        let userID = res.id
        MyUser.get(userID).then(res => {
          // success
          // 缓存收藏
          let starArr = res.data.star;
          let starObj = {}
          for (let i = 0; i < starArr.length; i++) {
            starObj[starArr[i]] = true
          }
          wx.setStorage({
            key: "star",
            data: starObj
          })
        }, err => {
          // err
          console.log(res)
        })
      } catch (e) {
        console.log(e)
      }
    }, res => {
      // 登录失败
      console.log(res)
    })
  },
  onHide: function(){
    wx.removeStorage({
      key: 'isOnAccelerometer',
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  globalData: {
    clientId: '20a34091b2d4e40fa865', // 从 BaaS 后台获取 ClientID
    tableId: '35340', // 从 https://cloud.minapp.com/dashboard/ 管理后台的数据表中获取
  }
})