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

module.exports = {
  getData
}