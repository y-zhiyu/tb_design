Component({
  /**
   * 组件的属性列表
   */
  properties: {
    allTotal: {
      type: Number,
      value: 1,
    },
    total: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal, changedPath) {
        // console.log("total========", this.data.total);
        this.totalToArr();
      },
    },
    themColor: {
      type: Object,
      value: null,
    },
    current: {
      type: Number,
      value: 1,
      observer: function (newVal, oldVal, changedPath) {
        this.totalToArr();
      },
    },

    navigation: {
      type: Number,
      value: 1,
    },

    pageSize: {
      type: Number,
      value: 10,
      observer: function (newVal, oldVal, changedPath) {
        this.changPageSize(newVal);
      },
    },

    pageNumber: {
      type: Number,
      value: 1,
      observer: function (newVal, oldVal, changedPath) {
        this.changPageNumber(newVal);
      },
    },

    publicImgUrl: {
      type: String,
      value: "",
    },
  },
  ready() {
    // this.totalToArr();
  },

  /**
   * 组件的初始数据
   */
  data: {
    paginationArr: [10, 20, 30, 40, 50],
    paginationArrIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //changPageNumber
    changPageNumber(pageNumber) {
      this.setData({
        pageNumber,
      });
    },
    //changPageSize
    changPageSize(newVal) {
      let paginationArrIndex = this.data.paginationArr.findIndex((o, i) => {
        return o == newVal;
      });
      this.setData({
        paginationArrIndex,
      });
    },
    bindPickerChange: function (e) {
      console.log("picker发送选择改变，携带值为", e.detail);
      let paginationArr = this.data.paginationArr;

      this.setData({
        paginationArrIndex: e.detail.value,
      });
      let pageSize = paginationArr[e.detail.value];

      this.triggerEvent("pageSize", { pageSize });
    },
    getoPageNum(e) {
      let pageNumber = e.detail.value;
      pageNumber = parseInt(pageNumber);
      // console.log(pageNumber);

      // this.setData({
      //   pageNumber,
      // });
      // this.triggerEvent("pageInput", { pageNumber });
    },
    getconfirm(e) {
      let pageNumber = e.detail.value;
      this.triggerEvent("getconfirm", { pageNumber });
    },

    onChange(e) {
      console.log("e=======", e.currentTarget.dataset);

      let { current } = e.currentTarget.dataset;
      let { total } = this.data;
      if (current == 0) return;
      this.triggerEvent("change", { current });
    },

    onChangeNode(e) {
      let { node } = e.currentTarget.dataset;
      let { current, total } = this.data;
      // console.log("current, total====", current, total);

      if (node == "previousNode") {
        current = current - 1;
      } else if (node == "nextNode") {
        current = current + 1;
      }

      this.triggerEvent("change", { current });
    },

    totalToArr() {
      let { current, total } = this.data;
      // console.log("current, total====", current, total);
      let arr = [];

      if (total <= 5) {
        for (let i = 1; i < total + 1; i++) {
          arr.push(i);
        }
      } else {
        if (current < 3) {
          arr = [1, 2, 0, total - 1, total];
        } else if (total - current < 3) {
          arr = [1, 0, total - 2, total - 1, total];
        } else {
          arr = [1, 0, current - 1, current, current + 1, 0, total];
        }
      }
      // console.log('arr------', arr);

      this.setData({
        totalArray: arr,
      });
    },
  },
});
