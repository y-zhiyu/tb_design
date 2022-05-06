
Component({
  externalClasses: ["search_class"],
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: "text",
    },
    placeholder: {
      type: String,
      value: "请输入",
    },
    value: {
      type: String,
      value: "",
    },
    maxlength: {
      type: Number || String,
      value: 255,
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
  data: {
    focus: false,
  },

  /**
   * 组件的方法列表
   */

  methods: {
    onChange(e) {
      // console.log(e);
      let value = e.detail.value;
      this.triggerEvent("change", { value });
    },

    onFocus(e) {
      let value = e.detail.value;
      this.setData({
        focus: true
      })

      this.triggerEvent("focus", { value });
    },

    onBlur(e) {
      let value = e.detail.value;
      this.setData({
        focus: false
      })
      this.triggerEvent("blur", { value });
    },

    onConfirm(e) {
      let value = e.detail.value;

      this.triggerEvent("confirm", { value });
    },

    getIconClick() {
      this.triggerEvent("search");
    }

  },
});
