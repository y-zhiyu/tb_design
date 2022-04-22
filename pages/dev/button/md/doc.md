### 代码展示

```json
<tb-button text="default" btn_class="btn_class" />
<tb-button text="primary" type='primary' btn_class="btn_class" />
<tb-button text="danger" type='danger' btn_class="btn_class" />
<tb-button text="disabled" type='disabled' disabled="{{true}}" btn_class="btn_class" />
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