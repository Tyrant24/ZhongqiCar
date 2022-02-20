// pages/yijian/yijian.js
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
    this.Base.setMyData({showModalDlg: false,lianxi:'',jianyi:''})
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "意见反馈",
    })
  }
  bindlianxi(e){
    this.Base.setMyData({
      lianxi:e.detail.value
    })
  }
  bindjianyi(e){
    this.Base.setMyData({
      jianyi:e.detail.value
    })
  }
  submit(e){
    var memberapi=new MemberApi();
    if(this.Base.getMyData().jianyi==''){
        this.Base.toast("请输入您的宝贵意见");
        return;
    }
    memberapi.fankui({
      lianxi:this.Base.getMyData().lianxi,
      jianyi:this.Base.getMyData().jianyi
    },(ret)=>{

      this.Base.toast("提交成功");
          this.Base.setMyData({
            lianxi:'',jianyi:''
          })
    })

  }
 
  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.submit = content.submit;

body.bindlianxi = content.bindlianxi;
body.bindjianyi = content.bindjianyi;

Page(body)