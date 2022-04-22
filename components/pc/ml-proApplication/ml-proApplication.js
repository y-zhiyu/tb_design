const app = getApp();
import { imgUrl, isdebug } from "../../../config";
var uploadImage = require("../../../utils/uploadImg/uploadImg.js");
import { loading, dataStatus, showToast, goToPage, setBatTitle, onLoadPublicMethods, } from "../../../utils/interactive";
import { formatDATESub, getUseHours, formatSlice, isMobile } from "../../../utils/util.js";

import { leadApply, approvalInstanceList } from "../../../utils/http";
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
        listEditArray: {
            type: Array,
            value: []
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
                    // console.log("3456789", this.data.recordList)
                    // this.getBusinessRecordList();
                    // this.getBusinessSelect(this.data.recordId);
                    this.clearRecordList()
                    this.getApprovalInstanceList()

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
        showModal: false,
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
            // console.log("发起立项申请")
            let _this = this;
            tt.showModal({
                title: "确认发起立项申请吗？",
                success: (res) => {
                    // console.log("res=>",res)
                    if (res.confirm) {
                        _this.busLeadApply()
                    }
                }
            })

        },

        // 以下是API

        // 检查必填事项
        inspectNec() {
            let arr = []
            let _this =this;
            let { listEditArray } = this.data
            for (let i = 0; i < listEditArray.length; i++) {
                let o = listEditArray[i];
                if (o.necessary && (o.viewType == "input" || o.viewType == "textarea") && !o.value) {
                    // showToast({ msg: `请填写${o.title}` })
                    arr.push(o.type)
                    // return
                }
                if (o.necessary && (o.viewType == "select" || o.viewType == "radio") && o.selectedId < 0) {
                    // showToast({ msg: `请填写${o.title}` })
                    arr.push(o.type)
                    // return
                }
            }
            console.log("inspectNec:", arr)

            if (arr.length > 0) {
                this.setData({
                    inspectNecArr:arr,
                    busLeadApplyErrorMsg: "信息不完整"
                }, () => {
                    this.openShowModal()
                })
            }else{
                _this.getAddModal()
            }







        },





        //发起立项申请审批
        busLeadApply() {
            let _this = this;
            loading(true);
            let { viewType, recordId } = _this.data;
            // console.log("viewType.recordId",viewType, recordId )
            let postData = {
                uc_uid: app.globalData.uc_uid,
                lead_id: recordId
            }

            leadApply(postData).then((res) => {
                //测试使用
                // res.code = 400
                // res.is_complete=true
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_busLeadApply(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/apply", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 401:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/apply", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    //     // _this.clearProBroadcat()
                    //     if (!res.is_complete) {
                    //         this.handlesBusLeadApplyError(res)

                    //     } else {
                    //         showToast({ msg: res.msg })
                    //     }
                    case 406:
                        // _this.clearProBroadcat()
                            this.handlesBusLeadApplyError(res)
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/lead/apply", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })

        },
        handelBs_busLeadApply(res) {
            // console.log("handelBs_busLeadApply:",res)
            showToast({ msg: '立项申请发起成功' })
            let _this = this;
            let timer = setTimeout(() => {
                _this.getApprovalInstanceList()
            }, 2000)

        },
        handlesBusLeadApplyError(res) {
            this.setData({
                busLeadApplyErrorMsg: res.msg
            }, () => {
                this.openShowModal()
            })

        },

        // 跟进记录列表
        getApprovalInstanceList() {
            let _this = this;
            loading(true);
            let { viewType, recordId } = _this.data;
            // console.log('viewType----------', viewType)

            let postData = {
                uc_uid: app.globalData.uc_uid,
                lead_id: recordId
            }

            approvalInstanceList(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getApprovalInstanceList(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/approvalInstanceList", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearRecordList()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/lead/approvalInstanceList", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getApprovalInstanceList(res) {
            console.log('getApprovalInstanceList=========', res);
            let recordList = res.data
            console.log("handelBs_getApprovalInstanceList", recordList)

            // item.fs_instance_status=='APPROVED‘
            // item.fs_instance_status=='PENDING'

            let hasPassed = false
            let temp = recordList.findIndex((o, i) => {
                return o.fs_instance_status == "APPROVED"
            })
            let temp1 = recordList.findIndex((o, i) => {
                return o.fs_instance_status == 'PENDING'
            })


            hasPassed = (temp > -1 || temp1 > -1) ? true : false
            console.log("temp", temp, hasPassed)
            // let _itemArray = res.data.list;
            // _itemArray.map((item, index) => {

            //     item.follow_images = JSON.parse(item.follow_images && item.follow_images);
            // })
            // console.log('_itemArray', _itemArray);

            this.setData({
                recordList,
                hasPassed
            })

        },
        clearRecordList() {
            this.setData({
                recordList: [],

            })
        },


        // // 添加跟进记录
        // getRecordAdd() {
        //     let _this = this;
        //     let { textareaValue, recordId, imgArr, selectedId, viewType, customerId } = _this.data;
        //     loading(true);

        //     // console.log(' _this.data.recordId----', _this.data.recordId);

        //     let postData = {
        //         uc_uid: app.globalData.uc_uid,
        //         follow_content: textareaValue,
        //         follow_images: imgArr,
        //     }
        //     if (viewType == 'customer') {
        //         postData.ac_account_id = recordId;
        //         postData.ac_contact_id = selectedId;

        //     } else if (viewType == 'contact') {
        //         postData.ac_account_id = customerId;
        //         postData.ac_contact_id = recordId;
        //     }

        //     recordAdd(postData).then((res) => {
        //         switch (res.code) {
        //             case 200:
        //                 // update UI
        //                 _this.handelBs_getRecordAdd(res);
        //                 break;
        //             case 400:
        //                 //report_noaction();
        //                 showToast({ msg: res.msg })
        //                 report_noaction({ url: "/lark/account/follow/create", page: _this.data.routeURL, code: res.code, input_params: postData })
        //                 break;
        //             case 404:
        //                 // _this.clearProBroadcat()
        //                 break;
        //             default:
        //                 //report_default();
        //                 report_default({ url: "/lark/account/follow/create", page: _this.data.routeURL, code: res.code, input_params: postData })
        //         }

        //         loading(false);
        //     }, (err) => {

        //         loading(false);
        //     })
        // },

        // handelBs_getRecordAdd(res) {
        //     console.log('handelBs_getRecordAdd=========', res);
        //     // let modaltype = 'recordAdd';

        //     // this.triggerEvent('close', {
        //     //     modaltype
        //     // });
        //     this.closeModal();
        //     this.getRecordList();
        // },



        openShowModal() {
            this.setData({
                showModal: true
            })
        },

        closeShowModal() {
            this.setData({
                showModal: false
            })
        },

        btnSubmit() {
            // console.log("完善信息")
            let  { inspectNecArr } =this.data;
            this.closeShowModal()
            this.triggerEvent("busPerfectInfo",{inspectNecArr,})
        },

        btnCancel() {
            console.log("取消")
            this.closeShowModal()
        },

        clickItem(e) {
            let item = e.currentTarget.dataset.item
            let { fs_instance_code } = item
            let schema = `https://applink.feishu.cn/client/mini_program/open?mode=sidebar-semi&appId=cli_9cb844403dbb9108&path=pages/detail/index?instanceId=${fs_instance_code}`
            tt.openSchema({
                schema,
                external: true,
                success(res) {
                    console.log(JSON.stringify(res));
                },
                fail(res) {
                    console.log(`openSchema fail: ${JSON.stringify(res)}`);
                }
            });
        },



    }
})