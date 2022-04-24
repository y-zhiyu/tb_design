### 代码展示

```html

<!-- 默认状态 -->
<tb-checkBox text='checkBox' checked="{{checked}}" bindonChange="getChange" />

<!-- 禁止态 -->
<tb-checkBox text='checkBox' disabled="{{true}}" />

<!-- 数组/选中事件 -->
<tb-checkBox text='checkBox' checkBoxList="{{checkBoxList}}" direction="column" bindonChange="getChangeValue" />
```

```js
  data: {
    checked: false,
    checkBoxList: [
      { id: "1", text: "选项一", checked: false, disabled: true },
      { id: "2", text: "选项二", checked: true },
      { id: "3", text: "选项三", checked: false },
      { id: "4", text: "选项四", checked: false },
    ],
  },

  getChange() {
    this.setData({
      checked: !this.data.checked,
    });
  },

  getChangeValue(e) {
    let { checkBoxList } = this.data;
    let { item, index } = e.detail;
    console.log("item", item);

    this.setData({
      [`checkBoxList[${index}].checked`]: !checkBoxList[index].checked,
    });
  },

```

#### API-checkbox

| 属性                  | 说明                        | 类型     | 默认值 |
| --------------------- | --------------------------- | -------- | ------ |
| text                  | checkbox 的 label 文案      | string   | -      |
| checked               | 显示状态                    | bool     | false  |
| disabled              | 只读状态                    | bool     | false  |
| imgUrl                | checkBox 里的 icon 替换路径 | string   | -      |
| check_class           | checkBox 最外层 class       | string   | -      |
| check_item_class      | checkBox 单个样式 class     | string   | -      |
| check_item_left_class | checkBox 左侧样式 class     | string   | -      |
| check_icon_class      | checkBox icon样式 class    | string   | -      |
| onChange              | checkbox 点击事件           | function | -      |


#### API-checkboxGroup

| 属性         | 说明                                             | 类型     | 默认值 |
| ------------ | ------------------------------------------------ | -------- | ------ |
| checkBoxList | 传入的数组，包括各项 id,text,checked, disabled   | array    | -      |
| direction    | 排列方向，横 row／纵 column                      | string   | row    |
| onChange     | 点击选中项事件，可获取当前选中数组 item 及 index | function | -      |
