//引入accout.js
import req from '@/utils/request'

//账号添加
export function accountAdd( params ) {
    return req.post('/account/accountadd', params)
}

// 批量删除
export function batchDelete(params) {
    return req.get('/account/batchDelete', params)
}

// 编辑
export function accountedeet(params) {
    return req.get('/account/accountedeet', params)
}

// 保存修改用户名
export function saveedit(params) {
    return req.post('/account/saveedit', params)
}

// 单条删除
export function accountdel(params) {
    return req.get('/account/accountdel', params)
}

// 分页请求
export function getDataByPage(params) {
    return req.get('/account/getDataByPage', params)
}


// 获取旧密码请求
export function checkoldpass(params) {
    return req.post('/account/checkoldpass',params)
}
//修改密码
export function passwordModify(params) {
    return req.post('/account/passwordModify', params)
}

// 用户名字上传
export function getInfo() {
    return req.get('/account/getInfo')
}

// 用户管理权限
export function getRole() {
    return req.post('/account/role')
}