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

        this.init(this.data.selectedType);
      },
    },
    article: {
      type: Object,
      value: {},
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  ready() { },

  /**
   * 组件的方法列表
   */
  methods: {
    init(type) {
      getMenuList({ type: type });
    },

    getItemChange(e) {
      let { type, index } = e.detail;
      tt.redirectTo({ url: `/pages/dev/${type}/${type}` });
    },
  },
});
