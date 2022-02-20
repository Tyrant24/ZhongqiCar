// pages/orderinfo/orderinfo.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CarApi } from "../../apis/car.api.js";
import {
  ApiUtil
} from "../../apis/apiutil.js";
import { WechatApi } from "../../apis/wechat.api.js";
import { MemberApi } from "../../apis/member.api";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    // options.id=1;
    super.onLoad(options);
    this.Base.setMyData({
       info:[],chaoshi:false,zhifu:'A'
    })
    this.orderDate();
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "订单详情",
    })
   
    var carapi=new CarApi();
    carapi.orderinfo({id:this.Base.options.id},(info)=>{
      info.weekone= ApiUtil.getweekday(info.quchedate);
      info.weektwo= ApiUtil.getweekday(info.huanche);
      info.quchedate=ApiUtil.zhuanhuan(info.quchedate);
      info.huanche=ApiUtil.zhuanhuan(info.huanche);
          this.Base.setMyData({info})
    })
  }

  onUnload() {
    var timerid = this.Base.getMyData().timerid;
    clearInterval(timerid);
  }


  quxiao(e){
    var that =this;
    var carapi = new CarApi();

    wx.showModal({
        title: '',
        content: '确认取消订单？',
        showCancel: true,
        confirmText: '确定',
        cancelText: '取消', 
        success: function(res) { 
          if (res.confirm) {
            carapi.updateorder({order_id:that.Base.options.id},(ret)=>{
              
                
              carapi.updatecarstatus({model_id:that.Base.getMyData().info.model_id,carstatus:'A'},(back)=>{
              
                that.Base.toast("取消成功");
                that.onMyShow();

              })
            
         })
            
          } 
        } 
      })

    
  }

  fukuan(){
    var that=this;
    var zhifu=this.Base.getMyData().zhifu;
    var memberapi=new MemberApi();
    var carapi=new CarApi();
    if (zhifu == 'A') {
      this.pay();
    } else {
      var id=this.Base.options.id;
      var info= this.Base.getMyData().info;
      var amount=parseInt(info.zujin)+parseInt(info.baoxian)+parseInt(info.qita);
      console.log(amount,'支付金额');

      
      wx.showModal({
        title: '',
        content: '确认付款？',
        showCancel: true,
        confirmText: '确定',
        cancelText: '取消',
        success: function (res) {
          if (res.confirm) {
 
            memberapi.walletinfo({}, (walletinfo) => {

              console.log(parseInt(walletinfo.balance), '钱包余额', parseInt(amount))

              // return;

              if (parseInt(walletinfo.balance) < parseInt(amount)) {
                that.Base.toast("余额不足，支付失败") 
              } else {
                memberapi.yuezhufu({
                  amount: amount
                }, (res) => {
                  if (res.code == 0) {
                    carapi.updateorder({
                      order_id: id,
                      type: 'A'
                    }, (order) => {
                      that.Base.toast("支付成功")
                      that.onMyShow();
                    })
                  }
                })
 
              }
            })
 
          } else {
            that.Base.toast("支付失败") 
          }
        }
      })
 
    }


  }

  pay(){
    var that =this;
    var wechatapi=new WechatApi(); 
    var id=this.Base.options.id;
   
    wechatapi.prepay({id:id},(payret)=>{
      console.log(payret,'支付回调');

      payret.complete = function (e) {
        if (e.errMsg == "requestPayment:ok") {
          
          that.Base.toast("支付成功") 

          that.onMyShow();
            
        }else{
          that.Base.toast("支付失败")
        }
      }
      wx.requestPayment(payret)
    })
 
  }

  
  orderDate(){   
     var carapi=new CarApi();
    carapi.orderinfo({id:this.Base.options.id},(info)=>{
      if(info.order_status=='A'){

        var ordertime=info.ordertime;
        ordertime=ordertime.replace(/-/g, '/');
        console.log(ordertime,'订单时间')
      var timerid = setInterval(() => {

        var times= ApiUtil.time_different(ordertime);
   
        // var shengyu =(new Date(ordertime).getTime+900000) - (new Date().getTime());
        var shengyu = (new Date(ordertime).getTime()+900000) - new Date().getTime();
        // this.Base.setMyData({shengyu:shengyu});

        console.log(shengyu,'多少');
        if(shengyu<=0){
          times= '订单超时';
          this.Base.setMyData({times,chaoshi:true}); 
          clearInterval(timerid);
        }else{
         times='请于'+times+'内支付完成';
         this.Base.setMyData({times,chaoshi:false})
        } 
       }, 1000);

       this.Base.setMyData({timerid});

      }
      

    })
       
  }

  zhifu(e) {
    this.Base.setMyData({
      zhifu: e.currentTarget.id
    })
  }

  guize(e) {
    this.Base.setMyData({
      showModalDlg: true
    })
    this.fadeInDlg();
  }
  close(e) {
    this.fadeOutDlg();
    this.Base.setMyData({
      showModalDlg: false
    })
  }
 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.pay = content.pay;
body.quxiao = content.quxiao;
body.orderDate = content.orderDate;

body.zhifu = content.zhifu;
body.fukuan = content.fukuan;
body.guize = content.guize;
body.close = content.close;

Page(body)