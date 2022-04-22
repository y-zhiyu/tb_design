const app = getApp();
import { imgUrl, isdebug } from "../../../config";
import { loading, dataStatus, showToast, goToPage, setBatTitle, onLoadPublicMethods, } from "../../../utils/interactive";
import { formatDATESub, getUseHours, formatSlice, isMobile } from "../../../utils/util.js";
var uploadImage = require("../../../utils/uploadImg/uploadImg.js");

import { contactsDetail, addressSelect, contactsEdit, contactsAdd, customerSelect, contactLog } from "../../../utils/http";
import { getProvince, getCity, getCounty, initCode } from "../../../utils/city.js";
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
        themColor: {
            type: Object,
            value: null
        },

        contactStatus: {
            type: Boolean,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                // console.log('contactStatus-----', this.data.contactStatus)
            },
        },

        contactType: {
            type: String,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                console.log('contactType-----', this.data.contactType);
                let { contactType, contactItem, listArray } = this.data;
                contactItem = {};

                if (contactType == 'add') {
                    let _statusIndex = listArray.findIndex((o, i) => { return o.type == 'status' });

                    this.setData({
                        editStatus: true,
                        parent_code: 0,
                        contactDetail: {},
                        // contactItem: contactItem,
                        customerValue: '',
                        customerId: '',
                        imgArr: [],
                        radioTabType: 'defaultAddress',
                        [`listArray[${_statusIndex}].isShow`]: false

                    }, () => {
                        contactItem.ac_contact_type = 1;
                        this.setData({
                            contactItem: contactItem
                        })
                        console.log('contactItem==========', contactItem);

                    })
                    this.getClearData();


                } else if (contactType == 'detail') {
                    this.getContactDetail();
                    this.getContactLog()
                }

                this.getCustomerSelect();
                this.data.provinceData = getProvince(initCode)
                this.getAddressSelect();
            },
        },
        contactsId: {
            type: Number,
            value: 1
        },
        customerId: {
            type: Number,
            value: ''
        }
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
        listArray: [
            { isShow: true, placeType: 'left', viewType: "select", title: '所属客户', value: '', type: "ac_account_id", selectArray: [], selectedId: "", necessary: true },
            { isShow: true, placeType: 'left', viewType: "input", title: '姓名', value: '', type: "ac_contact_name", placeholder: "请输入", necessary: true },
            { isShow: true, placeType: 'left', viewType: "input", title: '联系方式', value: '', type: "ac_contact_mobile", placeholder: "请输入", maxlength: 11, necessary: true, inputType: "number", length: 11 },
            { isShow: true, placeType: 'left', viewType: "input", title: '职位', value: '', type: "ac_contact_position", placeholder: "请输入", necessary: true, isLimit: false },
            { isShow: true, placeType: 'left', viewType: "input", title: '渠道', value: '', type: "ac_contact_channel", placeholder: "请输入", necessary: false, },

            {
                isShow: true, placeType: 'right', viewType: "select", title: '称谓', value: '', type: "ac_contact_gender", placeholder: "", selectedId: "",
                selectArray: [
                    { id: 2, value: '女士' },
                    { id: 1, value: '先生' }
                ]
            },
            {
                isShow: true, placeType: 'right', viewType: "select", title: '关键决策人', value: '', type: "is_kdm", selectedId: "",
                selectArray: [
                    { id: 0, value: '否' },
                    { id: 1, value: '是' },
                ]
            },
            { isShow: true, placeType: 'right', viewType: "select-address", title: '', },
            { isShow: true, placeType: 'right', viewType: "input", title: '详细地址', value: '', type: "ac_contact_addr", placeholder: "请输入详细地址" },
            { isShow: true, placeType: 'right', viewType: "textarea", title: '备注', value: '', type: "memo" },
            {
                isShow: false, placeType: 'right', viewType: "radio", title: '状态', selectedId: -1, type: "status",
                radioTabs: [
                    { id: 0, name: '无效', type: "no" },
                    { id: 1, name: '有效', type: "yes" },
                ],
                radioTabType: "", necessary: ''
            },
        ],

        // 联系人新增的省市区
        selectAllArray: [
            { placeholder: "省", value: "", selectedId: '', type: "ac_contact_province_code", selectArray: [] },
            { placeholder: "市", value: '', selectedId: '', type: "ac_contact_city_code", selectArray: [] },
            { placeholder: "县/区", value: '', selectedId: '', type: "ac_contact_area_code", selectArray: [] },
        ],
        selectArrayType: 'province',
        selectArrayIndex: 0,

        headData: [
            { title: '企业名称', key: "ac_account_org_name" },
            { title: '企业税号', key: "ac_account_org_taxid" },
        ],
        bodyData: [],
        tabList: [
            { id: 0, text: "联系人日志", type: "customerLog", status: "true" },
            { id: 1, text: "跟进记录", type: "record", status: "true" },
        ],
        tabActiveIdx: 0,
        tabsType: "customerLog",
        proLogList: [],
        selectAddressArray: [],
        parent_code: 0,

        imgArr: [],
        customerItem: [],
        contactItem: {},
        invoiceItem: {},
        contactDetail: {},
        changeType: 'customer', // 默认客户----customer,新建联系人----contact,新建发票信息---invoice

        // 地址类型
        radioTabs: [
            { id: 1, name: '联系人', type: "defaultAddress" },
            { id: 2, name: '收票地址', type: "receiveAddress" },
            { id: 3, name: '发货地址', type: "shippingAddress" },
        ],

        radioTabType: 'defaultAddress',
        customerDetailStatus: false,

        // 客户详情
        customerDetailList: [
            { viewType: "select", title: '客户来源', value: '', type: "ac_account_source_id", },
            { viewType: "select", title: '重要程度', value: '', type: "ac_account_priority_id", },
            { viewType: "select", title: '客户状态', value: '', type: "ac_account_stage", },
            { viewType: "input", title: '内部备注', value: '', type: "memo", },
            { viewType: "select", title: '负责人', value: '', type: "ac_account_assigned_to", },
            { viewType: "input", title: '手机', value: '', type: "ac_account_mobile", },
            { viewType: "input", title: '座机', value: '', type: "ac_account_tel", },
            { viewType: "input", title: '邮箱', value: '', type: "ac_account_email", },
            { viewType: "input", title: '网站', value: '', type: "ac_account_website", },
            { viewType: "input", title: '详细地址', value: '', type: "ac_account_splice_addr", },
            // { viewType: "input", title: '座机', value: '', type: "ac_account_tel", },
            // { viewType: "input", title: '手机', value: '', type: "ac_account_mobile", },
            // { viewType: "input", title: '邮箱', value: '', type: "ac_account_email", },
            // { viewType: "input", title: '网站', value: '', type: "ac_account_website", },
            // { viewType: "select", title: '重要程度', value: '', type: "ac_account_priority_id", },
            // { viewType: "select", title: '客户状态', value: '', type: "ac_account_stage", },
            // { viewType: "select", title: '客户来源', value: '', type: "ac_account_source_id", },
            // { viewType: "select", title: '客户行业', value: '', type: "ac_account_industry_id", },
            // { viewType: "input", title: '详细地址', value: '', type: "ac_account_splice_addr", },
            // { viewType: "input", title: '内部备注', value: '', type: "memo", },
            // { viewType: "select", title: '负责人', value: '', type: "ac_account_assigned_to", },


        ],
        // 联系人---省市区
        contactAreaCodeObj: {
            provinceCode: '',
            cityCode: '',
            countyCode: '',
        },
        contactLogList: [],
        // 头像
        contactsImgArr: [
            `${imgUrl}/img/pcPAlark/pc_upload_avaturl.png`,
            `${imgUrl}/img/pcPAlark/pc_receive_address.png`,
            `${imgUrl}/img/pcPAlark/pc_shipping_address.png`
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {

        // 初始化-------->清空input/select的值,
        getClearData() {
            let {
                listArray,
                selectAllArray,
                contactsImgArr
            } = this.data;

            for (let i = 0; i < listArray.length; i++) {
                let _str = '';
                _str = 'listArray[' + i + '].value';
                this.setData({
                    [_str]: ''
                })
            }
            for (let i = 0; i < selectAllArray.length; i++) {
                let _str = '';
                let _selectedId = '';
                let _selectCityArray = [];
                let _selectCountyArray = [];

                _str = 'selectAllArray[' + i + '].value';
                _selectedId = 'selectAllArray[' + i + '].selectedId';
                _selectCityArray = 'selectAllArray[1].selectArray';
                _selectCountyArray = 'selectAllArray[2].selectArray';

                this.setData({
                    [_str]: '',
                    [_selectedId]: '',
                    [_selectCityArray]: [],
                    [_selectCountyArray]: [],
                    selectArrayIndex: 0
                })
            }
            let _areaCodeObj = {
                provinceCode: '',
                cityCode: '',
                countyCode: '',
            };

            contactsImgArr[0] = `${imgUrl}/img/pcPAlark/pc_upload_avaturl.png`;

            this.setData({
                contactAreaCodeObj: _areaCodeObj,
                ac_contact_name: '',
                contactsImgArr: contactsImgArr
            })
        },

        // 返回
        getBack() {
            let item = {
                type: 'contacts',
                backType: this.data.contactType
            }
            this.triggerEvent('back', { item });
        },

        // tabs选择框
        selectTab(e) {
            let { curidx, type } = e.detail;
            this.setData({
                tabActiveIdx: curidx,
                tabsType: type
            });

            if (type == 'customerLog') {
                this.getContactLog();
            }
        },

        // 编辑
        getEdit() {
            let { contactItem, listArray } = this.data;
            console.log('contactItem---------', contactItem)
            let _addrIndex = listArray.findIndex((info, index) => { return info.type == 'ac_contact_addr' });
            let _statusIndex = listArray.findIndex((o, i) => { return o.type == 'status' })

            this.setData({
                editStatus: true,
                [`listArray[${_addrIndex}].value`]: contactItem.ac_contact_addr,
                [`listArray[${_statusIndex}].isShow`]: true
            })

            this.getContactDetail();

        },

        // input 输入框change
        getInputChange(e) {
            // console.log(e);
            let { type, index } = e.currentTarget.dataset;
            let { value } = e.detail;

            this.setData({
                [`listArray[${index}].value`]: value
            })

            this.getEditItem(type, value);
        },

        // select change
        getSelectChange(e) {
            console.log(e);
            let { listArray } = this.data;
            let { type, index, placetype } = e.currentTarget.dataset;
            let { value, id } = e.detail.item;


            if (placetype == 'contact') {
                this.setData({
                    [`listArray[${index}].value`]: value,
                    [`listArray[${index}].selectedId`]: id,
                })

            } else if (placetype == 'customer') {
                this.setData({
                    customerValue: value,
                    customerId: id,
                })
            }

            this.getEditItem(type, id);

        },
        // select搜索值------>
        getSelectInputChange(e) {
            // console.log('e------------', e);
            let { listArray } = this.data;
            let { type, index, placetype } = e.currentTarget.dataset;
            let _value = e.detail.value;

            if (placetype == 'contact') {
                this.setData({
                    [`listArray[${index}].value`]: _value,
                    [`listArray[${index}].selectedId`]: '',
                })

            } else if (placetype == 'customer') {
                this.setData({
                    customerValue: _value,
                    customerId: '',
                })
            }

            this.getEditItem(type, '');

        },

        getEditItem(type, value) {
            let { contactItem } = this.data;
            contactItem[type] = value;
            this.setData({
                contactItem: contactItem
            })
        },

        // radio ----状态
        getRadio(e) {
            console.log("getRadio:", e)
            let { listArray } = this.data;
            let { type } = e.currentTarget.dataset;
            let { item } = e.detail

            let currInex = listArray.findIndex((o, i) => { return o.type == type })

            this.setData({
                [`listArray[${currInex}].radioTabType`]: item.type,
                [`listArray[${currInex}].selectedId`]: item.id
            })
            this.getEditItem(type, item.id);
        },

        // radio
        getTabChange(e) {
            console.log(e);
            let { type, item } = e.detail;
            let { contactItem, contactsImgArr } = this.data;
            let _id = item.id;

            contactItem.ac_contact_type = _id;
            let _imgContactsArr = [];

            _imgContactsArr.push(contactsImgArr[_id - 1]);
            contactItem.ac_contact_avatar_url = contactsImgArr[_id - 1];

            this.setData({
                radioTabType: type,
                contactItem: contactItem,
                imgArr: _imgContactsArr,
            })

        },

        // 所属客户------详情modal
        getCustomerDetail(e) {
            // console.log(e);
            let { item, modaltype } = e.currentTarget.dataset;
            let { customerDetailList } = this.data;
            console.log('modaltype-------', modaltype);
            console.log('item-------', item);

            let _customerDetailList = this.handleApiData2Ui(item, customerDetailList, 'customer');
            // console.log(_customerDetailList);

            this.setData({
                modalTitle: '所属客户详情',
                customerDetail: item,
                customerDetailList: _customerDetailList
            })

            this.getDataStatus(true, modaltype);

        },

        // input/select 赋值
        handleApiData2Ui(apiData, uiData, pageType) {
            let _span = '';
            for (let apiKey in apiData) {
                uiData.forEach((uiObject, uiIndex) => {
                    if (apiKey == uiObject.type) {
                        if (uiObject.viewType == 'select') {
                            uiData[uiIndex].selectedId = apiData[apiKey] ? apiData[apiKey] : _span

                            if (pageType == 'customer') {
                                if (apiKey.includes('id')) {
                                    let tempArr = apiKey.split('')
                                    let len = tempArr.length
                                    let handelBackKey = tempArr.slice(0, len - 3).join('')
                                    handelBackKey = handelBackKey + '_value'
                                    uiData[uiIndex].value = apiData.meta[handelBackKey]
                                } else {
                                    apiKey = apiKey + '_value'
                                    uiData[uiIndex].value = apiData.meta[apiKey]
                                }

                            } else if (pageType == 'contacts') {
                                if (uiObject.type == 'ac_contact_gender') {
                                    uiData[uiIndex].value = apiData.ac_contact_gender == 2 ? '女士' : apiData.ac_contact_gender == 1 ? '先生' : ''

                                } else if (uiObject.type == 'is_kdm') {
                                    uiData[uiIndex].value = apiData.is_kdm == 1 ? '是' : '否';

                                } else if (uiObject.type == 'ac_account_id') {
                                    uiData[uiIndex].value = apiData.meta && apiData.meta.ac_account_data.ac_account_name
                                    uiData[uiIndex].selectedId = apiData.ac_account_id

                                } else {
                                    apiKey = apiKey + '_value'
                                    uiData[uiIndex].value = apiData.meta[apiKey]
                                }
                            }


                        }
                        if (uiObject.viewType == 'input' || uiObject.viewType == 'textarea') {
                            uiData[uiIndex].value = apiData[apiKey] ? apiData[apiKey] : _span;

                            if (!this.data.editStatus && uiObject.type == 'ac_contact_addr') {
                                uiData[uiIndex].value = apiData.ac_contact_splice_addr
                            };
                        }
                        if (uiObject.viewType == 'radio') {
                            // uiData[uiIndex].value = apiData[apiKey] ? apiData[apiKey] : _span;
                            if (uiObject.type == 'status') {
                                uiData[uiIndex].value = apiData.status == 1 ? '有效' : '无效';
                                uiData[uiIndex].radioTabType = apiData.status == 1 ? 'yes' : 'no';
                            }
                        }
                        return
                    }
                })
            }

            return uiData
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
                })
            }
        },

        // 联系人======>取消
        getCancel(e) {
            let { contactType, contactItem, listArray } = this.data;

            if (contactType == 'add') {
                this.getBack();
            } else {
                this.setData({
                    editStatus: false
                });
            };
            let _addrIndex = listArray.findIndex((info, index) => { return info.type == 'ac_contact_addr' });
            let _value = contactItem.ac_contact_splice_addr ? contactItem.ac_contact_splice_addr : '';

            this.setData({
                [`listArray[${_addrIndex}].value`]: _value,
            })
        },

        // 联系人====>保存
        getContactSubmit() {

            let { contactItem, contactType } = this.data;
            console.log('contactItem======', contactItem);

            if (!contactItem.ac_account_id) {
                showToast({ msg: "请选择所属客户" })
                return;
            }

            if (!contactItem.ac_contact_name) {
                showToast({ msg: "请输入姓名" })
                return;
            }

            if (!contactItem.ac_contact_mobile) {
                showToast({ msg: "请输入联系方式" })
                return;
            }

            if (contactItem.ac_contact_mobile) {
                if (!isMobile(contactItem.ac_contact_mobile)) {
                    showToast({ msg: "联系方式输入错误" })
                    return;
                }
            }

            if (!contactItem.ac_contact_position) {
                showToast({ msg: "请输入职位" })
                return;
            }

            // if (!contactItem.ac_contact_channel) {
            //     showToast({ msg: "请输入渠道" })
            //     return;
            // }

            if (contactType == 'add') {
                this.getContactsAdd();

            } else if (contactType == 'detail') {
                this.getContactsEdit();
            }

        },





        // 以下API 

        // 获取客户select列表
        getCustomerSelect() {
            let _this = this;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
            }

            customerSelect(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getCustomerSelect(res);
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

        handelBs_getCustomerSelect(res) {
            let _this = this;
            let { listArray } = _this.data;

            // 所属客户
            let _customerIndex = listArray.findIndex((info, index) => { return info.type == 'ac_account_id' });

            _this.setData({
                [`listArray[${_customerIndex}].selectArray`]: res.data,

            });
        },

        clearCustomerSelect() {
            let { listArray } = _this.data;

            // 所属客户
            let _customerIndex = listArray.findIndex((info, index) => { return info.type == 'ac_account_id' });

            _this.setData({
                [`listArray[${_customerIndex}].selectArray`]: [],

            });
        },


        // 新建---->联系人
        getContactsAdd() {
            let _this = this;
            let { contactItem, contactAreaCodeObj } = this.data;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: contactItem.ac_account_id,
                ac_contact_name: contactItem.ac_contact_name,
                ac_contact_mobile: contactItem.ac_contact_mobile,
                ac_contact_mail: contactItem.ac_contact_mail,
                ac_contact_position: contactItem.ac_contact_position,
                ac_contact_gender: contactItem.ac_contact_gender,
                is_kdm: contactItem.is_kdm,
                ac_contact_avatar_url: contactItem.ac_contact_avatar_url,
                ac_contact_type: contactItem.ac_contact_type,
                ac_contact_addr: contactItem.ac_contact_addr,
                ac_contact_channel: contactItem.ac_contact_channel,
                memo: contactItem.memo,
                ac_contact_province_code: contactAreaCodeObj.provinceCode,
                ac_contact_city_code: contactAreaCodeObj.cityCode,
                ac_contact_area_code: contactAreaCodeObj.countyCode,

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
            showToast({ msg: '保存成功', type: 'success' });
            this.getBack();

        },

        // 联系人编辑
        getContactsEdit() {
            let _this = this;
            let { contactItem, contactAreaCodeObj } = _this.data;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: contactItem.ac_account_id,
                ac_contact_id: contactItem.ac_contact_id,
                ac_contact_name: contactItem.ac_contact_name,
                ac_contact_mobile: contactItem.ac_contact_mobile,
                ac_contact_mail: contactItem.ac_contact_mail,
                ac_contact_position: contactItem.ac_contact_position,
                ac_contact_gender: contactItem.ac_contact_gender,
                is_kdm: contactItem.is_kdm,
                ac_contact_avatar_url: contactItem.ac_contact_avatar_url,
                ac_contact_type: contactItem.ac_contact_type,
                ac_contact_addr: contactItem.ac_contact_addr,
                ac_contact_channel: contactItem.ac_contact_channel,
                memo: contactItem.memo,
                ac_contact_province_code: contactAreaCodeObj.provinceCode,
                ac_contact_city_code: contactAreaCodeObj.cityCode,
                ac_contact_area_code: contactAreaCodeObj.countyCode,
                status: contactItem.status,
            };

            contactsEdit(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getContactsEdit(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/contact/update", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                     case 401:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        break;
                    case 404:
                        showToast({ msg: res.msg })
                        _this.clearcontactsEdit()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/contact/update", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getContactsEdit(res) {

            showToast({ msg: '保存成功', type: 'success' });
            this.setData({
                editStatus: false
            });

            this.getContactDetail();
            this.getContactLog();

        },

        clearcontactsEdit() {

        },

        // 联系人----->详情
        getContactDetail() {
            let _this = this;
            loading(true);
            console.log(' _this.data.contactsId----', _this.data.contactsId)

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_contact_id: _this.data.contactsId,
            }
            contactsDetail(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getContactDetail(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/contact/detail", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearProBroadcat()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/contact/detail", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);

            }, (err) => {

                loading(false);
            })
        },

        handelBs_getContactDetail(res) {
            console.log('详情-=======', res);
            let { listArray, selectAllArray } = this.data;
            let _item = res.data;

            let _listArray = this.handleApiData2Ui(_item, listArray, 'contacts');
            console.log('_listArray---------------', _listArray)


            let _customerItem = [];
            _customerItem.push(res.data.meta.ac_account_data);
            // console.log('_customerItem-------', _customerItem);

            // 省市区
            selectAllArray[0].selectedId = _item.ac_contact_province_code;
            selectAllArray[1].selectedId = _item.ac_contact_city_code;
            selectAllArray[2].selectedId = _item.ac_contact_area_code;

            let _cityData = getCity(_item.ac_contact_province_code);
            let _countyData = getCounty(_item.ac_contact_city_code);

            selectAllArray[1].selectArray = _cityData ? _cityData : []
            selectAllArray[2].selectArray = _countyData ? _countyData : [];

            // 联系人头像
            imgArr = [];
            imgArr.push(res.data.ac_contact_avatar_url);

            // 地址类型
            let _radioTabType = _item.ac_contact_type == 2 ? 'receiveAddress' : _item.ac_contact_type == 3 ? 'shippingAddress' : 'defaultAddress';

            // 新修改的省市区赋值
            let _contactAreaCodeObj = {
                provinceCode: _item.ac_contact_province_code,
                cityCode: _item.ac_contact_city_code,
                countyCode: _item.ac_contact_area_code
            }

            // 联系人名称
            let _ac_contact_name = res.data.ac_contact_name;
            this.setData({
                contactDetail: res.data,
                listArray: _listArray,
                customerItem: _customerItem,
                contactItem: res.data,
                selectAllArray: selectAllArray,
                customerValue: res.data.meta.ac_account_data.ac_account_name,// 客户的value
                customerId: res.data.ac_account_id,// 客户id
                imgArr: imgArr,
                radioTabType: _radioTabType,
                contactAreaCodeObj: _contactAreaCodeObj,
                ac_contact_name: _ac_contact_name
            })

        },

        // 根据code换取省市区的value
        getSelectValue(type, code, index) {
            let { selectAllArray } = this.data;

            let _newArray = [];

            if (type == 'province') {
                _newArray = selectAllArray[index].selectArray;


            } else if (type == 'city') {
                _newArray = selectAllArray[index].selectArray;

            } else if (type == 'county') {
                _newArray = selectAllArray[index].selectArray;

            }

            _newArray.length > 0 && _newArray.map((item, key) => {
                if (item.id == code) {
                    selectAllArray[index].value = item.value;
                }
            })

            this.setData({
                selectAllArray: selectAllArray
            })
            // console.log('编辑selectAllArray-------', selectAllArray)

        },

        // 新修改地址------->所在区域
        getAddressChange(e) {
            let { type } = e.currentTarget.dataset;
            let _info = e.detail;
            console.log('type----------', type);
            let _item = {
                provinceCode: _info.provinceCode,
                cityCode: _info.cityCode,
                countyCode: _info.countyCode,
            };

            this.setData({
                contactAreaCodeObj: _item
            })
            // console.log('areaCodeObj', areaCodeObj)
            // console.log('contactAreaCodeObj', contactAreaCodeObj);

        },


        // 地址选择器
        getSelectAddressChange(e) {
            // console.log("e-----------", e);
            let { type, index } = e.currentTarget.dataset;
            let { value, id } = e.detail.item;

            this.getEditItem(type, id);

            this.setData({
                parent_code: id,
                selectArrayIndex: index + 1,
                [`selectAllArray[${index}].value`]: value,
                [`selectAllArray[${index}].selectedId`]: id,
            }, () => {

                if (index == 2) {
                    return
                }
                this.getAddressSelect();
            })
        },

        // 地址
        getAddressSelect() {
            let _this = this;
            let {
                parent_code,
                selectAllArray,
                selectArrayIndex,

            } = _this.data;

            if (parent_code == 0) {

                _this.setData({
                    [`selectAllArray[${selectArrayIndex}].selectArray`]: _this.data.provinceData,
                });
            } else {
                _this.setData({
                    [`selectAllArray[${selectArrayIndex}].selectArray`]: getCity(parent_code),
                });
            };
        },

        //上传头像
        getAvatar(e) {
            let _this = this;
            let resArray = [];
            _this.data.imgArr = [];

            tt.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                success(res) {
                    let pathArr = res.tempFilePaths
                    console.log(pathArr);
                    new Promise((re, rj) => {
                        //获取原图片信息

                        for (let i = 0; i < pathArr.length; i++) {

                            tt.getImageInfo({
                                src: pathArr[i],
                                success: function (res) {
                                    console.log("111111111")
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
                                faile: function (err) {
                                    console.log("err", err)
                                }
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
                fail(res) {
                    console.log(`chooseImage 调用失败`);
                }
            });
        },

        getUploadImage(path) {
            let _this = this;
            let index = _this.data.index;
            let resArray = _this.data.resArray;
            let imgArr = _this.data.imgArr;
            let { contactItem, contactsImgArr } = this.data;

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

                    contactItem.ac_contact_avatar_url = imgArr[0];
                    contactsImgArr[0] = imgArr[0];
                    // contactDetail.ac_contact_avatar_url = imgArr[0];
                    // contactDetail.ac_contact_type = 1;

                    _this.setData({
                        imgArr: imgArr,
                        contactItem: contactItem,
                        contactsImgArr: contactsImgArr
                        // contactDetail: contactDetail
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


        //联系人日志
        getContactLog() {
            let _this = this;
            let { contactsId } = _this.data;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_contact_id: contactsId,
            }

            contactLog(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getContactLog(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/contact/log", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearProBroadcat()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/contact/log", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);

            }, (err) => {

                loading(false);
            })
        },

        handelBs_getContactLog(res) {

            console.log('handelBs_getBusinessLog============', res.data);
            this.setData({
                contactLogList: res.data,
            })
        },


    }
})