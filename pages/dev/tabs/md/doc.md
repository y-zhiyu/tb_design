### 代码展示

```html
<!-- 默认状态 -->
<tb-tabs
  tabsList="{{tabsList}}"
  tabsActiveType="{{tabsActiveType}}"
  lineStatus="{{false}}"
  placeType="center"
  bindtabs="getTabs"
/>
```

```js

  data: {
    tabsList: [
      { text: "Tab 1", type: "tab_1" },
      { text: "Tab 2", type: "tab_2" },
      { text: "Tab 3", type: "tab_3" },
    ],
    tabsList1: [
      { text: "Tab 1", type: "tab_1", imgUrl: "/components/images/icon_1.png" },
      { text: "Tab 2", type: "tab_2", imgUrl: "/components/images/icon_2.png" },
      { text: "Tab 3", type: "tab_3", imgUrl: "/components/images/icon_3.png" },
    ],
    tabsActiveType: "tab_1",
  },

  getTabs(e) {
    console.log("e", e.detail);
    let { type } = e.detail;
    this.setData({
      tabsActiveType: type,
    });
  },
```

### API

| 属性           | 说明                                      | 类型   | 默认值 |
| -------------- | ----------------------------------------- | ------ | ------ |
| tabsList       | tabs 数组 obj:{text,type,imgUrl,disabled} | array  | []     |
| tabsActiveType | 选中态(对应数组的的 type 值)              | string | -      |
| lineStatus     | 是否显示下划线                            | bool   | false  |
| fixedStatus    | 定位(相对父级 top:0)                      | string | -      |
| placeType      | 显示类型(left/center/border)              | string | left   |
| tab_class      | tabs 最外层 样式                          | string | -      |
| tab_item_class | 每个 tab 样式                             | string | -      |
| tab_img_class  | 图标 样式                                 | string | -      |
| tabs           | tabs 点击事件                             | fun    | -      |
