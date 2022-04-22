Component({
  externalClasses: ["menu_class", "menu_item_class", "menu_img_class"],

  /**
   * 组件的属性列表
   */

  properties: {
    menuList: {
      type: Array,
      value: null,
    },

    selectedType: {
      type: String,
      value: "",
    },

    modeType: {
      type: String,
      value: "inline", // inline(内嵌) ,horizontal(水平的)
    },

    iconRightStatus: {
      type: Boolean,
      value: false,
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
    getItemChange(e) {
      let { type } = e.currentTarget.dataset;
      let { menuList } = this.data;
      let index = menuList.findIndex((item) => item.type == type);

      this.triggerEvent("itemChange", { type, index });
    },
  },
});
