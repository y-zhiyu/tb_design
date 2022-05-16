### 代码展示

```html
<!-- 默认状态 -->
<tb-tag text="标签" />

<!-- 可删除 -->
<tb-tag text="标签" imgStatus="{{true}}" binddel="getDel" />

<!-- 颜色 -->
<tb-tag text="明黄 1" color="1" />
<tb-tag text="橙黄 2" color="2" />
<tb-tag text="橘红 3" color="3" />
<tb-tag text="粉红 4" color="4" />
<tb-tag text="紫色 5" color="5" />
<tb-tag text="普蓝 6" color="6" />
<tb-tag text="蓝色 7" color="7" />
<tb-tag text="湖蓝 8" color="8" />
<tb-tag text="青色 9" color="9" />
<tb-tag text="绿色 10" color="10" />
```

```js
  getDel() {
    this.triggerEvent("del");
  }

```

### API

| 属性      | 说明             | 类型   | 默认值 |
| --------- | ---------------- | ------ | ------ |
| text      | 内容             | string | -      |
| imgStatus | 是否显示删除按钮 | bool   | false  |
| imgUrl    | 图标替换         | string | -      |
| color     | 颜色类型         | string | -      |
| tag_class | tag 样式         | string | -      |
| del       | 可删除 点击事件     | fun    | -      |
