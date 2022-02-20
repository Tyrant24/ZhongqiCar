import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      inputShowed: false,
      inputVal: ""
    });
  }
  onMyShow() {
    var that = this;

    this.Base.getAddress((address) => {
      console.log(address);
      // var region = [address.address_component.province, address.address_component.city, address.address_component.district];
      this.Base.setMyData({
        inputVal2:address.ad_info.district
      });
      this.search();
      
    });
  }

  showInput() {
    this.Base.setMyData({
      inputShowed: true
    });
  }
  hideInput() {
    this.Base.setMyData({
      inputVal: "",
      inputShowed: false, searchresult: []
    });
    this.search();
  }
  clearInput() {
    this.Base.setMyData({
      inputVal: "", searchresult: []
    });

    this.search();
  }
  inputTyping(e) {
    this.Base.setMyData({
      inputVal: e.detail.value
    });
    this.search();
  }
  search() {
    var that=this;
    var data = this.Base.getMyData();
    console.log(data);
    var inputVal = this.Base.getMyData().inputVal;
    if(inputVal==""){
        inputVal=this.Base.getMyData().inputVal2;
    }
    var routesearcharea = this.Base.getMyData().instinfo.routesearcharea;
    console.log(routesearcharea,'多少')
    if(routesearcharea==""||routesearcharea==undefined){
      routesearcharea="广东";
    }
    console.log(inputVal);
    QQMAP.getSuggestion({
      keyword: inputVal,
      region: routesearcharea,
      region_fix: 0,
      //policy:1,
      success: function (res) {
        console.log(res);

        var items = [];
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].type == 0) {
            items.push(res.data[i]);
          }
        }
        res.data = items;
        that.Base.setMyData({
          items: res.data
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });


  }
  searchKeyword(e) {
    var val = e.currentTarget.id;
    this.Base.setMyData({
      inputVal: val, inputShowed: true
    });
    this.search();
  }

  locationSelect(idx) {
    console.log("laasdasd");
    idx=idx.currentTarget.id;
    var items=this.Base.getMyData().items;
    var item=items[idx];
    console.log(item);
    
    this.jisuan(item);


    // 
  }

  jisuan(item){ 
    var that =this;
    var lat=item.location.lat;
    var lng=item.location.lng;
    var zhongdian=lat+','+lng;
    var qidian= this.Base.getMyData().instinfo.lat+','+this.Base.getMyData().instinfo.lng;
    console.log(zhongdian);
    // return;

    QQMAP.calculateDistance({
      model: 'driving',
      from: qidian,
      to: zhongdian,
      //policy:1,
      success: function (res) {
        console.log(res,'返回参数',res.result.rows[0].elements[0].distance);
        var distance=parseFloat(res.result.rows[0].elements[0].distance)/1000;
         distance=parseInt(distance.toFixed(0));

         item.distance=distance;
        // that.Base.setMyData({
        //   item
        // })

        that.dataReturn(item);
 
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });

  }


}

var QQMapWX = require('../../libs/qqmap/qqmap-wx-jssdk.js');
var QQMAP = new QQMapWX({
  key: 'IDVBZ-TSAKD-TXG43-H442I-74KVK-6LFF5'
});

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.showInput = content.showInput;
body.hideInput = content.hideInput;
body.clearInput = content.clearInput;
body.inputTyping = content.inputTyping;
body.search = content.search; 
body.searchKeyword = content.searchKeyword;
body.locationSelect = content.locationSelect;

body.jisuan = content.jisuan; 

Page(body)