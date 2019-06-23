// 工具函数
// 验证密码的正则表达式
export function pwdReg(value) {
    // 正则规则
    const reg = /^[A-Za-z0-9]+$/;
    return reg.test( value )
}