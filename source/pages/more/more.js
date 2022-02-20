// pages/more/more.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CarApi } from "../../apis/car.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({carindex:0,index:0,scrollTops:0,rightCur: 0,list:[]})
  }
  onMyShow() {
    var that = this;
    var carapi=new CarApi();
    carapi.brandlist({},(brandlist)=>{
          this.Base.setMyData({list:brandlist})
    })
    wx.setNavigationBarTitle({
      title: "更多车辆",
    })
    
  }

  checktype(e){
    var index=e.currentTarget.id; 
    
    this.Base.setMyData({
      index:index,rightCur:index,scrollTops:(index-4)*50
    })
   }
   checkcar(e){
    var index=e.currentTarget.id; 
    var idx=e.currentTarget.dataset.idx;

    this.Base.setMyData({
      carindex:index
    })
   }

   scrollLink(e) {
    
    //  console.log("来了没");

    let list = this.Base.getMyData().list;
    let itemHeight = 0;
    for (let i = 0; i < list.length; i++) {
      //拿到每个元素
      let els = wx.createSelectorQuery().select("#scroll-" + i);
 
      els.fields({
        size: true
      }, function (res) { 

        list[i].top = itemHeight; // 节点顶部位置
        itemHeight += res.height;// 节点高度
        list[i].bottom = itemHeight;//节点底部位置
      }).exec()
    }
 
    this.Base.setMyData({
      list:list
    })
 
 
    let scrollTop = e.detail.scrollTop;     // 拿到滚动的高度
    for (let i = 0; i < list.length; i++) {
      console.log(list[i]);
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        this.Base.setMyData({
          index: i,
          scrollTops: (i - 4) * 50
        })
        return false
      }
    }

    }
 

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.checktype=content.checktype;
body.checkcar=content.checkcar;

body.scrollLink=content.scrollLink;

Page(body)