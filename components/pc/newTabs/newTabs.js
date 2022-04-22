Component({
  externalClasses: ["table-class"],

  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      value: []
    },
    tabActiveIdx: {
      type: Number,
      value: 0
    },
    align: {
      type: String,
      value: ''
    },
    top: {
      type: Number,
      value: 0
    },
    themColor: {
      type: Object,
      value: null
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
      let type = e.currentTarget.dataset.type,
        id = e.currentTarget.dataset.id,
        tabList = this.data.tabList;
      let curidx = tabList.findIndex(o => o.type == type);
      this.triggerEvent("selectTab", { type, curidx, id })
    }
  }
})