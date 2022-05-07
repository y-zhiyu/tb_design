Component({
  externalClasses: ["box_class", "lable_class", "textarea_class", "textarea_inside_class", "placeholder_class"],
  /**
   * 组件的属性列表
   */
  properties: {
    necessary: {
      type: Boolean,
      value: false
    },
    lable: {
      type: String,
      value: ""
    },
    placeholder: {
      type: String,
      value: "请输入"
    },
    errorText: {
      type: String,
      value: ""
    },
    value: {
      type: String,
      value: ""
    },
    disabled: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: Number || String,
      value: 512,
      observer: function (newVal, oldVal, changedPath) {
        console.log('this.data.maxlength', this.data.maxlength);

      },
    },
    autoHeight: {
      type: Boolean,
      value: false
    },
    countSpace: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    focus: false
  },

  ready() {
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 输入框
    onChange(e) {
      let value = e.detail.value;
      this.triggerEvent('change', { value })
    },

    // 聚焦
    onFocus(e) {
      let value = e.detail.value;
      this.setData({
        focus: true
      })
      this.triggerEvent('focus', { value });
    },

    // 失焦
    onBlur(e) {
      let value = e.detail.value;
      this.setData({
        focus: false
      })
      this.triggerEvent('blur', { value });
    },
  },
})