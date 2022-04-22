const app = getApp();
import { imgUrl, isdebug } from "../../../config";
import { loading, dataStatus, showToast, goToPage, setBatTitle, onLoadPublicMethods, } from "../../../utils/interactive";
import { formatDATESub, getUseHours, formatSlice, } from "../../../utils/util.js";

// import { exampleDetail, addressSelect, exampleEdit, exampleAdd, customerSelect } from "../../../utils/http";
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

        exampleStatus: {
            type: Boolean,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                // console.log('exampleStatus-----', this.data.exampleStatus)
            },
        },

        exampleType: {
            type: String,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                console.log('exampleType-----', this.data.exampleType);
                let { exampleType } = this.data;

                if (exampleType == 'add') {
                    this.setData({
                        editStatus: true,
                        isEditShow: false
                    }, () => {
                        // this.setListEditArray();
                    })
                    this.getClearData();


                } else if (exampleType == 'detail') {
                    // this.getContactDetail();
                }

                // this.getAddressSelect();
                // this.getCustomerSelect();
            },
        },
        exampleId: {
            type: Number,
            value: ''
        },
    },

    ready() {

    },

    /**
     * 组件的初始数据
     */
    data: {
        scroll: true,
        scrollView: "",

        isEditShow: false,
        editStatus: false,// 编辑按钮
        // 详情
        listDetailArray: [
            { placeType: 'left', viewType: "input", title: '商机大小', value: '测试数据', type: "ac_contact_mobile", },
            { placeType: 'left', viewType: "input", title: '概率', value: '测试数据', type: "ac_contact_mail", placeholder: "", },
            { placeType: 'left', viewType: "input", title: '商机来源', value: '测试数据', type: "ac_contact_position", placeholder: "", },
            { placeType: 'right', viewType: "input", title: '重要程度', value: '测试数据', type: "ac_contact_position", placeholder: "", },
            { placeType: 'right', viewType: "input", title: '详细描述', value: '测试数据', type: "ac_contact_position", placeholder: "", },
        ],

        listContactArray: [
            { placeType: 'left', viewType: "select", title: '客户', value: '测试数据', type: "ac_contact_mobile", },
            { placeType: 'left', viewType: "input", title: '电话', value: '测试数据', type: "ac_contact_mail", placeholder: "", disabled: true },
            { placeType: 'left', viewType: "input", title: '手机', value: '测试数据', type: "ac_contact_position", placeholder: "", disabled: true },
            { placeType: 'left', viewType: "input", title: '邮箱', value: '测试数据', type: "ac_contact_position", placeholder: "", disabled: true },
            { placeType: 'left', viewType: "input", title: '网站', value: '测试数据', type: "ac_contact_position", placeholder: "", disabled: true },
            { placeType: 'right', viewType: "input", title: '联系人', value: '测试数据', type: "ac_contact_position", placeholder: "", disabled: true },
            { placeType: 'right', viewType: "input", title: '手机', value: '测试数据', type: "ac_contact_position", placeholder: "", disabled: true },
            { placeType: 'right', viewType: "input", title: '邮箱', value: '测试数据', type: "ac_contact_position", placeholder: "", disabled: true },
            { placeType: 'right', viewType: "input", title: '职位', value: '测试数据', type: "ac_contact_position", placeholder: "", disabled: true },
        ],

        // 新建/编辑
        listEditArray: [
            { placeType: 'left', viewType: "input", title: '商机', value: '', type: "ac_contact_mobile", placeholder: "请输入商机", necessary: true },
            {
                placeType: 'left', viewType: "select", title: '规模', value: '', type: "ac_contact_mail", selectedId: "",
                selectArray: [
                    { id: 0, value: '大（≥100户）' },
                    { id: 1, value: '中（50-99户）' },
                    { id: 2, value: '小（≤50户）' }
                ]
            },
            { placeType: 'left', viewType: "input", title: '金额', value: '', type: "ac_contact_position1", placeholder: "请输入", },
            { placeType: 'left', viewType: "input", title: '概率', value: '', type: "ac_contact_position2", placeholder: "请输入", },
            { placeType: 'left', viewType: "input", title: '商机来源', value: '', type: "ac_contact_position3", placeholder: "请输入", },
            { placeType: 'right', viewType: "viewStars", title: '重要程度', value: '', type: "ac_contact_position", },
            { placeType: 'right', viewType: "select", title: '客户行业', value: '', type: "ac_contact_position", necessary: true, selectArray: [], selectedId: "" },
            { placeType: 'right', viewType: "textarea", title: '详细描述', value: '', type: "ac_contact_position", },
            { placeType: 'right', viewType: "select", isEditShow: false, title: '客户', value: '', type: "ac_account_name", selectArray: [], selectedId: "" },
            { placeType: 'right', viewType: "select", isEditShow: false, title: '联系人', value: '', type: "ac_contact_name", selectArray: [], selectedId: "" },

        ],

        exampleItem: {},
        starCount: 0,
        headData: [
            { title: '名字', key: "name" },
            { title: '大小', key: "size" },
            { title: '上传时间', key: "create_time" },
        ],
        bodyData: [
            { name: '测试项目一演示word', size: '6KB', create_time: '2021-11-23', imgType: 1, },
            { name: '测试项目一演示excel', size: '6KB', create_time: '2021-11-23', imgType: 2, },
        ],
    },

    /**
     * 组件的方法列表
     */
    methods: {

        // 初始化-------->清空input/select的值,
        getClearData() {
            let {
                listDetailArray,
                listContactArray,
                listEditArray,
            } = this.data;

            for (let i = 0; i < listContactArray.length; i++) {
                let _str = '';
                _str = 'listContactArray[' + i + '].value';
                this.setData({
                    [_str]: ''
                })
            }
            for (let i = 0; i < listEditArray.length; i++) {
                let _str = '';
                _str = 'listEditArray[' + i + '].value';
                this.setData({
                    [_str]: ''
                })
            }
        },
        // 返回
        getBack() {
             let item = {
                type: 'example',
                backType: this.data.exampleType
            }
            this.triggerEvent('back', {item});
        },

        // 编辑
        getEdit() {
            this.setData({
                editStatus: true,
                isEditShow: true
            }, () => {
                this.setListEditArray();
            });

        },

        // 设置商机数据
        setListEditArray() {
            let { listEditArray, isEditShow } = this.data;

            listEditArray.map((item, index) => {
                if (item.type == 'ac_account_name' || item.type == 'ac_contact_name') {
                    item.isEditShow = isEditShow;
                }
            });
            this.setData({
                listEditArray: listEditArray
            });
            console.log('listEditArray--------', listEditArray)

        },

        // input 输入框change
        getInputChange(e) {
            console.log(e);
            let { type } = e.currentTarget.dataset;
            let { value } = e.detail;
            this.getEditItem(type, value);
        },

        // select change
        getSelectChange(e) {
            console.log(e);
            let { type, index, placetype } = e.currentTarget.dataset;
            let { value, id } = e.detail.item;

            if (placetype == 'example') {
                this.setData({
                    [`listEditArray[${index}].value`]: value,
                    [`listEditArray[${index}].selectedId`]: id,
                })

            } else if (placetype == 'customer') {
                this.setData({
                    customerValue: value,
                    customerId: id,
                })
            };
            console.log('listEditArray', this.data.listEditArray)


            this.getEditItem(type, id);

        },

        getEditItem(type, value) {
            let { exampleItem } = this.data;
            exampleItem[type] = value;
            this.setData({
                exampleItem: exampleItem
            });

        },

        // 商机======>取消
        getCancel(e) {
            let { exampleType } = this.data;

            if (exampleType == 'add') {
                this.getBack();
            } else {
                this.setData({
                    editStatus: false
                });
            }
        },

        // 商机====>保存
        getexampleubmit() {

            let { contactItem, exampleType } = this.data;
            if (!contactItem.ac_account_id) {
                showToast({ msg: "请输入商机" })
                return;
            }

            if (!contactItem.ac_contact_name) {
                showToast({ msg: "请选择客户行业" })
                return;
            }

            if (exampleType == 'add') {
                this.getexampleAdd();

            } else if (exampleType == 'detail') {
                this.getexampleEdit();
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


        // 以下API 

        // 商机----->新建
        getexampleAdd() {
            let _this = this;
            let { contactItem } = this.data;

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
                ac_contact_province_code: contactItem.ac_contact_province_code,
                ac_contact_city_code: contactItem.ac_contact_city_code,
                ac_contact_area_code: contactItem.ac_contact_area_code,
                memo: contactItem.memo,

            }

            exampleAdd(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getexampleAdd(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/accountContact/create", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearexampleAdd()
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

        handelBs_getexampleAdd(res) {
            showToast({ msg: '保存成功' });
            this.getBack();

        },

        // 商机----->编辑
        getexampleEdit() {
            let _this = this;

            let { contactItem } = _this.data;
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
                ac_contact_province_code: contactItem.ac_contact_province_code,
                ac_contact_city_code: contactItem.ac_contact_city_code,
                ac_contact_area_code: contactItem.ac_contact_area_code,
                memo: contactItem.memo,
                // ac_account_assigned_to: contactItem.ac_account_assigned_to,
            };

            exampleEdit(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getexampleEdit(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/accountContact/update", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearexampleEdit()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/accountContact/update", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getexampleEdit(res) {

            showToast({ msg: '保存成功' });
            this.setData({
                editStatus: false
            });

            this.getContactDetail();

        },

        clearexampleEdit() {

        },

        // 商机----->详情
        getContactDetail() {
            let _this = this;
            loading(true);
            console.log(' _this.data.exampleId----', _this.data.exampleId)

            let postData = {
                uc_uid: app.globalData.uc_uid,
                ac_contact_id: _this.data.exampleId,
            }
            exampleDetail(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getContactDetail(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/accountContact/detail", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearProBroadcat()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/accountContact/detail", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);

            }, (err) => {

                loading(false);
            })
        },

        handelBs_getContactDetail(res) {
            console.log('详情-=======', res);
            let { listLeftArray, listRightArray } = this.data;
            let _item = res.data;
            let _span = '';

            listLeftArray[0].value = _item.ac_contact_mobile ? _item.ac_contact_mobile : _span;
            listLeftArray[1].value = _item.ac_contact_mail ? _item.ac_contact_mail : _span;
            listLeftArray[2].value = _item.ac_contact_position ? _item.ac_contact_position : _span;

            listRightArray[0].value = _item.ac_contact_gender ? _item.ac_contact_gender : _span;
            listRightArray[1].value = _item.is_kdm == 1 ? '是' : '否';
            listRightArray[2].value = _item.ac_contact_addr;
            listRightArray[4].value = _item.memo;

            let _customerItem = [];
            _customerItem.push(res.data.meta.ac_account_data);
            // console.log('_customerItem-------', _customerItem);


            this.setData({
                contactDetail: res.data,
                listLeftArray: listLeftArray,
                listRightArray: listRightArray,
                customerItem: _customerItem,
                contactItem: res.data,

            })
        },

    }
})