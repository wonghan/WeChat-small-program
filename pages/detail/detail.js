//detail.js

Page({
  data: {
    "count": 0,
    "length": 0,
    "map": [],
    "route": [],
    "day": [],
    "title": "",
    "city": "",
    "briefRoute": "",
    "buttonType": []
  },
  onLoad: function (data) {
    let map = data.map.split(',');
    let route = data.route.split(',');
    let len = route.length;
    let day=[];
    let buttonType=[];
    for(let i=0;i<len;i++){
      day.push(i+1)
      buttonType.push('default')
    }
    buttonType[0] ='primary';
    this.setData({
      map: map,
      length: len,
      route: route,
      day: day,
      buttonType: buttonType,
      title: data.title,
      city: data.city
    })
  },
  changeDay: function(e){
    let id = e.target.id-1;
    let buttonType = [];
    for (let i = 0; i < this.data.length; i++) {
      buttonType.push('default')
    }
    buttonType[id]='primary';
    this.setData({
      count: id,
      buttonType: buttonType
    })
  }
})