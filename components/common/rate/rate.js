Component({
  externalClasses: ['item-class', 'rate-img-class'],

  /**
   * 组件的属性列表
   */
  properties: {
    publicImgUrl: {
      value: '',
      type: String
    },

    starCount: {
      type: Number,
      value: 0,
    },

    // 总数
    count: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal, changedPath) {
        // console.log('count', this.data.count);

        if (this.data.count > 0) {
          let _count = [];
          for (let i = 0; i < this.data.count; i++) {
            _count.push(i);
          };

          // console.log('_count===========', _count)
          this.setData({
            countTotal: _count
          })
        }
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
  },

  ready() {
    // console.log('count', this.data.count);


  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindChange: function (e) {
      let index = parseFloat(e.currentTarget.dataset.index) + 1;
      let { isShow } = this.data;

      if (index == 1) {
        if (isShow) {
          index = 0;
        };

        this.setData({
          isShow: !isShow
        })
      } else {
        this.setData({
          isShow: false
        })
      }

      this.triggerEvent('change', {
        value: index
      });
    }
  }
});