Component({
  /**
   * 组件的属性列表
   */
  properties: {
    themColor: {
      type: Object,
      value: null,
    },
    show: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: "",
    },
    imgurl: {
      type: String,
      value: "",
    },
    width: {
      type: String,
      value: "",
    },
    height: {
      type: String,
      value: "",
    },
    publicImgUrl: {
      type: String,
      value: "",
    },
    isLayout: {
      type: Boolean,
      value: true,
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
    getClose() {
      this.triggerEvent("close");
    },
  },
});
