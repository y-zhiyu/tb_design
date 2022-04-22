Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgUrl:{
            type: String,
            value:'',
        },
        title:{
            type: String,
            value:'',
        },

        pirce:{
           type: Number,
            value: 0, 
        },

        type:{
            type: Number,
            value: 0, 
        },
        number:{
            type: Number,
            value: 0, 
        },
        data:{
            type: Number,
            value: '0',  
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

        // getDetail(e) {
        //     // console.log(e);
        //     let { item } = e.currentTarget.dataset;
        //     this.triggerEvent('detail', { item });
        // }

    }
})