//index.js
import utils from '../../utils/index'

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    imgUrls: [
      { img: '../../assets/1.jpg', word: '深圳三日游' },
      { img: '../../assets/2.jpg', word: '深圳五日游' },
      { img: '../../assets/3.jpg', word: '广州三日游' },
      { img: '../../assets/4.jpg', word: '广州五日游' }
    ],
    dataArray: [
      {
        "profile": "广州是粤食之乡，购物的天堂，文化交流之地，也是一座历史与现代感并存的南国城市。这条线路是根据景点的位置与热度来安排的，能叫你更好的了解这里。",
        "city": "广州市",
        "picture": "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUDAuZBUfMSa.png",
        "map": [
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUtdLYxVPsjy.png",
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUHUkhfjnisZ.png",
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUAhTZlmTSnO.png",
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUwlvNZzBvxn.png",
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUBehqqkRNBs.png"
        ],
        "route": [
          "石室圣心大教堂(1小时) → 沙面(3小时) → 陈家祠(1小时) → 上下九商业步行街(3小时)",
          "越秀公园(2小时) → 中山纪念堂(2小时) → 北京路步行街(3小时) → 珠江夜游(1小时)",
          "中山大学(2小时) → 红砖厂创意园(3小时) → 海心沙广场(1小时) → 广州塔(小蛮腰)(2小时)",
          "广州长隆野生动物世界(全天)",
          "白云山(3小时)"
        ],
        "title": "广州五日游",
        "id": "5aec87d1890a1f0bd9b38326",
        "briefRoute": "石室圣心大教堂-越秀公园-中山大学-长隆野生动物世界-白云山"
      },
      {
        "profile": "广州是粤食之乡，购物的天堂，文化交流之地，也是一座历史与现代感并存的南国城市。这条线路是根据景点的位置与热度来安排的，能叫你更好的了解这里。",
        "city": "广州市",
        "picture": "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUDAuZBUfMSa.png",
        "map": [
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUtdLYxVPsjy.png",
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUHUkhfjnisZ.png",
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUAhTZlmTSnO.png",
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUwlvNZzBvxn.png",
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUBehqqkRNBs.png"
        ],
        "route": [
          "石室圣心大教堂(1小时) → 沙面(3小时) → 陈家祠(1小时) → 上下九商业步行街(3小时)",
          "越秀公园(2小时) → 中山纪念堂(2小时) → 北京路步行街(3小时) → 珠江夜游(1小时)",
          "中山大学(2小时) → 红砖厂创意园(3小时) → 海心沙广场(1小时) → 广州塔(小蛮腰)(2小时)",
          "广州长隆野生动物世界(全天)",
          "白云山(3小时)"
        ],
        "title": "广州五日游",
        "id": "5aec87d1890a1f0bd9b38326",
        "briefRoute": "石室圣心大教堂-越秀公园-中山大学-长隆野生动物世界-白云山"
      },
      {
        "profile": "广州是粤食之乡，购物的天堂，文化交流之地，也是一座历史与现代感并存的南国城市。这条线路是根据景点的位置与热度来安排的，能叫你更好的了解这里。",
        "city": "广州市",
        "picture": "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUDAuZBUfMSa.png",
        "map": [
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUtdLYxVPsjy.png",
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUHUkhfjnisZ.png",
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUAhTZlmTSnO.png",
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUwlvNZzBvxn.png",
          "https://cloud-minapp-14474.cloud.ifanrusercontent.com/1fEdUUBehqqkRNBs.png"
        ],
        "route": [
          "石室圣心大教堂(1小时) → 沙面(3小时) → 陈家祠(1小时) → 上下九商业步行街(3小时)",
          "越秀公园(2小时) → 中山纪念堂(2小时) → 北京路步行街(3小时) → 珠江夜游(1小时)",
          "中山大学(2小时) → 红砖厂创意园(3小时) → 海心沙广场(1小时) → 广州塔(小蛮腰)(2小时)",
          "广州长隆野生动物世界(全天)",
          "白云山(3小时)"
        ],
        "title": "广州五日游",
        "id": "5aec87d1890a1f0bd9b38326",
        "briefRoute": "石室圣心大教堂-越秀公园-中山大学-长隆野生动物世界-白云山"
      }
    ]
  },
  // --搜索框相关函数-- start
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
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
    let key=e.detail.value;
    //  提交，接收后台数据
    utils.getData(this,key,(res)=>{
      if(res.data.objects.length===0){
        wx.showToast({
          title: '暂无数据',
          icon: 'none',
          duration: 3000
        });
      }else{
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
  // --搜索框相关函数-- end
});