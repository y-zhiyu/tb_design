const app = getApp();
import { imgUrl, isdebug } from "../../../config";
import { loading, dataStatus, showToast, goToPage, setBatTitle, onLoadPublicMethods, } from "../../../utils/interactive";


import { todoReceivableAdd, todoPayAdd, todoAcceptanceAdd, todoAgreementAdd, } from "../../../utils/http";

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
        todoPayable: {
            type: Object,
            value: null
        },
        todoReceivable: {
            type: Object,
            value: null
        },
        todoAllArray: {
            type: Array,
            value: []
        },
        pmId: {
            type: String,
            value: ''
        },
        todoEdit: {
            type: Boolean,
            value: false
        },
        proBaseMsg: {
            type: Object,
            value: null,
            observer: function (newval, oldval) {
                this.getproBaseMsg(newval)
            }
        },
        todoType: {
            type: String,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                // console.log('todoType-----------', this.data.todoType);
                // console.log('todoEdit-----------', this.data.todoEdit);
                this.init();
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
        todoArray: [],
        todoCollectList: [
            { viewType: "select", title: '收款类型', value: '', newType: "collection_type", type: "collection_type", placeholder: "", selectedId: "", selectArray: [], receivable_id: 0, },
            { viewType: "input", title: '收款时间', value: '', newType: "collection_time", type: "collection_time", placeholder: "请输入", selectedId: "", selectArray: [], necessary: true, isSlot: 'date', receivable_id: 0, },
            { viewType: "input", title: '收款比例', value: '', newType: "collection_scale", type: "collection_scale", placeholder: "", necessary: true, receivable_id: 0, },
            { viewType: "select", title: '状态', value: '未完成', newType: "collection_status", type: "collection_status", placeholder: "", selectedId: "0", selectArray: [], necessary: true, receivable_id: 0, },
        ],
        todoPayList: [
            { viewType: "select", title: '付款类型', value: '', newType: 'pay_type', type: "pay_type", placeholder: "", selectedId: "", selectArray: [], payable_id: 0 },
            { viewType: "input", title: '付款时间', value: '', newType: 'pay_time', type: "pay_time", placeholder: "请输入", selectedId: "", selectArray: [], necessary: true, isSlot: 'date', payable_id: 0 },
            { viewType: "input", title: '付款比例', value: '', newType: 'pay_scale', type: "pay_scale", placeholder: "", necessary: true, payable_id: 0 },
            { viewType: "select", title: '状态', value: '未完成', newType: 'pay_status', type: "pay_status", placeholder: "", selectedId: "0", selectArray: [], necessary: true, payable_id: 0 },
        ],
        todoFinishedList: [
            { viewType: "input", title: '名称', value: '', newType: 'name', type: "name", placeholder: "", selectedId: "", selectArray: [], necessary: true, disabled: true, acceptance_id: 0, },
            { viewType: "input", title: '时间', value: '', newType: 'time', type: "time", placeholder: "请输入", selectedId: "", selectArray: [], necessary: true, isSlot: 'date', acceptance_id: 0, },
            { viewType: "select", title: '状态', value: '未完成', newType: 'status', type: "status", placeholder: "", selectedId: "0", selectArray: [{ id: 0, value: '未完成' }, { id: 1, value: '已完成' }], necessary: true, acceptance_id: 0, },
        ],
        todoAppointmentList: [
            { viewType: "input", title: '约定事项', value: '', newType: 'matter', type: "matter", placeholder: "", selectedId: "", selectArray: [], necessary: true, },
            { viewType: "input", title: '约定时间', value: '', newType: 'time', type: "time", placeholder: "请输入", selectedId: "", selectArray: [], necessary: true, isSlot: 'date' },
            { viewType: "textarea", title: '备注', value: '', newType: 'remarks', type: "remarks", placeholder: "", },
            { viewType: "select", title: '状态', value: '未完成', newType: 'status', type: "status", placeholder: "", selectedId: "0", selectArray: [{ id: 0, value: '未完成' }, { id: 1, value: '已完成' }], necessary: true, },
        ],
        templateList: [],
        addTodoNumber: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {

        init() {
            let {
                todoArray,
                todoType,
                todoCollectList,
                todoPayList,
                todoFinishedList,
                todoAppointmentList,
                todoPayable,
                todoReceivable,
                todoAllArray,
                todoEdit,
                addTodoNumber
            } = this.data;

            let templateList = [];

            //   { name: '创建应收计划', type: 'createCollectPlan' },
            //   { name: '创建应付计划', type: 'createPayPlan' },
            //   { name: '创建项目完工验收计划', type: 'createFinishedPlan' },
            //   { name: '创建交底环节约定事项', type: 'createAppointmentPlan' },

            switch (todoType) {
                case 'createCollectPlan':
                    todoCollectList.map((item, index) => {
                        if (item.newType == 'collection_type') {
                            item.selectArray = todoReceivable.type;
                        }

                        if (item.newType == 'collection_status') {
                            item.selectArray = todoReceivable.status;
                        }
                    });

                    templateList = todoCollectList;
                    addTodoNumber = '增加收款次数';
                    break;

                case 'createPayPlan':
                    todoPayList.map((item, index) => {
                        if (item.newType == 'pay_type') {
                            item.selectArray = todoPayable.type;
                        }

                        if (item.newType == 'pay_status') {
                            item.selectArray = todoPayable.status;
                        }
                    });

                    templateList = todoPayList;
                    addTodoNumber = '增加付款次数';

                    break;

                case 'createFinishedPlan':
                    templateList = todoFinishedList;

                    break;

                case 'createAppointmentPlan':
                    templateList = todoAppointmentList;
                    addTodoNumber = '增加约定点';

                    break;

                default:
            };

            this.setData({
                templateList: templateList,
                addTodoNumber: addTodoNumber
            })

            if (todoEdit) {
                this.editList();
                this.setType1();

            } else {
                this.setType(3);
            };

            this.setData({
                loading: false,
            })
        },

        editList() {
            let { todoAllArray, templateList } = this.data;
            console.log('todoAllArray===============', todoAllArray)
            let _todoAllArray = []

            todoAllArray.map((info, index) => {

                templateList = this.setTodoTypeValue(info);
                _todoAllArray.push({ templateList });

            });

            this.setData({
                todoArray: _todoAllArray
            })
            console.log('_todoAllArray===========', _todoAllArray);
        },



        setTodoTypeValue(info) {
            let { todoType, templateList } = this.data;
            let _newTemplateList = JSON.parse(JSON.stringify(templateList));

            switch (todoType) {
                case 'createCollectPlan':

                    _newTemplateList.map((item, index) => {
                        if (item.newType == 'collection_type') {
                            item.value = info.receivable_type_name;
                            item.selectedId = info.receivable_type_id;
                        };

                        if (item.newType == 'collection_time') {
                            item.value = info.receivable_date;
                        }

                        if (item.newType == 'collection_scale') {
                            item.value = info.receivable_ratio;
                        }

                        if (item.newType == 'collection_status') {
                            item.value = info.receivable_status == 1 ? '已完成' : '未完成';
                            item.selectedId = info.receivable_status
                        };
                        item.receivable_id = info.receivable_id;

                    });
                    break;

                case 'createPayPlan':

                    _newTemplateList.map((item, index) => {
                        if (item.newType == 'pay_type') {
                            item.value = info.payable_type_name;
                            item.selectedId = info.payable_type_id
                        };

                        if (item.newType == 'pay_time') {
                            item.value = info.payable_date;
                        }

                        if (item.newType == 'pay_scale') {
                            item.value = info.payable_ratio;
                        }

                        if (item.newType == 'pay_status') {
                            item.value = info.payable_status == 1 ? '已完成' : '未完成';
                            item.selectedId = info.payable_status
                        };
                        item.payable_id = info.payable_id;

                    });


                    break;

                case 'createFinishedPlan':

                    _newTemplateList.map((item, index) => {
                        if (item.newType == 'name') {
                            item.value = info.acceptance_type_name;
                            item.selectedId = info.acceptance_type_id
                        };

                        if (item.newType == 'time') {
                            item.value = info.acceptance_date;
                        }

                        if (item.newType == 'status') {
                            item.value = info.acceptance_status == 1 ? '已完成' : '未完成';
                            item.selectedId = info.acceptance_status
                        };
                        item.acceptance_id = info.acceptance_id;

                    });

                    break;

                case 'createAppointmentPlan':
                    _newTemplateList.map((item, index) => {
                        if (item.newType == 'matter') {
                            item.value = info.agreement_thing;
                        };

                        if (item.newType == 'time') {
                            item.value = info.agreement_date;
                        }
                        if (item.newType == 'remarks') {
                            item.value = info.agreement_note;
                        }

                        if (item.newType == 'status') {
                            item.value = info.agreement_status == 1 ? '已完成' : '未完成';
                            item.selectedId = info.agreement_status
                        };
                        item.agreement_id = info.agreement_id;

                    });

                    break;

                default:
            };
            return _newTemplateList;


        },



        setType(length) {
            let { todoArray, templateList, todoType } = this.data;
            let _todoArray = [];

            for (let i = 0; i < length; i++) {
                let _newTemplateList = JSON.parse(JSON.stringify(templateList));

                _newTemplateList.map((item, index) => {
                    item.type = item.newType + i;

                    // 验收计划
                    if (todoType == 'createFinishedPlan' && item.newType == 'name') {
                        if (i == 0) {
                            item.value = '预验收';
                            item.selectedId = 1;
                        }
                        if (i == 1) {
                            item.value = '四方验收/联合验收';
                            item.selectedId = 2;

                        }
                        if (i == 2) {
                            item.value = '现场资料移交';
                            item.selectedId = 3;

                        }
                    }
                });
                console.log('_newTemplateList============', _newTemplateList);



                templateList = _newTemplateList;
                _todoArray.push({ templateList });
            };

            this.setData({
                todoArray: _todoArray
            })

            console.log('_todoArray============', _todoArray);

        },

        // input 输入框change
        getInputChange(e) {
            console.log(e);
            let { type, index, sortindex } = e.currentTarget.dataset;
            let { value } = e.detail;
            console.log('type', type, index, sortindex);

            this.setData({
                [`todoArray[${sortindex}].templateList[${index}].value`]: value,
            })
        },

        // 日期 删除
        getInvoiceDateDelete(e) {
            console.log(e);
            let { index, sortindex } = e.currentTarget.dataset;

            this.setData({
                [`todoArray[${sortindex}].templateList[${index}].value`]: '',
            })
        },

        // select
        getSelectChange(e) {
            console.log("e--------------:", e);
            let { type, index, sortindex } = e.currentTarget.dataset;
            let { value, id } = e.detail.item;
            this.setData({
                [`todoArray[${sortindex}].templateList[${index}].value`]: value,
                [`todoArray[${sortindex}].templateList[${index}].selectedId`]: id,
            })
        },

        // 删除
        delTodoItem(e) {
            let { sortindex } = e.currentTarget.dataset;
            let { todoArray } = this.data;

            todoArray.splice(sortindex, 1);

            this.setData({
                todoArray: todoArray
            })

        },

        // 增加
        addTodoItem() {
            console.log('点击增加收款次数');

            let { todoArray, templateList } = this.data;
            todoArray.push({ templateList });

            this.setData({
                todoArray: todoArray
            }, () => {
                this.setType1();
            })
        },

        setType1() {
            let { todoArray, templateList } = this.data;
            let _todoArray = [];

            for (let i = 0; i < todoArray.length; i++) {
                let _newTemplateList = JSON.parse(JSON.stringify(todoArray[i].templateList));

                _newTemplateList.map((item, index) => {
                    item.type = item.newType + i;
                });

                templateList = _newTemplateList;
                _todoArray.push({ templateList });
            };

            this.setData({
                todoArray: _todoArray
            })

            console.log('_todoArray============', _todoArray);

        },

        // 保存
        getConserve() {
            let { todoArray, todoType } = this.data;

            if (todoArray.length == 0) {
                showToast({ msg: '数据列表不能为空' });
                return;
            }

            for (let i = 0; i < todoArray.length; i++) {
                let _item = todoArray[i].templateList;

                for (let j = 0; j < _item.length; j++) {
                    if (_item[j].necessary && !_item[j].value) {

                        showToast({ msg: _item[j].title + '不能为空' });
                        this.getScrollId(_item[j].type);

                        return false;

                    };
                }
            };

            switch (todoType) {
                case 'createCollectPlan':
                    this.getTodoReceivableAdd();
                    break;

                case 'createPayPlan':
                    this.getTodoPayAdd();
                    break;

                case 'createFinishedPlan':
                    this.getTodoAcceptanceAdd();
                    break;

                case 'createAppointmentPlan':
                    this.getTodoAgreementAdd();
                    break;

                default:
            };

        },

        // 滚动到id错误处
        getScrollId(type) {
            this.setData({
                scrollView: type
            });
        },







        // 以下API

        // 应收新增
        getTodoReceivableAdd() {
            let _this = this;
            let { todoArray, pmId, todoEdit } = _this.data;
            loading(true);
            let _data = [];

            todoArray.map((info, index) => {
                let _templateList = info.templateList;

                let _item = {};

                console.log('_templateList------------', _templateList);
                let _newTemplateList = JSON.parse(JSON.stringify(_templateList));

                _newTemplateList.map((item, k) => {

                    if (item.newType == 'collection_type') {
                        _item.receivable_type_id = item.selectedId;
                        _item.receivable_type_name = item.value;
                    }

                    if (item.newType == 'collection_scale') {
                        _item.receivable_ratio = item.value;
                    }

                    if (item.newType == 'collection_time') {
                        _item.receivable_date = item.value;
                    }

                    if (item.newType == 'collection_status') {
                        _item.receivable_status = item.selectedId;
                    }

                    _item.receivable_id = item.receivable_id ? item.receivable_id : 0;

                    _item.prj_id = pmId;
                });

                _data.push(_item);

            });

            console.log('_data', _data);


            let postData = {
                uc_uid: app.globalData.uc_uid,
                data: _data,
            }

            todoReceivableAdd(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getTodoReceivableAdd(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/receivable/save", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearCusProjectList()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/receivable/save", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);

            }, (err) => {

                loading(false);
            })
        },

        handelBs_getTodoReceivableAdd(res) {
            showToast({ msg: '保存成功' });
            this.triggerEvent('closeAddTodo');
            this.triggerEvent('refresh');

        },


        //应付新增
        getTodoPayAdd() {
            let _this = this;
            let { todoArray, pmId, todoEdit } = _this.data;
            loading(true);
            let _data = [];

            todoArray.map((info, index) => {
                let _templateList = info.templateList;

                let _item = {};

                // console.log('_templateList------------', _templateList);
                let _newTemplateList = JSON.parse(JSON.stringify(_templateList));

                _newTemplateList.map((item, k) => {

                    if (item.newType == 'pay_type') {
                        _item.payable_type_id = item.selectedId;
                        _item.payable_type_name = item.value;
                    }

                    if (item.newType == 'pay_scale') {
                        _item.payable_ratio = item.value;
                    }

                    if (item.newType == 'pay_time') {
                        _item.payable_date = item.value;
                    }

                    if (item.newType == 'pay_status') {
                        _item.payable_status = item.selectedId;
                    }

                    _item.payable_id = item.payable_id ? item.payable_id : 0;
                    _item.prj_id = pmId;
                });

                _data.push(_item);

            });

            console.log('_data', _data);


            let postData = {
                uc_uid: app.globalData.uc_uid,
                data: _data,
            }

            todoPayAdd(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getTodoPayAdd(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/api/lark/payable/save", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearCusProjectList()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/api/lark/payable/save", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);

            }, (err) => {

                loading(false);
            })
        },

        handelBs_getTodoPayAdd(res) {
            showToast({ msg: '保存成功' });
            this.triggerEvent('closeAddTodo');// 关闭
            this.triggerEvent('refresh');// 刷新
        },


        // 验收新增
        getTodoAcceptanceAdd() {
            let _this = this;
            let { todoArray, pmId, todoEdit } = _this.data;
            loading(true);
            let _data = [];

            todoArray.map((info, index) => {
                let _templateList = info.templateList;

                let _item = {};

                // console.log('_templateList------------', _templateList);
                let _newTemplateList = JSON.parse(JSON.stringify(_templateList));

                _newTemplateList.map((item, k) => {

                    if (item.newType == 'name') {
                        _item.acceptance_type_id = item.selectedId ? item.selectedId : 0;
                        _item.acceptance_type_name = item.value;
                    }

                    if (item.newType == 'time') {
                        _item.acceptance_date = item.value;
                    }

                    if (item.newType == 'status') {
                        _item.acceptance_status = item.selectedId;
                    }

                    _item.acceptance_id = item.acceptance_id ? item.acceptance_id : 0;
                    _item.prj_id = pmId;
                });

                _data.push(_item);

            });

            console.log('_data', _data);


            let postData = {
                uc_uid: app.globalData.uc_uid,
                data: _data,
            }

            todoAcceptanceAdd(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getTodoAcceptanceAdd(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/api/lark/acceptance/save", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearCusProjectList()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/api/lark/acceptance/save", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);

            }, (err) => {

                loading(false);
            })
        },

        handelBs_getTodoAcceptanceAdd(res) {
            showToast({ msg: '保存成功' });
            this.triggerEvent('closeAddTodo');// 关闭
            this.triggerEvent('refresh');// 刷新
        },


        // 交底环节约定 新增/编辑
        getTodoAgreementAdd() {
            let _this = this;
            let { todoArray, pmId, todoEdit } = _this.data;
            loading(true);
            let _data = [];

            todoArray.map((info, index) => {
                let _templateList = info.templateList;

                let _item = {};

                // console.log('_templateList------------', _templateList);
                let _newTemplateList = JSON.parse(JSON.stringify(_templateList));

                _newTemplateList.map((item, k) => {

                    if (item.newType == 'matter') {
                        _item.agreement_thing = item.value;
                    }

                    if (item.newType == 'time') {
                        _item.agreement_date = item.value;
                    }
                    if (item.newType == 'remarks') {
                        _item.agreement_note = item.value;
                    }


                    if (item.newType == 'status') {
                        _item.agreement_status = item.selectedId;
                    }

                    _item.agreement_id = item.agreement_id ? item.agreement_id : 0;
                    _item.prj_id = pmId;
                });

                _data.push(_item);

            });

            console.log('_data', _data);


            let postData = {
                uc_uid: app.globalData.uc_uid,
                data: _data,
            }

            todoAgreementAdd(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getTodoAgreementAdd(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/api/lark/agreement/save", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        _this.clearCusProjectList()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/api/lark/agreement/save", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);

            }, (err) => {

                loading(false);
            })
        },

        handelBs_getTodoAgreementAdd(res) {
            showToast({ msg: '保存成功' });
            this.triggerEvent('closeAddTodo');// 关闭
            this.triggerEvent('refresh');// 刷新
        },
    }
})