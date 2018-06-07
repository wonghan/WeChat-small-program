let bmap = require('../utils/bmap-wx.min.js');

let getData = (ctx, key1, callback,key2,key3,key4,key5,key6) => {

  let tableId = getApp().globalData.tableId;
  let Data = new wx.BaaS.TableObject(tableId);
  let query1 = new wx.BaaS.Query();
  let query2 = new wx.BaaS.Query();
  let query3 = new wx.BaaS.Query();
  let query4 = new wx.BaaS.Query();
  let query5 = new wx.BaaS.Query();
  let query6 = new wx.BaaS.Query();
  if(key1){
    // 城市
    query1.contains('city', key1)
  }
  if (key2) {
    // 位置
    query2.in('loca', [key2]);
  }
  if (key3) {
    // 风格
    query3.in('style', [key3]);
  }
  if (key4) {
    // 时间
    query4.in('time', [key4]);
  }
  if (key5) {
    // 收藏
    query5.in('id', key5);
  }
  if (key6) {
    // 风格推荐
    console.log(key6)
    query6.in('style', [key6]);
  }
  let andQuery = wx.BaaS.Query.and(query1, query2, query3,query4,query5,query6)


  // 查询数据
  Data.setQuery(andQuery)
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
    wx.setStorage({
      key: "country",
      data: data.originalData.result.addressComponent.country
    })
    wx.setStorage({
      key: "province",
      data: data.originalData.result.addressComponent.province
    })
    wx.setStorage({
      key: "city",
      data: data.originalData.result.addressComponent.city
    })
    wx.setStorage({
      key: "description",
      data: data.originalData.result.sematic_description
    })
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