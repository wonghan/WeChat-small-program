let bmap = require('../utils/bmap-wx.min.js');

let getData = (ctx, key, callback) => {

  let tableId = getApp().globalData.tableId;
  let Data = new wx.BaaS.TableObject(tableId);
  let query = new wx.BaaS.Query();

  query.contains('city', key)

  Data.setQuery(query)
    .find()
    .then(res => callback(res))
    .catch(err => console.dir(err))
}

let getPosition = (resolve,reject) => {
  // 新建百度地图对象 
  var BMap = new bmap.BMapWX({
    ak: 'zr6MF86QKrrBUqr4vCuRGzoZEvmok2hN'
  });
  var fail = function (data) {
    reject(data.errMsg)
  };
  var success = function (data) {
    resolve(data.originalData.result.addressComponent.city)
  }
  // 发起regeocoding检索请求 
  BMap.regeocoding({
    fail: fail,
    success: success
  });
}


module.exports = {
  getData,
  getPosition
}