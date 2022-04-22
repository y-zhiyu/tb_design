Component({
    externalClasses: ["btn_class"],
    /**
     * 组件的属性列表
     */
    properties: {
        type: {
            type: String,
            value: "default",
        },

        size: {
            type: String,
            value: "",
        },

        text: {
            type: String,
            value: "",
        },

        disabled: {
            type: Boolean,
            value: false,
        },
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onClick() {
            let { disabled } = this.data;
            if (disabled) return;

            this.triggerEvent("onclick");
        },
    },
});
