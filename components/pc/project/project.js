const app = getApp();
import { showToast } from '../../../utils/interactive'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    publicImgUrl: {
      type: String,
      value: ''
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached() {
    // console.log('list-----',this.data.list);

  },


  /**
   * 组件的方法列表
   */
  methods: {
    moveToProjectModule: function (e) {
      let { index,id,item,bnum} = e.currentTarget.dataset
      this.triggerEvent("moveToProjectModule", { index, id, bnum,item })
    },
    proAction(e) {
      let { type, item,count}  = e.currentTarget.dataset
      // console.log(type,item)
      if (count > 0) {
        this.triggerEvent("proAction", { type, item })
      } else {
        if (type == "designdata") {
          showToast({ msg: '当前项目文件为空' })
        }
        if (type == "proMaterial") {
          showToast({ msg: '当前物料进场单为空' })
        }
        if (type == "proOverview") {
          showToast({ msg: '当前施工团队为空' })
        }
      }

    }
  }
})