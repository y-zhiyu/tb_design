Component({
  externalClasses: ["box-class", "lable-class", "textarea-class", "textarea-inside-class", "placeholder-class"],
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
    maxlength:{
      type: Number,
      value: 140
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  ready() {
    // console.log('value组件-------------', this.data.value)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      // console.log(e);
      let value = e.detail.value;
      this.triggerEvent('change', {
        value
      })
    },
    onFocus(e) {
      let value = e.detail.value;

      this.triggerEvent('focus', {
        value
      })

    },
    onBlur(e) {
      let value = e.detail.value;
      this.triggerEvent('blur', {
        value
      });


    },
  },
})