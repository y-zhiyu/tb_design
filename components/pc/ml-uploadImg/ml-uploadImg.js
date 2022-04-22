var uploadImage = require("../../../utils/uploadImg/uploadImg.js");
import { debounce } from '../../../utils/debounce';

const app = getApp();
import { imgUrl, isdebug } from "../../../config"
import { loading, setImgURl, showToast, goToPage, setBatTitle, onLoadPublicMethods } from '../../../utils/interactive';

import { uploadActivity, uploadInspectionActivity } from "../../../utils/http"
import { report_noaction, report_default } from "../../../utils/reprot";


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    publicImgUrl: {
      type: String,
      value: "",
    },
    uploadImgitem: {
      type: JSON,
      value: "",
    },
    isInspection: {
      type: Boolean,
      value: false,
    },
    // 是否显示(1显示0不显示)
    showIndex: {
      type: Number,
      value: -1
    },
    // 验收结果(1合格2不合格)
    showPassIndex: {
      type: Number,
      value: -1
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    imgArr: [],
    resArray: [],
    index: 0,
    textareaValue: "",
    showStatus: false,
    showPassStatus: false,

  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 输入框
    getChangeValue(e) {
      // console.log(e.detail.value);
      this.setData({
        textareaValue: e.detail.value
      })
    },

    //选择图片
    onChangeTap(e) {
      console.log("点击上传本地文件-----");
      let _this = this;
      let resArray = [];
      let pathArr = e.detail.current;
      console.log("pathArr----", pathArr);

      if (e.detail.oversize.length > 0) {
        showToast({
          msg: "文件太大，请选择20M以内的文件",
        });
      }
      new Promise((re, rj) => {
        //获取原图片信息
        for (let i = 0; i < pathArr.length; i++) {
          tt.getImageInfo({
            src: pathArr[i],
            success: function (res) {
              console.log("第", i + 1, "张");
              console.log("获取上传图片信息---", res);

              resArray.push(res);
              _this.setData({
                resArray: resArray,
                index: 0,
              });
              if (resArray.length == pathArr.length) {
                re(resArray);
              }
            },
          });
        }
      }).then((res) => {
        console.log("res------", res);
        let index = _this.data.index;
        let _item = res[index];
        // console.log('index-------', _this.data.index);

        _this.getUploadImage(_item.path);
      });
    },


    chooseImage(e) {
      let _this = this,
        imgArr = _this.data.imgArr;
      _this.data.imageIndex = 0;
      _this.data.resArray = []
      this.data.currentImgobj = {
        findex: e.target.dataset.index,
        sonindex: e.target.dataset.sonindex,
      }
      console.log(this.data.currentImgobj)
      tt.chooseImage({
        sourceType: ['album', 'camera'], // PC端无效
        count: 9,
        sizeType: ['compressed'],
        cameraDevice: 'front',
        success(res) {
          console.log(res.tempFilePaths,);
          let pathArr = res.tempFilePaths;
          _this.data.pathArr = pathArr
          // _this.getMsg()
          _this.onChangeTap1()
        },
        fail(res) {
          console.log(`chooseImage 调用失败`);
        }
      });
    },


    onChangeTap1() {
      console.log('点击上传本地文件-----')
      let _this = this,
        imgArr = _this.data.imgArr;
      let resArray = [];
      let pathArr = _this.data.pathArr

      new Promise((re, rj) => {
        //获取原图片信息
        for (let i = 0; i < pathArr.length; i++) {
          (function (i) {
            console.log("获取原图片信息", i)
            tt.getImageInfo({
              src: pathArr[i],
              success: function (res) {
                var width = res.width,
                  height = res.height;
                console.log('第', i + 1, '张');
                console.log('获取上传图片信息---', res);

                if (width >= height) {
                  if (width > 1440) {
                    width = 1440;
                    height = 1440 / (res.width / res.height);
                  }
                } else {
                  if (height > 1440) {
                    height = 1440;
                    width = 1440 * (res.width / res.height);
                  }
                }
                console.log('更改后获取width, height---', width, height);
                res.width = width;
                res.height = height;

                resArray.push(res);
                _this.data.index = 0
                _this.setData({
                  resArray: resArray,
                })
                if (resArray.length == pathArr.length) {
                  re(resArray);
                }
              }
            })
          })(i)

        }
      }).then(res => {
        console.log('res------', res);
        let index = _this.data.index;
        let _item = res[index];
        // 无水印
        _this.getUploadImage(_item.path);
      })
    },



    getUploadImage(path) {
      let _this = this;
      let index = _this.data.index;
      let resArray = _this.data.resArray;
      let imgArr = _this.data.imgArr;
      tt.showLoading({
        title: "上传中" + (index + 1) + "/" + resArray.length,
        mask: true,
      });

      uploadImage(
        path,
        `feishu_tb_pm_prj/evidence/`,
        function (result) {
          console.log("======上传成功图片地址为：", result);
          //这个result就是返给你上传到oss上的地址链接
          imgArr.push(result);
          console.log("imgArr=========", imgArr);
          _this.setData({
            imgArr: imgArr,
          });

          if (index + 1 < resArray.length) {
            _this.data.index += 1;
            let _item = resArray[_this.data.index];
            _this.getUploadImage(_item.path);
          }
          if (index + 1 == resArray.length) {
            console.log("上传完了吗index-----", _this.data.index);
            tt.hideLoading();
          }
        },
        function (result) {
          console.log("======上传失败======", result);
          tt.hideLoading();
        }
      );
    },

    //删除图片
    deleteImg(e) {
      let _this = this,
        imgArr = _this.data.imgArr,
        idx = e.detail.index;
      console.log("删除图片", e);
      imgArr.splice(idx, 1);
      this.setData({
        imgArr,
      });
    },

    // 是否可见
    selectShow(e) {
      let _showIndex = e.currentTarget.dataset.index;
      this.setData({
        // showStatus: !this.data.showStatus,
        showIndex: _showIndex
      })
    },

    // 收否合格
    selectPassShow(e) {
      let _showPassIndex = e.currentTarget.dataset.index;
      this.setData({
        // showPassStatus: !this.data.showPassStatus,
        showPassIndex: _showPassIndex,
      })
    },

    // 发布播报
    uploadBroadcast: debounce(function () {
      let { textareaValue, imgArr, showIndex, showPassIndex, isInspection } = this.data;

      if (!textareaValue) {
        tt.showToast({
          title: '请填写文字',
          duration: 2000,
        })
        return
      }
      if (!imgArr.length > 0) {
        tt.showToast({
          title: '请选择图片',
          duration: 2000,
        })
        return
      };

      if (showIndex < 0) {
        showToast({ msg: '请选择业主是否可见' })

        return
      }

      if (!isInspection && showPassIndex < 0) {
        showToast({ msg: '请选择是否合格' })

        return
      }

      if (this.data.isInspection) {
        this.uploadInspectionAction();

      } else {
        this.uploadBpAction();
      }

    }),
    // uploadBroadcast() {
    //   console.log(this.data.uploadImgitem)


    // },

    //上传播报
    uploadBpAction() {
      let _this = this;
      let { imgArr, textareaValue, uploadImgitem } = this.data;
      let images = imgArr.join(',');
      console.log(uploadImgitem)
      // console.log("textareaValue====", textareaValue);
      loading(true);
      let postData = {
        uc_uid: app.globalData.uc_uid,
        pm_p_id: uploadImgitem.pm_p_id,
        pm_t_id: uploadImgitem.pm_t_id,
        images,
        memo: textareaValue,
        is_public: _this.data.showIndex,
        comment_result: _this.data.showPassIndex
      }
      uploadActivity(postData).then(res => {
        switch (res.code) {
          case 200:
            // update UI
            _this.handelBs_uploadBp(res)
            break;
          case 400:
            //report_noaction();
            report_noaction({
              url: "/uc/toe/task/uploadActivity",
              page: _this.data.routeURL,
              code: res.code,
              input_params: postData
            })
            break;
          case 401:
            showToast({
              msg: res.msg
            })
            break;
          case 404:
            //report_noaction();
            report_noaction({
              url: "/uc/toe/task/uploadActivity",
              page: _this.data.routeURL,
              code: res.code,
              input_params: postData
            })
            break;
          case 87014:
            showToast({
              msg: res.code + ":" + res.msg
            })
            report_noaction({
              url: "/uc/toe/task/uploadActivity",
              page: _this.data.routeURL,
              code: res.code,
              input_params: postData
            })
            break;
          default:
            //report_default();
            report_default({
              url: "/uc/toe/task/uploadActivity",
              page: _this.data.routeURL,
              code: res.code,
              input_params: postData
            })
        }
        loading(false);
      }, err => {
        loading(false);
        console.log("err,", err)
      })
    },
    clearUploadData() {
      this.data.uploadImgitem = ''
      this.setData({
        imgArr: [],
        textareaValue: ''
      })
    },
    handelBs_uploadBp(res) {
      console.log("handelBs_uploadBp", res)
      showToast({
        msg: '上传成功'
      })
      this.clearUploadData()
      this.triggerEvent("handelupLoadFun")
    },


    uploadInspectionAction() {
      let _this = this;
      let { imgArr, textareaValue, uploadImgitem } = this.data;
      let images = imgArr.join(',');
      console.log(uploadImgitem)
      console.log("textareaValue====", textareaValue);

      loading(true);
      let postData = {
        uc_uid: app.globalData.uc_uid,
        pm_p_id: uploadImgitem.pm_p_id,
        pm_t_id: uploadImgitem.pm_t_id,
        images,
        memo: textareaValue,
        is_public: _this.data.showIndex
      }
      uploadInspectionActivity(postData).then(res => {
        switch (res.code) {
          case 200:
            // update UI
            _this.handelBs_uploadInspectionAction(res)
            break;
          case 400:
            //report_noaction();
            report_noaction({
              url: "/uc/toe/task/uploadActivity",
              page: _this.data.routeURL,
              code: res.code,
              input_params: postData
            })
            break;
          case 401:
            showToast({
              msg: res.msg
            })
            break;
          case 404:
            //report_noaction();
            report_noaction({
              url: "/uc/toe/prj/uploadInspectionActivity",
              page: _this.data.routeURL,
              code: res.code,
              input_params: postData
            })
            break;
          case 87014:
            showToast({
              msg: res.code + ":" + res.msg
            })
            report_noaction({
              url: "/uc/toe/prj/uploadInspectionActivity",
              page: _this.data.routeURL,
              code: res.code,
              input_params: postData
            })
            break;
          default:
            //report_default();
            report_default({
              url: "/uc/toe/prj/uploadInspectionActivity",
              page: _this.data.routeURL,
              code: res.code,
              input_params: postData
            })
        }
        loading(false);
      }, err => {
        loading(false);
        console.log("err,", err)
      })
    },
    handelBs_uploadInspectionAction(res) {
      console.log("handelBs_uploadInspectionAction:", res)
      this.clearUploadData()
      this.triggerEvent("handelupLoadFun")
    }


  },

});
