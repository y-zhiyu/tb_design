const getMenuList = (data) => {
    let menuList = [
        { label: 'Button', labelCn: "按钮", type: 'button' },
        { label: 'Menu', labelCn: "菜单", type: 'menu' },
        { label: 'Icon', labelCn: "图标", type: 'icon' },
        { label: 'Modal', labelCn: "对话框", type: 'modal' },
        { label: 'Pagination', labelCn: "分页", type: 'pagination' },
        { label: 'List', labelCn: "列表", type: 'list' },
        { label: 'Input', labelCn: "输入框", type: 'input' },
        { label: 'Textarea', labelCn: "多行文本框", type: 'textarea' },
        { label: 'Serach', labelCn: "搜索", type: 'serach' },
        { label: 'Select', labelCn: "选择器", type: 'select' },
        { label: 'Radio', labelCn: "单选框", type: 'radio' },
        { label: 'CheckBox', labelCn: "多选框", type: 'checkBox' },
        { label: 'Loading', labelCn: "加载", type: 'loading' },
        { label: 'Table', labelCn: "表格", type: 'table' },
        { label: 'Toast', labelCn: "提示", type: 'toast' },
        { label: 'Popup', labelCn: "消息提示", type: 'popup' },
        { label: 'DatePicker', labelCn: "日期选择器", type: 'datePicker' },
    ];
    let pageCurrentPage = getCurrentPages()[getCurrentPages().length - 1];

    pageCurrentPage.setData({
        menuList: menuList,
        selectedType: data.type
    })
    
    tt.setNavigationBarTitle({ "title": data.type, });
}

module.exports = {
    getMenuList,
}