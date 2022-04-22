const app = getApp();
import { imgUrl, isdebug } from "../../../config";
var uploadImage = require("../../../utils/uploadImg/uploadImg.js");
import { loading, dataStatus, showToast, goToPage, setBatTitle, onLoadPublicMethods, } from "../../../utils/interactive";
import { formatDATESub, getUseHours, formatSlice, isMobile,verifyPhoneNum,verifyNumber} from "../../../utils/util.js";
import { debounce }  from "../../../utils/debounce.js";
import { recordList, recordAdd, contactSelect, businessRecordList, businessRecordAdd, businessArrySelect, surveyJSON,addsurveySave,surveyDetail} from "../../../utils/http";
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
                    // this.getBusinessRecordList();
                    // this.getBusinessSelect(this.data.recordId);
                    this.clearAddSurvyList()
                    this.getSurveyJSON()
                    this.getSurveyDetail()

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
        modalTitle: '新建踏勘记录',
        showModal: false,
        showModalTitle: '踏勘记录提交后，不允许更改 请确保提交内容真实完整',
        addSurvyList: [
            {
                id: 0,
                title: '1、楼宇外观',
                isShow: false,
                isComplete: false,


            },
            {
                id: 1,
                title: '2、结构',
                isShow: false,
                isComplete: false,


            },
            {
                id: 2,
                title: '3、客房',
                isShow: false,
                isComplete: false,

            },
            {
                id: 3,
                title: '4、设备/机房/消防',
                isShow: false,
                isComplete: false,

            },
            {
                id: 4,
                title: '5、配套设施',
                isShow: false,
                isComplete: false,

            },
            {
                id: 5,
                title: '6、其它备注',
                isShow: false,
                isComplete: false,

            },
        ],
        survyRecordList: [
            // {
            //     id: 0,
            //     title: '柯蒙豫提交了踏勘记录1',
            //     time: '2021-11-11 11:16',
            //     isShow: false,
            //     list: [
            //         {
            //             id: 0,
            //             title: '1、楼宇外观',
            //             list: [
            //                 { id: 0, type: 'radio', label: '外窗是否封闭', value: '是' },
            //                 { id: 1, type: 'radio', label: '周边道路是否完整', value: '是' },
            //                 {
            //                     id: 2, type: 'img',
            //                     arr: ['https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',]
            //                 },
            //                 { id: 3, type: 'describe', label: '现场描述', value: '现场描述现场描述现场描述现场描述' },
            //             ]

            //         },
            //         {
            //             id: 1,
            //             title: '2、结构',
            //             list: [
            //                 { id: 0, type: 'radio', label: '主体结构是否完整', value: '是' },
            //                 { id: 1, type: 'radio', label: '是否有户间墙', value: '是' },
            //                 {
            //                     id: 2, type: 'img',
            //                     arr: ['https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',]
            //                 },
            //                 { id: 3, type: 'describe', label: '现场描述', value: '现场描述现场描述现场描述现场描述' },
            //             ]

            //         },
            //         {
            //             id: 2,
            //             title: '3、客房',
            //             list: [
            //                 { id: 0, type: 'input', label: '地面高差', value: '10cm' },
            //                 {
            //                     id: 1, type: 'img',
            //                     arr: ['https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',]
            //                 },
            //                 { id: 2, type: 'describe', label: '现场描述', value: '现场描述现场描述现场描述现场描述' },
            //             ]

            //         },
            //         {
            //             id: 3,
            //             title: '4、设备/机房/消防',
            //             list: [
            //                 { id: 0, type: 'radio', label: '是否有施工方', value: '' },
            //                 { id: 1, type: 'input', label: '施工方名称', value: '' },
            //                 { id: 2, type: 'input', label: '施工联系人', value: '' },
            //                 { id: 3, type: 'input', label: '施工联系方式', value: '' },
            //                 {
            //                     id: 4, type: 'img',
            //                     arr: ['https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',]
            //                 },
            //                 { id: 5, type: 'describe', label: '现场描述', value: '现场描述现场描述现场描述现场描述' },
            //             ]

            //         },
            //         {
            //             id: 4,
            //             title: '5、配套设施',
            //             list: [
            //                 {
            //                     id: 1, type: 'img',
            //                     arr: ['https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',]
            //                 },
            //                 { id: 5, type: 'describe', label: '现场描述', value: '现场描述现场描述现场描述现场描述' },
            //             ]

            //         },
            //         {
            //             id: 5,
            //             title: '6、其它备注',
            //             list: [
            //                 {
            //                     id: 1, type: 'img',
            //                     arr: ['https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            //                         'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',]
            //                 },
            //                 { id: 5, type: 'describe', label: '现场描述', value: '现场描述现场描述现场描述现场描述' },
            //             ]

            //         },
            //     ]
            // },
        ],
        testImgList: [
            'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',
            'https://oss.tb.tokoyi.com/tb_pm_prj/545/evidence/61e7f9a3b25de.jpg',

        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //选择踏勘记录item
        selectSurvyRecordItem(e) {
            let { survyRecordList } = this.data
            let { index } = e.currentTarget.dataset
            console.log("selectSurvyRecordItem:", index)
            this.setData({
                [`survyRecordList[${index}].isShow`]: !survyRecordList[index].isShow
            })
        },

        //添加探勘记录触发
        getAddSueveyRecord() {
            console.log("getAddSueveyRecord:")
            this.openaddSurveyStatus()
        },
        closeModal() {
            this.closeaddSurveyStatus()
        },
        openaddSurveyStatus() {
            this.setData({
                addSurveyStatus: true
            })
        },
        closeaddSurveyStatus() {
            this.setData({
                addSurveyStatus: false
            })
        },

        //选择添加探勘记录
        selectAddSurvyList(e) {
            let { addSurvyList } = this.data
            let { index } = e.currentTarget.dataset
            console.log("selectAddSurvyList:", index)
            this.setData({
                [`addSurvyList[${index}].isShow`]: !addSurvyList[index].isShow
            })
        },
       



        //radio
        getTabChange(e) {
            // console.log("getTabChange:radio",e)
            let _this = this, addSurvyList = _this.data.addSurvyList;
            let { index, sonindex,surveyid} = e.target.dataset
            let { item, type } = e.detail
            // console.log("getTabChange:radio",index, sonindex,item,type)
            if(surveyid==6){
                let sublist = addSurvyList[index].point[sonindex].survey_point_subitem.subitem_list
                sublist.map((o,i)=>{
                    o.value=''
                })
                this.setData({
                    subitemPhoneNumber:'',
                    [`addSurvyList[${index}].point[${sonindex}].survey_point_subitem.subitem_list`]:sublist
                })
            }
            _this.setData({
                [`addSurvyList[${index}].point[${sonindex}].value`]: type
            })
            this.checkAddSurvyListComplete()
        },
        //textArea
        getTextAreaChange(e) {
            // console.log("getTextAreaChange:textArea", e)
            let _this = this, addSurvyList = _this.data.addSurvyList;
            let { index, sonindex } = e.target.dataset
            let { value } = e.detail
            // // console.log("getTextAreaChange:textArea",index, sonindex,value)
            _this.setData({
                [`addSurvyList[${index}].point[${sonindex}].value`]: value
            })
            // console.log(_this.data.addSurvyList)
            this.checkAddSurvyListComplete()
        },

        //input
        getInputValue(e) {
            // console.log("getInputValue:input",e)
            let _this = this, addSurvyList = _this.data.addSurvyList;
            let { index, sonindex, type } = e.target.dataset
            let { value } = e.detail
            if (type == "phoneNumbr") {
                value = value.substring(0, 11);
            }
            _this.setData({
                [`addSurvyList[${index}].point[${sonindex}].value`]: value
            })
            // console.log(_this.data.addSurvyList)
            this.checkAddSurvyListComplete()
        },

        //子集 input
        getInputValueSubitem(e) {
            // console.log(e)
            let _this = this, addSurvyList = _this.data.addSurvyList;
            let { index, sonindex, subindex, type } = e.target.dataset
            let { value } = e.detail
            let _value='';
            // console.log("value:",value)
            if (type == "phoneNumbr") {
                // console.log("value:",value)
                value = value.substring(0, 11);
                _this.setData({
                    subitemPhoneNumber:value
                })
            }
             _this.setData({
                [`addSurvyList[${index}].point[${sonindex}].survey_point_subitem.subitem_list[${subindex}].value`]: value
            })
            //  console.log("101010010101",this.data.addSurvyList)
            this.checkAddSurvyListComplete()
        },

        // //chooseImg
        // onChangeTap(e) {
        //     console.log("点击上传本地文件-----", e);
        //     let _this = this;
        //     let resArray = [];
        //     this.data.currentImgobj = {
        //         findex: e.target.dataset.index,
        //         sonindex: e.target.dataset.sonindex,
        //     }
        //     let pathArr = e.detail.current;
        //     console.log("pathArr----", pathArr);

        //     if (e.detail.oversize.length > 0) {
        //         showToast({
        //             msg: "文件太大，请选择20M以内的文件",
        //         });
        //     }
        //     new Promise((re, rj) => {
        //         //获取原图片信息
        //         for (let i = 0; i < pathArr.length; i++) {
        //             tt.getImageInfo({
        //                 src: pathArr[i],
        //                 success: function (res) {
        //                     console.log("第", i + 1, "张");
        //                     console.log("获取上传图片信息---", res);

        //                     resArray.push(res);
        //                     _this.setData({
        //                         resArray: resArray,
        //                         index: 0,
        //                     });
        //                     if (resArray.length == pathArr.length) {
        //                         re(resArray);
        //                     }
        //                 },
        //             });
        //         }
        //     }).then((res) => {
        //         console.log("res------", res);
        //         let index = _this.data.index;
        //         let _item = res[index];
        //         // console.log('index-------', _this.data.index);

        //         _this.getUploadImage(_item.path);
        //     });
        // },

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
            let { index, resArray, imgArr, recordId } = _this.data;

            tt.showLoading({
                title: "上传中" + (index + 1) + "/" + resArray.length,
                mask: true,
            });

            uploadImage(
                path,
                `feishu_tb_survey_img/${recordId}/`,
                function (result) {
                    console.log("======上传成功图片地址为：", result);
                    //这个result就是返给你上传到oss上的地址链接
                    // imgArr.push(result);
                    // console.log("imgArr=========", _this.data.currentImgobj);
                    let { findex, sonindex } = _this.data.currentImgobj
                    _this.data.addSurvyList[findex].point[sonindex].value.push(result)
                    if (_this.data.addSurvyList[findex].point[sonindex].value.length > 9) {
                        _this.data.addSurvyList[findex].point[sonindex].value = _this.data.addSurvyList[findex].point[sonindex].value.slice(0, 9)
                    }
                    _this.setData({
                        // [`addSurvyList[${findex}].point[${sonindex}].arr`]: _this.data.addSurvyList[findex].point[sonindex].arr,
                        [`addSurvyList[${findex}].point[${sonindex}].value`]: _this.data.addSurvyList[findex].point[sonindex].value,
                    });

                    if (index + 1 < resArray.length) {
                        _this.data.index += 1;
                        let _item = resArray[_this.data.index];
                        _this.getUploadImage(_item.path);
                    }
                    if (index + 1 == resArray.length) {
                        console.log("上传完了吗index-----", _this.data.index);
                        tt.hideLoading();
                        _this.checkAddSurvyListComplete()
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
                idx = e.detail.index;
            console.log("删除图片", e);
            let { index, sonindex } = e.target.dataset
            _this.data.addSurvyList[index].point[sonindex].value.splice(idx, 1);
            _this.setData({
                [`addSurvyList[${index}].point[${sonindex}].value`]: _this.data.addSurvyList[index].point[sonindex].value,
            });
        },
        clearAddSurvyList() {
            let { addSurvyList } = this.data
            // console.log(addSurvyList)
            addSurvyList.map((o, i) => {
                if (i == 0) { o.isShow = true }
                // [`addSurvyList[${index}].point[${sonindex}].survey_point_subitem.subitem_list[${subindex}].value`]: value
                if (o.point) {
                    o.point.map((point, pointIndex) => {

                        if (point.type == "radio") {
                            point.value = "survyYes"
                        }
                        if (point.type == "addImg") {
                            point.value = []
                        }
                        if (point.type == "describe") {
                            point.value = ''
                        }
                        if (point.survey_point_subitem && point.survey_point_subitem.subitem_list && point.survey_point_subitem.subitem_list.length > 0) {
                            point.survey_point_subitem.subitem_list.map((subitem, subitemIndex) => {
                                subitem.value = ''
                            })
                        }

                    })
                }

            })
            this.setData({
                addSurvyList
            })
        },

        checkAddSurvyListComplete() {
            let _this = this, addSurvyList = _this.data.addSurvyList;
            // console.log("checkAddSurvyListComplete:", addSurvyList)
            addSurvyList.map((o, i) => {
                if (o.survey_id != 4) {
                    let boolentemp = o.point.every((point, pointIndex) => {
                        return point.value.length > 0
                    })
                    // console.log(boolentemp)
                    if (boolentemp) {
                        o.isComplete = true
                    } else {
                        o.isComplete = false
                       
                    }
                }
                if(o.survey_id == 4){
                    let boolentemp=false
                        o.point.map((point,pointIndex)=>{
                            // console.log(point.survey_point_subitem)
                            if(point.value!="survyYNo"){
                                if(point.survey_point_subitem && point.survey_point_subitem.subitem_list.length>0){
                                boolentemp = point.survey_point_subitem.subitem_list.every((sub,subIndex) => {
                                    return sub.value.length > 0
                                })
                            } 
                            }else{
                               boolentemp=true 
                            }
                              
                        })
                    let boolentemp1 = o.point.every((point, pointIndex) => {
                            return point.value.length > 0
                    })
                    // console.log(boolentemp,boolentemp1)
                    
                    if (boolentemp && boolentemp1) {
                        o.isComplete = true
                    } else {
                        o.isComplete = false
                    }
                }
            })
            this.setData({
                addSurvyList,
            })
        },
         //预览按钮
        getSurveryPreview() {
            // console.log("getSurveryPreview:预览按钮")
            let scrollIndex= this.getScrollIndex()
            console.log("getSurveryPreview:预览按钮",scrollIndex)
            let isPhone =false
            this.data.addSurvyList.map((o,i)=>{
                    o.point.map((point,pointIndex)=>{
                        if(point.survey_point_subitem && point.survey_point_subitem.subitem_list){
                            point.survey_point_subitem.subitem_list.map((sub,subIndex)=>{
                                if(sub.subitem_type=="INPUT_NUMBER"){
                                   if(!verifyPhoneNum(sub.value) && point.value=='survyYes'){
                                    showToast({msg:`请输入${o.survey_name}下的手机号码`})
                                    // console.log("请输入正确的手机号码:",i)
                                    this.setData({
                                        scrollIndex:i,
                                    })
                                 } else{
                                     isPhone=true
                                 }
                                }
                            })
                        }
                    })
                })
            if(scrollIndex==-1 && isPhone ){
                console.log("代开预览模式",this.data.addSurvyList)
                
                this.openPreviewStatus()
            }
        },
        openPreviewStatus(){
            this.setData({
                previewStatus:true
            })
        },
        closePreviewStatus(){
            this.setData({
                previewStatus:false
            })
        },

        //提交按钮
        getSurverySubmit() {
            console.log("getSurverySubmit:",this.data.addSurvyList)

            let scrollIndex= this.getScrollIndex()
            let isPhone =false
            if(scrollIndex==-1){
                this.data.addSurvyList.map((o,i)=>{
                o.point.map((point,pointIndex)=>{
                    if(point.survey_point_subitem && point.survey_point_subitem.subitem_list){
                        point.survey_point_subitem.subitem_list.map((sub,subIndex)=>{
                            if(sub.subitem_type=="INPUT_NUMBER"){
                            if(!verifyPhoneNum(sub.value) && point.value=='survyYes'){
                                showToast({msg:`请输入${i+1}、${o.survey_name}下的手机号码`})
                                // console.log("请输入正确的手机号码:",i)
                                this.setData({
                                    scrollIndex:i,
                                })
                            } else{
                                isPhone=true
                            }
                            }
                        })
                    }
                })
            })
            }
            
            if(scrollIndex==-1 && isPhone ){
                // console.log("代开预览模式",this.data.addSurvyList)
                
                // this.openPreviewStatus()

            // this.checkAddSurvyListComplete()
            let addSurvyList= this.data.addSurvyList,arr=[];
            addSurvyList.map((o,i)=>{
                // console.log("getSurverySubmit:",o)
                let temp={}
                let imgArr = o.point.find((arr,arrIndex)=>{return arr.type == "addImg"}).value
                let comment = o.point.find((arr,arrIndex)=>{return arr.type == "describe"}).value
                temp.result_survey_name=o.survey_name
                temp.survey_id = o.survey_id
                temp.result_survey_type= 1
                temp.result_survey_sort=o.survey_sort
                temp.result_survey_version='1'
                temp.result_survey_images= imgArr
                temp.result_survey_comment=comment
                temp.result_survey_subitem=[]
                console.log("o.point",o.point)
                o.point.map((point,pointIndex)=>{
                    if(point.survey_point_type=="RADIO" || point.survey_point_type=='INPUT_DIGIT' || point.survey_point_type=="INPUT_TEXT" || point.survey_point_type=="INPUT_NUMBER"){
                        let subTemp={} 
                        
                        subTemp.survey_point_id = point.survey_point_id
                        subTemp.survey_point_name = point.survey_point_name
                        subTemp.survey_point_sort = point.survey_point_sort
                        subTemp.survey_point_type = point.survey_point_type
                        if(point.survey_point_type=="RADIO"){
                            subTemp.survey_point_result = point.value=="survyYes"?1:0
                        }else{
                            subTemp.survey_point_result = point.value
                        }
                        
                        
                        subTemp.survey_point_subitem=[]
                        if(point.survey_point_subitem && point.survey_point_subitem.subitem_list.length>0){
                           point.survey_point_subitem.subitem_list.map((gsubArrItem,gsubArrItemIndex)=>{
                               let gsubTemp={}
                               gsubTemp.subitem_name = gsubArrItem.subitem_name
                               gsubTemp.subitem_sort = gsubArrItem.subitem_sort
                               gsubTemp.subitem_result = gsubArrItem.value
                               gsubTemp.subitem_type = gsubArrItem.subitem_type
                               subTemp.survey_point_subitem.push(gsubTemp)
                           })

                        }
                        console.log("subTemp",subTemp)
                        // console.log("point",point)
                        temp.result_survey_subitem.push(subTemp)
                    }
                })

                arr.push(temp)
            })
            // console.log("arr:",arr)
            this.data.subArr = arr
            this.closeModal()
            this.openShowModal()
            
            }
        },
       
        //编辑按钮
        getSurveryEditor() {
            console.log("getSurveryEditor:")
            this.closePreviewStatus()
            console.log("getSurverySubmit:",this.data.addSurvyList)
           

        },
        btnCancel(e) {
            this.closeShowModal()
        },
        closeShowModalBbox() {
            this.closeShowModal()
        },
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

        getScrollIndex(){
            let _this = this, addSurvyList = _this.data.addSurvyList;
            let scrollIndex=addSurvyList.findIndex((o,i)=>{
                if(o.survey_id!=6)return o.isComplete ==false
            })
            // console.log("scrollIndex:",scrollInde()
            if(scrollIndex!=-1){
                 showToast({
                msg:`请完成${addSurvyList[scrollIndex].title}填写完整`
            })
            }
           
            this.setData({
                scrollIndex,
            })
            return scrollIndex

        },

       

        // 获取踏勘记录
        getSurveyJSON() {
            let _this = this;
            loading(true);
            let { viewType, recordId } = _this.data;
            console.log('viewType----------', viewType)

            let postData = {
                uc_uid: app.globalData.uc_uid,
            }

            surveyJSON(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getSurveyJSON(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/survey/index", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        // _this.clearProBroadcat()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/lead/survey/index", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },

        handelBs_getSurveyJSON(res) {
            // console.log('handelBs_getRecordList:', res.data);
            let data = res.data
            console.log('handelBs_getRecordList:', data);
            addSurvyList = this.data.addSurvyList
            // this.setData({
            //     recordList: res.data.list,
            // })
            let temp = { type: 'addImg', value: [] }
            let temp1 = { type: 'describe', label: '现场描述', value: '', placeholder: '现场描述' }

            data.map((o, i) => {
                let t1 = JSON.parse(JSON.stringify(temp))
                let t2 = JSON.parse(JSON.stringify(temp1))
                addSurvyList[i].created_at = o.created_at
                addSurvyList[i].point = o.point
                addSurvyList[i].point.push(t1)
                addSurvyList[i].point.push(t2)
                addSurvyList[i].survey_id = o.survey_id
                addSurvyList[i].survey_name = o.survey_name
                addSurvyList[i].survey_sort = o.survey_sort
                addSurvyList[i].point.map((point, pointIndex) => {
                    if (point.survey_point_type == 'RADIO') {
                        point.type = 'radio'
                        point.label = point.survey_point_name
                        point.value = 'survyYes'
                        // point.value = 1
                        point.radioTabs = [
                            { id: 1, name: '是', type: "survyYes" },
                            { id: 2, name: '否', type: "survyYNo" },
                        ]
                    }
                    if (point.survey_point_type == 'INPUT_DIGIT') {
                        point.type = 'input'
                        point.itype = 'digit'
                        point.inputType = 'digit'
                        point.label = point.survey_point_name
                        point.value = ''
                        point.unit = 'cm'
                    }
                    if (point.survey_point_subitem && point.survey_point_subitem.subitem_list && point.survey_point_subitem.subitem_list.length > 0) {
                        point.survey_point_subitem.subitem_list.map((subitem, subitemIndex) => {
                            if (subitem.subitem_type == 'INPUT_TEXT') {
                                subitem.type = 'input'
                                subitem.label = subitem.subitem_name
                                subitem.value = ''
                                subitem.inputType = 'text'
                                subitem.itype = 'text'
                                subitem.placeholder = '请输入'
                            }
                            if (subitem.subitem_type == 'INPUT_NUMBER') {
                                subitem.type = 'input'
                                subitem.label = subitem.subitem_name
                                // subitem.value = '15910609156'
                                subitem.value = ''
                                subitem.maxlength='11'
                                subitem.inputType = 'number'
                                subitem.itype = 'phoneNumbr'
                                subitem.placeholder = '请输入'
                            }
                        })
                    }
                })

            })
            this.setData({
                addSurvyList
            })
            // console.log("sssssssssss", this.data.addSurvyList)
        },

         btnSurveySubmit() {
            console.log("btnSurveySubmit:")
            this.actionAddsurveySave()
            this.closeShowModalBbox()
        },
        
        btnSurveyCancel() {
            console.log("btnSurveyCancel:")
            this.closeShowModalBbox()
            this.openaddSurveyStatus()

        },


        //提交探勘记录函数
        actionAddsurveySave:debounce(function(){
            
             let _this = this;
            loading(true);
            let { viewType, recordId } = _this.data;
            console.log('viewType----------', viewType)

            let postData = {
                uc_uid: app.globalData.uc_uid,
                lead_id:recordId,
                 data:_this.data.subArr
            }

            addsurveySave(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_actionAddsurveySave(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/survey/store", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        // _this.clearProBroadcat()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/lead/survey/store", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        }),
        handelBs_actionAddsurveySave(res){
            console.log("handelBs_actionAddsurveySave:",res)
            showToast({msg:res.msg})
            this.clearAddSurvyList()
            this.closePreviewStatus()
            this.getSurveyDetail()
        },

        //获取踏勘记录详情
        getSurveyDetail(){
              let _this = this;
            loading(true);
            let { viewType, recordId } = _this.data;
            console.log('viewType----------', viewType)

            let postData = {
                uc_uid: app.globalData.uc_uid,
                lead_id:recordId,
            }

            surveyDetail(postData).then((res) => {
                switch (res.code) {
                    case 200:
                        // update UI
                        _this.handelBs_getSurveyDetail(res);
                        break;
                    case 400:
                        //report_noaction();
                        showToast({ msg: res.msg })
                        report_noaction({ url: "/lark/lead/survey/detail", page: _this.data.routeURL, code: res.code, input_params: postData })
                        break;
                    case 404:
                        // _this.clearProBroadcat()
                        _this.openAddSeruery()
                        break;
                    default:
                        //report_default();
                        report_default({ url: "/lark/lead/survey/detail", page: _this.data.routeURL, code: res.code, input_params: postData })
                }

                loading(false);
            }, (err) => {

                loading(false);
            })
        },
        handelBs_getSurveyDetail(res){
            console.log("handelBs_getSurveyDetail",res)
            let temp = {
                created_by:res.data.created_by,
                created_at:res.data.created_at,
                isShow: false,
                list:res.data.data,
            }
            this.data.survyRecordList.push(temp)
            this.setData({
                survyRecordList:this.data.survyRecordList
            })
            this.closeAddSeruery()
            console.log("this.data.survyRecordList",this.data.survyRecordList)
        },
        openAddSeruery(){
            this.setData({
                serueryDetailStatus:true
            })
        },
        closeAddSeruery(){
            this.setData({
                serueryDetailStatus:false
            })
        }
    }
})