Page({
  data: {
    url: "https://youliao.163yun.com/h5/list/?appkey=e0d49d7b17c24b08b7db6b2268984e94&channelid=14838&secretkey=1161b7ba70694683a5c32761a83e46bf&s=semi&ctag=ca198cbfa41444a4b3e9881446a6dac4&ct=only"
  },
  onShareAppMessage: function (res) {
    return {
      path: '/pages/index/index'
    }
  }
});