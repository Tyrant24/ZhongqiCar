// pages/xinwenlist/xinwenlist.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  CarApi
} from "../../apis/car.api.js"; 
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      showModalDlg: false
    })
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "总部新闻",
    })
    var carapi = new CarApi();
    carapi.xinwenlist({}, (list) => {
      this.Base.setMyData({
        list
      })
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.fangzu = content.fangzu;
body.close = content.close;

Page(body)