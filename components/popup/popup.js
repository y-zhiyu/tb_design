Component({
  externalClasses: ["popup_class", "img_class"],

  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changedPath) {
        console.log('this.data.show', this.data.show);
        let _this = this;

        if (this.data.show) {
          let _timer = setTimeout(function () {
            _this.setData({
              show: false
            })
          }, 2000)
        }

      },
    },
    text: {
      type: String,
      value: "",
    },
    imgurl: {
      type: String,
      value: "",
    },
    type: {
      type: String,
      value: "success",
    },
    kind: {
      type: Number || String,
      value: 1,
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

    getClose() {
      this.triggerEvent("close");
    },

    getLayout() {
      this.triggerEvent("layout");
    },

  },
});
