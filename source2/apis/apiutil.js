import {
  ApiConfig
} from 'apiconfig.js';

export class ApiUtil {

  static renamelist = [];
  static HtmlDecode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");


    s = s.replace(new RegExp("</p>", "gm"), "</p><br />");
    s = s.replace(new RegExp("\"/alucard263096/zhongqicar2/upload/", "gm"), "\"" + "https://cmsdev.app-link.org/alucard263096/zhongqicar2/upload/");


    return s;
  }

  static fixRename(ret) {
    var renamelist = ApiUtil.renamelist;
    console.log("rename a");
    if (ret instanceof Array) {
      for (var i = 0; i < ret.length; i++) {
        if (ret[i].member_id != undefined && renamelist[ret[i].member_id] != undefined && renamelist[ret[i].member_id] != "") {
          ret[i].member_nickName = renamelist[ret[i].member_id];
        }
        if (ret[i].nickName != undefined && renamelist[ret[i].id] != undefined && renamelist[ret[i].id] != "") {
          ret[i].nickName = renamelist[ret[i].id];
        }
      }
    } else {
      console.log("rename b");
      if (ret.member_id != undefined && renamelist[ret.member_id] != undefined && renamelist[ret.member_id] != "") {
        ret.member_nickName = renamelist[ret.member_id].nickName;
      }
      if (ret.nickName != undefined && renamelist[ret.id] != undefined && renamelist[ret.id] != "") {
        console.log("rename c");
        ret.nickName = renamelist[ret.id];
      }
    }
    return ret;
  }

  static Toast(toastCtrl, msg) {
    let toast = toastCtrl.create({
      message: msg
    });
    toast.present();
  }

  static FormatDateTime(val) {
    return val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate() +
      " " + val.getHours() + ":" + val.getMinutes() + ":" + val.getSeconds();
  }

  static FormatDate(val) {
    return val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate();
  }

  static FormatTime(timestamp) {
    let d = new Date(timestamp); // ????????????10??????*1000???????????????13??????????????????1000 
    let yyyy = d.getFullYear() + '-'; 
    let MM = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-'; 
    let dd = (d.getDate()  < 10 ? '0' + (d.getDate() ) : d.getDate()) + ' ';  
    let HH =(d.getHours()  < 10 ? '0' + (d.getHours() ) : d.getHours())  + ':'; 
    let mm =(d.getMinutes()  < 10 ? '0' + (d.getMinutes() ) : d.getMinutes()); 
    let ss = d.getSeconds(); 
    return  HH + mm ;
  }

  static IsMobileNo(str) {

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return myreg.test(str);
  }
  static FormatPercent(val) {
    val = val * 100.0;
    return val.toFixed(2) + '%';
  }
  static FormatPrice(val) {
    val = val * 1.0;
    return val.toFixed(2);
  }
  static FormatNumber(val, digits) {
    val = val * 1.0;
    return val.toFixed(digits);
  }
  static Storage = null;

  static TimeAgo(agoTime) {

    // ????????????????????????????????????????????????????????????????????????????????????????????????
    var time = (new Date()).getTime() / 1000 - agoTime;

    var num = 0;
    if (time >= 31104000) { // N??????
      num = parseInt(time / 31104000);
      return num + '??????';
    }
    if (time >= 2592000) { // N??????
      num = parseInt(time / 2592000);
      return num + '??????';
    }
    if (time >= 86400) { // N??????
      num = parseInt(time / 86400);
      return num + '??????';
    }
    if (time >= 3600) { // N?????????
      num = parseInt(time / 3600);
      return num + '?????????';
    }
    if (time > 60) { // N?????????
      num = parseInt(time / 60);
      return num + '?????????';
    }
    return '1?????????';
  }


  static fixImages(info) {
    var images = [];
    if (info.photo1 != "") {
      images.push(info.photo1);
    }
    if (info.photo2 != "") {
      images.push(info.photo2);
    }
    if (info.photo3 != "") {
      images.push(info.photo3);
    }
    if (info.photo4 != "") {
      images.push(info.photo4);
    }
    if (info.photo5 != "") {
      images.push(info.photo5);
    }
    if (info.photo6 != "") {
      images.push(info.photo6);
    }
    if (info.photo7 != "") {
      images.push(info.photo7);
    }
    if (info.photo8 != "") {
      images.push(info.photo8);
    }
    if (info.photo9 != "") {
      images.push(info.photo9);
    }
    if (info.photo10 != "") {
      images.push(info.photo10);
    }
    if (info.photo11 != "") {
      images.push(info.photo11);
    }
    if (info.photo12 != "") {
      images.push(info.photo12);
    }
    if (info.photo13 != "") {
      images.push(info.photo13);
    }
    if (info.photo14 != "") {
      images.push(info.photo14);
    }
    return images;
  }

  static zhuanhuan(date) {
    var date = new Date(date)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return ApiUtil.formatTen(month) + "???" + ApiUtil.formatTen(day) + "???";
  }


  static formatTen(num) {
    return num > 9 ? (num + "") : ("0" + num);
  }

  static getweekday(date) {
    var weekArray = new Array("?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????");
    var week = weekArray[new Date(date).getDay()];
    return week;
  }

  static DateDiff(sDate1, sDate2) { //???????????????
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //?????????12-18-2006??????  
    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //????????????????????????????????????  
    return iDays
  }

  static time_different(date) {
    var date2 = (new Date(date).getTime() + 900000) - new Date().getTime(); //?????????????????????   

    console.log(new Date(date).getTime() + 900000, '??????', date2);
    //------------------------------
    //?????????????????????
    var days = Math.floor(date2 / (24 * 3600 * 1000))

    //??????????????????
    var leave1 = date2 % (24 * 3600 * 1000) //?????????????????????????????????
    var hours = Math.floor(leave1 / (3600 * 1000))
    //?????????????????????
    var leave2 = leave1 % (3600 * 1000) //????????????????????????????????????
    var minutes = Math.floor(leave2 / (60 * 1000))
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    //??????????????????
    var leave3 = leave2 % (60 * 1000) //????????????????????????????????????
    var seconds = Math.round(leave3 / 1000);
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    return minutes + ":" + seconds;
  }







}