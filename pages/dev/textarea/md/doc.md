### 代码展示

```html
<!-- 默认 -->
<tb-textarea value="{{value}}" bindchange="getChangeValue" />

<!-- 禁止 -->
<tb-textarea disabled="{{true}}" value="禁止文字" />

<!-- 自适应高度 -->
<tb-textarea autoHeight="{{true}}" />

<!-- lable/necessary/errorText -->
<tb-textarea
  lable="文案一"
  autoHeight="{{true}}"
  necessary="{{true}}"
  box_class="box_class"
/>
<tb-textarea
  lable="文案二"
  autoHeight="{{true}}"
  necessary="{{false}}"
/>
<tb-textarea
  lable="文案三"
  autoHeight="{{true}}"
  necessary="{{false}}"
  errorText="这是错误的提示"
/>

<!-- 统计字数: countSpace/maxlength -->
<tb-textarea
  countSpace="{{true}}"
  maxlength="{{200}}"
  value="{{value}}"
  bindchange="getChangeValue"
/>
```

```js
  getChangeValue(e) {
    this.setData({
      value: e.detail.value
  })
}
```

### API

| 参数                  | 说明                         | 类型    | 默认值 |
| --------------------- | ---------------------------- | ------- | ------ |
| necessary             | 是否必填                     | Boolean | false  |
| lable                 | 标题                         | String  | -      |
| placeholder           | 默认值                       | String  | 请输入 |
| value                 | 输入的值                     | String  | -      |
| errorText             | 错误样式以及文案             | String  | -      |
| disabled              | 禁止态                       | Boolean | false  |
| maxlength             | 最大长度                     | number  | 512    |
| autoHeight            | 高度自适应                   | Boolean | false  |
| countSpace            | 是否显示限制字数             | Boolean | false  |
| box_class             | 最外层样式                   | String  | -      |
| lable_class           | lable 样式                   | String  | -      |
| textarea_class        | textarea 外层 样式           | String  | -      |
| textarea_inside_class | textarea 样式                | String  | -      |
| change                | 键盘输入时触发               | Fun     | -      |
| focus                 | 输入框聚焦时触发             | Fun     | -      |
| blur                  | 输入框失去焦点时触发         | Fun     | -      |
