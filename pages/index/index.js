//index.js
import dataList from '../../mocks/data'
import utils from '../../utils/index'

Page({
  data: {
    position: '',
    isShowPosition: false,
    imgUrls: [
      { img: 'https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fGDmdHBSwtuerSD.jpg', city: '广州' },
      { img: 'https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fGDmdBBklNwwnxM.jpg', city: '上海' },
      { img: 'https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fGDmdMnoGefDkut.jpg', city: '杭州' },
      { img: 'https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fGDmdCnvpfOiLPp.jpg', city: '北京' }
    ],
    dataArray: [],
    dataPosition: []
  },
  navigateToSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  changeShow:function() {
    let self = this;
    if(!this.data.isShowPosition){

      if(this.data.position){
        if (this.data.dataPosition.length === 0) {
          wx.showToast({
            title: '您当前城市暂无数据',
            icon: 'none',
            duration: 1000
          });
        } else {
          this.setData({
            isShowPosition: true,
            dataArray: this.data.dataPosition
          })
        }
      }else{ // 若一开始用户点不同意获取地理位置，则重新获取当前地理位置
        let promise = new Promise(function(resolve,reject){ // 用Promise写异步调用
            // 获取地理位置，逆地址解析获取当前城市
          utils.getPosition((res) => {
            self.setData({
              position: res
            })
            resolve() // 获取当前城市数据
          },
            (res) => { // 失败的回调，报错
              wx.showToast({
                title: res,
                icon: 'none',
                duration: 1000
              });
              reject()
            })
        })
        promise.then(function () {
          //  提交，接收后台数据
          utils.getData(self, self.data.position,
            (res) => { // 成功的回调
              if (res.data.objects.length > 0) {
                self.setData({
                  dataPosition: res.data.objects,
                  isShowPosition: true,
                  dataArray: res.data.objects
                })
              }else{  //  若后台无数据
                wx.showToast({
                  title: '您当前城市暂无数据',
                  icon: 'none',
                  duration: 1000
                });
              }
            })
        }).catch(function(){console.log('语法错误')})
      }

    }else{
      this.setData({
        dataArray: dataList.data,
        isShowPosition: false
      })
    }
  },
  getPositionFunction:function(){
    let self = this;  // 获取地理位置，逆地址解析获取当前城市
    utils.getPosition((res) => {
      self.setData({
        position: res
      })
      self.getPositionDataFunction() // 获取当前城市数据
    },
      (res) => { // 失败的回调，报错
        wx.showToast({
          title: res,
          icon: 'none',
          duration: 1000
        });
      })
  },
  getPositionDataFunction:function(){
    let self = this;
    //  提交，接收后台数据
    utils.getData(self, self.data.position,
      (res) => { // 成功的回调
        if (res.data.objects.length > 0) {
          self.setData({
            dataPosition: res.data.objects
          })
        }
      })
  },
  onPullDownRefresh: function () {
    let self = this;
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 3000
    });
    try {
      let value = wx.getStorageSync('style')
      if (value) {
        // Do something with return value
        let len = value.length;
        let random = Math.floor(Math.random()*len)
        // 根据历史点击中随机选择一个风格标签推荐
        value = value[random]
        //  提交，接收后台数据
        utils.getData(this, '', (res) => {
          if (res.data.objects.length === 0) {
            this.setData({
              dataArray: dataList.data,
              isShowPosition: false
            })
          } else {
            this.setData({
              dataArray: res.data.objects,
              isShowPosition: false
            });
          }
        }, '', '', '','',value)
      }else{
        this.setData({
          dataArray: dataList.data,
          isShowPosition: false
        })
      }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
    wx.showToast({
      title: '加载成功',
      icon: 'success',
      duration: 1000
    });
    wx.stopPullDownRefresh()
  },
  onLoad: function() {
    this.setData({
      dataArray: dataList.data
    })
    // 设置当前位置
    this.getPositionFunction()
    // 微信用户登录小程序，获取用户ID
    wx.BaaS.login(false).then(res => {
      // 登录成功
      try {
        wx.setStorageSync('id', res.id)
        let MyUser = new wx.BaaS.User()
        let userID = res.id
        MyUser.get(userID).then(res => {
          // success
          wx.setStorageSync('star', res.data.star)
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
  onShareAppMessage: function (res) {
    return {
      path: '/pages/index/index'
    }
  }
});