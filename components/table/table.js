
Component({
  externalClasses: ["table-class", "table-li-class", 'img-class'],

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

    publicImgUrl: {
      type: String,
    },
    themColor: {
      type: Object,
      value: null
    },

    maxHeight: {
      type: Number,
      value: -1,
    },
    scrollWidth: {
      type: Boolean,
      value: false,
    },
    type: {
      type: String,
      value: 'default',
    },
    showBorder: {
      type: Boolean,
      value: true
    },
    previewImage: {
      type: String,
      value: 'preview',
    }
    // sort: {
    //   type: String,
    //   value: 'init',
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {

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
    getChoose(e) {
      // console.log(e.currentTarget.dataset);
      let { index, item } = e.currentTarget.dataset;


      this.triggerEvent("checked", { item, index });
    },

    getButton(e) {
      let { item, itemmsg } = e.currentTarget.dataset;
      console.log("getButton:", item, itemmsg);
      this.triggerEvent("operation", { item, itemmsg });
    },

    getItem(e) {
      let { item } = e.currentTarget.dataset;
      console.log("getItem:", item);

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

    sortBy(e) {
      let { sort, key } = e.currentTarget.dataset, headData = this.data.headData;
      let currIndex = headData.findIndex((o, i) => { return o.key == key });

      // let preSort = headData[currIndex].sort
      // if (preSort == sort) {
      //   this.setData({
      //     [`headData[${currIndex}].sort`]: 'init'
      //   })
      // } else {
      //   this.setData({
      //     [`headData[${currIndex}].sort`]: sort
      //   })
      // }

      // console.log(sort, currIndex, key, headData);

      this.triggerEvent("sortBy", {
        sort,
        currIndex,
        key,
      })
    },
    getTime(e) {
      let { itemmsg, } = e.currentTarget.dataset;
      // console.log("getTime:", itemmsg)
      this.data.curItem = itemmsg
    },
    pickerChangeDate(e) {
      let { value } = e.detail
      let { curItem } = this.data;
      this.triggerEvent("pickerChangeDate", { curItem, value })
      // console.log("pickerChangeDate:", curItem,value)
    }
  },
});
