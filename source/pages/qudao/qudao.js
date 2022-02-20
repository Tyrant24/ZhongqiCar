// pages/qudao/qudao.js
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
  FenxiaoApi
} from "../../apis/fenxiao.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      t0list: [],
      t1list: [],
      t: 0,
      t0keyword: "",
      t0listfilter: [],
      t0sortcharge: 0,
      t0sortrent: 0,
      t1keyword: "",
      t1listfilter: [],
      t1sortcharge: 0,
      t1sortrent: 0
    })
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "我的渠道",
    })
    var fenxiaoApi = new FenxiaoApi();
    fenxiaoApi.getkehu({
      isqudao: "Y"
    }, (list) => {
      this.Base.setMyData({
        t0list: list
      });
      this.t0reload();
    });
    fenxiaoApi.getqudao({
      isqudao: "Y"
    }, (list) => {
      this.Base.setMyData({
        t1list: list
      });
      this.t1reload();
    });
  }
  bindpaixu(e) {
    console.log("排序")
  }
  settab(e) {
    this.Base.setMyData({
      t: e.currentTarget.dataset.t
    })
  }
  inputt0keyword(e) {
    this.Base.setMyData({
      t0keyword: e.detail.value
    })
    this.t0reload();
  }
  t0reload() {
    var t0list = this.Base.getMyData().t0list;
    var t0keyword = this.Base.getMyData().t0keyword;
    var t0sortrent = this.Base.getMyData().t0sortrent;
    var t0sortcharge = this.Base.getMyData().t0sortcharge;
    var t0listfilter = t0list.filter((ret) => {
      return t0keyword == '' || ret.name.indexOf(t0keyword) > -1 || ret.nickName.indexOf(t0keyword) > -1;
    })
    if (t0sortrent > 0 || t0sortcharge > 0) {
      t0listfilter = t0listfilter.sort((a, b) => {
        if (t0sortcharge == 1) {
          return a.totalcharge - b.totalcharge;
        }
        if (t0sortcharge == 2) {
          return b.totalcharge - a.totalcharge;
        }
        if (t0sortrent == 1) {
          return a.totalorder - b.totalorder;
        }
        if (t0sortrent == 2) {
          return b.totalorder - a.totalorder;
        }
      });
    }
    this.Base.setMyData({
      t0listfilter
    });
  }
  changet0sortcharge() {

    var t0sortcharge = this.Base.getMyData().t0sortcharge;

    this.Base.setMyData({
      t0sortcharge: t0sortcharge != 1 ? 1 : 2,
      t0sortrent: 0
    });
    this.t0reload();

  }
  changet0sortrent() {

    var t0sortrent = this.Base.getMyData().t0sortrent;

    this.Base.setMyData({
      t0sortrent: t0sortrent != 1 ? 1 : 2,
      t0sortcharge: 0
    });
    this.t0reload();

  }


  inputt1keyword(e) {
    this.Base.setMyData({
      t1keyword: e.detail.value
    })
    this.t1reload();
  }
  t1reload() {
    var t1list = this.Base.getMyData().t1list;
    var t1keyword = this.Base.getMyData().t1keyword;
    var t1sortrent = this.Base.getMyData().t1sortrent;
    var t1sortcharge = this.Base.getMyData().t1sortcharge;
    var t1listfilter = t1list.filter((ret) => {
      return t1keyword == '' || ret.name.indexOf(t1keyword) > -1 || ret.nickName.indexOf(t1keyword) > -1;
    })
    if (t1sortrent > 0 || t1sortcharge > 0) {
      t1listfilter = t1listfilter.sort((a, b) => {
        if (t1sortcharge == 1) {
          return a.totalcharge - b.totalcharge;
        }
        if (t1sortcharge == 2) {
          return b.totalcharge - a.totalcharge;
        }
        if (t1sortrent == 1) {
          return a.totalorder - b.totalorder;
        }
        if (t1sortrent == 2) {
          return b.totalorder - a.totalorder;
        }
      });
    }
    this.Base.setMyData({
      t1listfilter
    });
  }
  changet1sortcharge() {

    var t1sortcharge = this.Base.getMyData().t1sortcharge;

    this.Base.setMyData({
      t1sortcharge: t1sortcharge != 1 ? 1 : 2,
      t1sortrent: 0
    });
    this.t1reload();

  }
  changet1sortrent() {

    var t1sortrent = this.Base.getMyData().t1sortrent;

    this.Base.setMyData({
      t1sortrent: t1sortrent != 1 ? 1 : 2,
      t1sortcharge: 0
    });
    this.t1reload();

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindpaixu = content.bindpaixu;
body.settab = content.settab;
body.inputt0keyword = content.inputt0keyword;
body.t0reload = content.t0reload;
body.changet0sortcharge = content.changet0sortcharge;
body.changet0sortrent = content.changet0sortrent;
body.inputt1keyword = content.inputt1keyword;
body.t1reload = content.t1reload;
body.changet1sortcharge = content.changet1sortcharge;
body.changet1sortrent = content.changet1sortrent;


Page(body)