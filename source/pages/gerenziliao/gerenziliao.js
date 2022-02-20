// pages/gerenziliao/gerenziliao.js
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
    this.Base.setMyData({
      headimg:'',
      name: '',
      mobile: '',
      address: ''
    })
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "个人资料",
    })
    var memberApi = new MemberApi();
    memberApi.selectziliao({}, (ret) => {
      console.log(ret, '返回值');
      if (ret.idcard1 != "") {
        this.Base.setMyData({
          name: ret.name,
          status: 'A',
          mobile: ret.mobile,
          address: ret.address,
          headimg:ret.headimg
        })
      }

    })
  }

  touxiang() {
    var that = this;
    this.Base.uploadOneImage("member", (ret) => {
      that.Base.setMyData({
        headimg: ret
      });
    }, undefined);
  }


  bindname(e) {
    this.Base.setMyData({
      name: e.detail.value
    })
  }

  bindmobile(e) {
    this.Base.setMyData({
      mobile: e.detail.value
    })
  }

  bindaddress(e) {
    this.Base.setMyData({
      address: e.detail.value
    })
  }

  submit(e) {
    var memberApi = new MemberApi();
    var name = this.Base.getMyData().name;
    var mobile = this.Base.getMyData().mobile;
    var headimg=this.Base.getMyData().headimg;
    var address = this.Base.getMyData().address;
     
    if (headimg == '') {
      this.Base.toast("请上传头像");
      return;
    }
    if (name == '') {
      this.Base.toast("请输入姓名");
      return;
    }
    if (mobile == ''||mobile=='undefined') {
      this.Base.toast("请输入手机号");
      return;
    }
    if (address == '') {
      this.Base.toast("请输入所在地");
      return;
    }
  

    memberApi.updateziliao({ 
      headimg:headimg, 
      name: name,
      mobile: mobile,
      address: address,
      status: 'A'
    }, (ret) => {
      console.log(ret);
      this.Base.toast("提交成功");
      wx.navigateBack({
        
      })
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.submit = content.submit;
body.bindname = content.bindname;
body.bindmobile = content.bindmobile;
body.bindaddress = content.bindaddress;


body.touxiang = content.touxiang;
body.zhengmian = content.zhengmian;
body.fanmian = content.fanmian;
body.bindjiazhao1 = content.bindjiazhao1;
body.bindjiazhao2 = content.bindjiazhao2;
Page(body)