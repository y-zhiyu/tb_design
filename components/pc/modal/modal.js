Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ""
    },
    imgurl: {
      type: String,
      value: ""
    },
    mask: {
      type: Boolean,
      value: true
    },
    width: {
      type: String,
      value: ""
    },
    height: {
      type: String,
      value: ""
    },
    publicImgUrl: {
      type: String,
      value: ""
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
    getClose() {
      this.triggerEvent('close')
    }

  }
})