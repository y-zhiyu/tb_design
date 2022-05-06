### 代码展示

```html
<!-- 默认状态 -->
<tb-table
  headData="{{headData}}"
  bodyData="{{bodyData}}"
  bindoperation="getOperation"
  bindchange="getChange"
/>

<!-- 可滚动 -->
<tb-table headData="{{headData}}" bodyData="{{bodyData}}" maxHeight="200" />

<!-- 可选择 -->
<tb-table
  headData="{{headData}}"
  bodyData="{{bodyData}}"
  choose="{{true}}"
  bindallChoose="getAllChoose"
  bindchoose="getChoose"
/>
<!-- 排序 -->
<tb-table
  headData="{{headData}}"
  bodyData="{{bodyData}}"
  showSort="{{true}}"
  bindsort="getSort"
/>

```

```js
  headData: [
      { title: '交易编号', key: 'number' },
      { title: '订单时间', key: 'time', showSort: true, sort: 'ASC' },
      { title: '交易类型', key: 'type' },
      { title: '金额', key: 'amount' },
      { title: '操作', key: 'operation' },
  ],
  bodyData: [
      {
          key: '1',
          number: 'T00000001',
          time: '2017-01-01 10:00',
          type: '消费',
          amount: '234',
          status: '已完成',
          trClass: 'tr_lass',
          operation: [
              {
                  title: '详情',
                  key: 'detail',
              },
          ]
      },
      {
          key: '2',
          time: '2017-01-01 10:00',
          number: 'T00000002',
          amount: '986782',
          type: '消费',
          status: '审核中',
          operation: [
              {
                  title: '详情',
                  key: 'detail',
              },
          ]
      },
      {
          key: '3',
          status: '审核中',
          number: 'T00000003',
          time: '2017-01-01 10:00',
          type: '充值',
          amount: '64847889',
          trClass: 'table-3-test',
          operation: [
              {
                  title: '详情',
                  key: 'detail',
              },
              {
                  title: '删除',
                  key: 'delete'
              }
          ]
      },
      {
          key: '4',
          number: 'T00000004',
          time: '2017-01-01 10:00',
          type: '消费',
          amount: '78',
          status: '已取消',
          operation: [
              {
                  title: '详情',
                  key: 'detail',
              },
              {
                  title: '删除',
                  key: 'delete'
              }
          ]

      },
      {
          key: '5',
          number: 'T00000005',
          time: '2017-01-01 10:00',
          type: '充值',
          amount: '4572',
          status: '审核中',
          trClass: 'table-3-test',
          operation: [
              {
                  title: '详情',
                  key: 'detail',
              },
              {
                  title: '删除',
                  key: 'delete'
              }
          ]
      },
      {
          key: '6',
          number: 'T00000006',
          time: '2017-01-01 10:00',
          type: '充值',
          amount: '286',
          status: '已完成',
          operation: [
              {
                  title: '详情',
                  key: 'detail',
              },
              {
                  title: '删除',
                  key: 'delete'
              }
          ]
      },
  ]
```

### API

| 属性      | 说明                     | 类型   | 默认值 |
| --------- | ------------------------ | ------ | ------ |
| headData  | thead ,obj:{title,key}   | Array  | -      |
| bodyData  | tbody ,对应 thead 的 key | Array  | -      |
| choose    | 是否可以选择             | bool   | false  |
| maxHeight | 可滚动限制最大高度       | number | -1     |
| showSort  | 是否显示排序             | bool   | false  |
| change    | tbody 每条数据点击事件   | fun    | -      |
| operation | 操作按钮点击事件         | fun    | -      |
| choose    | 复选框-单选 按钮点击事件 | fun    | -      |
| allChoose | 复选框-全选 点击事件     | fun    | -      |
| sort      | 排序 点击事件            | fun    | -      |
