const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        article: {},
        headData: [
            { title: '交易编号', key: 'number' },
            { title: '订单时间', key: 'time', showSort: true, sort: 'ASC' },
            { title: '交易类型', key: 'type' },
            { title: '金额', key: 'amount' },
            { title: '操作', key: 'operation' },
        ],
        bodyData: [
            {
                key: '1',
                number: 'T00000001',
                time: '2017-01-01 10:00',
                type: '消费',
                amount: '234',
                status: '已完成',
                trClass: 'tr_lass',
                operation: [
                    {
                        title: '详情',
                        key: 'detail',
                    },
                ]
            },
            {
                key: '2',
                time: '2017-01-01 10:00',
                number: 'T00000002',
                amount: '986782',
                type: '消费',
                status: '审核中',
                operation: [
                    {
                        title: '详情',
                        key: 'detail',
                        operClass: 'frog-operClass'
                    },
                ]
            },
            {
                key: '3',
                status: '审核中',
                number: 'T00000003',
                time: '2017-01-01 10:00',
                type: '充值',
                amount: '64847889',
                trClass: 'table-3-test',
                operation: [
                    {
                        title: '详情',
                        key: 'detail',
                    },
                    {
                        title: '删除',
                        key: 'delete'
                    }
                ]
            },
            {
                key: '4',
                number: 'T00000004',
                time: '2017-01-01 10:00',
                type: '消费',
                amount: '78',
                status: '已取消',
                operation: [
                    {
                        title: '详情',
                        key: 'detail',
                    },
                    {
                        title: '删除',
                        key: 'delete'
                    }
                ]

            },
            {
                key: '5',
                number: 'T00000005',
                time: '2017-01-01 10:00',
                type: '充值',
                amount: '4572',
                status: '审核中',
                trClass: 'table-3-test',
                operation: [
                    {
                        title: '详情',
                        key: 'detail',
                        operClass: 'frog-operClass'
                    },
                    {
                        title: '删除',
                        key: 'delete'
                    }
                ]
            },
            {
                key: '6',
                number: 'T00000006',
                time: '2017-01-01 10:00',
                type: '充值',
                amount: '286',
                status: '已完成',
                operation: [
                    {
                        title: '详情',
                        key: 'detail',
                    },
                    {
                        title: '删除',
                        key: 'delete'
                    }
                ]
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let source = require('./md/doc.js');
        let article = app.towxml(source, 'markdown');

        this.setData({
            article: article
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    getChange(e) {
        console.log(e.detail);

    },

    getOperation(e) {
        console.log(e.detail);

    },

    getAllChoose(e) {
        console.log(e.detail);

    },

    getChoose(e) {
        console.log(e.detail);

    },

    getSort(e) {
        console.log(e.detail);

    }

})