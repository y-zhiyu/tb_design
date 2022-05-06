const doc = '### 代码展示\n\n```html\n<!-- 默认状态 -->\n<tb-table\n  headData="{{headData}}"\n  bodyData="{{bodyData}}"\n  bindoperation="getOperation"\n  bindchange="getChange"\n/>\n\n<!-- 可滚动 -->\n<tb-table headData="{{headData}}" bodyData="{{bodyData}}" maxHeight="200" />\n\n<!-- 可选择 -->\n<tb-table\n  headData="{{headData}}"\n  bodyData="{{bodyData}}"\n  choose="{{true}}"\n  bindallChoose="getAllChoose"\n  bindchoose="getChoose"\n/>\n<!-- 排序 -->\n<tb-table\n  headData="{{headData}}"\n  bodyData="{{bodyData}}"\n  showSort="{{true}}"\n  bindsort="getSort"\n/>\n\n```\n\n```js\n  headData: [\n      { title: \'交易编号\', key: \'number\' },\n      { title: \'订单时间\', key: \'time\', showSort: true, sort: \'ASC\' },\n      { title: \'交易类型\', key: \'type\' },\n      { title: \'金额\', key: \'amount\' },\n      { title: \'操作\', key: \'operation\' },\n  ],\n  bodyData: [\n      {\n          key: \'1\',\n          number: \'T00000001\',\n          time: \'2017-01-01 10:00\',\n          type: \'消费\',\n          amount: \'234\',\n          status: \'已完成\',\n          trClass: \'tr_lass\',\n          operation: [\n              {\n                  title: \'详情\',\n                  key: \'detail\',\n              },\n          ]\n      },\n      {\n          key: \'2\',\n          time: \'2017-01-01 10:00\',\n          number: \'T00000002\',\n          amount: \'986782\',\n          type: \'消费\',\n          status: \'审核中\',\n          operation: [\n              {\n                  title: \'详情\',\n                  key: \'detail\',\n              },\n          ]\n      },\n      {\n          key: \'3\',\n          status: \'审核中\',\n          number: \'T00000003\',\n          time: \'2017-01-01 10:00\',\n          type: \'充值\',\n          amount: \'64847889\',\n          trClass: \'table-3-test\',\n          operation: [\n              {\n                  title: \'详情\',\n                  key: \'detail\',\n              },\n              {\n                  title: \'删除\',\n                  key: \'delete\'\n              }\n          ]\n      },\n      {\n          key: \'4\',\n          number: \'T00000004\',\n          time: \'2017-01-01 10:00\',\n          type: \'消费\',\n          amount: \'78\',\n          status: \'已取消\',\n          operation: [\n              {\n                  title: \'详情\',\n                  key: \'detail\',\n              },\n              {\n                  title: \'删除\',\n                  key: \'delete\'\n              }\n          ]\n\n      },\n      {\n          key: \'5\',\n          number: \'T00000005\',\n          time: \'2017-01-01 10:00\',\n          type: \'充值\',\n          amount: \'4572\',\n          status: \'审核中\',\n          trClass: \'table-3-test\',\n          operation: [\n              {\n                  title: \'详情\',\n                  key: \'detail\',\n              },\n              {\n                  title: \'删除\',\n                  key: \'delete\'\n              }\n          ]\n      },\n      {\n          key: \'6\',\n          number: \'T00000006\',\n          time: \'2017-01-01 10:00\',\n          type: \'充值\',\n          amount: \'286\',\n          status: \'已完成\',\n          operation: [\n              {\n                  title: \'详情\',\n                  key: \'detail\',\n              },\n              {\n                  title: \'删除\',\n                  key: \'delete\'\n              }\n          ]\n      },\n  ]\n```\n\n### API\n\n| 属性      | 说明                     | 类型   | 默认值 |\n| --------- | ------------------------ | ------ | ------ |\n| headData  | thead ,obj:{title,key}   | Array  | -      |\n| bodyData  | tbody ,对应 thead 的 key | Array  | -      |\n| choose    | 是否可以选择             | bool   | false  |\n| maxHeight | 可滚动限制最大高度       | number | -1     |\n| showSort  | 是否显示排序             | bool   | false  |\n| change    | tbody 每条数据点击事件   | fun    | -      |\n| operation | 操作按钮点击事件         | fun    | -      |\n| choose    | 复选框-单选 按钮点击事件 | fun    | -      |\n| allChoose | 复选框-全选 点击事件     | fun    | -      |\n| sort      | 排序 点击事件            | fun    | -      |\n'
module.exports = doc
