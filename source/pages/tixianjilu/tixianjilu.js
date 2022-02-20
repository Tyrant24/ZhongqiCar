// pages/qianbao/qianbao.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({checking:0})



  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "提现记录",
    })

    var api=new MemberApi();

     api.walletrecord({type:'D' },(record)=>{
      this.Base.setMyData({record})
     })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

Page(body)