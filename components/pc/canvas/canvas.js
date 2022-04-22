Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canvasId: {
      type: String,
      value: ''
    },

    percent: {
      type: Number,
    },

    text: {
      type: String,
    },

    typeColor: {
      type: String, // default ongoing success
      value: ''
    },

    width: {
      type: Number,
      value: 37

    },
    height: {
      type: Number,
      value: 37
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animTime: 1000, // 动画执行时间
  },

  ready() {
    // console.log(this.data.canvasId, this.data.width, this.data.height)
    this.draw(this.data.canvasId, this.data.percent, this.data.animTime);
  },
  /**
 * 组件的方法列表
 */
  methods: {

    //   id----------------canvas画板id
    //   percent-----------进度条百分比
    //   time--------------画图动画执行的时间  
    draw(id, percent, animTime) {
      var _that = this;
      const ctx2 = wx.createCanvasContext(id);
      _that.setData({
        ctx2: ctx2,
      });
      var time = animTime / percent;
      var w = parseInt(_that.data.width / 2); //获取canvas宽的的一半
      var h = parseInt(_that.data.height / 2); //获取canvas高的一半，
      _that.drawProgressbg(id + 'bg', w, h);
      _that.drawProgress(0, percent, time, w, h);
    },

    // 底部圆
    drawProgressbg(id, w, h) {
      var _that = this;
      var ctx = wx.createCanvasContext(id); // 使用 wx.createContext 获取绘图上下文 context
      ctx.setLineWidth(3); // 设置圆环的宽度
      ctx.setStrokeStyle('#E0E0E0'); // 设置圆环的颜色
      ctx.setLineCap('round');// 设置圆环端点的形状
      ctx.beginPath();// 开始一个新的路径
      ctx.arc(w, h, w - 2, 0, 2 * Math.PI, false);// 设置一个原点(19,19)，半径为17的圆的路径到当前路径
      ctx.stroke();// 对当前路径进行描边

      // 文字
      let _typeColor = _that.data.typeColor;
      let _colorText = _typeColor == 'default' ? '#c3c3c3' : _typeColor == 'ongoing' ? '#D95C5C' : _typeColor == 'success' ? '#39C2FB' : '';
      ctx.setFontSize(11);
      ctx.setFillStyle(_colorText);
      ctx.setTextAlign("center");
      ctx.setTextBaseline("middle");
      ctx.fillText(_that.data.text, w, h);
      ctx.draw();// 开始绘制
    },


    /**
     * start 起始百分比
     * end 结束百分比
     * w,h 其实就是圆心横纵坐标
     */
    // 动画效果实现
    drawProgress(start, end, time, w, h) {
      var _that = this;
      start++;
      if (start > end) {
        return false;
      }
      _that.run(start, w, h);
      setTimeout(function () {
        _that.drawProgress(start, end, time, w, h);
      }, time);
    },

    // 绘制圆形进度条方法
    run(c, w, h) {
      let _that = this;
      let _typeColor = _that.data.typeColor;
      let _colorBg = _typeColor == 'default' ? '#E0E0E0' : _typeColor == 'ongoing' ? '#D95C5C' : _typeColor == 'success' ? '#009CD8' : '';
      // var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI; // 顺时针 sAngle= -0.5* Math.PI
      var num = (1.5 * Math.PI) - (c / 100) * 2 * Math.PI; //  逆时针 sAngle= 1.5* Math.PI

      //圆环的绘制
      _that.data.ctx2.arc(w, h, w - 2, 1.5 * Math.PI, num, true); // 每个间隔绘制的弧度
      _that.data.ctx2.setStrokeStyle(_colorBg);// 圆环线条的颜色
      _that.data.ctx2.setLineWidth(3);// 圆环的粗细
      _that.data.ctx2.setLineCap("round");// 圆环结束断点的样式  butt为平直边缘 round为圆形线帽  square为正方形线帽
      _that.data.ctx2.stroke();
      _that.data.ctx2.beginPath();
      _that.data.ctx2.draw();
    },
  }
})