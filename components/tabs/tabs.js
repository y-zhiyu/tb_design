// components/tab/tab.js
Component({

  externalClasses: ["tab_class", "tab_item_class", "tab_img_class"],
  /**
   * 组件的属性列表
   */
  properties: {
    tabsList: {
      type: Array,
      value: []
    },

    tabsActiveType: {
      type: String || Number,
      value: ''
    },

    lineStatus: {
      type: Boolean,
      value: false
    },

    fixedStatus: {
      type: Boolean,
      value: false
    },

    placeType: {
      type: String,
      value: 'left'
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
    selectTab(e) {
      let { type, index, disabled } = e.currentTarget.dataset;
      console.log('disabled', disabled)
      if (disabled) { return }

      this.triggerEvent("tabs", { type, index });

    }
  }
})
