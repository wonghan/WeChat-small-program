Page({
  data: {
    url: "https://youliao.163yun.com/h5/list/?appkey=700976adeb7e42139fb56571c74a5031&secretkey=8c2be474acc54fd6b6be5e1f24a45059&s=semi&ctag=775fe309657c4ce49396796e01730fbe&ct=only"
  },
  onShareAppMessage: function (res) {
    return {
      path: '/pages/index/index'
    }
  }
});