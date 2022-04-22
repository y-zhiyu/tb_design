const app = getApp();
import { goToPage } from '../../../utils/interactive';
import { isdebug, environment } from "../../../config";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        publicImgUrl: {
            type: String,
            value: ' '
        },
        navTitle: {
            type: String,
            value: ' '
        },
        cnToolHeight: {
            type: Number,
            value: ' '
        },
        fixed: {
            type: Boolean,
            value: false
        },
        // vertion: {
        //     type: String,
        //     value: ''
        // }
    },
    ready() {
        // 版本号
        let _envVersion = app.globalData.envVersion;
        let _isdebug = isdebug ? 'test' : 'pro';
        let _vertion = '(' + _envVersion + ' ' + _isdebug + ' ' + environment + ')';
        // console.log('_vertion=========', _vertion);

        this.setData({
            vertion: _vertion
        })
        let routerArr = getCurrentPages()
        if (routerArr.length == 1) {
            // console.log("ready=>",routerArr)
            this.setData({
                lDis: false,
                rDis: false
            })
        }
        if (routerArr.length > 1) {
            this.setData({
                lDis: true,
                rDis: false
            })
        }

        if (routerArr.length == 1 && routerArr[routerArr.length - 1].__route__ != "pages/pc/pages/project/projectManagement/projectManagement") {
            this.setData({
                showBackHome: true
            })
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        showBackHome: false,
        vertion: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        back() {
            console.log("back=>:")
            goToPage({ navType: "navigateBack" })
        },
        forword() {
            console.log("forword=>:")

            // this.triggerEvent("")

        },
        refresh() {
            let routerArr = getCurrentPages();
            let currentThis = routerArr[routerArr.length - 1]
            console.log("refresh=>:", currentThis)
            if(currentThis.__route__=="pages/pc/pages/project/projectManagement/projectManagement"){
                currentThis.data.projectList=[]
            }
            currentThis.onShow()
        },

        backHome() {
            goToPage({ url: '/pages/pc/pages/project/projectManagement/projectManagement', navType: "reLaunch" })
        }

    }
})