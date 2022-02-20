// pages/haibao/haibao.js
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
      title: "推广海报",
    })
    var api=new MemberApi();
    api.selectziliao({}, (ret) => {
      console.log(ret, '返回值');
       this.Base.setMyData({info:ret}) 
    })
  }


  savephones() {
     
    
    let that = this;
 
   var imgs = ApiConfig.GetUploadPath() + 'resource/' + this.Base.getMyData().res.haibao;
 
    var memberinfo = this.Base.getMyData().memberinfo;

    let bgimgs = ApiConfig.GetUploadPath() + 'resource/' + this.Base.getMyData().res.bghaibao;

    let wenzi = ApiConfig.GetUploadPath() + 'resource/' + this.Base.getMyData().res.wenzi;
     
      let label= ApiConfig.GetUploadPath() + 'resource/' + this.Base.getMyData().res.hehuoren;
      
    // bgimgs = bgimgs.replace(/http/, 'https');

      // imgs = imgs.replace(/http/, 'https');
 
    var erweima = ApiConfig.GetApiUrl() + "inst/qrcode?inst_id=1&fenxiao=" + this.Base.getMyData().memberinfo.id;
 
    // 创建画布对象
    const ctx = wx.createCanvasContext("myCanvas", that)

    console.log(ctx,'画布');
   
     
    wx.getImageInfo({
      src: bgimgs, // 二维码图片的路径

      success: function (res) {
        console.log("bg 绘制二维码》》》", res)
        // 绘制二维码
        let imgW = 275;
        let imgH = 440;
        let imgPath = res.path

        that.setData({
          canvasHeight: imgH,
          canvasWidth: imgW
        })
        ctx.drawImage(imgPath, 0, 0, imgW, imgH)
        // 获取图片信息，要按照原图来绘制，否则图片会变形 
        wx.getImageInfo({
          src: imgs,
          success: function (res) {
            // 根据 图片的大小 绘制底图 的大小
            console.log(" imgs 绘制底图 的图片信息》》》", res)

            // 绘制底图 用原图的宽高比绘制
            ctx.drawImage(res.path, 0, 0, 275, 110)


            wx.getImageInfo({
              src: wenzi,
              success: function (res) {
                // 根据 图片的大小 绘制底图 的大小
                console.log(" imgs 绘制底图 的图片信息》》》", res) 
                // 绘制底图 用原图的宽高比绘制
                ctx.drawImage(res.path, 0, 112, 275, 250)


                wx.getImageInfo({
                  src: label,
                  success: function (res) {
                    // 根据 图片的大小 绘制底图 的大小
                    console.log(" imgs 绘制底图 的图片信息》》》", res) 
                    // 绘制底图 用原图的宽高比绘制
                    ctx.drawImage(res.path, 80, 405, 90, 18) 
                    var level_name = memberinfo.memberlevel_name;
                    ctx.setFontSize(8);
                    ctx.fillText(level_name, 108, 416,100); 
                    ctx.font; 

                    wx.getImageInfo({
                      src: erweima, // 二维码图片的路径
                      success: function (res) {
                        console.log("erweima 绘制二维码》》》", res)
                         
                        ctx.setFontSize(17);
                        var nickname = memberinfo.name;
     
                        // ctx.fillText(nickname, 80,400,100);//重新画上
                        ctx.fillText(nickname, 79.5, 394.5,100); 
                        ctx.fillText(nickname, 80, 395,100); 
    
                        ctx.font;
                        ctx.drawImage(res.path, 10, 370, 60, 60)
                        ctx.draw()
    
                       
                    
        
                        wx.showLoading({
                          title: '正在保存',
                          mask: true
        
                        })
                        setTimeout(() => {
                          wx.canvasToTempFilePath({
                            canvasId: 'myCanvas',
                            success: function (res) {
                              console.log("合成的带有小程序码的图片success》》》", res)
                              let tempFilePath = res.tempFilePath
                              // 保存到相册
                              wx.saveImageToPhotosAlbum({
                                filePath: tempFilePath,
                                success(res) { 
                                  wx.hideLoading()
                                  wx.showModal({
                                    title: '温馨提示',
                                    content: '图片保存成功，可在相册中查看',
                                    showCancel: false,
                                    success(res) {
                                      wx.clear
                                      if (res.confirm) {
                                        that.setData({
                                          isShow: true
                                        })
                                      }
                                    }
                                  })
        
                                  that.setData({
                                    imgs: imgs,
                                  })
                                },
        
                                fail(err) {
                                  wx.hideLoading()
                                  if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                                    wx.showModal({
                                      title: '提示',
                                      content: '需要您授权保存相册',
                                      showCancel: false,
                                      success: modalSuccess => {
                                        wx.openSetting({
                                          success(settingdata) {
                                            if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                              console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                            } else {
                                              console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                            }
                                          }
                                        })
                                      }
                                    })
                                  }
                                  console.log(err)
                                }
                              })
        
                              console.log("合成的带有小程序码的图片的信息》》》", res)
                            },
                            fail: function (res) {
                              console.log("生成的图拍呢 失败 fail fail fail ", res)
                              wx.hideLoading()
                              wx.showModal({
                                title: '温馨提示',
                                content: '小程序码图片合成失败，请重试',
                                showCancel: false
                              })
                            }
                          }, that)
                        }, 1500)
        
                      },
                      fail(res) {
                        wx.hideLoading()
                        wx.showModal({
                          title: '温馨提示',
                          content: '获取小程序码图片失败',
                          showCancel: false
                        })
                      }
                    })
              
                
              
                  },
                  fail(res) {
                    wx.hideLoading()
                    wx.showModal({
                      title: '温馨提示',
                      content: '图片信息获取失败，请重试',
                      showCancel: false
                    })
                  }
                })
  

              },
              fail(res) {
                wx.hideLoading()
                wx.showModal({
                  title: '温馨提示',
                  content: '图片信息获取失败，请重试',
                  showCancel: false
                })
              }
            })
 
          

          },
          fail(res) {
            wx.hideLoading()
            wx.showModal({
              title: '温馨提示',
              content: '图片信息获取失败，请重试',
              showCancel: false
            })
          }
        })

      },
      fail(res) {
        wx.hideLoading()
        wx.showModal({
          title: '温馨提示',
          content: '背景获取失败，请重试',
          showCancel: false
        })
      }
    })




  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.savephones = content.savephones;
Page(body)