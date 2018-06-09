//detail.js
Page({
  data:{
    id:'',
    title:'',
    style:'',
    picture:'',
    url:'',
    starImg: '/mocks/img/star.png',
    starActiveImg: '/mocks/img/star-active.png'
  },
  onLoad: function(data){
    let self = this
    // 设置参数id
    self.setData({
      title: data.title,
      id: data.id,
      style: data.style,
      picture: data.picture,
      amap: data.amap
    })
    // 风格标签缓存
    let style = data.style.split(',')
    wx.setStorage({
      key: "style",
      data: style
    })
    // 添加足迹
    try {
      let history = wx.getStorageSync('history')
      if (history) {
        // Do something with return value
        history.push(data.id)
        wx.setStorage({
          key: "history",
          data: history
        })
        // 缓存当前路线id
        wx.setStorage({
          key: "routeId",
          data: data.id
        })
      } else {
        wx.setStorage({
          key: "history",
          data: [data.id]
        })
      }
    } catch (e) {
      console.log(e)
    }
    // 摇一摇收藏，监听加速计
    console.log('load')
    wx.showToast({
      title: '摇一摇收藏',
      icon: 'none',
      duration: 2000
    })
    let isOnAccelerometer = wx.getStorageSync('isOnAccelerometer')
    if (isOnAccelerometer) {
      wx.startAccelerometer({
        success: function () {
          console.log('startAccelerometer success')
        },
        fail: function () {
          console.log('startAccelerometer fail')
        }
      })
    } else {
      wx.setStorageSync('isOnAccelerometer', true)
      let last = Date.now()
      // !wx.onAccelerometerChange(),与changeStar()、this.data.id和this.data.isStar形成闭包,因此changeStar()得使用缓存的变量（全局变量）
      wx.onAccelerometerChange(function (res) {
        let now = Date.now()
        if (now - last > 800) {
          if (res.x > 1.8 || res.y > 1.8 || res.z > 1.8) {
            last = now
            self.changeStar()
            wx.vibrateLong()
          }
        }
      })
    }

  },
  // 切换收藏状态
  changeStar: function(){
    let self = this
    // 获取当前路线id
    try {
      let routeId = wx.getStorageSync('routeId')
      let starObj = wx.getStorageSync('star')
        if (routeId) {
          // 若已收藏
          if (starObj[routeId]) {
            let MyUser = new wx.BaaS.User()
            let currentUser = MyUser.getCurrentUserWithoutData()
            // 取消收藏
            currentUser.remove('star', routeId).update().then(res => {
              // success
              // 修改收藏缓存
              delete(starObj[routeId])
              wx.setStorage({
                key: "star",
                data: starObj
              })
              wx.showToast({
                title: '取消收藏',
                icon: 'none',
                image: this.data.starImg,
                duration: 1000
              })
            }, err => {
              // err
              console.log(res)
              wx.showToast({
                title: '操作失败',
                icon: 'none',
                duration: 1000
              })
            })
            // 若未收藏
          } else {
            let MyUser = new wx.BaaS.User()
            let currentUser = MyUser.getCurrentUserWithoutData()
            // 添加收藏
            currentUser.append('star', routeId).update().then(res => {
              // success
              // 修改收藏缓存
              starObj[routeId] = true
              wx.setStorage({
                key: "star",
                data: starObj
              })
              wx.showToast({
                title: '收藏成功',
                icon: 'none',
                image: this.data.starActiveImg,
                duration: 1000
              })
            }, err => {
              // err
              console.log(res)
              wx.showToast({
                title: '操作失败',
                icon: 'none',
                duration: 1000
              })
            })
          }
        }
    } catch (e) {
      console.log(e)
    }

  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.title,
      imageUrl: this.data.picture ? this.data.picture : '',
      path: `/pages/detail/detail?title=${this.data.title}&id=${this.data.id}&style=${this.data.style}&picture=${this.data.picture}&amap=${this.data.amap}`
    }
  },
  onUnload: function(){
    // 退出页面，暂停监听加速计
    wx.stopAccelerometer()
  }
})