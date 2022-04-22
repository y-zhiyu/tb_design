const app = getApp();
var uploadFile = require('../../../utils/uploadFile/uploadFile.js');
import { imgUrl, isdebug } from "../../../config";
import { dataStatus, showToast, goToPage, setBatTitle, onLoadPublicMethods, } from "../../../utils/interactive";
import { formatDateTo, } from "../../../utils/util.js";

import { instanceInsert, approvalFormData, instancePreview, instanceUploadFile } from "../../../utils/http";

import { report_noaction, report_default } from "../../../utils/reprot";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    publicImgUrl: {
      type: String,
    },
    projectName: {
      type: String,
      value: "",
    },
    approvalId: {
      type: String,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        console.log('approvalId-----', this.data.approvalId);
        // approvalId==1   C端劳务分包付款申请单
        // approvalId==2   C端物料付款申请单
        // approvalId==3   建筑劳务付款申请单
        // approvalId==4   材料付款申请单
      },

    },

    pmId: {
      type: String,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        console.log('pmId-----', this.data.pmId);
      },

    },
    approvalCode: {
      type: String,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        console.log('applyItem-----', this.data.approvalCode)
        this.setData({
          approval_code: this.data.approvalCode,
          listEditArray: [],
          stepList: []
        });
      },
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: true,
    scroll: true,
    scrollView: "",
    listEditArray: [],
    applyList: [],
    stepList: [],
    fileSize: 0,
    isSubmit: true,
    buttonText: "查看审批流"
  },

  ready() {

    onLoadPublicMethods({ imgUrl: imgUrl });
    this.initForm();

  },


  /**
   * 组件的方法列表
   */
  methods: {

    loading(status) {
      this.setData({
        loading: status
      })
    },

    // input textarea
    getInputChange(e) {
      let { index, item } = e.currentTarget.dataset;
      let _value = e.detail.value;

      this.setData({
        [`listEditArray[${index}].value`]: _value
      })
    },

    // select 
    getSelectChange(e) {
      // console.log(e);
      let { index, item } = e.currentTarget.dataset;
      let { value, id } = e.detail.item;
      let { listEditArray, applyList, approvalId } = this.data;


      console.log('item.custom_id----------------', value, item.custom_id);

      // 是否为增添项
      if (item.custom_id == "is_add_item_necessary") {


        if (value == '否') {

          if (approvalId == 1) { // C端劳务分包付款申请单
            this.setDisabledStatus('attachment4', false, 'attachment5', false, 'attachment6', false);

          } else if (approvalId == 2) { //C端物料付款申请单
            this.setDisabledStatus('attachment4', false, 'attachment5', false, 'attachment6', false);

          } else if (approvalId == 3) { //建筑劳务付款申请单

            // this.setDisabledStatus('attachment5', false, 'attachment6', false);
            this.changeListEditArrayStatus([{ custom_id: 'attachment5', necessary: false, }, { custom_id: 'attachment5', necessary: false, }])

          } else if (approvalId == 4) { //材料付款申请单

            this.setDisabledStatus('attachment5', false, 'attachment6', false, 'attachment7', false);
          }

        }

        if (value == '是（甲方需求）') {

          if (approvalId == 1) {
            this.setDisabledStatus('attachment4', false, 'attachment5', false, 'attachment6', true);

          } else if (approvalId == 2) {
            this.setDisabledStatus('attachment4', false, 'attachment5', true, 'attachment6', true);

          } else if (approvalId == 3) {

            // this.setDisabledStatus('attachment5', true, 'attachment6', false);

            this.changeListEditArrayStatus([{ custom_id: 'attachment5', necessary: true, }, { custom_id: 'attachment6', necessary: false, }])

          } else if (approvalId == 4) {

            this.setDisabledStatus('attachment5', true, 'attachment6', false, 'attachment7', true);
          }

        }


        if (value == '是（非甲方需求）') {

          if (approvalId == 1) {
            this.setDisabledStatus('attachment4', true, 'attachment5', true, 'attachment6', false);

          } else if (approvalId == 2) {
            this.setDisabledStatus('attachment4', true, 'attachment5', false, 'attachment6', true);

          } else if (approvalId == 3) {

            // this.setDisabledStatus('attachment5', false, 'attachment6', true);
            this.changeListEditArrayStatus([{ custom_id: 'attachment5', necessary: false }, { custom_id: 'attachment6', necessary: true, }])

          } else if (approvalId == 4) {

            this.setDisabledStatus('attachment5', false, 'attachment6', true, 'attachment7', true);

          }
        }

      }

      // 付款类型
      if (item.custom_id == "payment_type_necessary") {

        if (value == '预付款') {

          if (approvalId == 1) {
            this.setDisabledStatus('attachment3', false);

          } else if (approvalId == 2) {
            this.setDisabledStatus('attachment3', false,);

          } else if (approvalId == 3) {
            // this.setDisabledStatus('attachment2', false, 'attachment3', false,);
            this.changeListEditArrayStatus([{ custom_id: 'attachment2', necessary: false, }, { custom_id: 'attachment3', necessary: false }])

          } else if (approvalId == 4) {

            this.setDisabledStatus('attachment3', false, 'attachment4', false, 'attachment8', false,);
          }

        }


        if (value == '结算款') {

          if (approvalId == 1) {
            this.setDisabledStatus('attachment3', false);

          } else if (approvalId == 2) {
            this.setDisabledStatus('attachment3', true,);

          } else if (approvalId == 3) {
            // this.setDisabledStatus('attachment2', true, 'attachment3', true,);
            this.changeListEditArrayStatus([{ custom_id: 'attachment2', necessary: true, }, { custom_id: 'attachment3', necessary: true, }])

          } else if (approvalId == 4) {
            this.setDisabledStatus('attachment3', true, 'attachment4', true, 'attachment8', false,);

          }

        }


        if (value.indexOf('进度款') > -1) {

          // console.log('value--------,approvalId', value.indexOf('进度款') > -1, approvalId);

          if (approvalId == 1) {

            if (value == '进度款-竣工验收' || value == '进度款-中期验收') {
              this.setDisabledStatus('attachment3', true);

            } else {
              this.setDisabledStatus('attachment3', false);

            }

          } else if (approvalId == 2) {
            this.setDisabledStatus('attachment3', true);

          } else if (approvalId == 3) {
            // this.setDisabledStatus('attachment2', true, 'attachment3', true,);
            this.changeListEditArrayStatus([{ custom_id: 'attachment2', necessary: true, }, { custom_id: 'attachment3', necessary: true, }])

          } else if (approvalId == 4) {

            this.setDisabledStatus('attachment3', false, 'attachment4', false, 'attachment8', true,);

          }

        }
      }


      //收款单位
      if (item.custom_id == "payee_id_necessary" || item.custom_id == "bank_id_necessary") {
        console.log('applyList', applyList[index + 1]);

        let _array = applyList[index + 1].option;
        let _option = _array.find(info => info.payee_id == id).data;

        // console.log('_array', _array, id);

        this.setData({
          [`listEditArray[${index + 1}].option`]: _option,
          [`listEditArray[${index + 1}].disabled`]: false,
          [`listEditArray[${index + 1}].value`]: '',
          [`listEditArray[${index + 1}].select_id`]: '',
        });

        if (item.custom_id == "payee_id_necessary") {

          this.setData({
            [`listEditArray[${index + 2}].value`]: '',
            [`listEditArray[${index + 2}].select_id`]: '',
            [`listEditArray[${index + 2}].option`]: [],
            [`listEditArray[${index + 2}].disabled`]: true,
          });
        }

        console.log('_option----------', _option);
      }


      this.setData({
        [`listEditArray[${index}].value`]: value,
        [`listEditArray[${index}].select_id`]: id,
      });

    },

    // // 申请单判断
    // approvalStatus(index1, status1, index2, status2, index3, status3) {
    //   this.setDisabledStatus(`attachment${index1}`, status1, `attachment${index2}`, status2, `attachment${index3}`, status3);
    // },


    // 判断是否必填项目 
    //this.setDisabledStatus('attachment4', false, 'attachment5', false, 'attachment6', false);
    setDisabledStatus(custom_id, status, custom_id_nec, status_nec, custom_id_nec1, status_nec1,) {

      let { listEditArray } = this.data;
      console.log('listEditArray', listEditArray);
      console.log('111111111', custom_id)


      listEditArray.map((info, index) => {

        if (info.custom_id == custom_id) {

          info.necessary = status;
        }

        if (info.custom_id == custom_id_nec) {
          info.necessary = status_nec;
        }

        if (info.custom_id == custom_id_nec1) {
          info.necessary = status_nec1;
        }

      });
      // console.log(listEditArray, listEditArray);

      this.setData({
        listEditArray: listEditArray
      })
    },

    changeListEditArrayStatus(dataArr) {
      let { listEditArray } = this.data;
      // console.log("dataArr",dataArr)
      listEditArray.forEach((o, i) => {
        dataArr.forEach((arr, arrIndex) => {
          if (o.custom_id == arr.custom_id) {
            o.necessary = arr.necessary;
          }
        })
      })
      this.setData({
        listEditArray,
      })
    },

    // select搜索值------>
    getSelectInputChange(e) {
      // console.log('e------------', e);
      let { index, item } = e.currentTarget.dataset;
      let _value = e.detail.value;

      this.setData({
        [`listEditArray[${index}].value`]: _value,
        [`listEditArray[${index}].select_id`]: '',
      })

    },

    // 日期 删除
    getInvoiceDateDelete(e) {
      console.log(e);
      let { index, item } = e.currentTarget.dataset;
      this.setData({
        [`listEditArray[${index}].value`]: '',
      })
    },

    // 提交
    getSubmit() {
      let { listEditArray, isSubmit } = this.data;

      for (let i = 0; i < listEditArray.length; i++) {
        let _item = listEditArray[i];
        // console.log('_item', _item)

        if (_item.necessary && !_item.value) {

          showToast({ msg: _item.name + '不能为空' })
          this.getScrollId(_item.id);
          return false;

        };
      }

      let _array = [];
      console.log('listEditArray---------', listEditArray)

      listEditArray.map((_item, index) => {

        if (_item.value || (_item.fileList && _item.fileList.length > 0)) {

          let _value = '';

          switch (_item.type) {
            case "radioV2":
              _value = _item.select_id;
              break;

            case "date":
              _value = formatDateTo(_item.value);
              console.log('_value===========', _value);

              break;

            default:
              _value = _item.value;
          }

          let _str = {
            id: _item.id,
            type: _item.type,
            value: _value
          }
          _array.push(_str);
        }

      });

      this.setData({
        formData: _array
      }, () => {
        // this.getInstancePreview();
      })

      console.log('_array================', _array);

      if (isSubmit) {
        // 流程预览
        this.getInstancePreview();

      } else {
        // 提交
        this.getApplyList();

      }
    },

    // 滚动到id错误处
    getScrollId(id) {
      this.setData({
        scrollView: id
      });
    },


    // 添加附件
    addFile(e) {
      let _this = this;
      let _index = e.currentTarget.dataset.index;
      console.log('_index==', _index);

      tt.filePicker({
        success(res) {
          console.log('选择文件列表：', res.list);
          let _list = res.list;
          _this.getUploadFile(_list[0].path, _list[0].name, _list[0].size, _index);
        }
      });
    },

    getUploadFile(path, name, fileSize, index) {
      let _this = this;
      let { listEditArray } = this.data;

      uploadFile(path, name, `desktopFishu/`,
        function (result) {
          console.log("======上传成功文件地址为：", result);
          // console.log('fileSize-----', fileSize)
          // 1M = 1024k = 1048576字节;
          let _fileSize = "";
          if (fileSize < 1048576) {
            _fileSize = (fileSize / 1024).toFixed(2) + 'k';
          } else {
            _fileSize = (fileSize / 1048576).toFixed(2) + 'M';

          }

          let _info = {
            name: name,
            path: result,
            fileSize: _fileSize
          }

          let _fileList = listEditArray[index].fileList && listEditArray[index].fileList.length > 0 ? listEditArray[index].fileList : []
          _fileList.push(_info);

          _this.setData({
            [`listEditArray[${index}].fileList`]: _fileList,
          })

          _this.getInstanceUploadFile(result, name, 'attachment', index);

        },

        function (result) {
          console.log("======上传失败======", result);
        }
      )
    },

    // 文件查看
    getLook(e) {
      let { index, fileindex } = e.currentTarget.dataset;
      let _listEditArray = this.data.listEditArray;
      let _url = _listEditArray[index].fileList[fileindex].path;
      // console.log('_index==', index, fileindex);
      // console.log('查看_url=====', _url)

      tt.downloadFile({
        url: _url,
        success(res) {
          console.log('res------', res);
          const filePath = res.tempFilePath;
          tt.openDocument({
            filePath: filePath,
            success(res) {
              console.log('打开文档成功', res);
            },
            fail(error) {
              console.log('打开文档失败', error)

            }
          })
        }
      })
    },

    //  文件下载
    getDownload(e) {
      let { index, fileindex } = e.currentTarget.dataset;
      let _listEditArray = this.data.listEditArray;
      let _url = _listEditArray[index].fileList[fileindex].path;

      // console.log('_index==', index, fileindex);
      // console.log('下载_url=====', _url);
      tt.downloadFile({
        url: _url,
        success(res) {
          const filePath = res.tempFilePath;
          // console.log('下载文档成功', res);
          tt.saveFileAs({
            filePath: filePath,
            success(res) {
              console.log(`saveFileAs 调用成功`, res);
            },
            fail(res) {
              console.log(`saveFileAs 调用失败`, res);
            }
          });
        },
        fail(error) {
          console.log('下载文档失败', error);

        }
      })
    },


    // 文件删除
    getDelete(e) {
      let { index, fileindex } = e.currentTarget.dataset;
      let _listEditArray = this.data.listEditArray;
      // console.log('index, fileindex', index, fileindex);

      _listEditArray[index].fileList.splice(fileindex, 1);
      _listEditArray[index].value.splice(fileindex, 1);

      this.setData({
        [`listEditArray[${index}].value`]: _listEditArray[index].value,
        [`listEditArray[${index}].fileList`]: _listEditArray[index].fileList,
      })

    },



    // 保存草稿
    getPreservation() {

    },

    // 去空字符串方法
    getEmptyValue(str) {
      let _str = str.replace(/^\s*|\s*$/g, '');
      return _str;
    },




    // 以下API;
    initForm() {
      let _this = this;
      let { pmId } = this.data;
      let postData = {
        uc_uid: app.globalData.uc_uid,
        pm_p_id: pmId,
        approval_code: this.data.approval_code
      }
      this.loading(true);

      approvalFormData(postData).then(res => {

        switch (res.code) {
          case 200:
            // update UI
            _this.handelBs_initForm(res);
            break;
          case 401:
            //report_noaction();
            showToast({ msg: res.msg })
            report_noaction({ url: "/lark/approval/formData", page: _this.data.routeURL, code: res.code, input_params: postData });
            _this.triggerEvent('close');
            break;

          case 400:
          case 404:
            //report_noaction();
            showToast({ msg: res.msg })
            report_noaction({ url: "/lark/approval/formData", page: _this.data.routeURL, code: res.code, input_params: postData })
            break;
          default:
            //report_default();
            report_default({ url: "/lark/approval/formData", page: _this.data.routeURL, code: res.code, input_params: postData })
        }
        this.loading(false);

      }, err => {
        console.log("err,", err);
        this.loading(false);

      })
    },

    handelBs_initForm(res) {
      let _listEditArray = res.data;

      _listEditArray.map((item, index) => {

        // 开户行名称, 收款账号
        if (item.type == "radioV2" && (item.custom_id == "bank_id_necessary" || item.custom_id == "bank_number_id_necessary")) {
          item.disabled = true;
        }

      })
      // console.log('_listEditArray========', _listEditArray);

      this.setData({
        listEditArray: _listEditArray,
        applyList: res.data,
      })
    },

    // 审批流程
    getInstancePreview() {
      let _this = this;
      let { approval_code, formData } = _this.data;
      let _formData = JSON.stringify(formData);

      console.log('_formData===========', _formData);

      let postData = {
        uc_uid: app.globalData.uc_uid,
        approval_code: approval_code,
        form_data: _formData,
      }
      this.loading(true);

      instancePreview(postData).then(res => {

        switch (res.code) {
          case 200:
            // update UI
            _this.handelBs_getInstancePreview(res);
            break;
          case 400:
          case 404:
            //report_noaction();
            showToast({ msg: res.msg })
            report_noaction({ url: "/lark/approval/instance/preview", page: _this.data.routeURL, code: res.code, input_params: postData })
            break;
          default:
            //report_default();
            report_default({ url: "/lark/approval/instance/preview", page: _this.data.routeURL, code: res.code, input_params: postData })
        }
        this.loading(false);

      }, err => {
        console.log("err,", err);
        this.loading(false);

      })
    },

    handelBs_getInstancePreview(res) {
      let _stepList = res.data;


      this.setData({
        stepList: _stepList,
        isSubmit: false,
        buttonText:'提交'
      })

    },

    // 审批提交
    getApplyList() {
      let _this = this;
      let { approval_code, formData } = this.data;
      let _formData = JSON.stringify(formData);

      this.loading(true);

      let postData = {
        uc_uid: app.globalData.uc_uid,
        approval_code: approval_code,
        form_data: _formData,
      }

      instanceInsert(postData).then(res => {

        switch (res.code) {
          case 200:
            // update UI
            _this.handelBs_getApplyList(res);
            break;
          case 400:
          case 401:
          case 404:
            //report_noaction();
            showToast({ msg: res.msg })
            report_noaction({ url: "/lark/approval/instance/insert", page: _this.data.routeURL, code: res.code, input_params: postData })
            break;
          default:
            //report_default();
            report_default({ url: "/lark/approval/instance/insert", page: _this.data.routeURL, code: res.code, input_params: postData })
        }
        this.loading(false);

      }, err => {
        console.log("err,", err);
        this.loading(false);

      })
    },

    handelBs_getApplyList() {
      showToast({ msg: '提交成功' });
      this.setData({
        isSubmit: true
      });
      this.triggerEvent('close')
    },

    // 审批文件上传
    getInstanceUploadFile(path, name, type, index) {
      let _this = this;
      this.loading(true);

      let postData = {
        uc_uid: app.globalData.uc_uid,
        name: name,
        type: type,
        file_url: path
      }

      instanceUploadFile(postData).then(res => {

        switch (res.code) {
          case 200:
            // update UI
            _this.handelBs_getInstanceUploadFile(res, index);
            break;
          case 400:
          case 404:
            //report_noaction();
            showToast({ msg: res.msg })
            report_noaction({ url: "/lark/approval/instance/uploadFile", page: _this.data.routeURL, code: res.code, input_params: postData })
            break;
          default:
            //report_default();
            report_default({ url: "/lark/approval/instance/uploadFile", page: _this.data.routeURL, code: res.code, input_params: postData })
        }
        this.loading(false);

      }, err => {
        console.log("err,", err);
        this.loading(false);

      })
    },

    handelBs_getInstanceUploadFile(res, index) {
      // console.log('handelBs_getInstanceUploadFile', res);
      showToast({ msg: '上传成功' });

      let { listEditArray } = this.data;
      let _value = listEditArray[index].value && listEditArray[index].value.length > 0 ? listEditArray[index].value : []
      // let _value = res.data.split(',');
      _value.push(res.data)

      console.log('_value', _value)

      this.setData({
        [`listEditArray[${index}].value`]: _value,
      })

    },
  }
})