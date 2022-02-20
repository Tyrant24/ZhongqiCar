// pages/tixian/tixian.js
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
  MemberApi
} from "../../apis/member.api.js";

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
      title: "提现",
    })

    var api = new MemberApi();
    api.walletinfo({}, (walletinfo) => {
      this.Base.setMyData({
        walletinfo
      })
    })
  }
  withdrawall() {
    this.Base.setMyData({
      amount: this.Base.getMyData().walletinfo.canwithdraw
    })
  }
  inputamount(e) {
    if (e.detail.value == "") {
      this.Base.setMyData({
        amount: ""
      })
      return;
    }
    var amount = parseInt(e.detail.value);
    console.log("inputamount", amount);
    var canwithdraw = parseInt(this.Base.getMyData().walletinfo.canwithdraw);
    if (isNaN(amount)) {
      this.Base.setMyData({
        amount: 0
      })
    } else {
      if (amount <= 0) {
        this.Base.setMyData({
          amount: 0
        })
      } else {
        if (amount > canwithdraw) {
          this.Base.setMyData({
            amount: canwithdraw
          })
          wx.showToast({
            title: '您输入的金额超过可提现金额',
          })
        } else {
          this.Base.setMyData({
            amount: amount
          })
        }
      }
    }
  }
  withdraw() {
    var amount = parseInt(this.Base.getMyData().amount);
    var canwithdraw = parseInt(this.Base.getMyData().walletinfo.canwithdraw);
    if (isNaN(amount)) {
      amount = 0;
    } else {
      if (amount <= 0) {
        amount = 0;
      } else {
        if (amount > canwithdraw) {
          amount = canwithdraw;
        }
      }
    }

    wx.showModal({
        content: "是否确定提现?",
        success: (res) => {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            var api = new MemberApi();
            api.withdraw({
              amount
            }, (ret) => {
              if (ret.code == 0) {
                wx.reLaunch({
                  url: '/pages/tixianchenggong/tixianchenggong',
                })
              } else {
                wx.showModal({
                  content: ret.return,
                  showCancel: false
                })
              }
            });

          }
        }
        });
    }
  }
  var content = new Content();
  var body = content.generateBodyJson();
  body.onLoad = content.onLoad;
  body.onMyShow = content.onMyShow;
  body.withdrawall = content.withdrawall;
  body.inputamount = content.inputamount;
  body.withdraw = content.withdraw;
  Page(body)