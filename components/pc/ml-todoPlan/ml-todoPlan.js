Component({
    /**
     * 组件的属性列表
     */
    properties: {
        publicImgUrl: {
            type: String,
            value: '',
        },
        receivable_list: {
            type: Array,
            value: [],
        },
        payable_list: {
            type: Array,
            value: [],
        },
        completion_acceptance_list: {
            type: Array,
            value: [],
        },
        clarification_agreement_list: {
            type: Array,
            value: [],
        },
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
        editor(e) {

            let { todotype, todoname } = e.currentTarget.dataset;
            // console.log("editor:",todotype)
            let todoType = todotype;
            let todoName = todoname;
            this.triggerEvent("editor", { todoType, todoName })
        },
        selectTodoFin(e) {
            let { todotype, index,id } = e.currentTarget.dataset;
            // console.log("selectTodoFin:",todotype,index)
            let todoType = todotype
            this.triggerEvent("selectTodoFin", { todoType, index,id })
        }
    }
})