Page({
  data: {
    url: "https://youliao.163yun.com/h5/list/?appkey=caf4091276ca42f796002285182f76bc&secretkey=130a6f954de44e29b8d6ecf236a44eb2&s=semi&ctag=adcac61e097840cc93aeed7c341dca90&ct=only"
  },
  onShareAppMessage: function (res) {
    return {
      path: '/pages/index/index'
    }
  }
});