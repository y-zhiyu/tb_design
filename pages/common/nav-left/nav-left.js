import { getMenuList } from "../../../utils/menu.js";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuList: {
      type: Array,
      value: [],
    },

    selectedType: {
      type: String,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        console.log("selectedType", this.data.selectedType);

        this.init(this.data.selectedType);
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  ready() {},

  /**
   * 组件的方法列表
   */
  methods: {
    init(type) {
      getMenuList({ type: type });
    },

    getItemChange(e) {
      let { type, index } = e.detail;
      // this.setData({
      //     selectedType: type
      // })

      tt.redirectTo({ url: `/pages/dev/${type}/${type}` });
    },
  },
});
