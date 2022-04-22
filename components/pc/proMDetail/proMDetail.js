import { showToast,goToPage } from '../../../utils/interactive'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        publicImgUrl:{
            type:String,
            value:''
        },
        detailData:{
            type:Object,
            value:null
        },
        materialLogList:{
            type:Object,
            value:null
        }
    },
    
    attached(){
        let total = this.data.pageTotal, paArr = this.data.paArr;
        console.log(total)
        if(total<5){
            for(let i=1;i<=total;i++){
                paArr.push(i)
            }
        }
        if(total>10){
           for(let i=1;i<=3;i++){
                paArr.push(i)
            }
             paArr.push(0)
             paArr.push(total)
        }
        this.setData({
            paArr
        })
    },
    /**
     * 组件的初始数据
     */
    data: {
        imgList:[
            'https://tb-test-erp.oss-cn-beijing.aliyuncs.com/img/pcPAlark/pc_noDateV2.png',
            'https://tb-test-erp.oss-cn-beijing.aliyuncs.com/img/pcPAlark/pc_noDateV2.png',
            'https://tb-test-erp.oss-cn-beijing.aliyuncs.com/img/pcPAlark/pc_noDateV2.png',
            'https://tb-test-erp.oss-cn-beijing.aliyuncs.com/img/pcPAlark/pc_noDateV2.png',
            'https://tb-test-erp.oss-cn-beijing.aliyuncs.com/img/pcPAlark/pc_noDateV2.png',
            
        ],
        
        paArr:[],
        pageTotal:30,
        currValue:1,
    },
    
    /**
     * 组件的方法列表
     */
    methods: {
        gotoBack(){
            console.log("返回")
            // goToPage({navType:"navigateBack"})
            this.triggerEvent("gotoBack")
        },
        submitArr(){
            this.triggerEvent("submitArr")
        },
        prev(){
            let currValue = currValue-1
            this.setData({
                currValue,
            })
        },
        next(){
            let currValue = currValue+1;
            let total = this.data.pageTotal, paArr = this.data.paArr;
            if(currValue>3){
                paArr=[1,0,currValue+1,currValue+2,total]
            }
            console.log("11111111111",paArr)
            this.setData({
                currValue,
                paArr
            })

        }
    }
})