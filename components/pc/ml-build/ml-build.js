Component({
    /**
     * 组件的属性列表
     */
    properties: {
        itemList: {
            type: Array,
            value: [],
            observer: function (newVal, oldVal, changedPath) {
                this.init();
            },
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        lineWidth: '',
        paddingTop: 2,
        paddingLeft: 2,
        paddingRight: 2,
        paddingButton: 2,
        divMargin: 2,
        sildebarWidth: 200,// 150
        detailRightWidth: 400,
        navHeight: 100,
        contentHeight: 184,
    },

    ready() {
        // this.setReverse().then((res) => {
        //     console.log('promise:res-----------', res);
        //     if (res) {
        // this.init();
        //     }
        // });

        // this.init();

    },

    /**
     * 组件的方法列表
     */
    methods: {

        init() {
            let _that = this;

            let _windowWidth = 0;
            let _windowHeight = 0;

            var res = tt.getSystemInfoSync();
            // console.log("getSystemInfo:", res);
            _windowWidth = res.windowWidth;
            _windowHeight = res.windowHeight;

            let maxFloor = this.getMaxLength();

            tt.onWindowResize(function (res) {
                // console.log(res.size);
                _windowWidth = res.size.windowWidth;
                _windowHeight = res.size.windowHeight;

                if (_windowWidth > 1390) {
                    _windowWidth = 1390;
                };
                if (_windowWidth < 1103) {
                    _windowWidth = 1103;
                };

                _that.setLineSize(_windowWidth, _windowHeight, maxFloor);

            });

            // console.log('_windowWidth,_windowHeight============', _windowWidth, _windowHeight);
            if (_windowWidth > 1390) {
                _windowWidth = 1390;
            };

            if (_windowWidth < 1103) {
                _windowWidth = 1103;
            };

            this.setLineSize(_windowWidth, _windowHeight, maxFloor);

        },

        // setWindowWidth() {
        //     if (_windowWidth > 1390) {
        //         _windowWidth = 1390;
        //     };

        //     if (_windowWidth < 1103) {
        //         _windowWidth = 1103;
        //     };
        // },

        setLineSize(_windowWidth, _windowHeight, maxFloor) {
            let { itemList,
                lineWidth,
                paddingTop,
                paddingLeft,
                paddingRight,
                paddingButton,
                divMargin,
                sildebarWidth,
                detailRightWidth,
                navHeight,
                contentHeight,
            } = this.data;

            let _divWidth = _windowWidth - sildebarWidth - detailRightWidth;
            let _divHeight = _windowHeight - navHeight - contentHeight;
            // console.log('_divWidth,_divHeight============', _divWidth, _divHeight);


            let _house = 0;
            itemList.map((item, index) => {
                let _floor = item.floor;
                // console.log('_floor=========', _floor)
                _floor.map((i, k) => {
                    if (k == 0) {
                        _house = _house + i.house.length;
                    }
                })

            });

            let _number = _house + (paddingLeft + paddingRight + divMargin * (itemList.length - 1));

            // console.log('_number------', _number, _house, itemList.length - 1);

            let _houseWidth = _divWidth / _number;
            let _houseHeight = _divHeight / maxFloor + paddingTop + paddingButton;

            // console.log('_houseWidth,_houseHeight---------', _houseWidth, _houseHeight);

            if (_houseWidth < _houseHeight) {
                lineWidth = _houseWidth.toFixed(1)

            } else {
                lineWidth = _houseHeight.toFixed(1);
            }

            // console.log('_number----------', _number)
            let minWidth = '';

            // 户宽-最小值
            if (lineWidth < 20) {
                lineWidth = 20;
                minWidth = 20 * _number;
            }

            // 户宽-最大值
            if (lineWidth > 40) {
                lineWidth = 40;
                minWidth = 40 * _number;
            }
            // console.log('_divWidth---------', _divWidth);
            // console.log('minWidth-------------', minWidth)

            this.setData({
                divWidth: _divWidth,
                lineWidth: lineWidth,
                minWidth: minWidth
            })
        },

        // 最大值
        getMaxLength() {
            let { itemList } = this.data;
            // console.log('itemList===========', itemList)
            var max = itemList[0].floor.length;
            for (var i = 1; i < itemList.lengt; i++) {
                if (itemList[i].floor.length > max) {
                    max = itemList[i].floor.length;
                }
            }
            // console.log('max---------', max);

            return max;
        },

        // 获取每户的详情信息
        getHouseItem(e) {
            let { item } = e.currentTarget.dataset;
            // console.log('item============', item);
            tt.showToast({
                title: "此户为" + item.house_key,
                duration: 2000,
                icon: "none",
            });
        },

        setReverse() {

            return new Promise((re, rj) => {

                let { itemList } = this.data;

                itemList.map((item, index) => {
                    let _floor = item.floor;
                    item.floor = _floor.reverse();
                });

                this.setData({
                    itemList: itemList
                })

                re(true);
            })
        }
    }
})