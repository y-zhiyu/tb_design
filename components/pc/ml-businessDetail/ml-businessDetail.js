const app = getApp();
import { imgUrl, isdebug } from "../../../config";
import { loading, dataStatus, showToast, goToPage, setBatTitle, onLoadPublicMethods, } from "../../../utils/interactive";
import { formatDATESub, getUseHours, formatSlice, isChinaNameValue, isMobile } from "../../../utils/util.js";

import { businessDetail, businessEdit, businessAdd, businessSelect, customerSelect, contactSelect, businessLog, contactsAdd, customerSelectArray, fastStore } from "../../../utils/http";
import { report_noaction, report_default } from "../../../utils/reprot";
var uploadFile = require('../../../utils/uploadFile/uploadFile.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        publicImgUrl: {
            type: String,
            value: ''
        },
        themColor: {
            type: Object,
            value: null
        },

        businessStatus: {
            type: Boolean,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                // console.log('businessStatus-----', this.data.businessStatus)
            },
        },

        businessType: {
            type: String,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                console.log('businessType-----', this.data.businessType);
                let { businessType } = this.data;
                let { contactType, businessItem, listEditArray } = this.data;

                if (businessType == 'add') {

                    let _statusIndex = listEditArray.findIndex((o, i) => { return o.type == 'status' })
                    let _ac_contact_idIndex = listEditArray.findIndex((o, i) => { return o.type == 'ac_contact_id' })


                    this.setData({
                        [`listEditArray[${_statusIndex}].isShow`]: false,
                        [`listEditArray[${_ac_contact_idIndex}].selectArray`]: [],
                        emptyStatus: true
                    });

                    this.setData({
                        editStatus: true,
                        radioTabType: 1
                    }, () => {
                        businessItem.status = 1;
                        this.setData({
                            businessItem: businessItem,
                            // [`listEditArray[11].value`]: '有效',
                            // [`listEditArray[11].selectedId`]: 1,
                        })
                        // console.log('businessItem==========', businessItem);
                        // select下拉框
                        this.getBusinessSelectArray();
                    });

                    this.getClearData();
                    this.getCustomerSelect();

                } else if (businessType == 'detail') {
                    this.getBusinessSelectArray();
                    this.getBusinessLog();
                    this.getBusinessDetail();
                }



            },
        },
        businessId: {
            type: Number,
            value: ''
        },
    },

    ready() {
        this.setData({
            defaultAvatar: this.data.publicImgUrl + '/img/pcPAlark/pc_upload_avaturl.png',
        })

    },

    /**
     * 组件的初始数据
     */
    data: {
        scroll: true,
        scrollView: "",

        editStatus: false,// 编辑按钮
        qcAddContacts: false, //快速创建联系人
        qcAddCustomer: false, //快速创建客户

        // 客户详情
        customerDetailList: [
            { viewType: "input", title: '客户来源', value: '', type: "ac_account_source_id", },
            { viewType: "input", title: '重要程度', value: '', type: "ac_account_priority_id", },
            { viewType: "input", title: '客户阶段', value: '', type: "ac_account_stage", },
            { viewType: "input", title: '内部备注', value: '', type: "memo", },
            { viewType: "input", title: '负责人', value: '', type: "ac_account_assigned_to", },
            { viewType: "input", title: '座机', value: '', type: "ac_account_tel", },
            { viewType: "input", title: '手机', value: '', type: "ac_account_mobile", },
            { viewType: "input", title: '邮箱', value: '', type: "ac_account_email", },
            { viewType: "input", title: '网站', value: '', type: "ac_account_website", },
            { viewType: "input", title: '详细地址', value: '', type: "ac_account_splice_addr", },
        ],

        // 联系人详情
        contactDetailList: [
            { viewType: "input", title: '手机', value: '', type: "ac_contact_mobile" },
            { viewType: "input", title: '职位', value: '', type: "ac_contact_position" },
            { viewType: "input", title: '渠道', value: '', type: "ac_contact_channel" },
            { viewType: "input", title: '内部备注', value: '', type: "memo" },
        ],

        // 新建/编辑
        listEditArray: [
            { id: 0, isShow: true, placeType: 'left', viewType: "input", title: '商机名称', value: '', type: "lead_name", placeholder: "请输入", necessary: true },
            { id: 1, isShow: true, placeType: 'left', viewType: "input", title: '商机地址', value: '', type: "lead_addr", placeholder: "请输入", necessary: true },
            { id: 2, isShow: true, placeType: 'left', viewType: "select", title: '所属客户', value: '', type: "ac_account_id", selectArray: [], selectedId: -1, necessary: true, placeholder: "请选择/输入", isSearchOpaction: true, isSearchOpactionText: '添加客户' },
            { id: 3, isShow: true, placeType: 'left', viewType: "select", title: '客户联系人', value: '', type: "ac_contact_id", selectArray: [], selectedId: -1, necessary: true, isOpation: true, errorText: '', placeholder: "请选择/输入", },
            { id: 3, isShow: true, placeType: 'left', viewType: "select", title: '积木业务', value: '', type: "lead_salesman", selectArray: [], selectedId: -1, necessary: false, errorText: '', placeholder: "请选择", },
            { id: 3, isShow: true, placeType: 'left', viewType: "select", title: '积木商务', value: '', type: "lead_commerce", selectArray: [], selectedId: -1, necessary: false, errorText: '', placeholder: "请选择", },
            { id: 4, isShow: true, placeType: 'left', viewType: "input", title: '商机来源', value: '', type: "lead_source", placeholder: "请输入", necessary: true },
            { id: 5, isShow: true, placeType: 'left', viewType: "select", title: '商机类型', value: '', type: "lead_type", selectArray: [], selectedId: -1, necessary: true },
            { id: 6, isShow: true, placeType: 'left', viewType: "select", title: '合作方式', value: '', type: "lead_cooperation_type", selectArray: [], selectedId: -1, necessary: true },
            {
                id: 7, isShow: true,
                placeType: 'right', viewType: "radio", title: '是否样板间', selectedId: -1, type: "lead_is_templet",
                radioTabs: [
                    { id: 1, name: '是', type: "yes" },
                    { id: 0, name: '否', type: "no" },
                ],
                radioTabType: "", necessary: true
            },

            { id: 8, isShow: true, placeType: 'right', viewType: "input", title: '品牌', value: '', type: "lead_brand", placeholder: "请输入", necessary: true },
            { id: 9, isShow: true, placeType: 'right', viewType: "input", title: '规模', value: '', type: "lead_scale", placeholder: "请输入房间数、面积", necessary: true },
            { id: 10, isShow: true, placeType: 'right', viewType: "input", title: '预估产值', value: '', type: "lead_expected_revenue", placeholder: "请输入", inputType: 'number', necessary: true },
            { id: 11, isShow: true, placeType: 'right', viewType: "input", title: '预计进场', value: '', type: "lead_expect_entry_date", placeholder: "请输入", picker: true, isSlot: false, necessary: true },
            { id: 13, isShow: true, placeType: 'right', viewType: "textarea", title: '备注', value: '', type: "lead_desc", necessary: true, maxlength: "512", necessary: true, errorText: '' },
            { id: 14, isShow: true, placeType: 'right', viewType: "enclosure", title: '附件', value: '', type: "lead_attach_prj_base_info", promptText: '仅支持上传doc、docx、xls、xlsx格式的文件' },
            { id: 12, isShow: false, placeType: 'right', viewType: "select", title: '商机阶段', value: '', type: "lead_stage", selectArray: [], selectedId: -1 },

            {
                id: 14, isShow: false, placeType: 'right', viewType: "radio", title: '状态', selectedId: -1, type: "status",
                radioTabs: [
                    { id: 0, name: '无效', type: "no" },
                    { id: 1, name: '有效', type: "yes" },
                ],
                radioTabType: "", necessary: ''
            },

        ],

        contactsArray: [
            { id: 0, isShow: true, placeType: 'left', viewType: "input", title: '姓名', value: '', type: "ac_contact_name", placeholder: "请输入", necessary: true },
            { id: 1, isShow: true, placeType: 'left', viewType: "input", title: '联系方式', value: '', type: "ac_contact_mobile", placeholder: "请输入", maxlength: 11, necessary: true, inputType: "number", length: 11 },
            { id: 2, isShow: true, placeType: 'left', viewType: "input", title: '职位', value: '', type: "ac_contact_position", placeholder: "请输入", necessary: true, isLimit: false },
        ],

        qcCustomerArray: [
            { id: 0, isShow: true, placeType: 'left', viewType: "input", title: '客户名称', value: '', type: "ac_account_name", placeholder: "请输入", necessary: true },
            { id: 6, isShow: true, placeType: 'left', viewType: "select", title: '客户来源', value: '', type: "ac_account_source_id", selectArray: [], selectedId: -1, necessary: true, isOpation: false, },
        ],
        qcContactsArray: [
            { id: 0, isShow: true, placeType: 'left', viewType: "input", title: '姓名', value: '', type: "ac_contact_name", placeholder: "请输入", necessary: true },
            { id: 1, isShow: true, placeType: 'left', viewType: "input", title: '联系方式', value: '', type: "ac_contact_mobile", placeholder: "请输入", maxlength: 11, necessary: true, inputType: "number", length: 11 },
            { id: 2, isShow: true, placeType: 'left', viewType: "input", title: '职位', value: '', type: "ac_contact_position", placeholder: "请输入", necessary: true, isLimit: false },
        ],



        businessItem: {},
        starCount: 0,
        customerDetailStatus: false,
        contactDetailStatus: false,
        customerDetail: {},// 客户详情
        contactDetail: {},// 联系人详情
        tabList: [
            { id: 0, text: "商机日志", type: "businessLog", status: "true" },
            { id: 1, text: "验证记录", type: "verification", status: "true" },
            { id: 2, text: "踏勘记录", type: "investigation", status: "true" },
            { id: 3, text: "立项申请", type: "proApplication", status: "true" },
        ],
        tabActiveIdx: 0,
        tabsType: "businessLog",
        businessLogList: [],
        radioTabs: [
            { id: 1, name: '新建', type: "create" },
            { id: 2, name: '验证', type: "verification" },
            { id: 3, name: '踏勘', type: "prospecting" },
            { id: 4, name: '赢得', type: "gain" },
        ],
        radioTabType: '1',
        emptyStatus: true,
    },

    /**
     * 组件的方法列表
     */
    methods: {

        // 初始化-------->清空input/select的值,
        getClearData() {
            let { listEditArray, businessItem } = this.data;

            for (let i = 0; i < listEditArray.length; i++) {
                let _str = '';
                _str = 'listEditArray[' + i + '].value';
                _selectedId = 'listEditArray[' + i + '].selectedId';

                if (listEditArray[i].viewType == "radio") {
                    let _radioTabType = 'listEditArray[' + i + '].radioTabType';
                    this.setData({
                        [_radioTabType]: '',
                    })
                }
                this.setData({
                    [_str]: '',
                    [_selectedId]: -1,
                    businessItem: {},
                    // [_selectArray]: []
                })
            }
            // console.log("listEditArray333333333:", listEditArray)
        },
        // 返回
        getBack() {

            let item = {
                type: 'business',
                backType: this.data.businessType
            }
            this.triggerEvent('back', { item });
        },

        // 刷新
        getRefresh() {
            console.log('刷新===========');
            this.getBusinessDetail();

        },

        // 编辑
        getEdit() {
            console.log('businessType', this.data.businessType)

            this.setData({
                editStatus: true,
            });
            this.getCustomerSelect();
            this.getBusinessSelectArray();
            this.getBusinessDetail();
            this.changeBusStatus(true)
        },
        changeBusStatus(show) {
            let { listEditArray } = this.data;
            let statusIndex = listEditArray.findIndex((o, i) => { return o.type == 'status' })
            let lead_stageIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_stage' })
            this.setData({
                [`listEditArray[${statusIndex}].isShow`]: show,
                [`listEditArray[${lead_stageIndex}].isShow`]: show
            });
        },

        // input 输入框change
        getInputChange(e) {
            console.log(e);
            let { listEditArray, contactsArray, qcCustomerArray, qcContactsArray } = this.data;
            let { type, arrytype } = e.currentTarget.dataset;
            let { value } = e.detail;
            // console.log('value---------', value)


            if (arrytype == 'contactsArray') {

                let currIndex = contactsArray.findIndex((o, i) => { return o.type == type })
                this.setData({
                    [`contactsArray[${currIndex}].value`]: value
                })

            } else if (arrytype == 'qcContactsArray') {
                let currIndex = qcContactsArray.findIndex((o, i) => { return o.type == type })
                this.setData({
                    [`qcContactsArray[${currIndex}].value`]: value
                })

            } else if (arrytype == 'qcCustomerArray') {
                let currIndex = qcCustomerArray.findIndex((o, i) => { return o.type == type })
                this.setData({
                    [`qcCustomerArray[${currIndex}].value`]: value
                })

            } else {

                // 商机来源判断(只输入中文)
                if (type == 'lead_source') {
                    // value = isChinaNameValue(value);
                    let lead_sourceIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_source' })
                    this.setData({
                        [`listEditArray[${lead_sourceIndex}].value`]: value
                    })
                }

                if (type == 'lead_desc') {
                    let list = this.clearErrorText(listEditArray, type)
                    this.setData({ listEditArray: list })
                }
                let currIndex = listEditArray.findIndex((o, i) => { return o.type == type })
                this.setData({
                    [`listEditArray[${currIndex}].value`]: value
                })

                // this.getEditItem(type, value);
            }

        },

        // select change
        getSelectChange(e) {
            console.log(e);
            let { listEditArray, qcCustomerArray } = this.data;
            let { type, index, placetype, arrytype } = e.currentTarget.dataset;
            let { value, id } = e.detail.item;
            let { businessItem } = this.data;

            businessItem.ac_contact_id = '';

            switch (arrytype) {
                case 'qcCustomerArray':
                    this.setData({
                        [`qcCustomerArray[${index}].value`]: value,
                        [`qcCustomerArray[${index}].selectedId`]: id,
                        businessItem: businessItem
                    })

                    break;


                default:


                    if (type == 'ac_contact_id') {
                        let list = this.clearErrorText(listEditArray, type)
                        this.setData({ listEditArray: list })
                    }
                    this.setData({
                        [`listEditArray[${index}].value`]: value,
                        [`listEditArray[${index}].selectedId`]: id,
                        businessItem: businessItem
                    })

                    this.getEditItem(type, id);
                    console.log('type=========', type);


                    if (type == 'ac_account_id') {
                        let ac_contact_idIndex = listEditArray.findIndex((o, i) => { return o.type == 'ac_contact_id' })
                        this.setData({
                            [`listEditArray[${ac_contact_idIndex}].value`]: "",
                            [`listEditArray[${ac_contact_idIndex}].selectedId`]: "",
                            emptyStatus: false,
                        }, () => {

                            this.getContactSelect(id);
                        })

                    };
                    break;
            }

        },
        // select搜索值------>
        getSelectInputChange(e) {
            // console.log('e------------', e);
            let { type, index, placetype } = e.currentTarget.dataset;
            let _value = e.detail.value;

            this.setData({
                [`listEditArray[${index}].value`]: _value,
                [`listEditArray[${index}].selectedId`]: '',
            })
            // console.log('listRightArray', this.data.listRightArray);

            this.getEditItem(type, '');

        },

        getEditItem(type, value) {
            let { businessItem } = this.data;
            businessItem[type] = value;
            this.setData({
                businessItem: businessItem
            });

        },

        // tabs选择框
        selectTab(e) {
            let { curidx, type } = e.detail;

            this.setData({
                tabActiveIdx: curidx,
                tabsType: type
            });

            if (type == 'businessLog') {
                this.getBusinessLog();
            }
            if (type == 'proApplication') {
                console.log("立项申请:")
            }
        },

        // 商机======>取消
        getCancel(e) {

            let { businessType } = this.data;

            if (businessType == 'add') {
                this.getBack();
            } else {
                this.setData({
                    editStatus: false
                });
            }
            // this.getBusinessDetail();
        },


        // 商机====>保存
        getBusinessubmit() {

            let { businessItem, businessType, listEditArray } = this.data;
            // console.log('businessItem================', businessItem)

            for (let i = 0; i < listEditArray.length; i++) {
                let o = listEditArray[i];
                if (o.necessary && (o.viewType == "input" || o.viewType == "textarea") && !o.value) {
                    showToast({ msg: `请填写${o.title}` })
                    return
                }
                if (o.necessary && (o.viewType == "select" || o.viewType == "radio") && o.selectedId < 0) {
                    showToast({ msg: `请填写${o.title}` })
                    return
                }
            }




            if (businessType == 'add') {
                this.getBusinessAdd();

            } else if (businessType == 'detail') {

                console.log("更新:", listEditArray)

                this.getBusinessEdit();
            }
        },



        // 重要程度
        getStarsChange(e) {
            let _starCount = e.detail.value;
            // console.log('_starCount=============', _starCount);
            this.setData({
                starCount: _starCount
            })
        },

        // 客户/联系人详情
        getDetail(e) {
            let { modaltype } = e.currentTarget.dataset;
            this.getDataStatus(true, modaltype);
        },

        // modal------>关闭
        closeModal(e) {
            let { modaltype } = e.currentTarget.dataset;

            this.getDataStatus(false, modaltype);
        },


        getDataStatus(status, changeType) {
            if (changeType == "customerDetail") {
                this.setData({
                    customerDetailStatus: status,
                    changeType: changeType,
                    modalTitle: '客户详情'
                })
            } else if (changeType == "contactDetail") {
                this.setData({
                    contactDetailStatus: status,
                    changeType: changeType,
                    modalTitle: '客户联系人详情'
                })
            }
        },


        // picker--------date
        bindInvoiceDateChange(e) {
            console.log(e)
            let { type } = e.currentTarget.dataset;
            let { value } = e.detail;
            let { listEditArray } = this.data;

            let currInex = listEditArray.findIndex((o, i) => { return o.type == 'lead_expect_entry_date' })
            this.setData({
                [`listEditArray[${currInex}].value`]: value,
            })

            this.getEditItem(type, value);
        },

        // 删除
        getInvoiceDateDelete(e) {
            // console.log("getInvoiceDateDelete",e)
            let { type } = e.currentTarget.dataset;

            let { businessItem, listEditArray } = this.data;
            businessItem.lead_deadline_date = '';
            let currInex = listEditArray.findIndex((o, i) => { return o.type == type })

            this.setData({
                [`listEditArray[${currInex}].value`]: '',
                businessItem: businessItem
            })
        },
























        // 以下API 

        getListEditArrayIndex() {
            let { listEditArray } = this.data;
            let lead_nameIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_name' })
            let lead_addrIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_addr' })
            let ac_account_idIndex = listEditArray.findIndex((o, i) => { return o.type == 'ac_account_id' })
            let ac_contact_idIndex = listEditArray.findIndex((o, i) => { return o.type == 'ac_contact_id' })
            let lead_sourceIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_source' })
            let lead_typeIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_type' })
            let lead_cooperation_typeIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_cooperation_type' })
            let lead_is_templetIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_is_templet' })
            let lead_brandIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_brand' })
            let lead_scaleIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_scale' })
            let lead_expected_revenueIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_expected_revenue' })
            let lead_expect_entry_dateIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_expect_entry_date' })
            let lead_stageIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_stage' })
            let lead_descIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_desc' })
            let lead_attach_prj_base_infoIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_attach_prj_base_info' })

            let lead_commerceIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_commerce' })
            let lead_salesmanIndex = listEditArray.findIndex((o, i) => { return o.type == 'lead_salesman' })
            return {
                lead_nameIndex,
                lead_addrIndex,
                ac_account_idIndex,
                ac_contact_idIndex,
                lead_sourceIndex,
                lead_typeIndex,
                lead_cooperation_typeIndex,
                lead_is_templetIndex,
                lead_brandIndex,
                lead_scaleIndex,
                lead_expected_revenueIndex,
                lead_expect_entry_dateIndex,
                lead_stageIndex,
                lead_descIndex,
                lead_attach_prj_base_infoIndex,
                lead_commerceIndex,
                lead_salesmanIndex,
            }
        },

        // 商机----->新建
        getBusinessAdd() {
            let _this = this;
            let { businessItem, listEditArray } = this.data;
            // console.log("businessItem:",businessItem)

            let {
                lead_nameIndex,
                lead_addrIndex,
                ac_account_idIndex,
                ac_contact_idIndex,
                lead_sourceIndex,
                lead_typeIndex,
                lead_cooperation_typeIndex,
                lead_is_templetIndex,
                lead_brandIndex,
                lead_scaleIndex,
                lead_expected_revenueIndex,
                lead_expect_entry_dateIndex,
                lead_stageIndex,
                lead_descIndex,
                lead_attach_prj_base_infoIndex,
                lead_commerceIndex,
                lead_salesmanIndex,

            } = this.getListEditArrayIndex()

            console.log(
                lead_nameIndex,
                lead_addrIndex,
                ac_account_idIndex,
                ac_contact_idIndex,
                lead_sourceIndex,
                lead_typeIndex,
                lead_cooperation_typeIndex,
                lead_is_templetIndex,
                lead_brandIndex,
                lead_scaleIndex,
                lead_expected_revenueIndex,
                lead_expect_entry_dateIndex,
                lead_stageIndex,
                lead_descIndex,
                lead_attach_prj_base_infoIndex,
                lead_commerceIndex,
                lead_salesmanIndex,
            )



            //  { id: 0, placeType: 'left', viewType: "input", title: '商机名称', value: '', type: "lead_name", placeholder: "请输入", necessary: true },
            //             { id: 1, placeType: 'left', viewType: "input", title: '商机地址', value: '', type: "lead_addr", placeholder: "请输入", necessary: true },
            //             { id: 2, placeType: 'left', viewType: "select", title: '所属客户', value: '', type: "ac_account_id", selectArray: [], selectedId: "", necessary: true },
            //             { id: 3, placeType: 'left', viewType: "select", title: '联系人', value: '', type: "ac_contact_id", selectArray: [], selectedId: "", necessary: true },
            //             { id: 4, placeType: 'left', viewType: "input", title: '商机来源', value: '', type: "lead_source", placeholder: "请输入", necessary: true },
            //             { id: 5, placeType: 'left', viewType: "select", title: '商机类型', value: '', type: "lead_type", selectArray: [], selectedId: "", necessary: true },
            //             { id: 6, placeType: 'left', viewType: "select", title: '合作方式', value: '', type: "lead_cooperation_type", selectArray: [], selectedId: "", necessary: true },
            //             { id: 7,
            //                 placeType: 'left', viewType: "radio", title: '是否样板间', value: '', type: "lead_is_templet",
            //                 radioTabs: [
            //                     { id: 1, name: '是', type: "yes" },
            //                     { id: 2, name: '否', type: "no" },
            //                 ],
            //                 radioTabType: "yes", necessary: true
            //             },

            //             { id: 8, placeType: 'right', viewType: "input", title: '品牌', value: '', type: "lead_brand", placeholder: "请输入", necessary: true },
            //             { id: 9, placeType: 'right', viewType: "input", title: '规模', value: '', type: "lead_scale", placeholder: "请输入", necessary: true },
            //             { id: 10, placeType: 'right', viewType: "input", title: '预估产值', value: '', type: "lead_expected_revenue", placeholder: "请输入", inputType: 'number', necessary: true },
            //             { id: 11, placeType: 'right', viewType: "input", title: '预计进场时间', value: '', type: "lead_expect_entry_date", placeholder: "请输入", picker: true, isSlot: false, necessary: true },
            //             { id: 12, placeType: 'right', viewType: "select", title: '商机阶段', value: '', type: "lead_stage", selectArray: [], selectedId: "" },
            //             { id: 13, placeType: 'right', viewType: "textarea", title: '详细描述', value: '', type: "lead_desc", },



            loading(true);

            console.log(
                lead_nameIndex,
                lead_addrIndex,
                ac_account_idIndex,
                ac_contact_idIndex,
                lead_sourceIndex,
                lead_typeIndex,
                lead_cooperation_typeIndex,
                lead_is_templetIndex,
                lead_brandIndex,
                lead_scaleIndex,
                lead_expected_revenueIndex,
                lead_expect_entry_dateIndex,
                lead_stageIndex,
                lead_descIndex,
                lead_attach_prj_base_infoIndex,
                lead_commerceIndex,
                lead_salesmanIndex,
            )


            // console.log("listEditArray:", listEditArray, lead_is_templetIndex, listEditArray[lead_is_templetIndex])
            let postData = {
                uc_uid: app.globalData.uc_uid,
                lead_name: lead_nameIndex > -1 ? listEditArray[lead_nameIndex].value : '',
                lead_addr: lead_addrIndex > -1 ? listEditArray[lead_addrIndex].value : '',
                ac_account_id: ac_account_idIndex > -1 ? listEditArray[ac_account_idIndex].selectedId : '',
                ac_contact_id: ac_contact_idIndex > -1 ? listEditArray[ac_contact_idIndex].selectedId : '',
                lead_source: lead_sourceIndex > -1 ? listEditArray[lead_sourceIndex].value : '',
                lead_type: lead_typeIndex > -1 ? listEditArray[lead_typeIndex].selectedId : '',
                lead_cooperation_type: lead_cooperation_typeIndex > -1 ? listEditArray[lead_cooperation_typeIndex].selectedId : '',
                lead_is_templet: lead_is_templetIndex > -1 ? listEditArray[lead_is_templetIndex].selectedId : '',
                lead_brand: lead_brandIndex > -1 ? listEditArray[lead_brandIndex].value : '',
                lead_scale: lead_scaleIndex > -1 ? listEditArray[lead_scaleIndex].value : '',
                lead_expected_revenue: lead_expected_revenueIndex > -1 ? listEditArray[lead_expected_revenueIndex].value : '',
                lead_expect_entry_date: lead_expect_entry_dateIndex > -1 ? listEditArray[lead_expect_entry_dateIndex].value : '',
                lead_stage: lead_stageIndex > -1 ? listEditArray[lead_stageIndex].selectedId : '',
                lead_desc: lead_descIndex > -1 ? listEditArray[lead_descIndex].value : '',
                lead_attach_prj_base_info: lead_attach_prj_base_infoIndex > -1 ? listEditArray[lead_attach_prj_base_infoIndex].value : '',
                lead_commerce: lead_commerceIndex > -1 ? listEditArray[lead_commerceIndex].selectedId==-1?'' : listEditArray[lead_commerceIndex].selectedId : '',
                lead_salesman: lead_salesmanIndex > -1 ? listEditArray[lead_salesmanIndex].selectedId==-1?'' : listEditArray[lead_salesmanIndex].selectedId :'',

                // lead_expected_revenue: businessItem.lead_expected_revenue,
                // lead_probability: businessItem.lead_probability,
                // lead_deadline_date: businessItem.lead_deadline_date,
                // lead_scale: businessItem.lead_scale,
                // lead_priority: businessItem.lead_priority,
                // lead_desc: businessItem.lead_desc,
                // ac_account_id: businessItem.ac_account_id,
                // ac_contact_id: businessItem.ac_contact_id,
                // lead_source: businessItem.lead_source,
                // lead_stage: businessItem.lead_stage,
                // status: businessItem.status,
            }

            businessAdd(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getBusinessAdd(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/store", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearBusinessAdd()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/lead/store", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getBusinessAdd(res) {
            showToast({ msg: '保存成功' });
            this.getBack();

        },



        // 商机----->编辑
        getBusinessEdit() {
            let _this = this;
            // let { businessItem } = _this.data;
            let { newCustomerDetail, listEditArray } = _this.data;
            // console.log('listEditArray', listEditArray);

            let {
                lead_nameIndex,
                lead_addrIndex,
                ac_account_idIndex,
                ac_contact_idIndex,
                lead_sourceIndex,
                lead_typeIndex,
                lead_cooperation_typeIndex,
                lead_is_templetIndex,
                lead_brandIndex,
                lead_scaleIndex,
                lead_expected_revenueIndex,
                lead_expect_entry_dateIndex,
                lead_stageIndex,
                lead_descIndex,
                lead_attach_prj_base_infoIndex,
                lead_commerceIndex,
                lead_salesmanIndex,

            } = this.getListEditArrayIndex()

            // console.log(
            //     lead_nameIndex,
            //     lead_addrIndex,
            //     ac_account_idIndex,
            //     ac_contact_idIndex,
            //     lead_sourceIndex,
            //     lead_typeIndex,
            //     lead_cooperation_typeIndex,
            //     lead_is_templetIndex,
            //     lead_brandIndex,
            //     lead_scaleIndex,
            //     lead_expected_revenueIndex,
            //     lead_expect_entry_dateIndex,
            //     lead_stageIndex,
            //     lead_descIndex,
            // )






            loading(true);
            let statusIndex = listEditArray.findIndex((o, i) => { return o.type == 'status' })

            let postData = {
                lead_id: newCustomerDetail.lead_id,
                uc_uid: app.globalData.uc_uid,
                lead_name: lead_nameIndex > -1 ? listEditArray[lead_nameIndex].value : '',
                lead_addr: lead_addrIndex > -1 ? listEditArray[lead_addrIndex].value : '',
                ac_account_id: ac_account_idIndex > -1 ? listEditArray[ac_account_idIndex].selectedId : '',
                ac_contact_id: ac_contact_idIndex > -1 ? listEditArray[ac_contact_idIndex].selectedId : '',
                lead_source: lead_sourceIndex > -1 ? listEditArray[lead_sourceIndex].value : '',
                lead_type: lead_typeIndex > -1 ? listEditArray[lead_typeIndex].selectedId : '',
                lead_cooperation_type: lead_cooperation_typeIndex > -1 ? listEditArray[lead_cooperation_typeIndex].selectedId : '',
                lead_is_templet: lead_is_templetIndex > -1 ? listEditArray[lead_is_templetIndex].selectedId : '',
                lead_brand: lead_brandIndex > -1 ? listEditArray[lead_brandIndex].value : '',
                lead_scale: lead_scaleIndex > -1 ? listEditArray[lead_scaleIndex].value : '',
                lead_expected_revenue: lead_expected_revenueIndex > -1 ? listEditArray[lead_expected_revenueIndex].value : '',
                lead_expect_entry_date: lead_expect_entry_dateIndex > -1 ? listEditArray[lead_expect_entry_dateIndex].value : '',
                lead_stage: lead_stageIndex > -1 ? listEditArray[lead_stageIndex].selectedId : '',
                lead_desc: lead_descIndex > -1 ? listEditArray[lead_descIndex].value : '',
                status: statusIndex > -1 ? listEditArray[statusIndex].selectedId : '',
                lead_attach_prj_base_info: lead_attach_prj_base_infoIndex > -1 ? listEditArray[lead_attach_prj_base_infoIndex].value : '',
                lead_commerce: lead_commerceIndex > -1 ? listEditArray[lead_commerceIndex].selectedId : '',
                lead_salesman: lead_salesmanIndex > -1 ? listEditArray[lead_salesmanIndex].selectedId : '',
            }

            // let postData = {
            //     uc_uid: app.globalData.uc_uid,
            //     lead_id: businessItem.lead_id,
            //     lead_name: businessItem.lead_name,
            //     lead_expected_revenue: businessItem.lead_expected_revenue,
            //     lead_probability: businessItem.lead_probability,
            //     lead_scale: businessItem.lead_scale,
            //     lead_priority: businessItem.lead_priority,
            //     lead_desc: businessItem.lead_desc,
            //     lead_stage: businessItem.lead_stage,
            //     lead_source: businessItem.lead_source,
            //     lead_deadline_date: businessItem.lead_deadline_date ? businessItem.lead_deadline_date : '',
            //     ac_account_id: businessItem.ac_account_id,
            //     ac_contact_id: businessItem.ac_contact_id,
            //     status: businessItem.status,
            // };

            businessEdit(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getBusinessEdit(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/update", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearBusinessEdit()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/lead/update", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getBusinessEdit(res) {

            showToast({ msg: '保存成功' });
            this.setData({
                editStatus: false
            });

            this.getBusinessDetail();
            this.getBusinessLog();

        },

        clearBusinessEdit() {

        },

        // 商机----->详情
        getBusinessDetail() {
            let _this = this;
            this.changeBusStatus(false)
            let { businessId } = _this.data;

            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                lead_id: businessId,
            }
            businessDetail(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getBusinessDetail(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/detail", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearProBroadcat()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/lead/detail", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);

            }, (err) => {

                loading(false);
            })
        },

        handelBs_getBusinessDetail(res) {
            // console.log('详情handelBs_getBusinessDetail=======', res);
            let _this = this;
            let { listDetailArray, listEditArray, customerDetailList, contactDetailList } = this.data;
            let _item = res.data;

            // 详情
            // listDetailArray = _this.handleApiData2Ui(_item, listDetailArray);

            // 编辑---赋值
            // listEditArray = _this.handleApiData2Ui(_item, listEditArray);
            // console.log("_item", _item)
            // console.log('listEditArray', listEditArray)

            // return
            listEditArray.forEach((o, i) => {
                for (key in _item) {
                    if (o.type == key) {
                        if (o.viewType == "input" || o.viewType == "textarea") {
                            o.value = _item[key] ? _item[key] : ''
                        }
                        if (o.viewType == "select") {
                            if (o.type == 'ac_contact_id' && _item[key] == 0) {
                                o.selectedId = -1
                                o.value = ''
                                this.setErrorText(listEditArray, 'ac_contact_id', '请选择联系人')
                            } else {
                                o.selectedId = _item[key]
                                o.value = _item[key + '_value'] ? _item[key + '_value'] : ''
                            }

                        }
                        if (o.viewType == "radio") {
                            if (o.type == "lead_is_templet") {
                                o.value = _item.lead_is_templet == 1 ? '是' : '否'
                                o.radioTabType = _item.lead_is_templet == 1 ? 'yes' : 'no'
                                o.selectedId = _item.lead_is_templet

                            }
                            if (o.type == "status") {
                                o.value = _item.status == 1 ? '有效' : '无效'
                                o.radioTabType = _item.status == 1 ? 'yes' : 'no'
                                o.selectedId = _item.status
                            }

                        }
                        if (o.type == 'ac_account_id') {
                            o.value = _item.tb_ac_account ? _item.tb_ac_account.ac_account_name : ''
                        }
                        if (o.type == 'ac_contact_id') {
                            o.value = _item.tb_ac_account_contact ? _item.tb_ac_account_contact.ac_contact_name : ''
                        }
                        if (o.type == "lead_attach_prj_base_info" && _item[key]) {
                            console.log("_item[key]", _item)
                            o.value = _item[key]
                            console.log("o.value", o.value, _item[key + '_value'].split('-'))

                            if (_item[key + '_value'].split('-').length > 1) {
                                o.fileName = _item[key + '_value'].split('-')[1]
                            }
                            else {
                                o.fileName = _item[key + '_value']
                            }
                            if (o.fileName) {
                                o.extension = _item[key + '_value'].split('.')[1]
                            }

                        }

                    }
                }
            })
            // console.log('listEditArray', listEditArray)
            // 房间数
            // let _objScale = listEditArray[4].selectArray.find((info, index) => {
            //     return info.id == _item.lead_scale
            // });
            // console.log('_objScale', _objScale);


            // if (_objScale) {
            //     listEditArray[4].value = _objScale.value;
            //     listDetailArray[4].value = _objScale.value;
            // }


            // 客户/联系人
            let _customerDetailList = this.handleApiData2Ui(_item.tb_ac_account, customerDetailList);
            let _contactDetailList = this.handleApiData2Ui(_item.tb_ac_account_contact, contactDetailList);

            // console.log('_contactDetailList=============', _contactDetailList,_item.tb_ac_account);
            // console.log('listEditArray[9].selectArray.length', listEditArray[9].selectArray.length);


            // 编辑--赋值
            _item.ac_account_id = _item.tb_ac_account && _item.tb_ac_account.ac_account_id ? _item.tb_ac_account.ac_account_id : '';
            _item.ac_contact_id = _item.tb_ac_account_contact && _item.tb_ac_account_contact.ac_contact_id ? _item.tb_ac_account_contact.ac_contact_id : '';


            // 阶段
            // this.setSelectStatus(_item.lead_stage, listEditArray[6].selectArray);

            this.setData({
                // listDetailArray: listDetailArray,
                newCustomerDetail: res.data,
                businessItem: _item,
                customerDetail: _item.tb_ac_account,
                contactDetail: _item.tb_ac_account_contact ? _item.tb_ac_account_contact : '',
                customerDetailList: _customerDetailList,
                contactDetailList: _contactDetailList,
                listEditArray: listEditArray,
                radioTabType: _item.lead_stage
            })
            console.log("this.data.listEditArray:", this.data.listEditArray)


            // 获取客户value
            // if (listEditArray[9].selectArray.length == 0) {
            //     this.getCustomerSelect();
            // }

            // 获取联系人value
            let _id = _item.tb_ac_account && _item.tb_ac_account.ac_account_id ? _item.tb_ac_account.ac_account_id : '';
            if (_id) {
                this.getContactSelect(_id);
            }


        },


        // input/select 赋值
        handleApiData2Ui(apiData, uiData) {
            let _span = '';
            for (let apiKey in apiData) {
                uiData.forEach((uiObject, uiIndex) => {
                    if (apiKey == uiObject.type) {
                        if (uiObject.viewType == 'select') {

                            uiData[uiIndex].selectedId = apiData[apiKey] ? apiData[apiKey] : _span;
                            console.log('uiData[uiIndex].selectedId', uiData[uiIndex].selectedId)

                            if (apiKey == 'lead_priority' || apiKey == 'lead_stage') {
                                apiKey = apiKey + '_value';
                                uiData[uiIndex].value = apiData[apiKey];
                                // console.log('uiData==========', uiData);
                            }

                            if (apiKey == "ac_contact_gender") {
                                // console.log('apiKey', apiData); 
                                // 0  位置 1 先生  2 女生
                                uiData[uiIndex].value = apiData[apiKey] == 2 ? '女生' : apiData[apiKey] == 1 ? '先生' : '';

                            }
                            if (apiKey == "status") {
                                // console.log('apiKey', apiData);
                                uiData[uiIndex].value = apiData[apiKey] == 1 ? '有效' : '无效';
                            }
                        }

                        if (uiObject.viewType == 'input' || uiObject.viewType == 'textarea' || uiObject.viewType == 'viewStars') {

                            if (uiObject.type == 'lead_deadline_date') {
                                // console.log('uiObject', uiObject);
                                // console.log('apiData', apiData);
                                uiData[uiIndex].value = formatDATESub(apiData.lead_deadline_date ? apiData.lead_deadline_date : '', '-');

                            } else if (uiObject.type == 'ac_account_assigned_to') {

                                uiData[uiIndex].value = apiData.tb_uc2e_employee && apiData.tb_uc2e_employee.uc_name ? apiData.tb_uc2e_employee.uc_name : _span

                            } else if (uiObject.type == 'status') {

                                uiData[uiIndex].value = apiData.status == 1 ? '有效' : '无效';

                            } else {

                                uiData[uiIndex].value = apiData[apiKey] ? apiData[apiKey] : _span;

                            }

                        }
                        return
                    }
                })
            }

            return uiData
        },



        // 商机-select
        getBusinessSelectArray() {
            let _this = this;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
            }

            businessSelect(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getBusinessSelectArray(res);
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/lead/option", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getBusinessSelectArray(res) {
            // console.log("handelBs_getBusinessSelectArray:", res.data);
            let { businessItem, businessType, radioTabType, listEditArray } = this.data;
            console.log('radioTabType-----------', radioTabType);
            let _data = res.data.stage_type;

            // this.setSelectStatus(radioTabType, _data);


            //商机优先程度
            // this.setData({
            //     [`listEditArray[5].selectArray`]: res.data.priority_type,
            // });

            //   { id: 11, placeType: 'right', viewType: "select", title: '商机阶段', value: '', type: "lead_stage", selectArray: [], selectedId: "" },

            // if (businessType == 'add') {

            businessItem.lead_stage = res.data.stage_type[0].id;

            let lead_stageIndex = listEditArray.findIndex((o, i) => { return o.type == "lead_stage" })

            let lead_typeIndex = listEditArray.findIndex((o, i) => { return o.type == "lead_type" })
            let lead_cooperation_typeIndex = listEditArray.findIndex((o, i) => { return o.type == "lead_cooperation_type" })
            let lead_commerceIndex = listEditArray.findIndex((o, i) => { return o.type == "lead_commerce" })
            let lead_salesmanIndex = listEditArray.findIndex((o, i) => { return o.type == "lead_salesman" })


            console.log(lead_stageIndex)







            this.setData({
                [`listEditArray[${lead_typeIndex}].selectArray`]: res.data.business_opportunities_type,
                [`listEditArray[${lead_cooperation_typeIndex}].selectArray`]: res.data.cooperation_mode,
                [`listEditArray[${lead_commerceIndex}].selectArray`]: res.data.lead_commerce,
                [`listEditArray[${lead_salesmanIndex}].selectArray`]: res.data.lead_salesman,

                [`listEditArray[${lead_stageIndex}].selectArray`]: res.data.stage_type,
                [`listEditArray[${lead_stageIndex}].selectedId`]: res.data.stage_type[0].id,
                [`listEditArray[${lead_stageIndex}].value`]: res.data.stage_type[0].value,
                businessItem: businessItem,
            });

            // }

        },

        // // 阶段字段(是否禁止)
        // setSelectStatus(type, array) {
        //     let _newArray = []
        //     if (array && array.length > 0) {
        //         _newArray = array;
        //         _newArray.map((item, index) => {
        //             if (index + 1 < type) {
        //                 item.disabled = true;
        //             } else {
        //                 item.disabled = false;
        //             }
        //         });
        //     }

        //     this.setData({
        //         [`listEditArray[6].selectArray`]: _newArray,
        //     });


        // },

        // 获取客户select列表
        getCustomerSelect(type) {
            let _this = this;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
            }

            customerSelect(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getCustomerSelect(res, type);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/listForSelect", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearCustomerSelect();
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/listForSelect", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getCustomerSelect(res, type) {
            let _this = this;
            let { businessType, customerDetail, listEditArray } = _this.data;

            let currInex = listEditArray.findIndex((o, i) => { return o.type == 'ac_account_id' })
            _this.setData({
                [`listEditArray[${currInex}].selectArray`]: res.data,
            });
            if (type == "setCustomer") {
                _this.setData({
                    [`listEditArray[${currInex}].selectedId`]: res.data[0].id,
                    [`listEditArray[${currInex}].value`]: res.data[0].value,
                }, () => {
                    this.getContactSelect(res.data[0].id);
                });
            }

        },

        clearCustomerSelect() {
            let { listEditArray } = this.data;
            let ac_account_idIndex = listEditArray.findIndex((o, i) => { return o.type == 'ac_account_id' })

            this.setData({
                [`listEditArray[${ac_account_idIndex}].selectArray`]: [],
            });
        },

        // 获取联系人-------select列表
        getContactSelect(id, type) {
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
                        _this.handelBs_getContactSelect(res, type);
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

        handelBs_getContactSelect(res, type) {
            console.log("handelBs_getContactSelect", type)
            let _this = this;
            let { businessType, contactDetail, listEditArray } = _this.data;


            if (type == 'setcontacts') {
                // console.log("1111111",)
                let ac_contact_idIndex = listEditArray.findIndex((o, i) => { return o.type == "ac_contact_id" })
                _this.setData({
                    [`listEditArray[${ac_contact_idIndex}].selectedId`]: res.data[0].id,
                    [`listEditArray[${ac_contact_idIndex}].value`]: res.data[0].value,
                });

            }
            let currInex = listEditArray.findIndex((o, i) => { return o.type == 'ac_contact_id' })
            _this.setData({
                [`listEditArray[${currInex}].selectArray`]: res.data,
            });

            if (res.data.length > 0) {
                _this.setData({
                    [`listEditArray[${currInex}].selectedId`]: res.data[0].id,
                    [`listEditArray[${currInex}].value`]: res.data[0].value,
                    emptyStatus: false
                });

            }


        },

        clearContactSelect() {
            let { listEditArray } = this.data;
            let ac_contact_idIndex = listEditArray.findIndex((o, i) => { return o.type == 'ac_contact_id' })
            this.setData({
                [`listEditArray[${ac_contact_idIndex}].selectArray`]: [],
            });
        },

        //商机日志
        getBusinessLog() {

            let _this = this;
            let { businessId } = _this.data;

            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                lead_id: businessId,
            }
            businessLog(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getBusinessLog(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/log", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearProBroadcat()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/lead/log", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);

            }, (err) => {

                loading(false);
            })
        },

        handelBs_getBusinessLog(res) {

            // console.log('handelBs_getBusinessLog============', res.data);
            this.setData({
                businessLogList: res.data,
            })
        },



        //  {
        //                 placeType: 'left', viewType: "radio", title: '是否样板间', value: '', type: "myRadio",
        //                 radioTabs: [
        //                     { id: 1, name: '是', type: "yes" },
        //                     { id: 2, name: '否', type: "no" },
        //                 ],
        //                 radioTabType: "yes", necessary: true
        //             },

        getRadio(e) {
            console.log("getRadio:", e)
            let { listEditArray } = this.data;
            let { type } = e.currentTarget.dataset;
            let { item } = e.detail

            let currInex = listEditArray.findIndex((o, i) => { return o.type == type })

            this.setData({
                [`listEditArray[${currInex}].radioTabType`]: item.type,
                [`listEditArray[${currInex}].selectedId`]: item.id
            })

        },


        //完善信息
        busPerfectInfo(e) {
            // console.log("完善信息",e)
            let { inspectNecArr } = e.detail
            console.log("完善信息", inspectNecArr)
            let { listEditArray } = this.data;
            let _this = this


            listEditArray.forEach((o, i) => {
                inspectNecArr.forEach((oi, ii) => {
                    if (oi == o.type) {
                        o.errorText = `请填写${o.title}`
                    }
                })
            })
            // let type= "ac_contact_id"
            // let list = this.setErrorText(listEditArray,type,'请选择联系人')
            // this.setData({
            //     listEditArray:list
            // })
            // console.log("busPerfectInfo:",list)
            this.setData({
                listEditArray
            })
            console.log(this.data.listEditArray)
            this.getEdit()
        },

        setErrorText(list, type, text) {
            let currIndex = list.findIndex((o, i) => { return o.type == type })
            list[currIndex].errorText = text
            return list
        },

        clearErrorText(list, type,) {
            let currIndex = list.findIndex((o, i) => { return o.type == type })
            list[currIndex].errorText = ''
            return list
        },


        //下来菜单 没有下拉列表时
        selectOpation() {
            // console.log("selectOpation",this.isHasCoustomer())
            let hasCustom = this.isHasCoustomer()
            if (hasCustom) {
                this.openQcAddContacts()
            } else {
                showToast({ msg: '请先选择客户' })
            }
        },

        // 联系人为空
        getEmptyClick(e) {
            console.log('e-–--------', e);
            let hasCustom = this.isHasCoustomer();
            console.log('hasCustom-----------------', hasCustom);

            if (!hasCustom) {
                showToast({ msg: '请先选择客户' })
            } else {
                this.setData({
                    emptyStatus: false
                })
            }
        },

        getIintCustomer() {
            let hasCustom = this.isHasCoustomer();
            if (hasCustom) {
                this.setData({
                    emptyStatus: false
                })
            }
        },

        isHasCoustomer() {

            let { listEditArray, contactsArray } = this.data;
            let ac_account_idIndex = listEditArray.findIndex((o, i) => { return o.type == "ac_account_id" })
            console.log("ac_account_idIndex", ac_account_idIndex, listEditArray[ac_account_idIndex])
            if (listEditArray[ac_account_idIndex].selectedId > -1 && listEditArray[ac_account_idIndex].selectedId) {
                return true
            } else {
                return false
            }
        },

        openQcAddContacts() {
            this.setData({
                qcAddContacts: true
            })
        },
        closeQcAddContacts() {
            this.setData({
                qcAddContacts: false
            })
        },




        getContactsubmit() {
            let { contactsArray } = this.data;
            for (i = 0; i < contactsArray.length; i++) {
                let o = contactsArray[i]
                if (!o.value) {
                    showToast({ msg: `请填写${o.title}` })
                    return
                }
                if (o.type == "ac_contact_mobile" && o.value) {
                    if (!isMobile(o.value)) {
                        showToast({ msg: "联系方式输入错误" })
                        return;
                    }
                }
            }
            this.getContactsAdd()
        },



        // 新建---->联系人
        getContactsAdd() {
            let _this = this;
            let { listEditArray, contactsArray } = this.data;
            let ac_account_idIndex = listEditArray.findIndex((o, i) => { return o.type == "ac_account_id" })
            let ac_contact_nameIndex = contactsArray.findIndex((o, i) => { return o.type == "ac_contact_name" })
            let ac_contact_mobileIndex = contactsArray.findIndex((o, i) => { return o.type == "ac_contact_mobile" })
            let ac_contact_positionIndex = contactsArray.findIndex((o, i) => { return o.type == "ac_contact_position" })
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: listEditArray[ac_account_idIndex].selectedId,
                ac_contact_name: contactsArray[ac_contact_nameIndex].value,
                ac_contact_mobile: contactsArray[ac_contact_mobileIndex].value,
                ac_contact_position: contactsArray[ac_contact_positionIndex].value,

            }

            contactsAdd(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getContactsAdd(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/contact/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearContactsAdd()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/contact/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getContactsAdd(res) {
            let { listEditArray, contactsArray } = this.data;
            let ac_account_idIndex = listEditArray.findIndex((o, i) => { return o.type == "ac_account_id" })
            showToast({ msg: '保存成功', type: 'success' });
            this.clearContactsArray()
            this.closeQcAddContacts()


            this.getContactSelect(listEditArray[ac_account_idIndex].selectedId, 'setcontacts')






        },



        getContactCancel() {
            this.closeQcAddContacts()
            this.clearContactsArray()
        },
        clearContactsArray() {
            let { contactsArray } = this.data;

            contactsArray.forEach((o, i) => {
                o.value = ''
            })
            this.setData({
                contactsArray
            })
        },




        // //上传附件
        // uploadEnclosure() {
        //     console.log("上传附件:uploadEnclosure")



        // },


        // 添加附件
        uploadEnclosure(e) {
            let _this = this;
            let _index = e.currentTarget.dataset.index;
            console.log('_index==', _index);

            tt.filePicker({
                success(res) {
                    console.log('选择文件列表：', res, res.list);
                    let _list = res.list;
                    let name = _list[0].name;
                    let extension = ''
                    if (name.split('.').length > 0) {
                        extension = name.split('.')[name.split('.').length - 1]
                    }
                    console.log("asdfafasfasf", extension)
                    if (extension == "doc" || extension == "docx" || extension == "xls" || extension == "xlsx") {
                        _this.getUploadFile(_list[0].path, _list[0].name, _list[0].size, _index);
                    } else {
                        showToast({ msg: '仅支持上传doc、docx、xls、xlsx格式的文件' })
                    }

                }
            });
        },

        getUploadFile(path, name, fileSize, index) {
            let _this = this;
            loading(true)
            let { listEditArray } = this.data;
            //    { id: 14, isShow: true, placeType: 'right', viewType: "enclosure", title: '附件', value: '', type: "lead_stage", },
            let timeStamp = new Date().getTime()
            // console.log("234234234234234223", timeStamp)

            uploadFile(path, name, `feishu_tb_pa_file/${timeStamp}-`,
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
                    let extension = name.split(".")[name.split(".").length - 1]
                    let enclosureIndex = listEditArray.findIndex((o, i) => { return o.viewType == "enclosure" })
                    console.log("======上传成功文件地址为：", result, _info, enclosureIndex);
                    _this.setData({
                        [`listEditArray[${enclosureIndex}].value`]: result,
                        [`listEditArray[${enclosureIndex}].fileName`]: name,
                        [`listEditArray[${enclosureIndex}].extension`]: extension,
                        [`listEditArray[${enclosureIndex}].fileSize`]: _fileSize,

                    })

                    console.log("sssssssssss", _this.data.listEditArray)
                    loading(false)
                },

                function (result) {
                    console.log("======上传失败======", result);
                    loading(false)
                }
            )
        },

        deleteEnclosure() {
            let _this = this;

            tt.showModal({
                "title": "确定删除附件吗？",
                "showCancel": true,
                success(res) {
                    console.log(JSON.stringify(res));
                    if (res.confirm) {
                        _this.clearlistEditArrayFile()

                    }
                },
                fail(res) {
                    console.log(`showModal fail: ${JSON.stringify(res)}`);
                }
            });
        },
        clearlistEditArrayFile() {
            let { listEditArray } = this.data;
            let enclosureIndex = listEditArray.findIndex((o, i) => { return o.viewType == "enclosure" })
            this.setData({
                [`listEditArray[${enclosureIndex}].value`]: '',
                [`listEditArray[${enclosureIndex}].fileName`]: '',
                [`listEditArray[${enclosureIndex}].extension`]: '',
                [`listEditArray[${enclosureIndex}].fileSize`]: '',

            })
        },
        lookEnclosure(e) {
            // console.log("lookEnclosure", e)
            let { failePath, extension } = e.detail;
            // console.log("lookEnclosure", failePath)
            if (extension == 'doc' || extension == 'docx' || extension == 'xls' || extension == 'xlsx' || extension == 'ppt' || extension == 'pptx') {
                this.getLook(failePath)
            } else {
                showToast({ msg: '文件不能预览' })
            }

        },
        getLookEnclosure(e) {
            //  console.log("getLookEnclosure", e)
            let { url, extension } = e.currentTarget.dataset;

            console.log("extensionextensionextension", extension)
            if (extension == 'doc' || extension == 'docx' || extension == 'xls' || extension == 'xlsx' || extension == 'ppt' || extension == 'pptx') {
                this.getLook(url)
            } else {
                showToast({ msg: '文件不能预览' })
            }
        },

        // 文件查看
        getLook(url) {
            loading(true);
            tt.downloadFile({
                url: url,
                success(res) {
                    console.log('res------', res);
                    const filePath = res.tempFilePath;
                    tt.openDocument({
                        filePath: filePath,
                        success(res) {
                            console.log('打开文档成功', res);
                            loading(false);
                        },
                        fail(error) {
                            console.log('打开文档失败', error)
                            loading(false);

                        }
                    })
                }
            })
        },

        // 快速创建客户
        //下拉菜单搜索时没有匹配的列表时
        selectSearchOpation(e) {
            console.log("selectSearchOpation")
            this.openQcAddCustomer()
            this.getCustomerSelectArray()
        },
        openQcAddCustomer() {
            this.setData({
                qcAddCustomer: true
            })
        },
        closeQcAddCustomer() {
            this.setData({
                qcAddCustomer: false
            })
        },

        getCustomersubmit() {
            console.log("getCustomersubmit")
            let { qcContactsArray, qcCustomerArray } = this.data;

            console.log(qcCustomerArray,)
            console.log(qcContactsArray,)

            for (i = 0; i < qcCustomerArray.length; i++) {
                let o = qcCustomerArray[i]
                if (!o.value) {
                    showToast({ msg: `请填写${o.title}` })
                    return
                }
                if (o.type == "ac_contact_mobile" && o.value) {
                    if (!isMobile(o.value)) {
                        showToast({ msg: "联系方式输入错误" })
                        return;
                    }
                }
            }

            for (i = 0; i < qcContactsArray.length; i++) {
                let o = qcContactsArray[i]
                if (!o.value) {
                    showToast({ msg: `请填写${o.title}` })
                    return
                }
                if (o.type == "ac_contact_mobile" && o.value) {
                    if (!isMobile(o.value)) {
                        showToast({ msg: "联系方式输入错误" })
                        return;
                    }
                }
            }

            this.addfastStore()

        },



        clearArray(array) {
            array.forEach((o, i) => {
                if (o.viewType == "input") {
                    o.value = ''
                }
                if (o.viewType == "select") {
                    o.value = ''
                    o.selectedId = ''
                }
                if (o.viewType == "radio") {
                    o.radioTabType = ''
                    o.selectedId = ''
                }
            })
            return array
        },
        getCustomerCancel() {
            console.log("getCustomerCancel")
            this.closeQcAddCustomer()
        },

        getqcAddCustomerChange(e) {

        },








        //api

        addfastStore() {
            let _this = this;

            let { qcCustomerArray, qcContactsArray } = this.data
            let ac_account_nameIndex = qcCustomerArray.findIndex((o, i) => { return o.type == 'ac_account_name' })
            let ac_account_source_idIndex = qcCustomerArray.findIndex((o, i) => { return o.type == 'ac_account_source_id' })
            let ac_contact_nameIndex = qcContactsArray.findIndex((o, i) => { return o.type == 'ac_contact_name' })
            let ac_contact_mobileIndex = qcContactsArray.findIndex((o, i) => { return o.type == 'ac_contact_mobile' })
            let ac_contact_positionIndex = qcContactsArray.findIndex((o, i) => { return o.type == 'ac_contact_position' })
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_name: qcCustomerArray[ac_account_nameIndex].value,

                ac_account_source_id: qcCustomerArray[ac_account_source_idIndex].selectedId,

                ac_contact_name: qcContactsArray[ac_contact_nameIndex].value,

                ac_contact_mobile: qcContactsArray[ac_contact_mobileIndex].value,

                ac_contact_position: qcContactsArray[ac_contact_positionIndex].value,

            }

            fastStore(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_addfastStore(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/fastStore", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearCustomerSelectArray()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/fastStore", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },
        handelBs_addfastStore(res) {
            console.log("handelBs_addfastStore:", res)
            let { qcCustomerArray, qcContactsArray } = this.data
            qcCustomerArray = this.clearArray(qcCustomerArray)
            qcContactsArray = this.clearArray(qcContactsArray)
            this.setData({
                qcCustomerArray,
                qcContactsArray
            })
            this.closeQcAddCustomer()
            this.getCustomerSelect("setCustomer")

        },
        // 客户详情-select
        getCustomerSelectArray() {
            let _this = this;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
            }

            customerSelectArray(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getCustomerSelectArray(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/getSelectArray", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearCustomerSelectArray()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/getSelectArray", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getCustomerSelectArray(res) {
            console.log("handelBs_getCustomerSelectArray:", res.data);
            let _this = this;
            let { qcCustomerArray } = _this.data;

            // 客户来源
            let _sourceIndex = qcCustomerArray.findIndex((info, index) => { return info.type == 'ac_account_source_id' });


            _this.setData({
                [`qcCustomerArray[${_sourceIndex}].selectArray`]: res.data.sources,
                [`qcCustomerArray[${_sourceIndex}].value`]: res.data.sources[0].value,
                [`qcCustomerArray[${_sourceIndex}].selectedId`]: res.data.sources[0].id,

            });


        },

    },





})