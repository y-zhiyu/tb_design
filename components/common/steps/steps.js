Component({
  /**
   * 组件的属性列表
   */
  properties: {
    stepList: {
      type: Array,
      value: []
    },
    publicImgUrl: {
      type: String,
      value: ''
    },
    rightArrow: {
      type: Boolean,
      value: true

    },
    stepstype: {
      type: String,
      value: 'default'
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
    gotoTask: function (e) {
      let item = e.currentTarget.dataset.item;
      this.triggerEvent("gotoTask", { item })
    },
  }
})
