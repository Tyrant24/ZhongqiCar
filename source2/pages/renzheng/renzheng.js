// pages/renzheng/renzheng.js
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
      idcard1: '',
      idcard2: '',
      jiazhao1: '',
      jiazhao2: '', 
    })

    var memberApi = new MemberApi();
    memberApi.selectziliao({}, (ret) => {
      console.log(ret, '返回值');
      if (ret.idcard1 != "") {
        this.Base.setMyData({ 
          status: 'A', 
          idcard1: ret.idcard1,
          idcard2: ret.idcard2,
          jiazhao1: ret.jiazhao1,
          jiazhao2: ret.jiazhao2,
          renzhengstatus:ret.renzhengstatus,
          renzhengstatus_name:ret.renzhengstatus_name
        })
      }

    })
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "个人资料",
    })
    
  }

 

  zhengmian() {
    var that = this;
    this.Base.uploadOneImage("member", (ret) => {
      that.Base.setMyData({
        idcard1: ret
      });
    }, undefined);
  }

  fanmian() {
    var that = this;
    this.Base.uploadOneImage("member", (ret) => {
      that.Base.setMyData({
        idcard2: ret
      });
    }, undefined);
  }

  bindjiazhao1() {
    var that = this;
    this.Base.uploadOneImage("member", (ret) => {
      that.Base.setMyData({
        jiazhao1: ret
      });
    }, undefined);
  }

  bindjiazhao2() {
    var that = this;
    this.Base.uploadOneImage("member", (ret) => {
      that.Base.setMyData({
        jiazhao2: ret
      });
    }, undefined);
  }

 

  submit(e) {
    var memberApi = new MemberApi();
     
    var idcard1 = this.Base.getMyData().idcard1;
    var idcard2 = this.Base.getMyData().idcard2;
    var jiazhao1 = this.Base.getMyData().jiazhao1;
    var jiazhao2 = this.Base.getMyData().jiazhao2;
     
    
    if (idcard1 == '') {
      this.Base.toast("请上传身份证正面照片");
      return;
    }
    if (idcard2 == '') {
      this.Base.toast("请上传身份证反面照片");
      return;
    }
    if (jiazhao1 == '') {
      this.Base.toast("请上传驾驶证主页照片");
      return;
    }
    if (jiazhao2 == '') {
      this.Base.toast("请上传驾驶证副页照片");
      return;
    }

    memberApi.renzheng({ 
      idcard1: idcard1,
      idcard2: idcard2,
      jiazhao1: jiazhao1,
      jiazhao2: jiazhao2 
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