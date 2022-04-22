import { goToPage} from '../../../utils/interactive';
import { toggleChat } from '../../../utils/util.js';

// import { modulePageArray } from '../../../config.js';
var app = getApp()
Component({

    properties: {

        publicImgUrl: {
            type: String
        },
        themColor:{
            type:Object,
            value:null
        },
        layout: {
            type: String

        },
        top: {
            type: Number
        },
        fixed: {
            type: Boolean,
            value: false
        },
        avatarUrl: {
            type: String,
            value: ""
        },
        modulePageArray:{
            type: Array,
            value: []
        },
        role_name:{
            type: String,
            value: ""
        }

    },
    ready(){
        // console.log("app.globalData.modulePageArray:",app.globalData.modulePageArray)
        this.setData({
            // modulePageArray:app.globalData.modulePageArray,
            pageIndex:app.globalData.modulePageIndex,
        })
    },

    /**
     * 组件的初始数据
     */
    data: {
        roleIndex: 3,
        roleList: [
            { id: 0, title: '设计师' },
            { id: 1, title: '成本' },
            { id: 2, title: '采购' },
            { id: 3, title: '项目经理' },
        ],
        
    },

    /**
     * 组件的方法列表
     */
    methods: {

        getDropDown() {

        },
        getRole(e) {
            let roleIndex = e.currentTarget.dataset.index;
            this.setData({
                roleIndex
            })
        },
        getModulePage(e){
            let modulePageArray = this.data.modulePageArray;
            let { path, navtype} =  e.currentTarget.dataset
            // console.log("getModulePage:",path)
            let pageIndex  = modulePageArray.findIndex((o,i)=>{return o.pagePath==path})
            let currentPage = getCurrentPages()[getCurrentPages().length - 1];
            let compatePath = currentPage.__route__
            console.log("currentPage.data.chatShow",currentPage,currentPage.data.chatShow)
            
            //  if(currentPage.__route__=="pages/pc/pages/project/projectMDetail/projectMDetail" && currentPage.data.chatShow){
            //     currentPage.closeChatGroup()
            //  }

             app.globalData.modulePageIndex=pageIndex
                this.setData({
                    pageIndex
                })
             goToPage({
                    url:'/'+path,
                    navType:navtype
                })
           
        }
    }
})