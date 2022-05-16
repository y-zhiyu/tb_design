Component({
    externalClasses: ["box_class", "lable_class", "picker_class"],
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: String,
            value: "",
        },
        placeholder: {
            type: String,
            value: "选择日期",
        },
        start: {
            type: String,
            value: "",
        },
        end: {
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
        fields: {
            type: String,
            value: "day"
        },
        clear: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        showStatus: false,

    },

    /**
     * 组件的方法列表
     */
    methods: {

        bindDayDateChange(e) {
            if (this.data.disabled) { return }

            let value = e.detail.value
            this.triggerEvent("change", { value });
        },

        bindcancel(e) {
            console.log('取消---------')
            this.triggerEvent("cancel");

        },

        getDel() {
            this.triggerEvent("clear", { value: '' });
        }
    }
})