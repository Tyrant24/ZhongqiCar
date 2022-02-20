// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import { CarApi } from "../../apis/car.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      type: 1,typenumber:1
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      })
    })

    var carapi = new CarApi();
    
    carapi.modellist({type:0,limit:4}, (miaosha) => {
      this.Base.setMyData({
        miaosha
      })
    })

    carapi.modellist({type:1,limit:4}, (fenshi) => {
      this.Base.setMyData({
        fenshi
      })
    })

    carapi.modellist({type:2,limit:4}, (paoche) => {
      this.Base.setMyData({
        paoche
      })
    })

    carapi.modellist({type:3,limit:4}, (jiaoche) => {
      this.Base.setMyData({
        jiaoche
      })
    })

    carapi.modellist({type:4,limit:4}, (suv) => {
      this.Base.setMyData({
        suv
      })
    })

    carapi.fenxiang({}, (fenxiang) => {
      this.Base.setMyData({
        fenxiang
      })
    })
  }

  checktype(e) {
    this.Base.setMyData({
      type: e.currentTarget.id,
      typenumber: e.currentTarget.id
    })
  }
  change(e) {
    console.log(e.detail.current);
    this.Base.setMyData({
      type: e.detail.current
    })
  }

  catchTouchMove(e) {
    return false;
  }

  lower(e) {
    console.log("到底了");
    // this.Base.toast("已经到底了~");
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.checktype = content.checktype;
body.change = content.change;
body.catchTouchMove = content.catchTouchMove;

body.lower = content.lower;

Page(body)