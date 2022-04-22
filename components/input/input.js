// import { isChinaNameValue, isEnglish } from "../../../utils/util.js";

Component({
  externalClasses: ["box_class", "lable-class", "input-class"],
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
      observer: function (newVal, oldVal, changedPath) {
        // console.log('input组件newVal-----', this.data.value)
        // console.log('input组件oldVal-----', oldVal);
      },
    },
    maxlength: {
      type: Number,
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
    isLimit: {
      type: Boolean,
      value: false,
    },

    length: {
      type: Number,
      value: 0,
    },
    regType: {
      type: String,
      value: "",
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
    onChange(e) {
      // console.log(e);
      let value = e.detail.value;

      let { isLimit, length, regType } = this.data;

      // 只能输入中文
      if (isLimit) {
        value = isChinaNameValue(value);
      }

      // 限制最大长度
      if (length > 0) {
        value = value.substring(0, length);
      }

      // 不能输入中文
      if (regType == "isEnglish") {
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
  },
});
