import { isChina, isEnglish } from "../utils/index.js";

Component({
  externalClasses: ["box_class", "lable_class", "input_class"],
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: "text",
    },
    necessary: {
      type: Boolean,
      value: false,
    },
    lable: {
      type: String,
      value: "",
    },
    placeholder: {
      type: String,
      value: "请输入",
    },
    errorText: {
      type: String,
      value: "",
    },
    value: {
      type: String,
      value: "",
    },
    maxlength: {
      type: Number || String,
      value: 255,
    },
    disabled: {
      type: Boolean,
      value: false,
    },

    isSlot: {
      type: Boolean,
      value: true,
    },

    chinaStatus: {
      type: Boolean,
      value: false,
    },

    englishStaus: {
      type: Boolean,
      value: false,
    },

    imgPosition: {
      type: String,
      value: "",
    },

    imgUlr: {
      type: String,
      value: "",
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
    onChange(e) {
      // console.log(e);
      let value = e.detail.value;

      let { maxlength, chinaStatus, englishStaus } = this.data;

      // 只能输入中文
      if (chinaStatus) {
        value = isChina(value);
      }

      // 限制最大长度
      if (maxlength > 0) {
        value = value.substring(0, maxlength);
      }

      // 不能输入中文
      if (englishStaus) {
        value = isEnglish(value);
      }

      // console.log('最后返回的value--------------', value);

      this.triggerEvent("change", { value });
    },

    onFocus(e) {
      let value = e.detail.value;

      this.triggerEvent("focus", {
        value,
      });
    },

    onBlur(e) {
      let value = e.detail.value;
      this.triggerEvent("blur", {
        value,
      });
    },

    onConfim(e) {
      let value = e.detail.value;
      this.triggerEvent("confim", {
        value,
      });
    },

    getIconClick() {
      this.triggerEvent("search");
    }

  },
});
