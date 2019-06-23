import axios from 'axios'; //引入axios
import qs from 'qs'; //引入qs

// 引入本地存储分装
import local from '@/utils/local'
//设置请求默认服务器地址
axios.defaults.baseURL = 'http://127.0.0.1:888'

//请求拦截器
axios.interceptors.request.use(config => {
    //获取头肯
    let token = local.get('hhh_token')
    //给头部携带token
    config.headers.authorization = `Bearer ${token}`
    return config
})



//封装get
export default{
    get (url, params= {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params }) //使用axios
            .then(response => {
                resolve( response.data ) //成功
            })
            .catch(err => {
                reject( err ) //失败
            })
        })
    },


    //封装post
    post(url, params = {}) {
        return new Promise ((resolve, reject) => {
            axios.post(url, qs.stringify( params ))
            .then(response => {
                resolve( response.data )//成功
            })
            .catch(err => {
                reject(err) //失败
            })
        })
    }
}
