### common-json

```json
  "usingComponents": {
    "tt-input": "/bxjm-feishu/input/input"
    }
```

### 1、select

```html
<tt-select
  selectArray="{{selectArray}}"
  bindselect="getSelect"
  lable="项目负责人"
  necessary
/>
```

```js
selectArray: [
  {
    id: 0,
    value: "文字1",
    text: "备注1",
  },
  {
    id: 0,
    value: "文字2",
    text: "备注2",
  },
  {
    id: 0,
    value: "文字3",
    text: "备注3",
  },
];
```

> API

| 参数         | 说明                  | 类型    | 默认值 |
| ------------ | --------------------- | ------- | ------ |
| necessary    | 是否必填              | Boolean | false  |
| lable        | 标题                  | String  |        |
| imgUrl       | 图标路径              | String  |        |
| placeholder  | 默认值                | String  | 请选择 |
| value        | 初始化默认值,选中的值 | String  |        |
| selectArray  | 下拉框内容            | Array   |        |
| errorText    | 错误样式以及文案      | String  |        |
| box-class    | 最外层样式           |         |        |
| select-class | select 样式           |         |        |
| bindselect   | 下拉列表点击事件      | Fun     |        |

### 2、input

```html
<tt-input
  bindchange="onChange"
  lable="项目负责人"
  necessary
  value=""
  errorText="这是错误提示"
/>
```

> API

| 参数        | 说明                         | 类型    | 默认值 |
| ----------- | ---------------------------- | ------- | ------ |
| type        | type 类型                    | String  | text   |
| necessary   | 是否必填                     | Boolean | false  |
| lable       | 标题                         | String  |        |
| placeholder | 默认值                       | String  | 请输入 |
| value       | 输入的值                     | String  |        |
| errorText   | 错误样式以及文案             | String  |        |
| disabled    | 禁止态                      | Boolean  |  false   |
| box-class    | 最外层样式           |         |        |
| input-class | input 样式                   |         |        |
| bindinput   | 键盘输入时触发               | Fun     |        |
| bindfocus   | 输入框聚焦时触发             | Fun     |        |
| bindblur    | 输入框失去焦点时触发         | Fun     |        |
| bindconfirm | 用户点击键盘的完成按钮时触发 | Fun     |        |

### 3、modal

```html
<tt-modal show="{{show}}" title="成员管理" width="400" height="200"></tt-modal>
```

> API

| 参数         | 说明       | 类型    | 默认值 |
| ------------ | ---------- | ------- | ------ |
| show         | modal 显示 | Boolean | false  |
| title        | 标题       | String  |        |
| imgurl       | 路径       | String  |        |
| width        | modal 的宽 | String  | 640    |
| height       | modal 的高 | String  | 584    |
| mask         | 遮罩层显示 | Boolean | true   |
| publicImgUrl | img 域名   | String  |        |
| "<slot/>"    | 插槽       |         |        |
| bindclose    | 关闭按钮   | Fun     |        |


### 4、sildebar

```html
<tt-sildebar
  activeType="{{sidebarListActiveType}}"
  activeIndex="{{sidebarListActive}}"
  list="{{sidebarList}}"
  bindselectSildbar="selectSildbar"
></tt-sildebar>
```

> API

| 参数        | 说明 | 类型   | 默认值 |
| ----------- | ---- | ------ | ------ |
| activeType  | 必填 | String | ' '    |
| activeIndex | 必填 | Number | 0      |
| list        | 必填 | array  | null   |

```js
list: [
  {
    id: 0,
    title: "项目概况",
    type: "proOverview",
    imgSrc: `${imgUrl}/img/pcPAlark/pc_progk.png`,
  },
  {
    id: 1,
    title: "项目任务",
    type: "proTask",
    imgSrc: `${imgUrl}/img/pcPAlark/pc_proTask.png`,
  },
  {
    id: 2,
    title: "项目播报",
    type: "proBroadcast",
    imgSrc: `${imgUrl}/img/pcPAlark/pc_proBoradcase.png`,
  },
];
```

> methods

```js
selectSildbar(e) {
  console.log(e.detail)
  let {
    type,
    findIndex
  } = e.detail
  if (findIndex == 0 || findIndex) {
    this.setData({
      sidebarListActive: findIndex,
      sidebarListActiveType: type,
    })
  }
}
```
### 5、proTask 项目任务

```js
 "tt-proTask":"/components/common/proTask/proTask",
```
```html
 <tt-proTask header="{{headersList}}"  listData="{{tasklList}}"  bindselectList="selectList"></tt-proTask>
```

>API
```js
headersList:[
    { id:0,title:'任务名称', },
    { id:1,title:'开始时间', },
    { id:2,title:'结束时间', },
    { id:3,title:'持续时间', },
    { id:4,title:'状态', },
],
```
```js
 tasklList:[
{ 
id:0,
title:'客房部分水、电、设备改造、安装施工',
isShow:true,
list:[
        { 
          id:0,
          title:'1. 风机盘管及管路安装',
          startTime:'2021-10-21',
          endTime:'2021-10-26',
          useTime:8,
          status:1
        },
        { 
          id:1,
          title:'2. 风机盘管及管路安装',
          startTime:'2021-10-21',
          endTime:'2021-10-26',
          useTime:8,
          status:1
        },
    ] 
},
          }
```

>method

```js
  //选择项目任务
    selectList(e){
        console.log(e.detail)
    }

```

### 6 button


```html
 <tt-button  btnType="line" showText="完成任务" bindclick="finishedTask"></tt-button>
```

>API


| 参数        | 说明 | 类型   | 默认值 |
| ----------- | ---- | ------ | ------ |
| type        | 必填 | String | line,bg,group    |

>methods

```js
 getSubmit() {
            this.triggerEvent('submit')
        },

        getCancel() {
            this.triggerEvent('cancel');

        },
        click(){
            this.triggerEvent('click')
        }

```
