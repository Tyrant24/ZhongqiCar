// pages/xuanriqi/xuanriqi.js
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

var Moment = require("../../utils/moment.js");
// import { Moment } from "../../utils/moment.js";

let DATE_YEAR = new Date().getFullYear();
let DATE_MONTH = new Date().getMonth() + 1;
let DATE_DAY = new Date().getDate();

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    //options.order_id=10;
    
    super.onLoad(options);
 
    var carapi = new CarApi();
 
    carapi.orderinfo({id:this.Base.options.order_id},(order)=>{ 
      console.log("给我出来啊啊啊111");
     this.Base.setMyData({order})
  })

  setTimeout(()=>{ 
    this.createDateListData(); 
  },1000)

     

    carapi.timelist({
      orderby: 'r_main.seq'
    }, (timelist) => {



      carapi.carinfo({id:this.Base.options.model_id},(carinfo)=>{ 

 
        var checkInDate = this.data.checkInDate; 
        
        var shichang=carinfo.shichang; 
        var checktime=checkInDate+' '+this.Base.getMyData().timelist[0].name; 
         var date=new Date(checktime).getTime()+ shichang*3600000; 
         var huanchetime=ApiUtil.FormatTime(date); 
        if(carinfo.type==1){ 
          for(var i=0;i<timelist.length;i++){ 
            if(huanchetime==timelist[i].name){ 
                this.Base.setMyData({
                  valuelist:[0,i],
                  stilltime:timelist[i].name
                })
            }
         }
         this.setData({
          taketime: this.Base.getMyData().timelist[0].name
        })
     
        }
   
        this.Base.setMyData({carinfo})
      })


      this.Base.setMyData({
        timelist,  
        taketime: timelist[0].name,
        stilltime: timelist[0].name,
      })
    })
 
    
    this.setData({
      maxMonth: 7, //最多渲染月数
      dateList: [],
      tianshu: 0,
      systemInfo: {},
      taketime: "",
      stilltime: "",
      firstdate: '',
      seconddate: '',
      weekone: '',
      weektwo: '',
      weekStr: ['日', '一', '二', '三', '四', '五', '六'],
      // checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
      // checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD'),
      markcheckInDate: false, //标记开始时间是否已经选择
      markcheckOutDate: false, //标记结束时间是否已经选择
    })

    
    var _this = this;
    // 页面初始化 options为页面跳转所带来的参数
    // var Moment=new Moment();



    var checkInDate = options.checkInDate ? options.checkInDate : Moment(new Date()).format('YYYY-MM-DD');
    var checkOutDate = options.checkOutDate ? options.checkOutDate : Moment(new Date()).add(1, 'day').format('YYYY-MM-DD');

    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          systemInfo: res,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          // firstdate:ApiUtil.zhuanhuan(checkInDate),
          // seconddate:ApiUtil.zhuanhuan(checkOutDate)
        });
      }
    })


    
    


  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: " ",
    })


    // let { checkInDate, checkOutDate } = wx.getStorageSync("ROOM_SOURCE_DATE"); //缓存开始结束时间
    var checkInDate = this.data.checkInDate;
    var checkOutDate = this.data.checkOutDate;
    this.setData({
      checkInDate,
      checkOutDate, 
      firstdate: ApiUtil.zhuanhuan(checkInDate),
      seconddate: ApiUtil.zhuanhuan(checkOutDate),
      weekone: ApiUtil.getweekday(checkInDate),
      weektwo: ApiUtil.getweekday(checkOutDate),
    })
    setTimeout(()=>{ 
      this.selectDataMarkLine();
    },1000)
    // this.selectDataMarkLine();

  }


  selectDataMarkLine() {
    let dateList = this.data.dateList;
    var carapi =new CarApi();
    carapi.carinfo({id:this.Base.options.model_id},(carinfo)=>{ 

      if(carinfo.type==1){
        var checkOutDate = this.data.checkInDate;
      }
      else{
        var checkOutDate = this.data.checkOutDate;
      }
  
      var checkInDate = this.data.checkInDate;
       
      let curreInid = checkInDate.substr(0, 4) + "-" + (checkInDate.substr(5, 2) < 10 ? checkInDate.substr(6, 1) : checkInDate.substr(5, 2)); //选择入住的id
      let curreOutid = checkOutDate.substr(0, 4) + "-" + (checkOutDate.substr(5, 2) < 10 ? checkOutDate.substr(6, 1) : checkOutDate.substr(5, 2)); //选择离店的id
      let dayIn = checkInDate.substr(8, 2) >= 10 ? checkInDate.substr(8, 2) : checkInDate.substr(9, 1); //选择入住的天id
      let dayOut = checkOutDate.substr(8, 2) >= 10 ? checkOutDate.substr(8, 2) : checkOutDate.substr(9, 1); //选择离店的天id
      let monthIn = checkInDate.substr(5, 2) >= 10 ? checkInDate.substr(5, 2) : checkInDate.substr(6, 1); //选择入店的月id
      let monthOut = checkOutDate.substr(5, 2) >= 10 ? checkOutDate.substr(5, 2) : checkOutDate.substr(6, 1); //选择离店的月id
      if (curreInid == curreOutid) { //入住与离店是当月的情况
        for (let i = 0; i < dateList.length; i++) {
          if (dateList[i].id == curreInid) {
            let days = dateList[i].days;
            for (let k = 0; k < days.length; k++) {
              if (days[k].day >= dayIn && days[k].day <= dayOut) {
                days[k].class = days[k].class + ' bgitem';
                // days[k].status = 'B';
              }
              if(days[k].day == dayIn && days[k].day== dayOut){
                
                days[k].class = days[k].class + ' active block_radius3';
                days[k].outday = true;
                days[k].outday = true;
              }
              if (days[k].day == dayIn) {
                console.log('走1')
                days[k].class = days[k].class + ' active block_radius';
                days[k].inday = true;
              }
              if (days[k].day == dayOut) {
                console.log('走2')
                days[k].class = days[k].class + ' active block_radius2';
                days[k].outday = true;
              }
              
            }
          }
        }
      } else { //跨月
        for (let j = 0; j < dateList.length; j++) {
          if (dateList[j].month == monthIn) { //入住的开始月份
            let days = dateList[j].days;
            for (let k = 0; k < days.length; k++) {
              if (days[k].day >= dayIn) {
                days[k].class = days[k].class + ' bgitem';
              }
              if (days[k].day == dayIn) {
                days[k].class = days[k].class + ' active';
                days[k].inday = true;
              }
            }
          } else { //入住跨月月份
            if (dateList[j].month < monthOut && dateList[j].month > monthIn) { //离店中间的月份
              let days = dateList[j].days;
              for (let k = 0; k < days.length; k++) {
                days[k].class = days[k].class + ' bgitem';
              }
            } else if (dateList[j].month == monthOut) { //离店最后的月份
              let days = dateList[j].days;
              for (let k = 0; k < days.length; k++) {
                if (days[k].day <= dayOut) {
                  days[k].class = days[k].class + ' bgitem';
                }
                if (days[k].day == dayOut) {
                  days[k].class = days[k].class + ' active';
                  days[k].outday = true;
                }
              }
            }
          }
        }
      }
      this.setData({
        dateList: dateList
      })

    })
 
    
    
  }

  createDateListData() { 
      // console.log(this.data.order,'多少年') 
    var dateList = [];
    var now = new Date();
      
    var order=this.Base.getMyData().order;

    now = new Date(now.getFullYear(), now.getMonth(), 1);

    for (var i = 0; i < this.Base.getMyData().maxMonth; i++) {
 
      var momentDate = Moment(now).add(this.data.maxMonth - (this.data.maxMonth - i), 'month').date;
      var year = momentDate.getFullYear();
      var month = momentDate.getMonth() + 1;

      var days = [];
      var totalDay = this.getTotalDayByMonth(year, month);
      var week = this.getWeek(year, month, 1);
   
      

      for (var j = -week + 1; j <= totalDay; j++) {
        var tempWeek = -1;
        if (j > 0)
          tempWeek = this.getWeek(year, month, j);
        var clazz = '';
        var today = false;

        var aa=year+'-'+month+'-'+j;

         aa=(new Date(aa)).getTime();

         if (tempWeek == 0 || tempWeek == 6)
          clazz = 'week'
        if (tempWeek == 0)
          clazz = 'zhoumo1'
        if (tempWeek == 6)
          clazz = 'zhoumo2'
       
        if(order!=""&&order!=undefined&&order!=null){ 
          var quchetimestamp=new Date(order.quchedate).getTime();
          var huandatetimestamp=(new Date(order.huanche)).getTime(); 
          if(aa>=(quchetimestamp-86400000)&&aa<=huandatetimestamp)
          clazz = 'unavailable ' + clazz 
        }
        
        if (j < DATE_DAY && year == DATE_YEAR && month == DATE_MONTH)
          //当天之前的日期不可用
          clazz = 'unavailable ' + clazz;
        if (j == DATE_DAY && year == DATE_YEAR && month == DATE_MONTH)
          //今天
          clazz = 'today ' + clazz,
          today = true;
        else
          clazz = '' + clazz
        days.push({
          day: j,
          class: clazz,
          today: today
        })
      }




      var dateItem = {
        id: year + '-' + month,
        year: year,
        month: month,
        days: days
      }


      dateList.push(dateItem);
    }
 
    this.setData({
      dateList: dateList
    });
  // this.selectDataMarkLine();

  }

  getTotalDayByMonth(year, month) {
    month = parseInt(month, 10);
    var d = new Date(year, month, 0);
    return d.getDate();
  }

  getWeek(year, month, day) {
    var d = new Date(year, month - 1, day);
    return d.getDay();
  }

  onPressDate(e) {
    
    var dateList = this.data.dateList;
    var carinfo=this.Base.getMyData().carinfo;
    var order=this.Base.getMyData().order;
    var {
      year,
      month,
      day
    } = e.currentTarget.dataset;

    console.log('从这过',e.currentTarget.dataset)

    var checkdate=year+'-'+month+'-'+day; 
    checkdate=(new Date(checkdate)).getTime();

    if(order!=""&&order!=undefined&&order!=null){ 
      var quchetimestamp=new Date(order.quchedate).getTime();
      var huandatetimestamp=(new Date(order.huanche)).getTime(); 
      if(checkdate>=(quchetimestamp-86400000)&&checkdate<=huandatetimestamp){
        // this.Base.toast("不能选了")
        return;
      }
       
    }


    //当前选择的日期为同一个月并小于今天，或者点击了空白处（即day<0），不执行
    if ((day < DATE_DAY && month == DATE_MONTH) || day <= 0) return;

    var tempMonth = month;
    var tempDay = day;

    if (month < 10) tempMonth = '0' + month
    if (day < 10) tempDay = '0' + day

    var date = year + '-' + tempMonth + '-' + tempDay;

    console.log('从这过2222')

    //如果点击选择的日期A小于入住时间，则重新渲染入住时间为A
    if ((this.data.markcheckInDate && Moment(date).before(this.data.checkInDate) || this.data.checkInDate === date)) {
      console.log("是否执行")
      this.setData({
        markcheckInDate: false,
        markcheckOutDate: false,
        firstdate: "",
        seconddate: "",
        weekone: "",
        weektwo: "",
        dateList: dateList.concat()
      });
    };

    console.log(Moment(date).before(this.data.checkInDate), '查看', date)

    //如果取车时间同还车时间都已选择，再点击其他日期时触发
    if (this.data.markcheckInDate == true && this.data.markcheckOutDate == true) {
      console.log("这里触发了？")
      this.setData({
        markcheckInDate: false,
        markcheckOutDate: false,
        firstdate: "",
        seconddate: "",
        weekone: "",
        weektwo: "",
        dateList: dateList.concat()
      });
    }

    if(carinfo.type==1){
      
      this.setData({
        checkInDate: date,
        checkOutDate: date,
        firstdate: ApiUtil.zhuanhuan(date),
        seconddate: ApiUtil.zhuanhuan(date),
        weektwo: ApiUtil.getweekday(date),
        markcheckInDate: true,
        markcheckOutDate: true,
        tianshu:1
        // tianshu: ApiUtil.DateDiff((this.data.checkInDate).replace(/-/g, '/') , (this.data.checkOutDate).replace(/-/g, '/') )
      });

      this.renderPressStyle(year, month, day);

      return;
    }

    console.log('从这过3333')

    if (this.data.markcheckInDate == false) {
      console.log("壹号")

      this.setData({
        checkInDate: date,
        firstdate: ApiUtil.zhuanhuan(date),
        weekone: ApiUtil.getweekday(date),
        markcheckInDate: true,
        tianshu: 0,
        dateList: dateList.concat()
      });

      this.renderPressStyle(year, month, day);

    } else if (this.data.markcheckOutDate == false) {
      console.log("贰号", date)

      this.setData({
        checkOutDate: date,
        seconddate: ApiUtil.zhuanhuan(date),
        weektwo: ApiUtil.getweekday(date),
        markcheckOutDate: true,
      });


      //设缓存，返回页面时，可在onShow时获取缓存起来的日期
      wx.setStorage({
        key: 'ROOM_SOURCE_DATE',
        data: {
          checkInDate: this.data.checkInDate,
          checkOutDate: this.data.checkOutDate
        }
      });

      this.setData({
        tianshu: ApiUtil.DateDiff((this.data.checkInDate).replace(/-/g, '/') , (this.data.checkOutDate).replace(/-/g, '/') )
      })
      // console.log(ApiUtil.DateDiff(this.data.checkInDate,this.data.checkOutDate),'走')

      // this.renderPressStyle2(year, month, day);
      this.selectDataMarkLine();

      return;

    }




  }

  renderPressStyle(year, month, day) {
    this.createDateListData(); //重新点击时数据初始化

    var dateList = this.data.dateList;
    //渲染点击样式

    // dateItem.days

    for (var i = 0; i < dateList.length; i++) {
      var dateItem = dateList[i];
      var id = dateItem.id;
      console.log(year + '-' + month)
      if (id === year + '-' + month) {
        var days = dateItem.days;

        // console.log(days,'这是多少');
        for (var j = 0; j < days.length; j++) {
          var tempDay = days[j].day;
          // console.log(tempDay,'这是多少',day);
          if (tempDay == day) {
            days[j].class = days[j].class + ' active';
            days[j].inday = true;
            break;
          }
        }
        break;
      }
    }


    // return;
    this.setData({
      dateList: dateList
    });
  }

  renderPressStyle2(year, month, day) {
    // this.createDateListData(); //重新点击时数据初始化 

    var dateList = this.data.dateList;
    //渲染点击样式 
    // dateItem.days
    var checkInDate = this.data.checkInDate;
    console.log(checkInDate, '入住时间');

    console.log(dateList, '时间');




    // return;
    this.setData({
      dateList: dateList
    });

  }

  bindChange(e) {
    var val = e.detail.value;
     console.log(val[0],val[1]);
    var checkInDate = this.data.checkInDate; 
    var carinfo=this.Base.getMyData().carinfo;
    var timelist = this.Base.getMyData().timelist;

    var shichang=carinfo.shichang;
    var checktime=checkInDate+' '+this.Base.getMyData().timelist[val[0]].name;
   
     var date=new Date(checktime).getTime()+ shichang*3600000;
      
  
     var huanchetime=ApiUtil.FormatTime(date);
      
  
     
    if(carinfo.type==1){
    
      for(var i=0;i<timelist.length;i++){ 
        if(huanchetime==timelist[i].name){ 
            this.Base.setMyData({
              valuelist:[val[0],i],
              stilltime:timelist[i].name
            })
        }
     }
     this.setData({
      taketime: this.Base.getMyData().timelist[val[0]].name
    })

      
    }else{
      this.setData({
        taketime: this.Base.getMyData().timelist[val[0]].name,
        stilltime: this.Base.getMyData().timelist[val[1]].name
      })
    }


    
  }

  bindempty(e) {
    this.createDateListData();

    this.setData({
      markcheckInDate: false,
      markcheckOutDate: false,
      firstdate: "",
      seconddate: "",
      weekone: "",
      weektwo: "",
      tianshu:0,
      dateList: this.data.dateList.concat()
    });

  }

  submit(e) {
    var checkInDate = this.data.checkInDate;
    var checkOutDate = this.data.checkOutDate;

    console.log(checkInDate,'=====',checkOutDate)
    
    var taketime = this.Base.getMyData().taketime;
    var stilltime = this.Base.getMyData().stilltime;
    var model_id = this.Base.options.model_id;
    var tianshu = this.data.tianshu;
    wx.navigateTo({
      url: '/pages/tijiaodindan/tijiaodindan?checkInDate=' + checkInDate + '&checkOutDate=' + checkOutDate + '&taketime=' + taketime + '&stilltime=' + stilltime + '&model_id='+model_id+'&tianshu='+tianshu,
    })
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.selectDataMarkLine = content.selectDataMarkLine;
body.createDateListData = content.createDateListData;
body.getTotalDayByMonth = content.getTotalDayByMonth;
body.getWeek = content.getWeek;
body.onPressDate = content.onPressDate;
body.renderPressStyle = content.renderPressStyle;
body.renderPressStyle2 = content.renderPressStyle2;

body.bindChange = content.bindChange;

body.bindempty = content.bindempty;

body.submit = content.submit;


Page(body)