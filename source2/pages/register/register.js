// pages/register/register.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { AliyunApi } from "../../apis/aliyun.api.js";
import { MemberApi } from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({showModalDlg: false,verifycode:'',mobile:'',send:true,seconds:"",max_seconds:59})
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "登录",
    })
  }
  bindmobile(e){
    this.Base.setMyData({
      mobile:e.detail.value
    })
  }
  bindyanzhengma(e){
    this.Base.setMyData({
      verifycode:e.detail.value
    })
  }

  sendverifycode(e){
    if(this.Base.getMyData().mobile==""){
      this.Base.toast("请输入您的手机号");
      return;
    }
    var aliyunapi=new AliyunApi();
    aliyunapi.sendverifycode({mobile:this.Base.getMyData().mobile,type:'register'},(ret)=>{
         if(ret.code==0){
            this.Base.toast("验证码发送成功,请注意查收!");
            this.dongtai();
         }else{
            this.Base.toast("验证码发送失败,请重试!");
         }
    })
  }

  dongtai(){
    var that=this;
    // 获取总秒数
    var seconds=this.data.max_seconds;
    this.setData({
      // 显示倒计时
      send:false,
      // 设置秒数
      seconds:seconds,
    })
    // 设置定时器
    var t=setInterval(function(){
      // 如果秒数小于0
      if(seconds<=0){
        // 停止定时器
        clearInterval(t);
        that.setData({
          // 显示发送按钮
          send:true,
        })
        // 停止执行
        return;
      }
      // 秒数减一
      seconds--;
      that.setData({
        // 更新当前秒数
        seconds:seconds,
      })
    },1000)
  }


  submit(e){
    var memberapi= new MemberApi();
    var aliyunapi=new AliyunApi();
    aliyunapi.verifycode({mobile:this.Base.getMyData().mobile,verifycode:this.Base.getMyData().verifycode,type:'register'},(ret)=>{
         if(ret.code==1){
           this.Base.toast("验证码错误,请重新输入");
           return;
         }else{
          memberapi.updateregister({},(res)=>{
           console.log(res);
           wx.navigateBack({
           
           })
          }) 
         } 
        }) 
  }
  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.submit = content.submit;

body.bindmobile = content.bindmobile;
body.bindyanzhengma = content.bindyanzhengma;

body.dongtai = content.dongtai;
body.sendverifycode = content.sendverifycode;


Page(body)