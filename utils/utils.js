import config from './config'


// 回调转Promise
export function get(url) {
  return new Promise((resolve,reject)=>{
    wx.request({
      url:config.host+url,
      success:function(res){
        if(res.data.code===0){
          resolve(res.data.data)
        }else{
          reject(res.data)
        }
      }
    })
  })
}

// 用户登录成功的反馈
export function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}