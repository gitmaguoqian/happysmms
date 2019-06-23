//引入accout.js
import req from '@/utils/request'

// 登录
export function chenckLogin( params )  {
    return req.post('/login/chenckLogin', params)
}