// pages/carinfo/carinfo.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CarApi } from "../../apis/car.api.js";
import { MemberApi } from "../../apis/member.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=3;
    super.onLoad(options);
    this.Base.setMyData({carindex:0,index:0})
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "车辆详情",
    })
    var carapi=new CarApi();
    carapi.carinfo({id:this.Base.options.id},(carinfo)=>{
          this.Base.setMyData({carinfo})
    })

    
   
    
  }
 
  tocheckdate(e){
    
    var model_id=this.Base.options.id; 
    var memberinfo=this.Base.getMyData().memberinfo;
 
    // if(memberinfo.register!='A'){
    //   wx.navigateTo({
    //   url: '/pages/register/register',
    //   })
    //   // return;
    // }else{
      wx.navigateTo({
        url: '/pages/xuanriqi/xuanriqi?model_id='+model_id,
      })
    // }

    
 
   }

   yanzheng(e){
     console.log("验证一下")
  //    var api=new MemberApi();
  //    api.selectziliao({}, (ret) => { 
  //     if(ret.idcard1 == ""){
  //          wx.navigateTo({
  //            url: '/pages/gerenziliao/gerenziliao',
  //          })
  //          return;
  //     }  
  // })
   }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.checktype=content.checktype;
body.checkcar=content.checkcar; 
body.tocheckdate=content.tocheckdate; 
body.yanzheng=content.yanzheng; 

Page(body)