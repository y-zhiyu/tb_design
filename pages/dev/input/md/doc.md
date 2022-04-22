### 代码展示

```json
<tb-input lable='姓名' necessary='{{true}}' />
<tb-input lable='电话' necessary='{{false}}' />
```

### API

| 属性 | 说明 | 类型 | 默认值 |
|----- |----------| -------------|----------|
| type | 按钮类型: default/primary/danger | string | default|
| size | 按钮大小: default/small/smaller | string | default|
| text | 按钮文字 | string | - |
| disabled | 按钮禁止状态 | bool | false |
| btn_class | button 外层样式 | string | - |
| onclick | 点击事件 | function | - |