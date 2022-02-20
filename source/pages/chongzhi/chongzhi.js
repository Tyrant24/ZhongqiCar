// pages/chongzhi/chongzhi.js
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
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "充值代理",
    })

    var instapi = new InstApi();
    instapi.memberlevel({}, (memberlevel) => {
      this.Base.setMyData({
        memberlevel
      })
    })
  }
  charge(e){
    var that=this;
    wx.showModal({
      content:"是否确定充值?",
      success:  (res)=> {
        if (res.cancel) {
           //点击取消,默认隐藏弹框
        } else {
           //点击确定
           console.log("charge",e);
          var memberlevel_id=e.currentTarget.dataset.id;
          var memberApi=new MemberApi();
          memberApi.charge({memberlevel_id},(payret)=>{
            payret.complete = function (e) {
              if (e.errMsg == "requestPayment:ok") {
                
                that.Base.toast("支付成功") 
      
                wx.reLaunch({
                  url: '/pages/chongzhichenggong/chongzhichenggong',
                 })
                  
              }else{
                that.Base.toast("支付失败")
              }
            }
            wx.requestPayment(payret)
          });
        }
     }
    })
    
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.charge = content.charge;
Page(body)