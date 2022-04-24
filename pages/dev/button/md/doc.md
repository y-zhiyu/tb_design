### 代码展示

```html
<!-- 默认状态 -->
<tb-button text="default" btn_class="btn_class" />
<tb-button text="primary" type='primary' btn_class="btn_class" />
<tb-button text="danger" type='danger' btn_class="btn_class" />
<tb-button text="disabled" type='disabled' disabled="{{true}}" btn_class="btn_class" />

<!-- 图标/可替换图标 -->
<tb-button text="add" imgStatus="{{true}}" btn_class="btn_class" />
<tb-button text="add" type='primary' imgStatus="{{true}}" btn_class="btn_class" />
```

### API

| 属性      | 说明                             | 类型     | 默认值  |
| --------- | -------------------------------- | -------- | ------- |
| type      | 按钮类型: default/primary/danger | string   | default |
| text      | 按钮文字                         | string   | -       |
| disabled  | 按钮禁止状态                     | bool     | false   |
| imgStatus | 是否显示 icon 图标               | bool     | false   |
| imgUrl    | 图标路径                         | string   | -       |
| btn_class | button 外层样式                  | string   | -       |
| btn_icon  | icon 样式                        | string   | -       |
| onclick   | 点击事件                         | function | -       |
