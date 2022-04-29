Component({
    externalClasses: ["radio_class", "radio_item_class", "radio_item_left_class", "radio_icon_class"],
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
        disabled: {
            type: Boolean,
            value: false,
        },

        imgUrl: {
            type: String,
            value: "",
        },


        radioList: {
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
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // onChange(e) {
        //     let { disabled, checked } = this.data;
        //     if (disabled) return;

        //     this.triggerEvent("onChange", { checked: !checked });
        // },

        onChangeItem(e) {
            let { item, index } = e.currentTarget.dataset;
            if (item.disabled) return;

            let { radioList } = this.data;

            radioList && radioList.length > 0 && radioList.map((info, k) => {

                if (k == index) {
                    info.checked = true;

                } else {
                    info.checked = false;
                }
            })
            this.setData({
                radioList: radioList
            });

            this.triggerEvent("onChange", { item, index });
        }
    },
});
