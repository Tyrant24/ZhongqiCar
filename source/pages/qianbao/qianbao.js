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
      title: "钱包",
    })
    var that=this;
   

    var api=new MemberApi();
    api.walletinfo({ },(walletinfo)=>{
      this.Base.setMyData({walletinfo})
     })

     api.walletrecord({type:'A,E,ZF' },(balancerecord)=>{
      this.Base.setMyData({balancerecord})
     })

     api.walletrecord({type:'Y,TY' },(yajingrecord)=>{
      this.Base.setMyData({yajingrecord})
     })


     api.walletrecord({type:'B,BB' },(commissionrecord)=>{
      this.Base.setMyData({commissionrecord})
     })


     api.walletrecord({type:'C' },(rentrecord)=>{
      this.Base.setMyData({rentrecord})
     })

  }
  bindcheck(e){
    this.Base.setMyData({
      checking:e.currentTarget.id
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcheck = content.bindcheck;

Page(body)