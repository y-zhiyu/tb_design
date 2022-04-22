Component({
  externalClasses: ["box-class", "lable-class", "select-class", "opation_style"],
  /**
   * 组件的属性列表
   */
  properties: {
    selectArray: {
      type: Array,
      observer: function (newVal, oldVal, changedPath) {
        if (this.data.isSearch) {
          this.getInitArray();
        };
      },
    },
    necessary: {
      type: Boolean,
      value: false,
    },
    lable: {
      type: String,
      value: "",
    },
    imgUrl: {
      type: String,
      value: "",
    },
    placeholder: {
      type: String,
      value: "请选择",
    },
    errorText: {
      type: String,
      value: "",
    },
    isOpation: {
      type: Boolean,
      value: false,
    },
    opationText: {
      type: String,
      value: "操作内容",
    },
    isSearchOpaction: {
      type: Boolean,
      value: false,
    },
    isSearchOpactionText: {
      type: String,
      value: "操作内容",
    },


    isSearch: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changedPath) {
      },

    },

    value: {
      type: String,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        // console.log('newVal-----------', newVal);
        // console.log('oldVal-----------', oldVal);
      },
    },

    selectedId: {
      type: String || Number,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        // console.log('selectedId----newVal', newVal);
        // console.log('selectedId----oldVal', oldVal);

        this.getInit();
      },
    },
    disabled: {
      type: Boolean,
      value: false
    },

    labeType: {
      type: String,
      value: "",
    },

    emptyStatus: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false,
    animationData: {},
    focus: false,
    isSelect: true,
    newSelectArray: [],
    searchSelectArray: []
  },

  ready() {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getInit() {
      let { selectedId, selectArray, value, searchSelectArray } = this.data;

      selectArray.map((item, index) => {
        let _value = "";

        if (item.id == selectedId) {
          item.selected = true;
          // _value = item.value ? item.value : "";
        } else {
          item.selected = false;
        }
      });
      searchSelectArray.map((item, index) => {
        let _value = "";

        if (item.id == selectedId) {
          item.selected = true;
          // _value = item.value ? item.value : "";
        } else {
          item.selected = false;
        }
      });


      this.setData({
        selectArray: selectArray,
        searchSelectArray: searchSelectArray
      });

      // console.log('init------searchSelectArray-----------', this.data.searchSelectArray);
    },

    // 拷贝数组
    getInitArray() {
      let { selectArray } = this.data;
      let _newSelectArray = [];
      _newSelectArray = JSON.parse(JSON.stringify(selectArray));

      this.setData({
        newSelectArray: _newSelectArray,
        searchSelectArray: _newSelectArray,
      });
    },

    //option的显示与否
    selectTap: function (e) {
      if (this.data.disabled) return;

      let _labetype = e.currentTarget.dataset.labetype;
      let { selectShow, focus, emptyStatus } = this.data;

      console.log('_labetype--------------------', _labetype, emptyStatus);


      if (emptyStatus && _labetype == 'ac_contact_id') {
        this.triggerEvent('empty');
        
      } else {

        this.setAnimation(selectShow);

        this.setData({
          selectShow: !selectShow,
          focus: !focus,
          isSelect: true,
        });
      }
    },

    //创建动画
    setAnimation(selectShow) {
      // console.log('selectShow', selectShow);


      let animation = wx.createAnimation({
        timingFunction: "ease",
      });
      this.animation = animation;

      if (selectShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export(),
        });
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export(),
        });
      }

    },

    //设置内容
    setText: function (e) {
      let nowArr = this.data.selectArray;
      let item = e.currentTarget.dataset.item;
      let nowIdx = e.currentTarget.dataset.index;
      let value = nowArr[nowIdx].value;

      this.animation.rotate(0).step();

      nowArr.map((nodes, k) => {
        if (k == nowIdx) {
          nodes.selected = true;
        } else {
          nodes.selected = false;
        }
      });
      // console.log('聚焦-----searchSelectArray', this.data.searchSelectArray)
      // console.log('nowArr======', nowArr)
      this.setData({
        selectArray: nowArr,
        searchSelectArray: nowArr,
        selectShow: false,
        // value: value,
        // placeholder: '',
        animationData: this.animation.export(),
      });
      this.triggerEvent("change", {
        item,
      });
    },

    // 失去焦点
    getOnBlur() {
      // console.log('this.data.selectShow------', this.data.selectShow);
      let { isSelect, selectShow, focus } = this.data;
      if (isSelect) {
        this.setData({
          focus: true,
          selectShow: selectShow,
          isSelect: false,
        });
      } else {
        this.setData({
          focus: false,
          selectShow: false,
          isSelect: false,
        });
      }
    },

    // input 框事件
    onChange(e) {

      if (this.data.disabled) return;
      console.log('input------', e);

      let { newSelectArray } = this.data;
      let value = e.detail.value;

      let _newarray = [];

      for (let i = 0; i < newSelectArray.length; i++) {

        if (newSelectArray[i].value.indexOf(value) >= 0) {
          _newarray.push(newSelectArray[i]);
        }
      };
      console.log('_newarray', _newarray);


      this.setData({
        searchSelectArray: _newarray,
        selectShow: true
      }, () => {
        console.log('searchSelectArray===========', this.data.searchSelectArray);

      });

      this.triggerEvent('inputChange', {
        value
      })
    },

    selectInputTap() {
      if (this.data.disabled) return;

      this.setAnimation(this.data.selectShow);
      this.setData({
        inputFocus: true,
        selectShow: true
      })

    },


    onFocus(e) {
      // console.log('聚焦---------');

      // let value = e.detail.value;
      // this.setAnimation(this.data.selectShow);

      // this.setData({
      //   // searchSelectArray: this.data.newSelectArray,
      //   selectShow: true
      // })

      // this.triggerEvent('focus', {
      //   value
      // })

    },

    onBlur(e) {
      // console.log('失焦---------');

      this.setData({
        selectShow: false
      })

      let value = e.detail.value;

      this.triggerEvent('blur', {
        value
      });

    },

    onConfim(e) {
      let value = e.detail.value;
      this.triggerEvent('confim', {
        value
      })
    },

    selectOpation(e) {
      this.triggerEvent("selectOpation")
      this.closeSelectShow()
    },
    selectSearchOpation(e) {
      this.triggerEvent("selectSearchOpation")
      this.closeSelectShow()
    },

    closeSelectShow() {
      this.setData({
        selectShow: false,
      })
    }
  },
});
