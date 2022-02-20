// pages/bangzhuzhongxin/bangzhuzhongxin.js
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
    this.Base.setMyData({checkid: 0})
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "帮助中心",
    })
    var instapi=new InstApi();
    instapi.bangzhulist({},(list)=>{
        this.Base.setMyData({list})
    })
  }
  bindshow(e){
    if(e.currentTarget.id==this.Base.getMyData().checkid){
      this.Base.setMyData({
        checkid:0
      })
    }else{
      this.Base.setMyData({
        checkid:e.currentTarget.id
      })
    }
   
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindshow = content.bindshow;
body.close = content.close;

Page(body)