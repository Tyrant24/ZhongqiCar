// pages/mine/mine.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { FenxiaoApi } from "../../apis/fenxiao.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({showModalDlg: false})
    
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "我的",
    })
 
    //this.Base.setMyData({fenxiaosss:this.Base.options.fenxiao})
  
      var api=new MemberApi();
      api.walletinfo({ },(walletinfo)=>{
        this.Base.setMyData({walletinfo})
       })

       api.selectziliao({}, (ret) => {
        console.log(ret, '返回值');
         this.Base.setMyData({info:ret}) 
      })


      var fapi=new FenxiaoApi();
      fapi.info({ },(fenxiao)=>{
        fenxiao.kehu=parseInt(fenxiao.kehu);
        fenxiao.qudao=parseInt(fenxiao.qudao);
        fenxiao.allkehu=parseInt(fenxiao.allkehu);
        fenxiao.todaykehu=parseInt(fenxiao.todaykehu);
        fenxiao.todayqudao=parseInt(fenxiao.todayqudao);
        fenxiao.todayallkehu=parseInt(fenxiao.todayallkehu);
        this.Base.setMyData({fenxiao})
       })
  }
  fangzu(e){
    this.Base.setMyData({showModalDlg:true})
    this.fadeInDlg();
  }
  close(e){
    this.fadeOutDlg();
    this.Base.setMyData({showModalDlg:false})
  }
  onShareAppMessage(res){
    console.log(this.Base.getMyData().memberinfo.id)
    if (res.from === 'button') {
     console.log("来自页面内转发按钮");
     console.log(res.target);
    }
    return {
      title: '中旗名车',
      path: '/pages/mine/mine?fenxiao='+this.Base.getMyData().memberinfo.id,
    } 
   }

   yanzheng(e){
    console.log("验证一下")
    var api=new MemberApi();
    api.selectziliao({}, (ret) => { 
     if(ret.idcard1 == ""){
          wx.navigateTo({
            url: '/pages/gerenziliao/gerenziliao',
          })
          return;
     }  
   })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.fangzu = content.fangzu;
body.close = content.close;

body.yanzheng = content.yanzheng;
 
Page(body)
