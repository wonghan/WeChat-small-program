//app.js
App({
  onLaunch: function () {
    let that = this

    // 引入 BaaS SDK
    require('./utils/sdk-v1.3.0')


    let clientId = this.globalData.clientId

    wx.BaaS.init(clientId)
  },

  globalData: {
    clientId: '20a34091b2d4e40fa865', // 从 BaaS 后台获取 ClientID
    tableId: '35340', // 从 https://cloud.minapp.com/dashboard/ 管理后台的数据表中获取
  }
})