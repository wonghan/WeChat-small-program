//search.js
import utils from '../../utils/index'

Page({
  data: {
    inputVal: "",
    dataArray: [],
    locaArray: ['景点位置', '国内', '出境', '华南', '华东','亚洲','临海','临江','临湖'],
    locaIndex: 0,
    styleArray: ['旅游风格', '经典', '人文', '历史', '自然', '购物', '美食', '亲子', '游乐园', '城市观光','文艺青年','圣地巡礼'],
    styleIndex: 0,
    timeArray: ['旅行时间', '1日', '2日', '3日', '4日', '5日'],
    timeIndex: 0
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
    let key1 = this.data.inputVal !== '市' ? this.data.inputVal: '';
    let key2 = this.data.locaArray[this.data.locaIndex] !== '景点位置' ? this.data.locaArray[this.data.locaIndex] : '';
    let key3 = this.data.styleArray[this.data.styleIndex] !== '旅游风格' ? this.data.styleArray[this.data.styleIndex] : '';
    let key4 = this.data.timeArray[this.data.timeIndex] !== '旅行时间' ? +this.data.timeArray[this.data.timeIndex][0] : '';
    if (!key1 && !key2 && !key3 && !key4){
      // 没有关键字不能提交
      wx.showToast({
        title: '请输入关键字',
        icon: 'none',
        duration: 3000
      });
    }else{
      //  提交，接收后台数据
      utils.getData(this, key1, (res) => {
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
      },key2,key3,key4)
    }
  },
  // --搜索框相关函数-- end
  // --筛选相关函数
  locaPickerChange: function(e){
    this.setData({
      locaIndex: e.detail.value
    })
    if (e.detail.value!=='景点位置'){
      this.inputSubmit()
    }
  },
  stylePickerChange: function (e) {
    this.setData({
      styleIndex: e.detail.value
    })
    if (e.detail.value !== '旅游风格') {
      this.inputSubmit()
    }
  },
  timePickerChange: function (e) {
    this.setData({
      timeIndex: e.detail.value
    })
    if (e.detail.value !== '旅行时间') {
      this.inputSubmit()
    }
  },
});