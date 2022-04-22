const app = getApp();
import { imgUrl, isdebug } from "../../../config";
import { loading, dataStatus, showToast, goToPage, setBatTitle, onLoadPublicMethods, } from "../../../utils/interactive";
import { formatDATESub, getUseHours, formatSlice, isChinaNameValue, isMobile } from "../../../utils/util.js";

import { singleRateDetail } from "../../../utils/http";
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
        currHeight: {
            type: Number,
            value: ''
        },
        cnToolHeight: {
            type: Number,
            value: ''
        },

        singleRateType: {
            type: Boolean,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                // console.log('businessStatus-----', this.data.businessStatus)
            },
        },

        singleRateType: {
            type: String,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                console.log('businessType-----', this.data.singleRateType);
                this.getSingleRateDetail()
                // let { businessType } = this.data;
                // let { contactType, businessItem, listEditArray } = this.data;

                // if (businessType == 'add') {

                //     let _statusIndex = listEditArray.findIndex((o, i) => { return o.type == 'status' })

                //     this.setData({
                //         [`listEditArray[${_statusIndex}].isShow`]: false
                //     });

                //     this.setData({
                //         editStatus: true,
                //         radioTabType: 1
                //     }, () => {
                //         businessItem.status = 1;
                //         this.setData({
                //             businessItem: businessItem,
                //             // [`listEditArray[11].value`]: '有效',
                //             // [`listEditArray[11].selectedId`]: 1,
                //         })
                //         // console.log('businessItem==========', businessItem);
                //         // select下拉框
                //         this.getBusinessSelectArray();
                //     });

                //     this.getClearData();
                //     this.getCustomerSelect();

                // } else if (businessType == 'detail') {
                //     this.getBusinessSelectArray();
                //     this.getBusinessLog();
                //     this.getBusinessDetail();
                // }



            },
        },
        singleRateId: {
            type: Number,
            value: ''
        },
        singleRateItem: {
            type: Object,
            value: null
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

        // 排序 
        sort: 'DESC', //ASC(正序),DESC(倒序)
        // 分页
        allTotal: "",
        current: 1,
        total: 1,
        pageSize: 10,
        pageNumber: 1,
        //商机
        businessHeadData: [
            { title: "商机名称", key: "lead_name" },
            { title: "商机来源", key: "lead_source" },
            { title: "类型", key: "lead_type" },
            { title: "合作方式", key: "lead_cooperation_type" },
            { title: "规模", key: "lead_scale" },
            { title: "样板间", key: "lead_is_templet" },
            { title: "预估产值", key: "lead_expected_revenue" },
            { title: "是否成单", key: "contracted_count" },
            // { title: "创建人", key: "uc_name" },
            { title: "创建时间", key: "created_at", showSort: true, },
        ],










    },

    /**
     * 组件的方法列表
     */
    methods: {

       
        // 返回
        getBack() {

            let item = {
                type: 'singleRate',
                backType: this.data.singleRateType
            }
            this.triggerEvent('back', { item });
        },

        // 刷新
        getRefresh() {
            console.log('刷新===========');
            this.getBusinessDetail();

        },

      



















        // 以下API 

        // 成单率----->详情
        getSingleRateDetail() {
            let _this = this;
            // console.log("businessItem:",businessItem)
            // console.log("getSingleRateDetail:", this.data.singleRateId, this.data.singleRateItem)
            let { current, pageSize, sort } = _this.data;
            loading(true);

            let postData = {
                uc_uid: app.globalData.uc_uid,
                uid: this.data.singleRateId,
                page: current,
                per_page: pageSize,
                order_by_direction: sort,
            }

            singleRateDetail(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getSingleRateDetail(res);
                        break;
                    case 400:
                    case 404:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/singleRateDetails", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    // case 404:
                    // _this.clearBusinessAdd()
                    // break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/lead/singleRateDetails", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getSingleRateDetail(res) {
            console.log("handelBs_getSingleRateDetail", res.data)
            let { employee_info, lead_list, total, last_page } = res.data;
            console.log("last_page", lead_list, last_page)

            lead_list.forEach((o, i) => {
                console.log(o)
                o.lead_type = o.lead_type_value
                o.lead_cooperation_type = o.lead_cooperation_type_value
                o.lead_is_templet = o.lead_is_templet == 1 ? '是' : '否'
                o.contracted_count = o.contracted_count > 0 ? '是' : '否'
            })
            this.setData({
                employee_info,
                businessbodyData: lead_list,
                current: this.data.current,
                allTotal: res.data.total,
                total: res.data.last_page,
            })
        },
        // 分页
        getPageChange(e) {
            let { pagetype } = e.currentTarget.dataset;
            console.log("getPageChange:", e);

            this.setData({
                current: e.detail.current
            })
            this.getSingleRateDetail();

        },



        

        //列表详情
        getDetailChange(e) {
            // console.log("getDetailChange:",e)
            let { item } = e.detail
            // console.log("getDetailChange:",item)
            this.triggerEvent('goDetail', { item });
        }


    },





})