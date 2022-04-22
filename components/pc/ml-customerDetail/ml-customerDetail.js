const app = getApp();
import { imgUrl, isdebug } from "../../../config";
var uploadImage = require("../../../utils/uploadImg/uploadImg.js");
import { loading, dataStatus, showToast, goToPage, setBatTitle, onLoadPublicMethods, } from "../../../utils/interactive";
import { formatDATESub, getUseHours, formatSlice, isMobile, isTel, isChinaNameValue } from "../../../utils/util.js";

import {
    customerDetail, addressSelect, customerSelectArray, customerEdit,
    customerAdd, contactsDel, contactsAdd, invoiceAdd, contactsEdit, invoiceEdit,
    invoiceDel, recordList, customerLog, cusBusinessList, cusProjectList, createBank,
    bankSelect, deleteBank, updateBank,
} from "../../../utils/http";

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

        customerStatus: {
            type: Boolean,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                // console.log('customerStatus-----', this.data.customerStatus)
            },
        },

        customerType: {
            type: String,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                console.log('customerType-----', this.data.customerType);

                let { customerType, listArray } = this.data;

                if (customerType == 'add') {

                    let _statusIndex = listArray.findIndex((o, i) => { return o.type == 'status' })

                    this.getClearData('add');
                    this.setData({
                        editStatus: true,
                        customerItem: {},
                        editItem: {},
                        parent_code: 0,
                        imgArr: [],
                        [`listArray[${_statusIndex}].isShow`]: false,

                    });

                } else if (customerType == 'detail') {
                    this.getCustomerDetail();
                    this.getCustomerLog();
                    this.getBankSelect()
                }

                this.getCustomerSelectArray();
                this.data.provinceData = getProvince(initCode)
                this.getAddressSelect();

            },
        },

        customerId: {
            type: Number,
            value: ''
        },
    },

    ready() {
        // this.data.provinceData = getProvince(initCode)
        // this.getAddressSelect()
        this.setData({
            defaultAvatar: this.data.publicImgUrl + '/img/pcPAlark/pc_logo_default.png',
            defaultAvatarConcat: this.data.publicImgUrl + '/img/pcPAlark/pc_upload_avaturl.png',
        })

    },

    /**
     * 组件的初始数据
     */
    data: {
        scroll: true,
        scrollView: "",

        editStatus: false,// 编辑按钮
        editcontactStatus: false,
        editinvoiceStatus: false,
        editBankStatus: false,

        customerItem: {},

        listArray: [
            { isShow: true, placeType: 'left', viewType: "select", title: '客户来源', value: '', type: "ac_account_source_id", selectArray: [], selectedId: "", necessary: true },
            // { isShow: false, placeType: 'left', viewType: "select", title: '客户行业', value: '', type: "ac_account_industry_id", selectArray: [], selectedId: "", necessary: true },
            { isShow: true, placeType: 'left', viewType: "select", title: '重要程度', value: '', type: "ac_account_priority_id", selectArray: [], selectedId: "" },
            { isShow: true, placeType: 'left', viewType: "select", title: '客户阶段', value: '', type: "ac_account_stage", selectArray: [], selectedId: "" },
            { isShow: true, placeType: 'left', viewType: "textarea", title: '内部备注', value: '', type: "memo" },
            { isShow: true, placeType: 'left', viewType: "select", title: '分配负责人', value: '', type: "ac_account_assigned_to", selectArray: [], selectedId: "", isSearch: true },
            { isShow: true, placeType: 'right', viewType: "input", title: '座机', value: '', type: "ac_account_tel", placeholder: "请输入电话", maxlength: 11, inputType: "number", length: 11 },
            { isShow: true, placeType: 'right', viewType: "input", title: '手机', value: '', type: "ac_account_mobile", placeholder: "请输入手机", maxlength: 11, inputType: "number", length: 11 },
            { isShow: true, placeType: 'right', viewType: "input", title: '邮箱', value: '', type: "ac_account_email", placeholder: "请输入邮箱", regType: 'isEnglish' },
            { isShow: true, placeType: 'right', viewType: "input", title: '网站', value: '', type: "ac_account_website", placeholder: "请输入网站", regType: 'isEnglish' },
            { isShow: true, placeType: 'right', viewType: "select-address", title: '', },
            { isShow: true, placeType: 'right', viewType: "input", title: '详细地址', value: '', type: "ac_account_addr", placeholder: "请输入详细地址", },
            {
                isShow: false, placeType: 'right', viewType: "radio", title: '状态', selectedId: -1, type: "status",
                radioTabs: [
                    { id: 0, name: '无效', type: "no" },
                    { id: 1, name: '有效', type: "yes" },
                ],
                radioTabType: "", necessary: ''
            },
        ],

        addressType: 1,
        // 客户新增的省市区
        selectAllArray: [
            { placeholder: "省", value: "", selectedId: '', type: "ac_account_province_code", selectArray: [] },
            { placeholder: "市", value: '', selectedId: '', type: "ac_account_city_code", selectArray: [] },
            { placeholder: "县/区", value: '', selectedId: '', type: "ac_account_area_code", selectArray: [] },
        ],
        selectArrayType: 'province',
        selectArrayIndex: 0,

        // 联系人新增的省市区
        selectContactArray: [
            { placeholder: "省", value: "", selectedId: '', type: "ac_contact_province_code", selectArray: [] },
            { placeholder: "市", value: '', selectedId: '', type: "ac_contact_city_code", selectArray: [] },
            { placeholder: "县/区", value: '', selectedId: '', type: "ac_contact_area_code", selectArray: [] },
        ],
        selectContactType: 'province',
        selectContactIndex: 0,

        headData: [
            { title: '企业名称', key: "ac_account_org_name" },
            { title: '企业税号', key: "ac_account_org_taxid" },
            { title: '', key: "operation" },
        ],
        bankHeadData: [
            { title: '账号名称', key: "ac_account_org_name" },
            { title: '开户行银行', key: "ac_org_bank_name" },
            { title: '银行账户', key: "ac_org_bank_account_number" },
            { title: '', key: "operation" },
        ],
        bankBodyData: [],
        bodyData: [],
        tabList: [
            { id: 0, text: "客户日志", type: "customerLog", status: "true" },
            { id: 1, text: "跟进记录", type: "record", status: "true" },
            // { id: 2, text: "商机", type: "business", status: "true" },
        ],
        tabActiveIdx: 0,
        tabsType: "customerLog",
        proLogList: [],
        selectAddressArray: [],
        parent_code: 0,

        // 新建联系人
        addContactsStatus: false,
        addContactsList: [
            { isShow: true, viewType: "avatar", title: '', value: '', type: "ac_contact_name", placeholder: "请输入联系人名称", necessary: true },
            { isShow: true, viewType: "input", title: '联系方式', value: '', type: "ac_contact_mobile", placeholder: "请输入", maxlength: 11, necessary: true, inputType: "number", length: 11 },
            { isShow: true, viewType: "input", title: '职位', value: '', type: "ac_contact_position", placeholder: "请输入", necessary: true, isLimit: false },
            { isShow: true, viewType: "input", title: '渠道', value: '', type: "ac_contact_channel", placeholder: "请输入", necessary: false, },
            { isShow: true, viewType: "textarea", title: '备注', value: '', type: "memo" },
            {
                isShow: true, viewType: "select", title: '称谓', value: '', type: "ac_contact_gender", placeholder: "", selectedId: "",
                selectArray: [
                    { id: 2, value: '女士' },
                    { id: 1, value: '先生' }
                ]
            },
            {
                isShow: true, viewType: "select", title: '关键决策人', value: '', type: "is_kdm", selectedId: "",
                selectArray: [
                    { id: 0, value: '否' },
                    { id: 1, value: '是' },
                ]
            },
            { isShow: true, viewType: "select-address", title: '所在区域', },
            { isShow: true, viewType: "input", title: '详细地址', value: '', type: "ac_contact_addr", placeholder: "请输入详细地址" },
            // {
            //     isShow: false, placeType: 'right', viewType: "radio", title: '状态', selectedId: -1, type: "status",
            //     radioTabs: [
            //         { id: 0, name: '无效', type: "no" },
            //         { id: 1, name: '有效', type: "yes" },
            //     ],
            //     radioTabType: "", necessary: ''
            // },
        ],

        addContactsTabs: [
            { id: 1, name: '联系人', isSelected: true, type: "contacts" },
            { id: 2, name: '收票地址', isSelected: false, type: "receiveAddress" },
            { id: 3, name: '发货地址', isSelected: false, type: "shippingAddress" },
        ],
        addContactsType: 'contacts',

        // 联系人详情
        contactDetailList: [
            { viewType: "input", title: '手机', value: '', type: "ac_contact_mobile" },
            { viewType: "input", title: '职位', value: '', type: "ac_contact_position" },
            { viewType: "input", title: '渠道', value: '', type: "ac_contact_channel" },
            { viewType: "input", title: '内部备注', value: '', type: "memo" },
        ],
        contactDetailStatus: false,

        // 新增发票
        addInvoiceStatus: false,
        addInvoiceList: [
            { viewType: "input", title: '企业名称', value: '', type: "ac_account_org_name", placeholder: "" },
            { viewType: "input", title: '企业税号', value: '', type: "ac_account_org_taxid", placeholder: "" },
            { viewType: "radio" },

        ],
        //新增银行
        addBankStatus: false,
        addBankList: [
            {
                viewType: "select", title: '账号名称', value: '', type: "ac_account_org_id", selectedId: '',
                selectArray: [
                    { id: 0, value: '北京变形积木公司1' },
                    { id: 1, value: '北京变形积木公司1' },
                ]
            },
            { viewType: "input", title: '开户银行', value: '', type: "ac_org_bank_name", placeholder: "" },
            { viewType: "input", title: '银行账号', value: '', inputType: 'number', type: "ac_org_bank_account_number", placeholder: "" },
            { viewType: "radio" },

        ],
        radioBankTabs: [
            { id: 1, name: '基本户', type: "baseUser" },
            { id: 2, name: '一般户', type: "ordinaryUser" },
        ],

        radioBankTabType: '',


        radioTabs: [
            { id: 1, name: '是', type: "sure" },
            { id: 0, name: '否', type: "no" },
        ],

        radioTabType: 'sure',
        imgArr: [],
        editItem: {},
        contactItem: {},
        invoiceItem: {},
        bankItem: { ac_org_bank_is_default: 1 },
        changeType: 'customer', // 默认客户----customer,新建联系人----contact,新建发票信息---invoice,

        // 客户-----省市区
        areaCodeObj: {
            provinceCode: '',
            cityCode: '',
            countyCode: '',
        },
        // 联系人---省市区
        contactAreaCodeObj: {
            provinceCode: '',
            cityCode: '',
            countyCode: '',
        },
        customerLogList: [],
        //商机列表headeData
        customerOppHeadData: [
            { title: "商机名称", key: "lead_name" },
            // { title: "规模", key: "lead_priority_value" },
            { title: "规模", key: "lead_scale" },
            { title: "阶段", key: "lead_stage_value" },
            { title: "创建人", key: "uc_name" },
            { title: "创建时间", key: "created_at", showSort: false, },
        ],
        // 商机列表bodyData
        customerOppBodyData: [],

        // 项目列表headeData
        cusProjecHeadData: [
            { title: "项目名称", key: "pm_p_name" },
            { title: "创建时间", key: "created_at", showSort: false, },
        ],
        // 项目列表bodyData
        cusProjectBodyData: [],

        // 头像
        contactsImgArr: [
            `${imgUrl}/img/pcPAlark/pc_upload_avaturl.png`,
            `${imgUrl}/img/pcPAlark/pc_receive_address.png`,
            `${imgUrl}/img/pcPAlark/pc_shipping_address.png`
        ],
        contactEditDetail: {},



    },

    /**
     * 组件的方法列表
     */
    methods: {

        // 初始化-------->清空input/select的值,
        getClearData(type) {
            let {
                contactItem,
                addBankList,
                addInvoiceList,
                addContactsList,
                listArray,
                selectAllArray,
                selectContactArray,
            } = this.data;

            if (type == "contact" || type == 'contactEdit') {
                for (let i = 0; i < addContactsList.length; i++) {
                    let _str = '';
                    let _selectedId = '';
                    _str = 'addContactsList[' + i + '].value';
                    _selectedId = 'addContactsList[' + i + '].selectedId';
                    this.setData({
                        [_str]: '',
                        [_selectedId]: ''
                    })
                }
                for (let i = 0; i < selectContactArray.length; i++) {
                    let _str = '';
                    let _selectedId = '';
                    let _selectCityArray = [];
                    let _selectCountyArray = [];

                    _str = 'selectContactArray[' + i + '].value';
                    _selectedId = 'selectContactArray[' + i + '].selectedId';
                    _selectCityArray = 'selectContactArray[1].selectArray';
                    _selectCountyArray = 'selectContactArray[2].selectArray';

                    this.setData({
                        [_str]: '',
                        [_selectedId]: '',
                        [_selectCityArray]: [],
                        [_selectCountyArray]: [],
                        selectContactIndex: 0
                    })
                };
                let _areaCodeObj = {
                    provinceCode: '',
                    cityCode: '',
                    countyCode: '',
                };

                this.setData({
                    contactAreaCodeObj: _areaCodeObj
                })

            } else if (type == "invoice" || type == "invoiceEdit") {
                for (let i = 0; i < addInvoiceList.length; i++) {
                    let _str = '';
                    _str = 'addInvoiceList[' + i + '].value';
                    this.setData({
                        [_str]: ''
                    })
                };

                this.setData({
                    invoiceItem: {},
                    radioTabType: 'sure',
                })

            } else if (type == "bank" || type == "bankEdit") {
                for (let i = 0; i < addBankList.length; i++) {
                    let _str = '';
                    _str = 'addBankList[' + i + '].value';
                    this.setData({
                        [_str]: ''
                    })
                };

                this.setData({
                    bankItem: { ac_org_bank_is_default: 1 },
                    radioBankTabType: '',
                })

            } else if (type == "add") {
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
                };
                let _areaCodeObj = {
                    provinceCode: '',
                    cityCode: '',
                    countyCode: '',
                };

                this.setData({
                    areaCodeObj: _areaCodeObj,
                    ac_account_name: ''
                })

                // console.log('selectAllArray===========', selectAllArray)
            }
        },

        // 返回
        getBack() {
            console.log('customerType======', this.data.customerType);

            let item = {
                type: 'customer',
                backType: this.data.customerType
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
                this.getCustomerLog();
            }
        },

        // 编辑
        getEdit(e) {
            let { type, status } = e.currentTarget.dataset;
            let { editItem, listArray } = this.data;

            console.log('type, status', type, status);

            this.setEditStatus(type, status, editItem);

        },

        setEditStatus(type, status, editItem) {
            // editcustomer,editcontact,editinvoice;

            let { listArray, addContactsList } = this.data;
            if (type == 'editcustomer') {

                // 状态是否显示
                let _addrIndex = listArray.findIndex((info, index) => { return info.type == 'ac_account_addr' });
                let _statusIndex = listArray.findIndex((o, i) => { return o.type == 'status' })


                this.setData({
                    editStatus: !status,
                    [`listArray[${_addrIndex}].value`]: editItem && editItem.ac_account_addr,
                    [`listArray[${_statusIndex}].isShow`]: true

                });
                this.getCustomerDetail();

            } else if (type == 'editcontact') {

                this.setData({
                    editcontactStatus: !status,
                })

            } else if (type == 'editinvoice') {
                this.setData({
                    editinvoiceStatus: !status
                })

            } else if (type == 'editBank') {
                this.setData({
                    editBankStatus: !status
                })
                this.getBankSelect()
            }
        },

        // input 输入框change
        getInputChange(e) {
            console.log(e);
            let { type, index, modaltype } = e.currentTarget.dataset;
            let { value } = e.detail;
            console.log('type', type, index, value);

            // 客户名称
            if (type == 'ac_account_name') {
                this.setData({
                    ac_account_name: value,
                })
            };

            console.log('modaltype---------------', modaltype)

            switch (modaltype) {
                case 'customer':
                    this.setData({
                        [`listArray[${index}].value`]: value,
                    })
                    break;
                case 'contacts':
                    this.setData({
                        [`addContactsList[${index}].value`]: value
                    })
                    break;
                case 'invoice':
                    this.setData({
                        [`addInvoiceList[${index}].value`]: value
                    })

                    break;
                case 'bank':
                    this.setData({
                        [`addBankList[${index}].value`]: value
                    })
                    break;
                default:

            }

            this.getEditItem(type, value);

        },

        // select
        getSelectChange(e) {
            let { listArray, } = this.data;
            console.log("e--------------:", e);
            let { type, index, placetype } = e.currentTarget.dataset;
            let { value, id } = e.detail.item;


            if (placetype == 'customer') {
                this.setData({
                    [`listArray[${index}].value`]: value,
                    [`listArray[${index}].selectedId`]: id,
                })

            } else if (placetype == 'contact') {
                this.setData({
                    [`addContactsList[${index}].value`]: value,
                    [`addContactsList[${index}].selectedId`]: id,
                })
            } else if (placetype == 'bank') {
                this.setData({
                    [`addBankList[${index}].value`]: value,
                    [`addBankList[${index}].selectedId`]: id,
                })
            }

            this.getEditItem(type, id);

        },

        // select搜索值------>
        getSelectInputChange(e) {
            // console.log('e------------', e);
            let { type, index, placetype } = e.currentTarget.dataset;
            let _value = e.detail.value;

            if (placetype == 'customer') {
                this.setData({
                    [`listArray[${index}].value`]: _value,
                    [`listArray[${index}].selectedId`]: '',
                })

            } else if (placetype == 'contact') {
                this.setData({
                    [`addContactsList[${index}].value`]: _value,
                    [`addContactsList[${index}].selectedId`]: '',
                })
            }

            this.getEditItem(type, '');

        },

        // radio  状态
        getRadio(e) {
            let { changeType, listArray, addContactsList } = this.data;
            let { type } = e.currentTarget.dataset;
            let { item } = e.detail

            let _statusIndex = 0;
            if (changeType == 'customer') {
                _statusIndex = listArray.findIndex((o, i) => { return o.type == type })

                this.setData({
                    [`listArray[${_statusIndex}].radioTabType`]: item.type,
                    [`listArray[${_statusIndex}].selectedId`]: item.id
                })

            }
            // else if (changeType == 'contact' || changeType == 'contactEdit') {
            //     _statusIndex = addContactsList.findIndex((o, i) => { return o.type == type })

            //     this.setData({
            //         [`addContactsList[${_statusIndex}].radioTabType`]: item.type,
            //         [`addContactsList[${_statusIndex}].selectedId`]: item.id
            //     })
            // }

            this.getEditItem(type, item.id);
        },

        getEditItem(type, value) {
            let { changeType, editItem, contactItem, invoiceItem, bankItem } = this.data;
            console.log('changeType------', changeType);

            if (changeType == 'customer') {

                editItem[type] = value;
                this.setData({
                    editItem: editItem
                })

            } else if (changeType == 'contact' || changeType == 'contactEdit') {
                contactItem[type] = value;

                this.setData({
                    contactItem: contactItem
                })

            } if (changeType == 'invoice' || changeType == 'invoiceEdit') {
                invoiceItem[type] = value;

                this.setData({
                    invoiceItem: invoiceItem
                })
            } if (changeType == 'bank' || changeType == 'bankEdit') {
                bankItem[type] = value;
                this.setData({
                    bankItem,
                })
            }
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

            if (type == 'add') {
                this.setData({
                    areaCodeObj: _item
                })

            } else if (type == 'contact') {
                this.setData({
                    contactAreaCodeObj: _item
                })
            };
            // console.log('areaCodeObj', areaCodeObj)
            // console.log('contactAreaCodeObj', contactAreaCodeObj);

        },


        // 地址选择器
        getSelectAddressChange(e) {
            console.log("getSelectAddressChange:", e);

            // addresstype 1 客户地址, 2 联系人地址

            let { type, index, addresstype } = e.currentTarget.dataset;
            let { value, id } = e.detail.item;
            // console.log('type=========', type);


            if (addresstype == 1) {

                this.setData({
                    [`selectAllArray[${index}].value`]: value,
                    [`selectAllArray[${index}].selectedId`]: id,
                    selectArrayIndex: index + 1,
                })

            } else if (addresstype == 2) {
                this.setData({
                    [`selectContactArray[${index}].value`]: value,
                    [`selectContactArray[${index}].selectedId`]: id,
                    selectContactIndex: index + 1,
                })
            }

            this.getEditItem(type, id);

            this.setData({
                parent_code: id,
                addressType: addresstype
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
            // console.log("_this.data.provinceData", _this.data.provinceData,);

            let {
                parent_code,
                addressType,
                selectAllArray,
                selectArrayIndex,
                selectContactArray,
                selectContactIndex
            } = _this.data;

            if (parent_code == 0) {

                _this.setData({
                    [`selectAllArray[${selectArrayIndex}].selectArray`]: _this.data.provinceData,
                    [`selectContactArray[${selectContactIndex}].selectArray`]: _this.data.provinceData,
                });
            } else {
                if (addressType == 1) {
                    _this.setData({
                        [`selectAllArray[${selectArrayIndex}].selectArray`]: getCity(parent_code),
                    });

                } else if (addressType == 2) {
                    _this.setData({
                        [`selectContactArray[${selectContactIndex}].selectArray`]: getCity(parent_code),
                    });

                }
            };

        },

        // 联系人/发票------->modal 显示
        getAddModal(e) {

            let { item } = e.currentTarget.dataset;

            let modaltype = '';
            let _str1 = e.currentTarget.dataset.modaltype ? e.currentTarget.dataset.modaltype : '';
            let _str2 = e.detail.modaltype ? e.detail.modaltype : '';

            if (_str1) {
                modaltype = _str1;

            } else if (_str2) {
                modaltype = _str2;
            };

            console.log('modaltype-----------', modaltype);


            let {
                editStatus,
                editinvoiceStatus,
                editcontactStatus,
                editBankStatus,
                addContactsList,
                addContactsTabs,
                contactDetailList,
                selectContactArray,
                contactItem,
                invoiceItem,
                bankItem,
                imgContactsArr,
                addInvoiceList,
                addBankList,
                contactsImgArr
            } = this.data;
            // console.log('modaltype-----------', modaltype);
            this.getDataStatus(modaltype, true);

            console.log('editinvoiceStatus------------', editinvoiceStatus)

            if (editStatus) {
                // 跟进记录
                if (modaltype == 'recordAdd') {

                    this.setData({
                        modalTitle: '新建跟进记录',
                    })
                }
            }

            // 客户--商机列表
            if (modaltype == 'cusBussiness') {
                this.getCusBusinessList();
            }

            // 客户--项目列表
            if (modaltype == 'cusProject') {
                this.getCusProjectList();
            }
            console.log("sdfadfadfadfadfasdfadsf", modaltype)

            switch (modaltype) {
                case 'contact':
                    this.setData({
                        modalTitle: '新建客户联系人',
                    })
                    break;
                case 'invoice':
                    this.setData({
                        modalTitle: '新建发票信息',
                    })
                    break;
                case 'bank':
                    this.setData({
                        modalTitle: '新建银行信息',
                    })
                    break;
                default:
                    break;
            }


            // 联系人
            if (editcontactStatus) {
                // 新建联系人
                if (modaltype == 'contact') {
                    this.getClearData('contact');

                    contactItem = {};

                    this.setData({
                        modalTitle: '新建客户联系人',
                        imgContactsArr: [],
                        addContactsType: 'contacts',
                    }, () => {

                        addContactsTabs.map((info, key) => {
                            if (key == 0) {
                                info.isSelected = true;
                            } else {
                                info.isSelected = false;
                            }
                        })

                        contactItem.ac_contact_type = 1;
                        this.setData({
                            addContactsTabs: addContactsTabs,
                            contactItem: contactItem,

                        })
                        console.log('联系人contactItem=========', contactItem);
                        // console.log('addContactsTabs=========', addContactsTabs);
                    })

                    // 联系人-------->编辑
                } else if (modaltype == 'contactEdit') {
                    this.getClearData('contactEdit');

                    this.setData({
                        modalTitle: '编辑客户联系人'
                    })

                    let _addContactsList = this.handleApiData2Ui(item, addContactsList, 'contacts');


                    // 联系人省市区
                    selectContactArray[0].selectedId = item.ac_contact_province_code;
                    selectContactArray[1].selectedId = item.ac_contact_city_code;
                    selectContactArray[2].selectedId = item.ac_contact_area_code;

                    let _cityData = getCity(item.ac_contact_province_code);
                    let _countyData = getCounty(item.ac_contact_city_code);

                    selectContactArray[1].selectArray = _cityData ? _cityData : []
                    selectContactArray[2].selectArray = _countyData ? _countyData : [];

                    // 联系人 头像
                    imgContactsArr = [];
                    if (item.ac_contact_avatar_url) {
                        imgContactsArr.push(item.ac_contact_avatar_url);

                    } else {
                        let _index = item.ac_contact_type ? item.ac_contact_type - 1 : 0
                        imgContactsArr.push(contactsImgArr[_index]);
                    }

                    let _ac_contact_type = item.ac_contact_type;

                    addContactsTabs.map((info, index) => {

                        if (info.id == _ac_contact_type) {
                            info.isSelected = true;

                        } else {
                            info.isSelected = false;

                        }
                    });


                    // 新修改的省市区赋值
                    let _contactAreaCodeObj = {
                        provinceCode: item.ac_contact_province_code,
                        cityCode: item.ac_contact_city_code,
                        countyCode: item.ac_contact_area_code
                    }

                    console.log('addContactsList', _addContactsList);

                    this.setData({
                        addContactsList: _addContactsList,
                        addContactsTabs: addContactsTabs,
                        selectContactArray: selectContactArray,
                        contactItem: item,
                        contactEditDetail: item,
                        imgContactsArr: imgContactsArr,
                        contactAreaCodeObj: _contactAreaCodeObj,
                        addContactsType: item.ac_contact_type == 1 ? 'contacts' : item.ac_contact_type == 2 ? 'receiveAddress' : 'shippingAddress'
                    });

                }

                // 联系人--------->详情
            } else if (modaltype == 'contactDetail') {
                console.log('item----------', item)

                // contactDetailList[0].value = item.ac_contact_mobile;
                // contactDetailList[1].value = item.ac_contact_mail;
                // contactDetailList[2].value = item.ac_contact_gender == 2 ? '女士' : '先生';
                // contactDetailList[3].value = item.ac_contact_addr;
                // contactDetailList[4].value = item.memo;

                contactDetailList = this.handleApiData2Ui(item, contactDetailList, 'contacts');
                console.log('contactDetailList=============', contactDetailList);

                this.setData({
                    contactDetailList: contactDetailList,
                    contactDetail: item
                })
            };

            // 发票
            if (editinvoiceStatus) {
                if (modaltype == 'invoice') {

                    invoiceItem.ac_account_org_is_default = 1;

                    this.setData({
                        modalTitle: '新建发票信息',
                        radioTabType: 'sure',
                        invoiceItem: invoiceItem
                    })

                    // 发票---->编辑
                } else if (modaltype == 'invoiceEdit') {
                    let _item = e.detail.item;
                    console.log('_item==============', _item);

                    // 页面
                    addInvoiceList[0].value = _item.ac_account_org_name;
                    addInvoiceList[1].value = _item.ac_account_org_taxid;

                    // 接口字段
                    invoiceItem.ac_account_org_id = _item.ac_account_org_id;
                    invoiceItem.ac_account_org_name = _item.ac_account_org_name;
                    invoiceItem.ac_account_org_taxid = _item.ac_account_org_taxid;
                    invoiceItem.ac_account_org_is_default = _item.ac_account_org_is_default;

                    let _radioTabType = _item.ac_account_org_is_default == 1 ? 'sure' : 'no';
                    this.setData({
                        modalTitle: '编辑发票信息',
                        radioTabType: _radioTabType,
                        invoiceItem: invoiceItem,
                        addInvoiceList: addInvoiceList
                    })

                }
            }

            if (editBankStatus) {
                // console.log("1231231231", modaltype)
                if (modaltype == 'bank') {


                    bankItem.ac_org_bank_is_default = 1;

                    this.setData({
                        modalTitle: '新建银行信息',
                        radioTabType: 'sure',
                        bankItem
                    })
                }
                if (modaltype == 'bankEdit') {
                    let _item = e.detail.item;
                    console.log('bankEdit:', _item);

                    // 页面
                    addBankList[0].selectedId = _item.ac_org_bank_id
                    addBankList[0].value = _item.ac_account_org_name
                    addBankList[1].value = _item.ac_org_bank_name
                    addBankList[2].value = _item.ac_org_bank_account_number

                    // let _radioTabType = _item.ac_org_bank_is_default == 1 ? 'sure' : 'no'
                    let _radioBankTabType = _item.ac_org_bank_type == 1 ? 'baseUser' : _item.ac_org_bank_type == 2 ? 'ordinaryUser' : ''

                    //接口
                    bankItem.ac_account_org_id = _item.ac_account_org_id
                    bankItem.ac_org_bank_name = _item.ac_org_bank_name
                    bankItem.ac_org_bank_account_number = _item.ac_org_bank_account_number
                    bankItem.ac_org_bank_is_default = _item.ac_org_bank_is_default
                    bankItem.ac_org_bank_id = _item.ac_org_bank_id


                    this.setData({
                        modalTitle: '编辑银行信息',
                        // radioTabType: _radioTabType,
                        radioBankTabType: _radioBankTabType,
                        bankItem,
                        addBankList,
                    })
                }

            }


        },


        //  联系人------->modal关闭
        closeAddContacts(e) {
            let modaltype = '';
            let _str1 = e.currentTarget.dataset.modaltype ? e.currentTarget.dataset.modaltype : '';
            let _str2 = e.detail.modaltype ? e.detail.modaltype : '';

            if (_str1) {
                modaltype = _str1;

            } else if (_str2) {
                modaltype = _str2;
            };


            console.log('modaltype------', modaltype);
            this.getClearData(modaltype);

            this.getDataStatus(modaltype, false);

        },

        getDataStatus(modaltype, status) {
            let { addContactsStatus, changeType } = this.data;

            console.log('modaltype============', modaltype);

            if (modaltype == 'contact') {
                this.setData({
                    addContactsStatus: status,
                    changeType: modaltype,
                })

            } else if (modaltype == 'invoice' || modaltype == 'invoiceEdit') {
                this.setData({
                    addInvoiceStatus: status,
                    changeType: modaltype,
                })
            } else if (modaltype == 'bank' || modaltype == 'bankEdit') {
                this.setData({
                    addBankStatus: status,
                    changeType: modaltype,
                })

            } else if (modaltype == 'contactEdit') {

                this.setData({
                    addContactsStatus: status,
                    changeType: modaltype,
                })
            } else if (modaltype == 'contactDetail') {

                this.setData({
                    contactDetailStatus: status,
                    changeType: modaltype,
                })
            } else if (modaltype == 'recordAdd') {

                this.setData({
                    addRecordStatus: status,
                    changeType: modaltype,
                })
            } else if (modaltype == 'cusBussiness') {

                this.setData({
                    cusBussinessStatus: status,
                    changeType: modaltype,
                })
            } else if (modaltype == 'cusProject') {

                this.setData({
                    cusProjectStatus: status,
                    changeType: modaltype,
                })
            }

            if (!status) {
                this.setData({
                    changeType: 'customer'
                })
            }
        },



        //radio
        tabsChange(e) {
            let { index, id, type } = e.currentTarget.dataset;
            let { addContactsTabs, contactItem, contactsImgArr, contactEditDetail } = this.data;
            console.log('type', type, index, id);
            console.log('contactItem-------------', contactItem);

            contactItem.ac_contact_type = id;
            // contactItem.ac_contact_avatar_url = contactsImgArr[index];

            addContactsTabs.map((item, key) => {
                if (index == key) {
                    item.isSelected = true;

                } else {

                    item.isSelected = false;
                }
            });
            let _imgContactsArr = [];

            if (id == 1 && contactEditDetail.ac_contact_type == 1 && contactEditDetail.ac_contact_avatar_url) {

                _imgContactsArr.push(contactEditDetail.ac_contact_avatar_url);
                contactItem.ac_contact_avatar_url = contactEditDetail.ac_contact_avatar_url;

            } else {

                _imgContactsArr.push(contactsImgArr[index]);
                contactItem.ac_contact_avatar_url = contactsImgArr[index];
            }
            console.log('_imgContactsArr', _imgContactsArr);


            this.setData({
                addContactsTabs: addContactsTabs,
                addContactsType: type,
                contactItem: contactItem,
                imgContactsArr: _imgContactsArr,
            })
        },



        // 客户=====>保存
        getPreservation(e) {
            let { customerType, editItem } = this.data;

            console.log('editItem======', editItem);

            if (!editItem.ac_account_name) {
                showToast({ msg: "请输入客户名称" });
                return;
            };

            if (!editItem.ac_account_source_id) {
                showToast({ msg: "请选择客户来源" })
                return;
            };


            // if (!editItem.ac_account_mobile) {
            //     showToast({ msg: "请输入手机号" })
            //     return;
            // };


            if (editItem.ac_account_tel) {
                if (!isTel(editItem.ac_account_tel)) {
                    showToast({ msg: "座机号号输入错误" })
                    return;
                }
            };

            if (editItem.ac_account_mobile) {
                if (!isMobile(editItem.ac_account_mobile)) {
                    showToast({ msg: "手机号输入错误" })
                    return;
                }
            };




            // if (!editItem.ac_account_industry_id) {
            //     showToast({ msg: "请选择客户行业" })
            //     return;
            // }

            if (customerType == 'add') {
                this.getCustomerAdd();

            } else if (customerType == 'detail') {
                this.getCustomerEdit();
            }
        },

        // 客户======>取消
        getCancel(e) {
            let { customerType, listArray, editItem } = this.data;

            if (customerType == 'add') {
                this.getBack();
            } else {
                this.setData({
                    editStatus: false
                });
            };

            let _addrIndex = listArray.findIndex((info, index) => { return info.type == 'ac_account_addr' });
            let _value = editItem.ac_account_splice_addr ? editItem.ac_account_splice_addr : '';

            this.setData({
                [`listArray[${_addrIndex}].value`]: _value,
            })
        },

        // 联系人====>保存/再次新建
        getContactSubmit(e) {
            let { contactItem, changeType } = this.data;
            let { modalcontactshow } = e.currentTarget.dataset;
            // console.log('contactItem', contactItem);
            console.log('changeType', changeType);


            this.setData({
                modalcontactshow: modalcontactshow,

            })

            if (!contactItem.ac_contact_name) {
                showToast({ msg: "请输入联系人" })
                return;
            }


            if (!contactItem.ac_contact_mobile) {
                showToast({ msg: "请输入联系方式" })
                return;
            };

            if (contactItem.ac_contact_mobile) {
                if (!isMobile(contactItem.ac_contact_mobile)) {
                    showToast({ msg: "联系方式输入错误" })
                    return;
                }
            };

            if (!contactItem.ac_contact_position) {
                showToast({ msg: "请输入职位" })
                return;
            };

            // if (!contactItem.ac_contact_channel) {
            //     showToast({ msg: "请输入渠道" })
            //     return;
            // };



            if (changeType == 'contact') {
                this.getContactsAdd();


            } else if (changeType == 'contactEdit') {
                this.getContactsEdit();

            }

        },

        // 发票 =====>保存/再次新建
        getInvoiceSubmit(e) {
            // console.log(e);
            let { modalshow } = e.currentTarget.dataset;
            let { changeType, invoiceItem } = this.data;
            console.log('changeType=======', changeType);
            console.log('invoiceItem--------', invoiceItem);


            this.setData({
                modalshow: modalshow,
            })

            if (!invoiceItem.ac_account_org_name) {
                showToast({ msg: "请输入企业名称" })
                return;
            }

            if (!invoiceItem.ac_account_org_taxid) {
                showToast({ msg: "请输入企业税号" })
                return;
            };

            if (changeType == 'invoice') {
                this.getInvoiceAdd();


            } else if (changeType == 'invoiceEdit') {
                this.getInvoiceEdit();
            }
        },

        // 发票-------->删除
        getOperation(e) {
            console.log("getOperation:", e);
            let _this = this;
            let _ac_account_org_id = e.detail.item.ac_account_org_id;
            tt.showModal({
                title: '确认删除发票?',
                success(res) {
                    if (res.confirm) {
                        _this.getInvoiceDel(_ac_account_org_id);
                    }
                }
            })
        },

        //getOperationBank
        // 发票-------->删除
        getOperationBank(e) {
            console.log("getOperation:", e);
            let _this = this;
            let ac_org_bank_id = e.detail.item.ac_org_bank_id;
            tt.showModal({
                title: '确认银行新信息吗?',
                success(res) {
                    if (res.confirm) {
                        _this.getDeleteBank(ac_org_bank_id);
                    }
                }
            })
        },

        // 发票-------->radio
        getTabChange(e) {
            console.log(e);
            let { type, item } = e.detail;
            let { invoiceItem, bankItem, changeType } = this.data;
            console.log(type, item, changeType)

            if (changeType == "invoice" || changeType == "invoiceEdit") {
                let _id = item.id;

                invoiceItem.ac_account_org_is_default = _id;

                this.setData({
                    radioTabType: type,
                    invoiceItem: invoiceItem
                })
            }
            if (changeType == "bank" || changeType == "bankEdit") {
                let _id = item.id;

                // bankItem.ac_org_bank_is_default = _id;
                bankItem.ac_org_bank_type = _id;

                this.setData({
                    radioBankTabType: type,
                    bankItem
                })
            }

        },


        // 跳转详情
        getDetailChange(e) {
            // console.log('e================', e);
            this.getDataStatus('cusBussiness', false);

            let item = e.detail.item;
            this.triggerEvent('goDetail', { item });
        },




        // 新建银行信息
        getBankSubmit(e) {
            // console.log(e);
            let { modalshow } = e.currentTarget.dataset;
            let { changeType, bankItem } = this.data;
            console.log('changeType=======', changeType);
            console.log('banktem--------', bankItem);


            this.setData({
                modalshow: modalshow,
            })

            if (!bankItem.ac_account_org_id) {
                showToast({ msg: "账号名称" })
                return;
            }

            if (!bankItem.ac_org_bank_name) {
                showToast({ msg: "开户银行" })
                return;
            };
            if (!bankItem.ac_org_bank_account_number) {
                showToast({ msg: "银行账户" })
                return;
            };
            if (!bankItem.ac_org_bank_type) {
                showToast({ msg: "账户性质" })
                return;
            }

            if (changeType == 'bank') {
                this.addCreateBank();
                console.log("创建银行信息")


            } else if (changeType == 'bankEdit') {
                // this.getInvoiceEdit();
                this.getUpdateBank()
                console.log("编辑银行信息")
            }
        },







        // API 

        // 客户新增
        getCustomerAdd() {
            let _this = this;
            let { editItem, areaCodeObj } = _this.data;
            console.log('areaCodeObj==============', areaCodeObj);

            loading(true);
            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_name: editItem.ac_account_name,
                ac_account_tel: editItem.ac_account_tel,
                ac_account_mobile: editItem.ac_account_mobile,
                ac_account_email: editItem.ac_account_email,
                ac_account_website: editItem.ac_account_website,
                ac_account_priority_id: editItem.ac_account_priority_id,
                ac_account_stage: editItem.ac_account_stage,
                ac_account_source_id: editItem.ac_account_source_id,
                // ac_account_industry_id: editItem.ac_account_industry_id, // 行业
                ac_account_addr: editItem.ac_account_addr,
                memo: editItem.memo,
                ac_account_assigned_to: editItem.ac_account_assigned_to,
                ac_account_logo_url: editItem.ac_account_logo_url,
                ac_account_province_code: areaCodeObj.provinceCode,
                ac_account_city_code: areaCodeObj.cityCode,
                ac_account_area_code: areaCodeObj.countyCode,
            }

            customerAdd(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getCustomerAdd(res);
                        break;
                    case 400:
                    case 404:

                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    //     _this.clearCustomerAdd();
                    //     break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getCustomerAdd(res) {
            showToast({ msg: '保存成功', type: 'success' });

            // this.setData({
            //     editStatus: true,
            // });

            this.getBack();

        },

        clearCustomerAdd() {

        },

        // 客户编辑
        getCustomerEdit() {
            let _this = this;

            let { editItem, areaCodeObj } = _this.data;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: editItem.ac_account_id,
                ac_account_name: editItem.ac_account_name,
                ac_account_tel: editItem.ac_account_tel,
                ac_account_mobile: editItem.ac_account_mobile,
                ac_account_email: editItem.ac_account_email,
                ac_account_website: editItem.ac_account_website,
                ac_account_priority_id: editItem.ac_account_priority_id,
                ac_account_stage: editItem.ac_account_stage,
                ac_account_source_id: editItem.ac_account_source_id,
                // ac_account_industry_id: editItem.ac_account_industry_id, // 客户行业
                ac_account_addr: editItem.ac_account_addr,
                memo: editItem.memo,
                ac_account_assigned_to: editItem.ac_account_assigned_to,
                ac_account_logo_url: editItem.ac_account_logo_url,
                ac_account_province_code: areaCodeObj.provinceCode,
                ac_account_city_code: areaCodeObj.cityCode,
                ac_account_area_code: areaCodeObj.countyCode,
                status: editItem.status,// 2022.04.06新增状态字段
            }

            customerEdit(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getCustomerEdit(res);
                        break;
                    case 401:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/update", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearCustomerEdit()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/update", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getCustomerEdit(res) {

            this.setData({
                editStatus: false
            });

            this.getCustomerDetail();
            this.getCustomerLog();
        },

        clearCustomerEdit() {

        },

        // 客户详情
        getCustomerDetail() {
            let _this = this;
            loading(true);
            // console.log(' _this.data.customerId----', _this.data.customerId)

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: _this.data.customerId,
            }
            customerDetail(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getCustomerDetail(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/detail", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        // _this.clearProBroadcat()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/detail", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getCustomerDetail(res) {
            console.log('handelBs_getCustomerDetail:', res.data);

            let backObject = res.data
            let { listArray,
                selectAllArray,
                imgArr,
                bankHeadData,
                headData,
                areaCodeObj,
                contactsImgArr
            } = this.data;

            let _span = '无';
            // console.log('listArray:', listArray);
            // 返回数据 转换为 UI 数据
            listArray = this.handleApiData2Ui(backObject, listArray, 'customer')

            let _item = res.data;

            areaCodeObj.provinceCode = _item.ac_account_province_code;
            areaCodeObj.cityCode = _item.ac_account_city_code;
            areaCodeObj.countyCode = _item.ac_account_area_code;


            let _cityData = getCity(_item.ac_account_province_code);
            let _countyData = getCounty(_item.ac_account_city_code);

            selectAllArray[1].selectArray = _cityData ? _cityData : []
            selectAllArray[2].selectArray = _countyData ? _countyData : [];

            // 客户头像
            imgArr = [];
            imgArr.push(res.data.ac_account_logo_url);

            let _contactList = res.data.meta.tb_ac_account_contact;
            _contactList.map((info, key) => {

                if (info.ac_contact_type == 1) {
                    info.ac_contact_avatar_url = info.ac_contact_avatar_url ? info.ac_contact_avatar_url : contactsImgArr[0];

                } else if (info.ac_contact_type == 2) {
                    info.ac_contact_avatar_url = info.ac_contact_avatar_url ? info.ac_contact_avatar_url : contactsImgArr[1];

                } else if (info.ac_contact_type == 3) {
                    info.ac_contact_avatar_url = info.ac_contact_avatar_url ? info.ac_contact_avatar_url : contactsImgArr[2];
                } else {

                    info.ac_contact_avatar_url = info.ac_contact_avatar_url ? info.ac_contact_avatar_url : contactsImgArr[0];

                }
            });

            console.log('_contactList-----------', _contactList);

            // 发票
            let _bodyData = [];
            let _operation = [
                {
                    title: '删除',
                    key: 'del',
                }
            ];
            _bodyData = res.data.meta.tb_ac_account_org;

            _bodyData.length > 0 && _bodyData.map((info, key) => {
                info.operation = _operation;
                info.showTags = ['默认']
                info.showTagsTitle = "ac_account_org_taxid"
            })


            let bankBodyData = [];

            bankBodyData = res.data.meta.tb_ac_account_org_bank;
            bankBodyData.length > 0 && bankBodyData.map((info, key) => {
                info.operation = _operation;
                info.ac_org_bank_type == 1 ? info.showTags = ['基本户'] : info.showTags = ['一般户']

                // info.showTags = ['普通']
                // info.showTags = ['一般']
                info.showTagsTitle = "ac_org_bank_account_number"
            })



            console.log('bankBodyData:', bankBodyData);

            // 发票---table头部
            let _headData = JSON.parse(JSON.stringify(headData));
            let _newHeadData = _headData.slice(0, 2);
            console.log('_newHeadData', _newHeadData);
            let _ac_account_name = res.data.ac_account_name;

            //银行信息
            let _bankHeadData = JSON.parse(JSON.stringify(bankHeadData));
            let _newBankHeadData = _bankHeadData.slice(0, 3);
            console.log('_newBankHeadData', _newBankHeadData);

            this.setData({
                customerItem: res.data,
                listArray: listArray,
                contactList: res.data.meta.tb_ac_account_contact,// 联系人
                bodyData: _bodyData,// 发票
                bankBodyData, //银行信息
                editItem: res.data,
                selectAllArray: selectAllArray,
                imgArr: imgArr,
                newHeadData: _newHeadData,
                newBankHeadData: _newBankHeadData,
                areaCodeObj: areaCodeObj,
                ac_account_name: _ac_account_name

            }, () => {
                // this.getSelectValue('province', _item.ac_account_province_code, 0, 'customer')
                // this.getSelectValue('city', _item.ac_account_city_code, 1, 'customer')
                // this.getSelectValue('county', _item.ac_account_area_code, 2, 'customer')
            });
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

                                console.log('uiObject.type--------', uiObject.type)

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

                                } else {
                                    apiKey = apiKey + '_value'
                                    uiData[uiIndex].value = apiData.meta[apiKey]
                                }
                            }
                        }
                        if (uiObject.viewType == 'input' || uiObject.viewType == 'textarea' || uiObject.viewType == 'avatar') {
                            uiData[uiIndex].value = apiData[apiKey] ? apiData[apiKey] : _span;

                            if (!this.data.editStatus && uiObject.type == 'ac_account_addr') {
                                uiData[uiIndex].value = apiData.ac_account_splice_addr
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

        //获取银行下拉菜单
        getBankSelect() {
            let _this = this;
            loading(true);
            // console.log(' _this.data.customerId----', _this.data.customerId)

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: _this.data.customerId,
            }
            bankSelect(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getBankSelect(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/org/listForSelect", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        // _this.clearProBroadcat()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/org/listForSelect", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })

        },

        handelBs_getBankSelect(res) {
            console.log("handelBs_getBankSelect:", res.data)
            let { addBankList } = this.data;
            addBankList[0].selectArray = res.data
            this.setData({
                addBankList
            })
        },



        // 根据code换取省市区的value
        getSelectValue(type, code, index, selectType) {
            let { selectAllArray, selectContactArray } = this.data;
            console.log('selectAllArray', selectAllArray)


            // 客户/联系人省市区--------区分
            if (selectType == 'customer') {

                let _newArray = [];

                if (type == 'province') {
                    _newArray = selectAllArray[index].selectArray;


                } else if (type == 'city') {
                    _newArray = selectAllArray[index].selectArray;

                } else if (type == 'county') {
                    _newArray = selectAllArray[index].selectArray;

                }

                _newArray.map((item, key) => {
                    if (item.id == code) {
                        selectAllArray[index].value = item.value;
                    }
                })

                this.setData({
                    selectAllArray: selectAllArray
                })

            } else if (selectType == 'contact') {

                let _newArray = [];

                if (type == 'province') {
                    _newArray = selectContactArray[index].selectArray;


                } else if (type == 'city') {
                    _newArray = selectContactArray[index].selectArray;

                } else if (type == 'county') {
                    _newArray = selectContactArray[index].selectArray;

                }

                _newArray.map((item, key) => {
                    if (item.id == code) {
                        selectContactArray[index].value = item.value;
                    }
                })

                this.setData({
                    selectContactArray: selectContactArray
                })
            }

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
            let { listArray } = _this.data;

            // 客户来源
            let _sourceIndex = listArray.findIndex((info, index) => { return info.type == 'ac_account_source_id' });

            // 重要程度
            let _priorityIndex = listArray.findIndex((info, index) => { return info.type == 'ac_account_priority_id' });

            // 客户状态
            let _stageIndex = listArray.findIndex((info, index) => { return info.type == 'ac_account_stage' });

            // 分配负责人
            let _assignedIndex = listArray.findIndex((info, index) => { return info.type == 'ac_account_assigned_to' });

            _this.setData({
                [`listArray[${_sourceIndex}].selectArray`]: res.data.sources,
                [`listArray[${_priorityIndex}].selectArray`]: res.data.priorities,
                [`listArray[${_stageIndex}].selectArray`]: res.data.stages,
                [`listArray[${_assignedIndex}].selectArray`]: res.data.assigned,
            });

            console.log('listArray=========999999999999', this.data.listArray,)

        },

        clearCustomerSelectArray() {

        },

        // 删除---->联系人
        getDelContacts(e) {
            // console.log('e---------', e);
            let _ac_contact_id = e.currentTarget.dataset.id;
            let _this = this;
            tt.showModal({
                title: '确认要删除客户联系人?',
                success(res) {
                    console.log("res", res)
                    if (res.confirm) {
                        loading(true);

                        let postData = {
                            uc_uid: app.globalData.uc_uid,
                            ac_contact_id: _ac_contact_id
                        }

                        contactsDel(postData).then((res) => {
                            switch (res.code) {
                                case 200:
                                    // update UI
                                    _this.handelBs_getDelContacts(res);
                                    break;
                                case 400:
                                case 404:
                                    //report_noaction();
                                    showToast({ msg: res.msg })
                                    report_noaction({ url: "/lark/account/contact/delete", page: _this.data.routeURL, code: res.code, input_params: postData })
                                    break;
                                // case 404:
                                // _this.clearcontactsDel()
                                // break;
                                default:
                                    //report_default();
                                    report_default({ url: "/lark/account/contact/delete", page: _this.data.routeURL, code: res.code, input_params: postData })
                            }

                            loading(false);
                        }, (err) => {

                            loading(false);
                        })
                    }
                }
            })

        },

        handelBs_getDelContacts(res) {
            showToast({ msg: '删除成功', type: 'success' })
            this.getCustomerDetail();
        },


        // 新建---->联系人
        getContactsAdd() {

            let _this = this;
            let { contactItem, customerItem, contactAreaCodeObj } = this.data;

            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: customerItem.ac_account_id,
                ac_contact_name: contactItem.ac_contact_name,
                ac_contact_mobile: contactItem.ac_contact_mobile,
                ac_contact_mail: contactItem.ac_contact_mail,
                ac_contact_position: contactItem.ac_contact_position,
                ac_contact_gender: contactItem.ac_contact_gender,
                is_kdm: contactItem.is_kdm,
                ac_contact_avatar_url: contactItem.ac_contact_avatar_url,
                ac_contact_type: contactItem.ac_contact_type,
                ac_contact_addr: contactItem.ac_contact_addr,
                memo: contactItem.memo,
                ac_account_assigned_to: contactItem.ac_account_assigned_to,
                ac_contact_province_code: contactAreaCodeObj.provinceCode,
                ac_contact_city_code: contactAreaCodeObj.cityCode,
                ac_contact_area_code: contactAreaCodeObj.countyCode,
                ac_contact_channel: contactItem.ac_contact_channel, // 2022.04.02新增==渠道
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
                        report_noaction({ url: "/lark/accountContact/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearcontactsDel()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/accountContact/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getContactsAdd(res) {
            showToast({ msg: '保存成功', type: 'success' });
            let { modalcontactshow, addContactsTabs } = this.data;

            this.getDataStatus('contact', modalcontactshow);
            this.getCustomerDetail(); // 刷新
            this.getClearData('contact');

            if (modalcontactshow) {

                let _contactItem = {};
                _contactItem.ac_contact_type = 1;

                addContactsTabs.map((info, key) => {
                    if (key == 0) {
                        info.isSelected = true;
                    } else {
                        info.isSelected = false;
                    }
                })

                this.setData({
                    contactItem: _contactItem,
                    addContactsTabs: addContactsTabs
                })
            }

        },

        // 联系人编辑
        getContactsEdit() {
            let _this = this;

            let { contactItem, customerItem, contactAreaCodeObj } = _this.data;

            console.log('contactItem--------', contactItem)
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: customerItem.ac_account_id,
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
                memo: contactItem.memo,
                // ac_account_assigned_to: contactItem.ac_account_assigned_to,
                ac_contact_province_code: contactAreaCodeObj.provinceCode,
                ac_contact_city_code: contactAreaCodeObj.cityCode,
                ac_contact_area_code: contactAreaCodeObj.countyCode,
                ac_contact_channel: contactItem.ac_contact_channel,// 2022.04.02新增==渠道
                status: 1,
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
                    case 404:
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
            this.getDataStatus('contactEdit', false);
            this.getClearData('contactEdit');// 清除
            this.getCustomerDetail();// 刷新

            // this.setData({
            //     editStatus: false
            // });

        },

        clearcontactsEdit() {

        },



        // 发票======>新增
        getInvoiceAdd() {
            let _this = this;
            let { invoiceItem, customerItem } = this.data;
            console.log('invoiceItem--------', invoiceItem);
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: customerItem.ac_account_id,
                ac_account_org_name: invoiceItem.ac_account_org_name,
                ac_account_org_taxid: invoiceItem.ac_account_org_taxid,
                ac_account_org_is_default: invoiceItem.ac_account_org_is_default,
            }

            invoiceAdd(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getInvoiceAdd(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/org/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearcontactsDel()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/org/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })

        },

        handelBs_getInvoiceAdd(res) {
            let { modalshow, invoiceItem } = this.data;

            this.getDataStatus('invoice', modalshow);
            this.getCustomerDetail(); // 刷新
            this.getClearData('invoice'); // 清除

            if (modalshow) {

                let _invoiceItem = {};
                _invoiceItem.ac_account_org_is_default = 1;

                this.setData({
                    invoiceItem: _invoiceItem,
                    radioTabType: 'sure'
                })
            }
        },

        // 发票======>编辑
        getInvoiceEdit() {
            let _this = this;
            let { invoiceItem, customerItem } = this.data;

            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: customerItem.ac_account_id,
                ac_account_org_id: invoiceItem.ac_account_org_id,
                ac_account_org_name: invoiceItem.ac_account_org_name,
                ac_account_org_taxid: invoiceItem.ac_account_org_taxid,
                ac_account_org_is_default: invoiceItem.ac_account_org_is_default,
            }

            invoiceEdit(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getInvoiceEdit(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/org/update", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearcontactsDel()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/org/update", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })

        },

        handelBs_getInvoiceEdit(res) {
            let { modalshow, addInvoiceList } = this.data;

            this.getDataStatus('invoiceEdit', modalshow);
            this.getCustomerDetail(); // 刷新
            this.getClearData('invoiceEdit');

            if (modalshow) {
                this.setData({
                    invoiceItem: {},

                })
            }
        },

        // 发票------>删除
        getInvoiceDel(id) {
            console.log()
            let _this = this;

            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_org_id: id,
            }

            invoiceDel(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getInvoiceDel(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/org/delete", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearcontactsDel()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/org/delete", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })

        },

        handelBs_getInvoiceDel(res) {
            showToast({ msg: '删除成功', type: 'success' })
            this.getCustomerDetail(); // 刷新
        },


        //银行信息新增
        addCreateBank() {
            let _this = this;
            let { bankItem, customerItem } = this.data;
            // console.log('invoiceItem--------', invoiceItem);
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_org_id: bankItem.ac_account_org_id,
                ac_org_bank_name: bankItem.ac_org_bank_name,
                ac_org_bank_account_number: bankItem.ac_org_bank_account_number,
                // ac_org_bank_is_default: bankItem.ac_org_bank_is_default,
                ac_org_bank_type: bankItem.ac_org_bank_type

            }

            createBank(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_addCreateBank(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/bank/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearcontactsDel()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/bank/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },
        handelBs_addCreateBank(res) {
            console.log("handelBs_addCreateBank:", res)

            let { modalshow, bankItem } = this.data;

            this.getDataStatus('bank', modalshow);
            this.getCustomerDetail(); // 刷新
            this.getClearData('bank'); // 清除

            if (modalshow) {

                let _bankItem = {};
                // _bankItem.ac_account_org_is_default = 1;
                _bankItem.ac_org_bank_type = ''


                this.setData({
                    bankItem: _bankItem,
                    radioBankTabType: ''
                })
            }
        },



        // 银行信息编辑
        getUpdateBank() {
            let _this = this;
            let { bankItem, customerItem } = this.data;

            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_org_id: bankItem.ac_account_org_id,
                ac_org_bank_name: bankItem.ac_org_bank_name,
                ac_org_bank_account_number: bankItem.ac_org_bank_account_number,
                // ac_org_bank_is_default: bankItem.ac_org_bank_is_default,
                ac_org_bank_id: bankItem.ac_org_bank_id,
                ac_org_bank_type: bankItem.ac_org_bank_type,
            }

            updateBank(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getUpdateBank(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/bank/update", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearcontactsDel()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/bank/update", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })

        },

        handelBs_getUpdateBank(res) {
            let { modalshow, addInvoiceList } = this.data;

            this.getDataStatus('bankEdit', modalshow);
            this.getCustomerDetail(); // 刷新
            this.getClearData('bankEdit');

            if (modalshow) {
                this.setData({
                    bankItem: { ac_org_bank_type: '' },
                    radioBankTabType: '',
                })
            }

        },








        //银行信息删除
        getDeleteBank(id) {
            let _this = this;

            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_org_bank_id: id,
            }

            deleteBank(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getDeleteBank(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/bank/delete", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearcontactsDel()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/bank/delete", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })

        },
        handelBs_getDeleteBank(res) {
            console.log("handelBs_getDeleteBank:", res)
            showToast({ msg: '删除成功', type: 'success' })
            this.getCustomerDetail(); // 刷新
        },














        //上传头像
        getAvatar(e) {
            // console.log(e);
            let _this = this;
            let { imgtype } = e.currentTarget.dataset;
            this.setData({
                imgType: imgtype
            });

            let resArray = [];
            _this.data.imgArr = [];
            _this.data.imgContactsArr = [];

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
            let { editItem, index, resArray, imgArr, changeType } = this.data;

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

                    _this.getImgArray(imgArr);

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

        getImgArray(array) {
            let { imgType, imgArr, imgContactsArr, editItem, contactItem, contactEditDetail } = this.data;

            console.log('imgType=========', imgType);

            if (imgType == 'customer') {
                imgArr = array;
                editItem.ac_account_logo_url = imgArr[0];

                this.setData({
                    imgArr: imgArr,
                    editItem: editItem
                })

            } else if (imgType == 'contact') {
                imgContactsArr = [];
                imgContactsArr = array;
                contactItem.ac_contact_avatar_url = imgContactsArr[0];
                contactEditDetail.ac_contact_avatar_url = imgContactsArr[0];
                contactEditDetail.ac_contact_type = 1;

                this.setData({
                    imgContactsArr: imgContactsArr,
                    contactItem: contactItem,
                    contactEditDetail: contactEditDetail
                })
            }
            console.log('imgArr------', imgArr);
            console.log('imgContactsArr------', imgContactsArr);
        },


        //客户日志
        getCustomerLog() {
            let _this = this;
            let { customerId } = _this.data;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: customerId,
            }

            customerLog(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getCustomerLog(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/log", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearProBroadcat()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/log", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);

            }, (err) => {

                loading(false);
            })
        },

        handelBs_getCustomerLog(res) {

            console.log('handelBs_getBusinessLog============', res.data);
            this.setData({
                customerLogList: res.data,
            })
        },



        // 客户---商机列表
        getCusBusinessList() {
            let _this = this;
            let { customerId } = _this.data;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: customerId,
            }

            cusBusinessList(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getCusBusinessList(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/listForSelect", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearCusBusinessList()
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

        handelBs_getCusBusinessList(res) {
            // console.log('handelBs_getCusBusinessList============', res.data);
            // let { customerOppBodyData } = this.data;
            let _newArray = [];
            _newArray = res.data;

            _newArray && _newArray.length > 0 && _newArray.map((item, index) => {
                item.uc_name = item.employee.uc_name;
                item.created_at = item.created_at ? formatDATESub(item.created_at, '-') : '';

            });

            this.setData({
                customerOppBodyData: _newArray,
            })
            // console.log('customerOppBodyData============', _newArray)
        },

        clearCusBusinessList() {
            this.setData({
                customerOppBodyData: [],
            })
        },


        // 客户---项目列表
        getCusProjectList() {
            let _this = this;
            let { customerId } = _this.data;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_account_id: customerId,
            }

            cusProjectList(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getCusProjectList(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/account/projectList", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearCusProjectList()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/account/projectList", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);

            }, (err) => {

                loading(false);
            })
        },

        handelBs_getCusProjectList(res) {
            console.log('handelBs_getCusProjectList============', res.data);
            let _newArray = [];
            _newArray = res.data;

            _newArray && _newArray.length > 0 && _newArray.map((item, index) => {
                item.pm_p_name = item.pm_p_name;
                item.created_at = item.created_at ? formatDATESub(item.created_at, '-') : '';

            });

            this.setData({
                cusProjectBodyData: _newArray,
            })
        },

        clearCusProjectList() {
            this.setData({
                cusProjectBodyData: [],
            })
        },


    }
})