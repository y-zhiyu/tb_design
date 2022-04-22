const app = getApp();
import { imgUrl, isdebug } from "../../../config";
var uploadImage = require("../../../utils/uploadImg/uploadImg.js");
import { loading, dataStatus, showToast, goToPage, setBatTitle, onLoadPublicMethods, } from "../../../utils/interactive";
import { formatDATESub, getUseHours, formatSlice, isMobile } from "../../../utils/util.js";

import { recordList, recordAdd, contactSelect, businessRecordList, businessRecordAdd, businessArrySelect } from "../../../utils/http";
import { report_noaction, report_default } from "../../../utils/reprot";

Component({
    /**
     * 组件的属性列表
     */
    properties: {

        publicImgUrl: {
            type: String,
            value: ''
        },
        themColor:{
            type:Object,
            value:null
        },

        viewType: {
            type: String,
            value: '',
            observer(newVal, oldVal, changedPath) {
                console.log('viewType----', this.data.viewType);
                let _viewType = this.data.viewType;

                if (_viewType == 'customer') {
                    this.getRecordList();
                    this.getContactSelect(this.data.recordId);

                } else if (_viewType == 'contact') {
                    this.getRecordList();

                } else if (_viewType == 'business') {
                    this.getBusinessRecordList();
                    // this.getBusinessSelect(this.data.recordId);

                }
            }
        },

        recordId: {
            type: Number,
            value: '',
            observer(newVal, oldVal, changedPath) {
            }
        },
        customerId: {
            type: Number,
            value: '',
            observer(newVal, oldVal, changedPath) {
                // console.log('customerId----', this.data.customerId);
            }
        },

        editStatus: {
            type: Boolean,
            value: false,
        }

    },

    ready() {
        // this.getRecordList();
        // this.getContactSelect(this.data.recordId);
    },

    /**
     * 组件的初始数据
     */
    data: {
        selectArray: [],
        resArray: [],
        imgArr: [],
        index: 0,
        recordList: [],
        modalTitle: '',
        addRecordStatus: false,
        detailList: [
            { title: '联系人', value: '', },
            { title: '跟进内容', value: '', },
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {

        getClearData() {
            this.setData({
                selectedValue: '',
                selectedId: "",
                textareaValue: "",
                imgArr: []
            })
        },
        getSelectChange(e) {
            // console.log('e------------', e);
            let _item = e.detail.item;
            this.setData({
                selectedId: _item.id,
                selectedValue: _item.value,
            })
        },

        getInputChange(e) {
            // console.log('e------------', e);
            this.setData({
                textareaValue: e.detail.value
            })

        },

        closeModal(e) {
            // let modaltype = e.currentTarget.dataset.modaltype;
            let { modaltype } = this.data;
            console.log('modaltype=========', modaltype)

            if (modaltype == 'recordAdd') {
                this.setData({
                    addRecordStatus: false,
                    modaltype: modaltype
                })
                this.getClearData();

            } else if (modaltype == 'recordList') {
                this.setData({
                    detailRecordStatus: false,
                    modaltype: modaltype
                })

            }
        },

        // 提交
        getSubmit() {
            let { viewType, textareaValue } = this.data;

            console.log('viewType===================', viewType);
            console.log('textareaValue==========', textareaValue)

            if (!textareaValue) {
                showToast({ msg: '请输入跟进内容' })

                return;
            }

            if (viewType == 'customer' || viewType == 'contact') {
                this.getRecordAdd();

            } else if (viewType == 'business') {
                this.getBusinessRecordAdd();

            }

        },

        // 新建
        getAddModal(e) {

            let modaltype = e.currentTarget.dataset.modaltype;
            let { viewType } = this.data;

            console.log('modaltype----------------', modaltype);

            if (modaltype == 'recordAdd') {
                let _str = '';

                if (viewType == 'customer' || viewType == 'contact') {
                    _str = '新建跟进记录';

                } else if (viewType == 'business') {
                    _str = '新建验证记录';

                }
                this.setData({
                    modalTitle: _str,
                    addRecordStatus: true,
                    modaltype: modaltype
                })
                this.getClearData();

            } else if (modaltype == 'recordList') {
                let { item } = e.currentTarget.dataset;
                console.log('item', item)
                let { detailList } = this.data;
                let _imgArr = [];
                let _str = '';


                if (viewType == 'customer' || viewType == 'contact') {
                    detailList[0].title = '联系人';
                    detailList[0].value = item.ac_contact_name ? item.ac_contact_name : '无';
                    detailList[1].value = item.follow_content ? item.follow_content : "";
                    // _imgArr = JSON.parse(item.follow_images);
                    _imgArr = item.follow_images;
                    _str = '跟进记录详情';


                } else if (viewType == 'business') {
                    detailList[0].title = '商机';
                    detailList[0].value = item.lead_name;
                    detailList[1].value = item.verify_content;
                    _imgArr = item.verify_images;
                    _str = '验证记录详情';

                }
                console.log('_imgArr----------', _imgArr)

                this.setData({
                    modaltype: modaltype,
                    detailRecordStatus: true,
                    modalTitle: _str,
                    imgArr: _imgArr,
                    detailList: detailList
                })
            }
        },

        // 以下是API

        // 跟进记录列表
        getRecordList() {
            let _this = this;
            loading(true);
            let { viewType, recordId } = _this.data;
            // console.log('viewType----------', viewType)

            let postData = {
                uc_uid: app.globalData.uc_uid,
            }

            if (viewType == 'customer') {
                postData.ac_account_id = recordId;


            } else if (viewType == 'contact') {
                postData.ac_contact_id = recordId;

            }
            console.log('postData-----------', postData);


            recordList(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getRecordList(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/follow/list", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        // _this.clearProBroadcat()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/follow/list", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getRecordList(res) {
            console.log('handelBs_getRecordList=========', res.data.list);
            let _itemArray = res.data.list;
            _itemArray.map((item, index) => {

                item.follow_images = JSON.parse(item.follow_images && item.follow_images);
            })
            console.log('_itemArray', _itemArray);

            this.setData({
                recordList: _itemArray,
            })

        },

        // 添加跟进记录
        getRecordAdd() {
            let _this = this;
            let { textareaValue, recordId, imgArr, selectedId, viewType, customerId } = _this.data;
            loading(true);

            // console.log(' _this.data.recordId----', _this.data.recordId);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                follow_content: textareaValue,
                follow_images: imgArr,
            }
            if (viewType == 'customer') {
                postData.ac_account_id = recordId;
                postData.ac_contact_id = selectedId;

            } else if (viewType == 'contact') {
                postData.ac_account_id = customerId;
                postData.ac_contact_id = recordId;
            }

            recordAdd(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getRecordAdd(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/follow/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        // _this.clearProBroadcat()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/follow/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getRecordAdd(res) {
            console.log('handelBs_getRecordAdd=========', res);
            // let modaltype = 'recordAdd';

            // this.triggerEvent('close', {
            //     modaltype
            // });
            this.closeModal();
            this.getRecordList();
        },


        // 获取联系人-------select列表
        getContactSelect(id) {
            let _this = this;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: id
            }

            contactSelect(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getContactSelect(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/contact/accountContact", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearContactSelect();
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/contact/accountContact", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getContactSelect(res) {
            let _this = this;
            _this.setData({
                selectArray: res.data
            })

        },

        clearContactSelect() {
            this.setData({
                selectArray: []
            });
        },


        // 商机API


        // 商机-列表
        getBusinessRecordList() {
            console.log("2e22423423423423")
            let _this = this;
            loading(true);
            let { viewType, recordId } = _this.data;
            // console.log('viewType----------', viewType)

            let postData = {
                uc_uid: app.globalData.uc_uid,
                lead_id: recordId
            }

            console.log('postData-----------', postData);

            businessRecordList(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getBusinessRecordList(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/lead/verify/list", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        // _this.clearProBroadcat()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/lead/verify/list", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getBusinessRecordList(res) {
            console.log('handelBs_getRecordList=========', res.data.list);
            let _itemArray = res.data.list;
            _itemArray.map((item, index) => {

                item.verify_images = JSON.parse(item.verify_images && item.verify_images);
            })
            // console.log('_itemArray', _itemArray);

            this.setData({
                recordList: _itemArray,
            })
        },


        // 商机新增
        getBusinessRecordAdd() {
            let _this = this;
            let { textareaValue, imgArr, recordId, } = _this.data;
            loading(true);

            // console.log(' _this.data.recordId----', _this.data.recordId);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                lead_id: recordId,
                verify_content: textareaValue,
                verify_images: imgArr,
            }

            businessRecordAdd(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getBusinessRecordAdd(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/verify/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        // _this.clearProBroadcat()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/lead/verify/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getBusinessRecordAdd(res) {
            console.log('handelBs_getBusinessRecordAdd=========', res);
            let { viewType } = this.data;

            this.closeModal();
            if (viewType == 'customer' || viewType == 'contact') {
                this.getRecordList();

            } else if (viewType == 'business') {
                this.getBusinessRecordList();
                this.triggerEvent('refresh');
            }
        },


        // 获取联系人-------select列表
        getContactSelect(id) {
            let _this = this;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: id
            }

            contactSelect(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getContactSelect(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/contact/accountContact", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearContactSelect();
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/contact/accountContact", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getContactSelect(res) {
            let _this = this;
            _this.setData({
                selectArray: res.data
            })

        },

        clearContactSelect() {
            this.setData({
                selectArray: []
            });
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
            let { index, resArray, imgArr } = _this.data;

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

        // 商机select列表
        getBusinessSelect(id) {

            let _this = this;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: id
            }

            businessArrySelect(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getBusinessSelect(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/listForSelect", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearBusinessSelect();
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/lead/listForSelect", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getBusinessSelect(res) {
            let _this = this;
            _this.setData({
                selectArray: res.data
            })
        },

        clearBusinessSelect() {
            this.setData({
                selectArray: []
            });
        },


    }
})