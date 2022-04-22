Component({
    /**
     * 组件的属性列表
     */
    properties: {
        riskBoard: {
            type: Array,
            value: []
        },
        themColor:{
            type:Object,
            value:null
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        //选择风险看板 
        selectRiskBoard(e) {
            let { type, title, itemlist, count } = e.currentTarget.dataset;
            console.log(e);
            // console.log("选择风险看板 selectRiskBoard:", type)
            this.triggerEvent("selectRiskBoard", { type, title, itemlist, count })
        }
    }
})