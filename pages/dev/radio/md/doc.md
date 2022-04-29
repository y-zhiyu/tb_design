### 代码展示

```html
<!-- 默认状态 -->
<tb-radio radioList="{{radioList}}" bindonChange="getRadioGroupChange" />

<!-- 禁止态 -->
<tb-radio radioList="{{radioList1}}" bindonChange="getRadioGroupChange" />
```

```js
data: {
  radioList: [
    { 'id': '1', 'text': '选项一', },
    { 'id': '2', 'text': '选项二', },
    { 'id': '3', 'text': '选项三', },
  ],
  radioList1: [
    { 'id': '1', 'text': '选项一', disabled: true },
    { 'id': '2', 'text': '选项二', },
    { 'id': '3', 'text': '选项三', },
  ],
},

getRadioGroupChange(e) {
  console.log('e', e.detail);
},


```

#### API

| 属性                  | 说明                                                   | 类型     | 默认值 |
| --------------------- | ------------------------------------------------------ | -------- | ------ |
| radioList             | 传入的数组，包括各项 obj=>{id,text,checked, disabled } | array    | -      |
| obj=>text             | radio 的 label 文案                                    | string   | -      |
| obj=>checked          | 显示状态                                               | bool     | false  |
| obj=>disabled         | 只读状态                                               | bool     | false  |
| radio_class           | radio 最外层 class                                     | string   | -      |
| radio_item_class      | radio 单个样式 class                                   | string   | -      |
| radio_item_left_class | radio 左侧样式 class                                   | string   | -      |
| direction             | 排列方向，横 row／纵 column                            | string   | row    |
| onChange              | 点击选中项事件，可获取当前选中数组 item 及 index(下标) | function | -      |
