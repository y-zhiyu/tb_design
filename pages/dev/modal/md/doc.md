### 代码展示

```html
<!-- 默认状态 -->
<tb-modal show="{{modalStatus}}" title="标题文案" bindclose="getClose" />

<!-- 有遮罩层 -->
<tb-modal
  show="{{modalStatus}}"
  title="标题文案"
  isLayout="{{true}}"
  width="300"
  height="250"
  bindclose="getClose"
  bindlayout="getLayout"
/>
```

```js
  getClose() {
    this.setData({
      modalStatus: false,
    });
  },
```

### API

| 属性        | 说明               | 类型     | 默认值 |
| ----------- | ------------------ | -------- | ------ |
| show        | 是否显示模态框     | bool     | false  |
| isLayout    | 是否显示模态框蒙层 | bool     | false  |
| title       | 模态框标题         | string   | -  |
| imgUrl      | 替换 img           | string   | -      |
| width       | modal 的宽         | string   | 450      |
| height      | modal 的高         | string   | 400      |
| modal_class | modal 最外层 样式  | string   | -      |
| title_class | modal 标题 样式    | string   | -      |
| icon_class  | modal icon 样式    | string   | -      |
| close       | 模态框关闭按钮事件 | function | -      |
| layout      | 遮罩层点击事件     | function | -      |
