### 代码展示

```html
<!-- 默认 -->
<tb-input value="{{value}}" bindchange="getInputChange" />

<!-- 禁止 -->
<tb-input lable='电话' necessary='{{false}}' />

<!-- lable/necessary/maxlength -->
<tb-input lable='姓名' necessary="{{true}}" box_class="box_class" value="{{value}}" bindchange="getInputChange" />
<tb-input lable='电话' type="nmuber" maxlength="11" />

<!-- errorText -->
<tb-input lable='姓名' necessary="{{true}}" box_class="box_class" value="{{value}}" errorText="这是错误的提示" />

<!-- 图标(搜索) -->
<tb-input box_class="box_class" imgPosition="right"  />

```

```js
  getInputChange(e) {
    // console.log(e);
    let { value } = e.detail;
    this.setData({
      value: value
    })
  }
```
### API

| 参数        | 说明                                | 类型    | 默认值 |
| ----------- | ----------------------------------- | ------- | ------ |
| type        | type 类型(text/number/idcard/digit) | String  | text   |
| necessary   | 是否必填                            | Boolean | false  |
| lable       | 标题                                | String  |        |
| placeholder | 默认值                              | String  | 请输入 |
| value       | 输入的值                            | String  | -      |
| errorText   | 错误样式以及文案                    | String  | -      |
| disabled    | 禁止态                              | Boolean | false  |
| maxlength   | 最大长度                            | number  | 512    |
| imgPosition | 图标位置(left/right)                | String  | -      |
| imgUlr      | 图标路径                            | String  | -      |
| isChina     | 限制只输入中文                      | Boolean | false  |
| isEnglish   | 限制只输入英文                      | Boolean | false  |
| box_class   | 最外层样式                          | String  | -      |
| lable_class | lable 样式                          | String  | -      |
| input_class | input 样式                          | String  | -      |
| isSlot      | 卡槽(替换 input)                    | String  | -      |
| change      | 键盘输入时触发                      | Fun     | -      |
| focus       | 输入框聚焦时触发                    | Fun     | -      |
| blur        | 输入框失去焦点时触发                | Fun     | -      |
| confirm     | 用户点击键盘的完成按钮时触发        | Fun     | -      |
| search      | 搜索点击事件                        | Fun     | -      |

