
Component({
  externalClasses: ["table-class", "table-li-class", 'img-class', "tr_class"],

  /**
   * 组件的属性列表
   */
  properties: {
    headData: {
      type: Array,
    },

    bodyData: {
      type: Array,
    },

    choose: {
      type: Boolean,
      value: false,
    },

    maxHeight: {
      type: Number,
      value: -1,
    },
    scrollWidth: {
      type: Boolean,
      value: false,
    },
    showSort: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    checkedAll: false,
  },

  ready() {
    // console.log('thHeight=====',this.data.thHeight)
    // console.log('headData:headData', this.data.headData)
    // let currIndex = this.data.headData.findIndex((o, i) => { return o.showSort })
    // console.log("currIndex", currIndex);

    // if (currIndex > -1) {
    //   this.setData({
    //     [`headData[${currIndex}].sort`]: 'init'
    //   })
    // }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 操作
    getOperation(e) {
      let { item } = e.currentTarget.dataset;
      this.triggerEvent("operation", { item });
    },

    // tbody的每条数据事件
    getItem(e) {
      let { item } = e.currentTarget.dataset;
      this.triggerEvent("change", { item });
    },

    getImage(e) {
      let { imgurl } = e.currentTarget.dataset;
      console.log("getImage:", imgurl);

      tt.previewImage({
        urls: [imgurl],
        current: imgurl,
        success(res) {
          console.log(`previewImage 调用成功`);
        },
        fail(res) {
          console.log(`previewImage 调用失败`);
        },
      });
    },


    // 排序
    sortClick(e) {
      let { sort, key } = e.currentTarget.dataset;
      let { headData } = this.data;
      let currIndex = headData.findIndex((o, i) => { return o.key == key });
      let _sort = sort == 'ASC' ? 'DESC' : 'ASC';

      this.setData({
        [`headData[${currIndex}].sort`]: _sort
      })

      this.triggerEvent("sort", { sort: _sort })
    },

    // 复选框-全选
    getChangeAll(e) {
      let { checkedAll, bodyData } = this.data;

      bodyData && bodyData.length > 0 && bodyData.map((info, k) => {
        info.checked = !checkedAll;
      })

      this.setData({
        checkedAll: !checkedAll,
        bodyData: bodyData
      })

      this.triggerEvent("allChoose", { bodyData });
    },

    // 单选
    getChange(e) {
      let { index, item } = e.currentTarget.dataset;
      let { bodyData } = this.data;
      let count = 0;

      this.setData({
        [`bodyData[${index}].checked`]: !bodyData[index].checked,
      })

      bodyData && bodyData.length > 0 && bodyData.map((info, k) => {
        if (info.checked == true) {
          count++;
        }

        if (count == bodyData.length) {
          this.setData({
            checkedAll: true
          })
        }
      })

      if (!bodyData[index].checked) {
        this.setData({
          checkedAll: false
        })
      }

      this.triggerEvent("choose", { bodyData, index });
    }
  },
});
