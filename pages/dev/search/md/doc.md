### 代码展示

```html
<!-- 默认 -->
<tb-search
  placeholder="输入关键字"
  imgPosition="right"
  bindchange="getChangeValue"
  bindconfirm="getConfirm"
  bindsearch="getSearch"
/>
```

```js
  getChangeValue(e) {
    let { value } = e.detail;
    this.setData({
      value: value
    })
  }
```

### API

| 参数         | 说明                         | 类型    | 默认值 |
| ------------ | ---------------------------- | ------- | ------ |
| placeholder  | 默认值                       | String  | 请输入 |
| value        | 输入的值                     | String  | -      |
| imgPosition  | 图标位置(left/right)         | String  | -      |
| imgUlr       | 图标路径                     | String  | -      |
| search_class | search 样式                  | String  | -      |
| change       | 键盘输入时触发               | Fun     | -      |
| confirm      | 用户点击键盘的完成按钮时触发 | Fun     | -      |
| search       | 搜索 icon 点击事件           | Fun     | -      |
