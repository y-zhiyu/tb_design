### 代码展示

```html
<!-- 默认 -->
<tb-select
  selectArray="{{selectArray}}"
  value="{{value}}"
  bindchange="getSelectChange"
/>

<!-- 可以搜索 -->
<tb-select
  isSearch="{{true}}"
  selectKey="option_key"
  selectText="option_value"
  selectArray="{{selectArray1}}"
  value="{{value1}}"
  bindchange="getSelectChange1"
/>
```

```js
data: {
  selectArray: [
    { id: 1, value: '11111111' },
    { id: 2, value: '22222222' },
    { id: 3, value: '33333333' },
  ],
  value: '',

  selectArray1: [
      { option_key: 1, option_value: '选项一' },
      { option_key: 2, option_value: '选项二' },
      { option_key: 3, option_value: '选项三' },
      { option_key: 4, option_value: '选项四' },
  ],
  value1: '选项一',

},

getSelectChange(e) {
  let { item } = e.detail;

  this.setData({
      value: item.value
  })

},

getSelectChange1(e) {
  let { item } = e.detail;

    this.setData({
        value1: item.value
    })

}

```

### API

| 参数         | 说明                        | 类型    | 默认值 |
| ------------ | --------------------------- | ------- | ------ |
| selectArray  | 下拉框数据                  | array   |        |
| selectKey    | selectArray 对应 id 标识    | string  | id     |
| selectText   | selectArray 对应 value 标识 | string  | value  |
| necessary    | 是否必填                    | boolean | false  |
| lable        | 标题                        | string  |        |
| imgUrl       | 图标路径                    | string  |        |
| placeholder  | 默认值                      | string  | 请选择 |
| value        | 初始化默认值,选中的值       | string  |        |
| isSearch     | 是否显示搜索框              | boolean | false  |
| errorText    | 错误样式以及文案            | string  |        |
| box_class    | 最外层样式                  |         |        |
| select_class | select 样式                 |         |        |
| change       | 下拉列表点击事件            | fun     |        |
