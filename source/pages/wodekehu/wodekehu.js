// pages/wodekehu/wodekehu.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  FenxiaoApi
} from "../../apis/fenxiao.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({
      t0list: [],
      t0keyword: "",
      t0listfilter: []
    })
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "我的客户",
    })
    var fenxiaoApi = new FenxiaoApi();
    fenxiaoApi.getkehu({
    }, (list) => {
      this.Base.setMyData({
        t0list: list
      });
      this.t0reload();
    });
  }

  inputt0keyword(e) {
    this.Base.setMyData({
      t0keyword: e.detail.value
    })
    this.t0reload();
  }
  t0reload() {
    var t0list = this.Base.getMyData().t0list;
    var t0keyword = this.Base.getMyData().t0keyword;
    var t0listfilter = t0list.filter((ret) => {
      return t0keyword == '' || ret.name.indexOf(t0keyword) > -1 || ret.nickName.indexOf(t0keyword) > -1;
    })
    
    this.Base.setMyData({
      t0listfilter
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.inputt0keyword = content.inputt0keyword;
body.t0reload = content.t0reload;
Page(body)