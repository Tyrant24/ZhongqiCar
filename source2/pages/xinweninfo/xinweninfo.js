// pages/xinweninfo/xinweninfo.js
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
var WxParse = require('../../wxParse/wxParse');

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
    var instapi =new InstApi();
    instapi.jialiulan({id:this.Base.options.id,type:'A'},(ret)=>{
         console.log(ret);
    })
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "总部新闻",
    })
    var carapi = new CarApi();
    carapi.xinweninfo({id:this.Base.options.id}, (info) => {
      
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
body.fangzu = content.fangzu;
body.close = content.close;

Page(body)