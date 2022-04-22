import { getProvince, getCity, getCounty, initCode, getValueObj } from "../../../utils/city.js";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showValue: {
            type: String,
            value: ''
        },
        areaCodeObj: {
            type: Object,
            value: null,
            observer: function (newVal, oldVal) {
                this.getInitArea(newVal)
            }
        }
    },
    ready() {

        this.setData({
            provinceList: getProvince(initCode)
        })

    },

    /**
     * 组件的初始数据
     */
    data: {
        noteArr: [
            { id: 0, title: '省' },
            { id: 1, title: '市' },
            { id: 2, title: '区/县' },
        ],
        noteIndex: 0,
        showAddressPanel: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getInitArea(codeObj) {
            console.log("getInitArea:", codeObj);

            let showValue = getValueObj({
                provinceCode: codeObj.provinceCode,
                cityCode: codeObj.cityCode,
                countyCode: codeObj.countyCode,
                connector: '、'
            })


            let provinceList = getProvince(initCode);
            let provinceIndex = provinceList.length > 0 && provinceList.findIndex((o, i) => { return o.id == codeObj.provinceCode });
            let cityList = [];
            let cityIndex = '';
            let countyList = [];
            let countyIndex = '';

            if (codeObj.provinceCode) {
                cityList = getCity(codeObj.provinceCode);
                cityIndex = cityList.length > 0 && cityList.findIndex((o, i) => { return o.id == codeObj.cityCode });
            }

            if (codeObj.cityCode) {
                countyList = getCounty(codeObj.cityCode);
                countyIndex = countyList.length > 0 && countyList.findIndex((o, i) => { return o.id == codeObj.countyCode });
            }

            // console.log("provinceIndex",provinceIndex,provinceList)
            this.setData({
                showValue,
                provinceIndex,
                cityIndex,
                countyIndex,
                provinceCode: codeObj.provinceCode,
                cityCode: codeObj.cityCode,
                countyCode: codeObj.countyCode,
                cityList,
                countyList
            })
        },
        selectTable(e) {
            let noteIndex = e.currentTarget.dataset.index;
            this.setData({
                noteIndex
            })
            // this.getFocus()
        },
        selectProvince(e) {
            let { index, item } = e.currentTarget.dataset;
            let noteIndex = this.data.noteIndex + 1
            let provinceCode = item.id
            this.data.showValue = '';
            // let showValue = this.data.showValue + item.value + '、'
            let showValue = this.data.provinceList[index].value + '、';

            this.setData({
                provinceIndex: index,
                noteIndex,
                showValue,
                provinceCode,
                cityCode: '',
                cityIndex: null,
                countyIndex: null,
                countyCode: '',
                cityList: [],
                countyList: []
            })
            this.getCityArray()
            //   this.getFocus()

            this.triggerEvent("getChange", {
                provinceCode: this.data.provinceCode,
                cityCode: "",
                countyCode: ""
            });

        },
        selectCity(e) {
            let { index, item } = e.currentTarget.dataset;
            let noteIndex = this.data.noteIndex + 1;
            let { provinceList, provinceIndex, cityList } = this.data;

            console.log('this.data.showValue', this.data.showValue);
            // let showValue = this.data.showValue + item.value + '、';
            let showValue = provinceList[provinceIndex].value + '、' + cityList[index].value + '、';

            let cityCode = item.id
            this.setData({
                cityIndex: index,
                noteIndex,
                showValue,
                cityCode,
                countyIndex: null,
                countyCode: '',
                countyList: []

            })
            console.log("selectProvince", this.data.provinceCode, this.data.cityCode, this.data.cityCode)
            this.getCountyList()
            //   this.getFocus()
            this.triggerEvent("getChange", {
                provinceCode: this.data.provinceCode,
                cityCode: this.data.cityCode,
                countyCode: ""
            })
        },
        selectCounty(e) {
            let { index, item } = e.currentTarget.dataset;
            let { provinceList, provinceIndex, cityList, cityIndex, countyList } = this.data;

            let noteIndex = 0
            // let showValue = this.data.showValue + item.value;
            let showValue = provinceList[provinceIndex].value + '、' + cityList[cityIndex].value + '、' + countyList[index].value;

            let countyCode = item.id
            this.setData({
                countyIndex: index,
                noteIndex,
                showValue,
                countyCode,
            })
            //   console.log("selectProvince",this.data.provinceCode,this.data.cityCode,this.data.countyCode)
            this.closeShowAddressPanel()
            this.triggerEvent("getChange", {
                provinceCode: this.data.provinceCode,
                cityCode: this.data.cityCode,
                countyCode: this.data.countyCode
            })
        },

        getCityArray() {
            let cityList = getCity(this.data.provinceCode)
            this.setData({
                cityList
            })
        },
        getCountyList() {
            let countyList = getCounty(this.data.cityCode)
            this.setData({
                countyList
            })
        },



        getToggleShow() {
            if (this.data.showAddressPanel) {
                this.closeShowAddressPanel()
            } else {
                this.openShowAddressPanel()
                this.data.provinceCode = ''
                this.data.cityCode = ''
                this.data.countyCode = -''
            }
        },
        openShowAddressPanel() {
            this.setData({
                showAddressPanel: true
            })
        },
        closeShowAddressPanel() {
            this.setData({
                showAddressPanel: false
            })
        },

    }
})