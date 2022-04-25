### 代码展示

```html
<tb-pagination
  isInput="{{true}}"
  isSelect="{{true}}"
  total="{{total}}"
  current="{{current}}"
  pageSize="{{pageSize}}"
  pageNumber="{{pageNumber}}"
  bindchange="getPageChange"
  bindpageSize="getPageSize"
  bindpageInput="getPageInput"
  bindpageConfirm="getPageConfirm"
/>
```

```js
  data: {
    total: 10,
    current: 1,
    pageSize: 10,
    pageNumber: 1,
    pageSizeArr:[10,20]
  },

  // 分页点击事件
  getPageChange(e) {
    let { current } = e.detail;
    this.setData({
      current: current
    })
  },

  // 每页多少条
  getPageSize(e) {
    let { pageSize } = e.detail;
    this.setData({
      pageSize: pageSize
    })
  },

  // input事件
  getPageInput(e) {
    console.log('e----------', e);

  },

  // 回车键跳转第几页
  getPageConfirm(e) {
    let { pageNumber } = e.detail;
    console.log('外部pageNumber', pageNumber)

    this.setData({
      current: pageNumber,
      pageNumber: pageNumber
    })
  },
```

### API

| 属性        | 说明               | 类型   | 默认值           |
| ----------- | ------------------ | ------ | ---------------- |
| total       | 总页数             | number | -1               |
| current     | 当前页数           | number | -1               |
| pageSize    | 每页条数           | number | -1               |
| pageSizeArr | 每页条数选项数组   | array  | [10,20,30,40,50] |
| pageNumber  | 输入框             | string | -1               |
| isSelect    | 是否显示 select 框 | bool   | false            |
| isInput     | 是否显示输入框     | bool   | false            |
| change      | 分页点击事件       | func   | -                |
| pageSize    | 改变每页页数事件   | func   | -                |
| pageInput   | 输入框输入 change  | func   | -                |
| pageConfirm | 输入框输入回车事件 | func   | -                |
