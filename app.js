//app.js
import config from './utils/config.js'
import qcloud from './utils/wafer2-client-sdk/index.js'
import {showSuccess} from './utils/utils'

App({
  onLaunch: function () {
    let that = this

    let user = wx.getStorageSync('userinfo')
    if(!user){
      // 设置登录地址
      qcloud.setLoginUrl(config.loginUrl);
      // 获取用户信息
      qcloud.login({
          success: function (userInfo) {
              console.log('登录成功', userInfo)
              wx.setStorageSync('userinfo',userInfo)
              showSuccess('登陆成功')
          },
          fail: function (err) {
              console.log('登录失败', err)
          }
      });
    }


    // 引入 BaaS SDK
    require('./utils/sdk-v1.3.0')


    let clientId = this.globalData.clientId

    wx.BaaS.init(clientId)

    // 测试demo
    wx.request({
      url: config.host+'/weapp/demo', //仅为示例，并非真实的接口地址
      success: function (res) {
        console.log(res)
      }
    })

  },

  globalData: {
    clientId: '20a34091b2d4e40fa865', // 从 BaaS 后台获取 ClientID
    tableId: '35340', // 从 https://cloud.minapp.com/dashboard/ 管理后台的数据表中获取
  }
})