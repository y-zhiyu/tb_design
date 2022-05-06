### 代码展示

```html
<!-- 默认状态 -->
<tb-popup show="{{successStatus}}" text="这是一条操作成功的提示" />
<tb-popup show="{{errorStatus}}" text="这是一条错误的提示" type="error" />
<tb-popup show="{{infoStatus}}" text="这是一条消息的提示" type="info" />
<tb-popup show="{{warningStatus}}" text="这是一条警告的提示" type="warning" />

<!-- 类型 -->
<tb-popup show="{{successStatus1}}" text="这是一条操作成功的提示1" kind="2" />
<tb-popup show="{{errorStatus1}}" text="这是一条错误的提示1" type="error" kind="2" />
<tb-popup show="{{infoStatus1}}" text="这是一条消息的提示1" type="info" kind="2" />
<tb-popup show="{{warningStatus1}}" text="这是一条警告的提示1" type="warning" kind="2" />
```

### API

| 属性        | 说明                             | 类型          | 默认值  |
| ----------- | -------------------------------- | ------------- | ------- |
| show        | 是否显示                         | bool          | false   |
| type        | 类型: success/info/error/warning | string        | success |
| text        | popup 文字                       | string        | -       |
| kind        | 类型(kind=1/2)                   | number/string | 1       |
| imgUrl      | 图标路径                         | string        | -       |
| popup_class | popup 外层样式                   | string        | -       |
| img_class   | icon 样式                        | string        | -       |
