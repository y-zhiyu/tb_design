// 电话号码
const isMobile = phone => {
    let _reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    return _reg.test(phone);
}

// 限制:只允许中文输入
const isChina = (str) => {
    let reg = str.replace(/[^\u4E00-\u9FA5]/g, '');
    return reg;
}


// 不能输入中文
const isEnglish = (str) => {
    let reg = str.replace(/[\u4E00-\u9FA5]/g, '');
    return reg;
}

module.exports = {
    isMobile: isMobile,
    isChina: isChina,
    isEnglish: isEnglish
}