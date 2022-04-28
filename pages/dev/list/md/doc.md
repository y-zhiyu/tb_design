### 代码展示

```html
<tb-list listArray="{{listArray}}" />
```

```js
listArray: [
  { title: "测试一", value: "sbsdjbsdjibvjsdb" },
  { title: "测试二", value: "sbsdjbsdjibvjsdb" },
  { title: "测试三", value: "sbsdjbsdjibvjsdb", hideStatus: true },
  { title: "测试四", value: "sbsdjbsdjibvjsdb" },
];
```

#### API

| 属性        | 说明                         | 类型   | 默认值 |
| ----------- | ---------------------------- | ------ | ------ |
| listArray   | obj:{title,value,hideStatus} | array  | -      |
| title       | 左边部分内容                 | string | -      |
| value       | 右边部分内容                 | string | -      |
| hideStatus  | 数据是否显示                 | bool   | false  |
| item_class  | 每条数据样式                 | string | -      |
| left_class  | 左边部样式                   | string | -      |
| right_class | 右边部分样式                 | string | -      |
