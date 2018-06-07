//detail.js

Page({
  data: {
    "count": 0,
    "length": 0,
    "map": [],
    "route": [],
    "day": [],
    "title": "",
    "city": "",
    "briefRoute": "",
    "buttonType": [],
    "isStar": false,
    "starUrl": "/mocks/img/star.png",
    "id":''
  },
  onLoad: function (data) {
    let self = this
    let map = data.map.split(',');
    let route = data.route.split(',');
    let id = data.id;
    let len = route.length;
    let day=[];
    let buttonType=[];
    for(let i=0;i<len;i++){
      day.push(i+1)
      buttonType.push('default')
    }
    buttonType[0] ='primary';
    this.setData({
      map: map,
      length: len,
      route: route,
      day: day,
      buttonType: buttonType,
      title: data.title,
      city: data.city,
      id: id,
      picture: data.picture
    })
    // 风格标签缓存
    let style = data.style.split(',')
    wx.setStorage({
      key: "style",
      data: style
    })
    try {
      // 足迹
      let history = wx.getStorageSync('history')
      if (history) {
        // Do something with return value
        history.push(id)
        wx.setStorage({
          key: "history",
          data: history
        })
      } else {
        wx.setStorage({
          key: "history",
          data: [id]
        })
      }
      // 收藏按钮
      let value = wx.getStorageSync('star')
      if (value) {
        // Do something with return value
        for (let i = 0; i < value.length; i++) {
          if (value[i] === this.data.id) {
            self.setData({
              isStar: true,
              starUrl: "/mocks/img/star-active.png"
            })
            return
          }
        }
      }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
  },
  changeDay: function(e){
    let id = e.target.id-1;
    let buttonType = [];
    for (let i = 0; i < this.data.length; i++) {
      buttonType.push('default')
    }
    buttonType[id]='primary';
    this.setData({
      count: id,
      buttonType: buttonType
    })
  },
  // 切换收藏状态
  changeStar: function(e){
    // 若已收藏
    if(this.data.isStar){
      let MyUser = new wx.BaaS.User()
      let currentUser = MyUser.getCurrentUserWithoutData()
      // age 为自定义字段
      currentUser.remove('star', this.data.id).update().then(res => {
        // success
        wx.setStorage({
          key: "star",
          data: res.data.star
        })
        this.setData({
          isStar: false,
          starUrl: "/mocks/img/star.png"
        })
      }, err => {
        // err
        console.log(res)
      })
 
    // 若未收藏
    }else{
      let MyUser = new wx.BaaS.User()
      let currentUser = MyUser.getCurrentUserWithoutData()
      // age 为自定义字段
      currentUser.append('star', this.data.id).update().then(res => {
        wx.setStorage({
          key: "star",
          data: res.data.star
        })
        // success
        this.setData({
          isStar: true,
          starUrl: "/mocks/img/star-active.png"
        })
      }, err => {
        // err
        console.log(res)
      })
    }
  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.title,
      imageUrl: this.data.picture ? this.data.picture : '',
      path: `/pages/detail/detail?map=${this.data.map}&route=${this.data.route}&title=${this.data.title}&city=${this.data.city}&id=${this.data.id}&style=${this.data.style}&picture=${this.data.picture}`
    }
  }
})