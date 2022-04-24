Component({
    externalClasses: ["check_class", "check_item_class", "check_item_left_class", "check_icon_class"],
    /**
     * 组件的属性列表
     */
    properties: {
        text: {
            type: String,
            value: "",
        },

        checked: {
            type: Boolean,
            value: false,
        },
        imgUrl: {
            type: String,
            value: "",
        },

        disabled: {
            type: Boolean,
            value: false,
        },

        checkBoxList: {
            type: Array,
            value: [],
        },

        direction: {
            type: String,
            value: "row",// column
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onChange() {
            let { disabled } = this.data;
            if (disabled) return;

            this.triggerEvent("onChange");
        },

        onChangeItem(e) {
            let { item, index } = e.currentTarget.dataset;
            if (item.disabled) return;

            this.triggerEvent("onChange", { item, index });
        }
    },
});
