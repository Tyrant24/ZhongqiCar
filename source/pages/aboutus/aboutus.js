// pages/aboutus/aboutus.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
var WxParse = require('../../wxParse/wxParse');


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "关于我们",
    })
    var instapi = new InstApi();
    instapi.aboutus({}, (info) => {
      
      info.content = this.Base.util.HtmlDecode(info.content);
      WxParse.wxParse('content', 'html', info.content, that, 10);
        this.Base.setMyData({info:info})

    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)