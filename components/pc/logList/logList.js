Component({
        externalClasses: ['project_l'],

    /**
     * 组件的属性列表
     */
    properties: {
        avatarUrl:{
            type:String,
            value:''
        },
        operationName:{
             type:String,
            value:''
        },
         operationType:{
            type:String,
            value:'common'
        },
         operationTime:{
            type:String,
            value:''
        },
         operationTitle:{
            type:String,
            value:''
        },
         operationConent:{
            type:String,
            value:''
        },
        
       
    },
    
    /**
     * 组件的初始数据
     */
    data: {
        proLogList: [
                {
                    "type_name": "设置相关负责人",
                    "created_at": "2021-11-29 15:39:37",
                    "prj_log_id": 1345,
                    "log_type_id": 6,
                    "operator_by": 59,
                    "operator_type": 3,
                    "wx_avatar_url": "https://wework.qpic.cn/bizmail/VWrH9LGDaG88ibGemcdviazkMc0KoX7QgjtGKFKgylcEgaJgJyRIN3Qw/100",
                    "operator_by_name": "王燕妮",
                    "operator_content": "[{\"to\": null, \"from\": null, \"to_id\": \"0\", \"from_id\": 0, \"type_id\": 2, \"type_name\": \"设计负责人\"}, {\"to\": null, \"from\": null, \"to_id\": \"0\", \"from_id\": 0, \"type_id\": 5, \"type_name\": \"成本负责人\"}, {\"to\": null, \"from\": null, \"to_id\": \"0\", \"from_id\": 0, \"type_id\": 3, \"type_name\": \"采购负责人\"}, {\"to\": null, \"from\": null, \"to_id\": \"0\", \"from_id\": 0, \"type_id\": 6, \"type_name\": \"项目监理\"}, {\"to\": \"刘组织\", \"from\": null, \"to_id\": \"133\", \"from_id\": 0, \"type_id\": 4, \"type_name\": \"工长\"}]",
                    "beautiful_operator_content": "设计负责人: 无成本负责人: 无采购负责人: 无项目监理: 无工长负责人: 无 -> 刘组织"
                },
                {
                    "type_name": "新建项目",
                    "created_at": "2021-11-29 15:39:01",
                    "prj_log_id": 1344,
                    "log_type_id": 1,
                    "operator_by": 59,
                    "operator_type": 3,
                    "wx_avatar_url": "https://wework.qpic.cn/bizmail/VWrH9LGDaG88ibGemcdviazkMc0KoX7QgjtGKFKgylcEgaJgJyRIN3Qw/100",
                    "operator_by_name": "王燕妮",
                    "operator_content": "{\"name\": \"11.29刘知予节点测试\"}",
                    "beautiful_operator_content": "11.29刘知予节点测试"
                }
            ],
    },
    
    /**
     * 组件的方法列表
     */
    methods: {
    
    }
})