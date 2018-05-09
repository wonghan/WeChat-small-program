//search.js
import utils from '../../utils/index'

Page({
  data: {
    inputVal: "",
    dataArray: []
  },
  onLoad: function (data) {
    let city = data.city;
    if(city){
      this.setData({
        inputVal:city
      })
      this.inputSubmit();
    }
  },
  // --搜索框相关函数-- start
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  inputSubmit: function (e) {
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 3000
    });
    let inputVal=this.data.inputVal;
    let key;
    if(inputVal==='市'){  // 防止只搜索'市'，返回所有数据的bug
      key = '';
    }else{
      key = inputVal;
    }
    if(!key){
      // 没有关键字不能提交
      wx.showToast({
        title: '请输入城市名',
        icon: 'none',
        duration: 3000
      });
    }else{
      //  提交，接收后台数据
      utils.getData(this, key, (res) => {
        if (res.data.objects.length === 0) {
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 3000
          });
        } else {
          this.setData({
            dataArray: res.data.objects
          });
          wx.showToast({
            title: '加载成功',
            icon: 'success',
            duration: 3000
          });
        }
      })
    }
  }
  // --搜索框相关函数-- end
});