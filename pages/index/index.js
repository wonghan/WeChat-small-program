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
      this.setData({
        isShowPosition: true
      })
      if (this.data.dataPosition.length===0){
        wx.showToast({
          title: '您当前城市暂无数据',
          icon: 'none',
          duration: 3000
        });
      }else{
        this.setData({
          dataArray: this.data.dataPosition
        })
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
          duration: 3000
        });
      })
  },
  getPositionDataFunction:function(){
    let self = this;
    //  提交，接收后台数据
    utils.getData(self, self.data.position,
      (res) => { // 成功的回调
        if (res.data.objects.length === 0) {
          // wx.showToast({
          //   title: '您当前城市暂无数据',
          //   icon: 'none',
          //   duration: 3000
          // });
        } else {
          self.setData({
            dataPosition: res.data.objects
          });
          // wx.showToast({
          //   title: '加载成功',
          //   icon: 'success',
          //   duration: 3000
          // });
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
    wx.showToast({
      title: '加载成功',
      icon: 'success',
      duration: 3000
    });
    wx.stopPullDownRefresh()
  },
  onLoad: function() {
    this.setData({
      dataArray: dataList.data
    })
    this.getPositionFunction()
  }
});