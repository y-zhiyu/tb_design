### 代码展示

```html
<!-- 默认状态 -->
<tb-button text="default" />
<tb-button text="primary" type="primary" />
<tb-button text="danger" type="danger" />
<tb-button text="disabled" type="disabled" disabled="{{true}}" />

<!-- 图标/可替换图标 -->
<tb-button text="add" imgStatus="{{true}}" />
<tb-button
  text="add"
  type="primary"
  imgStatus="{{true}}"
  bindonClick="onClick"
/>
```

### API

| 属性        | 说明                             | 类型     | 默认值  |
| ----------- | -------------------------------- | -------- | ------- |
| type        | 按钮类型: default/primary/danger | string   | default |
| text        | 按钮文字                         | string   | -       |
| disabled    | 按钮禁止状态                     | bool     | false   |
| imgStatus   | 是否显示 icon 图标               | bool     | false   |
| imgUrl      | 图标路径                         | string   | -       |
| btn_class   | button 外层样式                  | string   | -       |
| btn_icon    | icon 样式                        | string   | -       |
| onClick | 点击事件                         | function | -       |
