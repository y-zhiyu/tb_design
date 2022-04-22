import { isChatShow } from "../../../utils/util.js"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        memberList: {
            type: Array,
            value: []
        },
        proBaseMsg: {
            type: Object,
            value: null,
            observer: function (newval, oldval) {
                this.getproBaseMsg(newval)
            }
        },
        publicImgUrl: {
            type: String,
            value: ''
        },
        workerName: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        editorMember() {
            this.triggerEvent('editorMember')
        },
        showCustomMsg(e) {
            // console.log(e);
            let { type } = e.currentTarget.dataset;
            if(type==1){
                type="customMsgToB"
            }
            if(type==2){
                type="customMsgToC"
            }

            this.triggerEvent('showCustomMsg', { type })

        },

        // 跳转指定群
        getEnterChat() {
            let _this = this;
            var openBefore = tt.getSystemInfoSync();
            console.log("openBefore：getSystemInfo:", openBefore);
            tt.enterChat({
                openChatId: _this.data.proBaseMsg.lark_chat_id,
                success(res) {
                    console.log(`enterChat 调用成功`, res);
                },
                fail(res) {
                    console.log(`enterChat 调用失败`, res);
                }
            });
            var openAfater = tt.getSystemInfoSync();
            console.log("openAfater：getSystemInfo:", openAfater);
        },

        // 侧边栏
        getToggleChat() {
            this.triggerEvent("getToggleChat")
        },

        // 链接跳转
        getOpenSchema() {
            tt.openSchema({
                schema: "https://applink.feishu.cn/client/chat/open?openChatId=oc_575e4e50c048a492455c6e4303a7ddaa",
                external: false,
                success(res) {
                    console.log(`${res}`);
                },
                fail(res) {
                    console.log(`open fail`);
                }
            });

        },


        // 获取消息
        getproBaseMsg(data) {
            let chat_id = data.lark_chat_id
            this.getFeishuChatGroup(chat_id)
        },
        getFeishuChatGroup(chat_id) {
            let _this = this;
            tt.getChatInfo(
                {
                    openChatId: chat_id,
                    chatType: 1,
                    success: (res) => {
                        // console.log("chatGroup:", res.data)
                        _this.setData({
                            chatGroupMsg: res.data
                        })
                    },
                    fail: res => {
                    }
                }
            )
        },
        click() {
            console.log("1111111")
            this.triggerEvent("getToggleChat")
        },
        setGroupGetMsg() {
            this.triggerEvent('setGroupGetMsg')
        },
        seeProDetail(){
            this.triggerEvent('seeProDetail')
        }

    }
})