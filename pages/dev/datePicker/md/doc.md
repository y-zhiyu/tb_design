### 代码展示

```html
<!-- 默认 -->
<tb-datePicker value="{{value}}" bindchange="getChangeValue" />

<!-- 可清除:clear -->
<tb-datePicker
  value="{{value}}"
  bindchange="getChangeValue"
  clear="{{true}}"
  bindclear="gerClear"
/>

<!-- 有效日期范围:start,end -->
<tb-datePicker
  value="{{value}}"
  bindchange="getChangeValue"
  start="2022-05-14"
  end="2023-05-14"
/>

<!-- lable/necessary/errorText -->
<tb-datePicker
  lable="文案一"
  value="{{value}}"
  bindchange="getChangeValue"
  box_class="box_class"
/>

<tb-datePicker
  lable="文案二"
  necessary="{{true}}"
  value="{{value}}"
  bindchange="getChangeValue"
  box_class="box_class"
/>

<tb-datePicker
  lable="文案三"
  necessary="{{true}}"
  value="{{value}}"
  bindchange="getChangeValue"
  errorText="这是错误的提示"
/>

<!-- disabled -->
<tb-datePicker disabled="{{true}}" />
```

```js
  getChangeValue(e) {
    this.setData({
      value: e.detail.value
    })
  },

  gerClear(e) {
    this.setData({
      value: ''
    })
  }
```

### API

| 参数         | 说明                                    | 类型    | 默认值             |
| ------------ | --------------------------------------- | ------- | ------------------ |
| necessary    | 是否必填                                | Boolean | false              |
| lable        | 标题                                    | String  |                    |
| placeholder  | 默认值                                  | String  | 选择日期           |
| value        | 选中值                                  | String  | 格式为"YYYY-MM-DD" |
| start        | 有效日期范围的开始                      | String  | 格式为"YYYY-MM-DD" |
| end          | 有效日期范围的结束                      | String  | 格式为"YYYY-MM-DD" |
| errorText    | 错误样式以及文案                        | String  | -                  |
| disabled     | 禁止态                                  | Boolean | false              |
| fields       | 有效值 year,month,day，表示选择器的粒度 | Boolean | day                |
| clear        | 清楚按钮显示                            | Boolean | false              |
| box_class    | 最外层样式                              | String  | -                  |
| lable_class  | lable 样式                              | String  | -                  |
| picker_class | picker 样式                             | String  | -                  |
| change       | 选择日期触发                            | Fun     | -                  |
| clear        | 清除 事件                               | Fun     | -                  |
| cancel       | 取消选择时触发                          | Fun     | -                  |
