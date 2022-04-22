Component({
     externalClasses: ["box-class", ],
    /**
     * 组件的属性列表
     */
    properties: {
        dayDate:{
           type: String,
            value: "",   
        },
        start:{
            type: String,
            value: "", 
        },
        end:{
            type: String,
            value: "", 
        },
        pickerType: {
            type: String,
            value: "date",
        },
        necessary: {
            type: Boolean,
            value: false
        },
        lable: {
            type: String,
            value: ""
        },
      
        errorText: {
            type: String,
            value: ""
        },
        
        disabled: {
            type: Boolean,
            value: false
        },
        isSlot: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        date: '',
        dayDate: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindDayDateChange(e) {
            let val = e.detail.value
            // console.log("bindDayDateChange", val)
            this.triggerEvent("change", {
                val,
            });
        }
    }
})