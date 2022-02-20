// pages/dongtai/dongtai.js
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
   // options.member_id=1;
    super.onLoad(options);
    // this.Base.setMyData({dianzan:false})

     this.chadianzan();

  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "有趣分享",
    })
    
    
    var carapi=new CarApi();
    carapi.fenxianginfo({id:this.Base.options.id}, (info) => {
      this.Base.setMyData({
        info
      })
    })
  }

  chadianzan(e){
    var memberApi=new MemberApi();
    memberApi.selectdianzan({member_id:this.Base.options.member_id,fenxiang_id:this.Base.options.id},(ret)=>{
      console.log(ret,ret.code,'万恶之源');
       if(ret.code==0){
         console.log("走了里面吗",ret.return);
             this.Base.setMyData({dianzan:true,dianzanid:ret.return})
       } else{
            this.Base.setMyData({dianzan:false})
       }

       console.log(ret.result,'点赞数')
       this.Base.setMyData({number:ret.result})
    })
  }

  dianzan(e){
    var memberApi=new MemberApi();
     var dianzan=this.Base.getMyData().dianzan; 
     var dianzanid=this.Base.getMyData().dianzanid;

    //  console.log(dianzan,dianzanshu,dianzanid);
    //  return;
    if(dianzan==false){
       
      
      memberApi.dianzan({fenxiang_id:this.Base.options.id},(res)=>{
     var number= parseInt(this.Base.getMyData().number)+1;
      
      //  console.log(dianzanshu,'点赞之后的点赞数');
      this.Base.setMyData({dianzan:true,number});
          
         })
    }else{
      console.log("走哪个啊啊啊啊",this.Base.getMyData().dianzanid)
      memberApi.quxiaodianzan({id:this.Base.getMyData().dianzanid},(res)=>{ 
        var number= parseInt(this.Base.getMyData().number)-1;
        this.Base.setMyData({dianzan:false,number})
      })
    }
     
    // memberApi.selectdianzan({fenxiang_id:this.Base.options.id},(ret)=>{
       
    // })
   
  }

  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.dianzan = content.dianzan;
body.chadianzan = content.chadianzan;

Page(body)