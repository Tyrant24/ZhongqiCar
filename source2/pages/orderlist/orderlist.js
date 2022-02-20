// pages/orderlist/orderlist.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CarApi } from "../../apis/car.api.js";
import { WechatApi } from "../../apis/wechat.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({checking:this.Base.options.checking,list:[]})
    
    this.check();
    // var carapi=new CarApi();
    //  carapi.orderlist({ },(list)=>{
    //   this.Base.setMyData({list})
    //  })
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: " ",
    })
 
  }
  bindcheck(e){
  
    this.Base.setMyData({
      checking:e.currentTarget.id
    })
 
    
    this.check();

  }

  check(e){
    var checking=this.Base.getMyData().checking;
    if(checking==0){
      var carapi=new CarApi();
      carapi.orderlist({},(list)=>{
        this.Base.setMyData({list})
       })
    }
    if(checking==1){
      this.orderlist('A');
    }
    if(checking==2){
      this.orderlist('B,C');
    }
    if(checking==3){
      this.orderlist('D');
    }
    if(checking==4){
      this.orderlist('E');
    }
  }

  orderlist(type){
    var carapi=new CarApi();
    carapi.orderlist({order_status:type},(list)=>{
      this.Base.setMyData({list})
     })
  }

  todetail(e){
    wx.navigateTo({
      url: '/pages/orderinfo/orderinfo?id='+e.currentTarget.id,
    })
  }

  jixuzuche(e){
    wx.navigateTo({
      url: '/pages/more/more',
    })
  }

  // pay(e){
  //   var id=e.currentTarget.id;
  //   wx.showModal({
  //     title: '',
  //     content: '确认付款？',
  //     showCancel: true,
  //     confirmText: '确定',
  //     cancelText: '取消',
  //     // cancelColor: '#EE2222', 
  //     // confirmColor: '#2699EC',
  //     success: function(res) { 
  //       if (res.confirm) { 
  //           carapi.updateorder({order_id:id},(order)=>{ 
  //             that.onMyShow();
  //           }) 
  //       } 
  //     }
 
  //   })
  // }

  pay(e){
    var that =this;
    var id=e.currentTarget.id;

    wx.navigateTo({
      url: '/pages/orderinfo/orderinfo?id='+id,
    })
    console.log(id);
   return;
    var wechatapi=new WechatApi(); 
    // var id=this.Base.options.id;
    console.log(id,'返回的ID')
    //  return;
    wechatapi.prepay({id:id},(payret)=>{
      console.log(payret,'支付回调');

      payret.complete = function (e) {
        if (e.errMsg == "requestPayment:ok") {
          
          that.Base.toast("支付成功") 

          that.orderlist('A');
            
        }else{
          that.Base.toast("支付失败")
        }
      }
      wx.requestPayment(payret)
    })
 
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcheck = content.bindcheck;
body.orderlist = content.orderlist;
body.todetail = content.todetail;
body.jixuzuche = content.jixuzuche;
body.pay = content.pay;
body.check = content.check;


Page(body)