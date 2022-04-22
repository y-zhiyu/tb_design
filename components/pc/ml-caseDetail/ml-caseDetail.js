Component({
    /**
     * 组件的属性列表
     */
    properties: {
        publicImgUrl: {
            type: String,
            value: ''
        },

        caseStatus: {
            type: Boolean,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                // console.log('caseStatus-----', this.data.caseStatus)
            },
        },

        caseType: {
            type: String,
            value: '',
            observer: function (newVal, oldVal, changedPath) {
                console.log('caseType-----', this.data.caseType);
                let { caseType } = this.data;

                if (caseType == 'add') {
                    this.setData({
                        editStatus: true,
                        isEditShow: false
                    }, () => {
                        // this.setListEditArray();
                    })
                    this.getClearData();


                } else if (caseType == 'detail') {
                    console.log(this.data.caseItem);

                    // this.getContactDetail();
                }

                // this.getAddressSelect();
                // this.getCustomerSelect();
            },
        },
        caseId: {
            type: Number,
            value: ''
        },

        caseItem: {
            type: Object || String,
            value: ''

        }
    },


    /**
     * 组件的初始数据
     */
    data: {
        swiperList: [
            { imgUrl: `/img/pcPAlark/pic_case_banner1.png` },
            { imgUrl: `/img/pcPAlark/pic_case_banner2.png` },
            { imgUrl: `/img/pcPAlark/pic_case_banner3.png` },
            { imgUrl: `/img/pcPAlark/pic_case_banner4.png` },
            { imgUrl: `/img/pcPAlark/pic_case_banner5.png` },
            { imgUrl: `/img/pcPAlark/pic_case_banner6.jpg` },
            { imgUrl: `/img/pcPAlark/pic_case_banner7.png` },
            { imgUrl: `/img/pcPAlark/pic_case_banner8.jpg` },
        ],
        current: 0,
        picIndex: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 返回
        getBack() {
             let item = {
                type: 'case',
                backType: this.data.caseType
            }
            this.triggerEvent('back', {item});
        },

        getPic(e) {
            console.log(e);
            let { index } = e.currentTarget.dataset;

            this.setData({
                current: index,

            })

        },

        // 轮播图
        getNodeChange(e) {
            // console.log(e);
            let { type } = e.currentTarget.dataset;
            let { current, swiperList } = this.data;
            console.log('current=========', current, swiperList);

            if (type == "previousNode") {

                if (current <= 0) return;
                current = current - 1;

            } else if (type == "nextNode") {

                if (current >= swiperList.length - 1) return;
                current = current + 1;
            }

            this.setData({
                current: current
            })

        },

        currentChange(e) {
            // console.log(e);
            this.setData({
                current: e.detail.current
            })

        }
    }
})