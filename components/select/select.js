Component({
  externalClasses: ["box-class", "lable-class", "select-class", "opation_style", "option_class"],

  options: {
    styleIsolation: 'shared',
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 属性名称转换, 如果不是 { id: '', value:'' } 格式，则转为 { id: '', value:'' } 格式
    selectKey: {
      type: String,
      value: 'id',
      observer: function (newVal, oldVal, changedPath) {
        this.getNewArray();
      },
    },

    selectText: {
      type: String,
      value: 'value'
    },

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
    },


  },

  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false,
    animationData: {},
    isSelect: true,
    newSelectArray: [],
    searchSelectArray: [],
    inputValue: "",
    inputFocus: false,
    focus: false,
  },

  ready() {
  },
  /**
   * 组件的方法列表
   */
  methods: {

    getNewArray() {
      let { selectKey, selectText, selectArray } = this.data;

      let result = []
      if (selectKey !== 'id' || selectText !== 'value') {
        for (let item of selectArray) {
          let { [selectKey]: id, [selectText]: value, selected } = item;

          result.push({ id, value, selected })
        }
      };

      // console.log('result', result);

      this.setData({
        selectArray: result
      }, () => {
        this.getInit();
      })
    },


    getInit() {
      let { value, selectArray, searchSelectArray } = this.data;

      selectArray.map((item, index) => {

        if (item.value == value) {
          item.selected = true;

        } else {
          item.selected = false;
        }
      });

      searchSelectArray.map((item, index) => {

        if (item.value == value) {
          item.selected = true;
        } else {

          item.selected = false;
        }
      });

      this.setData({
        selectArray: selectArray,
        searchSelectArray: searchSelectArray
      });

      console.log('init------selectArray-----------', this.data.selectArray);
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
      let { selectShow, focus, isSelect } = this.data;

      console.log('点击select框focus---------', focus);

      this.setAnimation(selectShow);

      this.setData({
        selectShow: !selectShow,
        focus: !selectShow,
        isSelect: isSelect,
      }, () => {
        console.log("select框点击------selectShow, focus", this.data.selectShow, this.data.focus)

      });
    },

    //创建动画
    setAnimation(selectShow) {
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
        focus: false,
        animationData: this.animation.export(),
      });
      this.triggerEvent("change", {
        item,
      });
    },


    // input 框事件
    onChange(e) {
      if (this.data.disabled) return;
      let { newSelectArray, selectArray } = this.data;
      let value = e.detail.value;
      let _newarray = [];
      console.log('value----------', value);
      console.log('selectArray--------', selectArray)

      for (let i = 0; i < selectArray.length; i++) {

        if (selectArray[i].value.indexOf(value) >= 0) {
          _newarray.push(selectArray[i]);
        }
      };
      console.log('_newarray', _newarray);


      this.setData({
        searchSelectArray: _newarray,
        selectShow: true,
        inputValue: value,
      }, () => {
        console.log('searchSelectArray===========', this.data.searchSelectArray);
      });
    },

    onBlur(e) {
      console.log('搜索------onBlur', this.data.selectShow)
      // this.setData({
      //   selectShow: false
      // })
    },

    onFocus(e) {
      console.log('搜索------onFocus', this.data.selectShow)

      this.setData({
        selectShow: true,
        // inputFocus: true,
      });

    },

    onConfim(e) {

    },

    // 失去焦点
    getOnBlur() {
      let { isSelect, selectShow, focus } = this.data;

      console.log('失去焦点:this.data.selectShow------', this.data.selectShow, this.data.isSelect, this.data.focus);

      // this.setData({
      //   focus: false,
      //   selectShow: false,
      //   isSelect: false,
      // })

    },

  },

});
