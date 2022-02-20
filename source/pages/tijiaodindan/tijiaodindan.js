// pages/tijiaodindan/tijiaodindan.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  CarApi
} from "../../apis/car.api.js";
import {
  ApiUtil
} from "../../apis/apiutil.js";
import {
  WechatApi
} from "../../apis/wechat.api.js";
import {
  MemberApi
} from "../../apis/member.api";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      
      address: '',
      qita:0,
      lat:'',
      lng:'',
      lianxiren: '',
      mobile: '',
      zhifu: 'A', 
      zongjine: 0
    })
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "确认订单",
    })

    this.Base.setMyData({type: 'A',
    bx: false,
    bx2: false,})

    var dizhi=this.Base.getMyData().data; 
  
    var carapi = new CarApi();
    carapi.carinfo({
      id: this.Base.options.model_id
    }, (info) => {
      // parseFloat(info.jichuyajin) + parseFloat(info.weizhangyajin)
      var zujin = (parseInt(info.price) * parseInt(this.Base.options.tianshu));
      var zhekou = zujin * this.Base.getMyData().memberinfo.memberlevel_rentrate / 100;
      var qita=this.Base.getMyData().qita;
      
      if(dizhi!=undefined){  
        var address=dizhi.address,
        lat=dizhi.location.lat,
        lng=dizhi.location.lng,
        distance=dizhi.distance;
        // console.log("走没走啊看看啊",address,lat,lng)
        
        qita=distance*parseInt(info.qita);
         this.Base.setMyData({address,lat,lng,distance,qita})
      }

      var zongjine = parseInt(zhekou.toFixed(2)) + qita;
  
      console.log(zongjine, "算一算总金额");

      info.firstdate = ApiUtil.zhuanhuan(this.Base.options.checkInDate),
      info.seconddate = ApiUtil.zhuanhuan(this.Base.options.checkOutDate),
      info.weekone = ApiUtil.getweekday(this.Base.options.checkInDate),
      info.weektwo = ApiUtil.getweekday(this.Base.options.checkOutDate),
      info.taketime = this.Base.options.taketime;
      info.stilltime = this.Base.options.stilltime;

      this.Base.setMyData({
        info,
        zujin: zhekou,
        tianshu: this.Base.options.tianshu,
        zongjine
      })

    })
  }

  bindcheck(e) {
    var zongjine = this.Base.getMyData().zongjine;
    if (e.currentTarget.id == 'A') {
      zongjine = zongjine + parseInt(this.Base.getMyData().qita);
    } else {
      zongjine = zongjine - parseInt(this.Base.getMyData().qita);
    }

    this.Base.setMyData({
      type: e.currentTarget.id,
      zongjine
    })
  }

  baoxian(e) {
    var bx = this.Base.getMyData().bx;

    var zongjine = this.Base.getMyData().zongjine;

    if (bx == false) {
      zongjine = zongjine + parseInt(this.Base.getMyData().info.baoxian) * this.Base.getMyData().tianshu;
    } else {
      zongjine = zongjine - parseInt(this.Base.getMyData().info.baoxian) * this.Base.getMyData().tianshu;
    }
    this.Base.setMyData({
      bx: !bx,
      zongjine: zongjine
    })
  }
  baoxian2(e) {
    var bx2 = this.Base.getMyData().bx2;
    this.Base.setMyData({
      bx2: !bx2
    })
  }
  zhifu(e) {
    this.Base.setMyData({
      zhifu: e.currentTarget.id
    })
  }
  // dizhi(e) {
  //   console.log(e);
  //   this.Base.setMyData({
  //     address: e.detail.value
  //   });
  // }
  lianxiren(e) {
    this.Base.setMyData({
      lianxiren: e.detail.value
    });
  }
  dianhua(e) {
    this.Base.setMyData({
      mobile: e.detail.value
    });
  }

  submit(e) {
    var that = this; 
    var memberapi = new MemberApi();
    memberapi.selectziliao({}, (ret) => { 
      // ||ret.renzhengstatus=='B'
        if(ret.idcard1 == ""||ret.renzhengstatus=='B'||ret.renzhengstatus=='C'){
          // this.Base.toast("身份未认证通过")
             wx.navigateTo({
               url: '/pages/renzheng/renzheng',
             })
             return;
        }   else{
 
    var carapi = new CarApi(); 
    var quchedate = this.Base.options.checkInDate;
    var huanche = this.Base.options.checkOutDate;
    var quchetime = this.Base.options.taketime;
    var huanchetime = this.Base.options.stilltime;
    var model_id = this.Base.options.model_id;
    var days = this.Base.options.tianshu;
    var lianxiren = this.Base.getMyData().lianxiren;
    // var mobile = this.Base.getMyData().mobile; 
    var lat = this.Base.getMyData().lat;
    var lng = this.Base.getMyData().lng;
    var jichuyajin = this.Base.getMyData().info.jichuyajin;
    var weizhangyajin = this.Base.getMyData().info.weizhangyajin;
    var baoxian = this.Base.getMyData().bx == true ? parseInt(this.Base.getMyData().info.baoxian) * this.Base.getMyData().tianshu : 0;
    var qita = this.Base.getMyData().type == 'A' ? this.Base.getMyData().qita : 0;
    var zujin = this.Base.getMyData().zujin;
    var memberinfo = this.Base.getMyData().memberinfo;

    // console.log(memberinfo.mobile,'用户电话');
    // return;
    var amount = this.Base.getMyData().zongjine; 
    var zhifu = this.Base.getMyData().zhifu;
    var quche = this.Base.getMyData().type;
    if(quche=='A'){
      var address = this.Base.getMyData().address;

      if (address == '') {
        this.Base.toast("请选择送货地址")
        return;
      }
    }else{
      var address = " ";
    }
    
    
    if (lianxiren == '') {
      this.Base.toast("请输入联系人")
      return;
    }
    // if (mobile == '') {
    //   this.Base.toast("请输入联系电话")
    //   return;
    // }


    if (this.Base.getMyData().bx2 == false) {
      this.Base.toast("请阅读并同意租赁合同")
      return;
    }

    carapi.creatorder({
      quchedate: quchedate,
      huanche: huanche,
      zujin: zujin,
      quchetime: quchetime,
      huanchetime: huanchetime,
      model_id: model_id,
      days: days,
      lat:lat,
      lng:lng,
      lianxiren: lianxiren,
      phone: memberinfo.mobile,
      address: address,
      jichuyajin: jichuyajin,
      weizhangyajin: weizhangyajin,
      baoxian: baoxian,
      quche: quche,
      amount: amount,
      qita: qita
    }, (ret) => {

      carapi.updatecarstatus({
        model_id: model_id,
        carstatus: 'B'
      }, (car) => {
 
        if (zhifu == 'A') {
          this.pay(ret.return);
        } else {

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
                    wx.reLaunch({
                      url: '/pages/orderinfo/orderinfo?checking=1&id=' + ret.return,
                    })
                  } else {
                    memberapi.yuezhufu({
                      amount: amount
                    }, (res) => {
                      if (res.code == 0) {
                        carapi.updateorder({
                          order_id: ret.return,
                          type: 'A'
                        }, (order) => {
                          wx.reLaunch({
                            url: '/pages/tijiaochengon/tijiaochengon',
                          })
                        })
                      }
                    })


                  }
                })



              } else {
                that.Base.toast("支付失败")
                wx.reLaunch({
                  url: '/pages/orderlist/orderlist?checking=1',
                })
              }
            }
          })



        }
 
      })
 
    })
  
        }
    })





  }

  pay(id) {
    var that = this;
    var wechatapi = new WechatApi();

    console.log(id, '返回的ID')
    //  return;
    wechatapi.prepay({
      id: id
    }, (payret) => {
      console.log(payret, '支付回调');

      payret.complete = function (e) {
        if (e.errMsg == "requestPayment:ok") {

          that.Base.toast("支付成功")

          wx.reLaunch({
            url: '/pages/tijiaochengon/tijiaochengon',
          })

        } else {
          that.Base.toast("支付失败")

          wx.reLaunch({
            url: '/pages/orderinfo/orderinfo?checking=1&id=' + id,
          })
        }
      }
      wx.requestPayment(payret)
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
body.bindcheck = content.bindcheck;
body.baoxian = content.baoxian;
body.baoxian2 = content.baoxian2;
body.zhifu = content.zhifu;

body.guize = content.guize;
body.close = content.close;

body.dizhi = content.dizhi;
body.lianxiren = content.lianxiren;
body.dianhua = content.dianhua;

body.submit = content.submit;

body.pay = content.pay;


Page(body)