//引入accout.js
import req from '@/utils/request'


// 商品提交
export function goodsadd (params) {
    return req.post('/goods/goodsadd', params)
}

// 商品管理
export function goodslistBypage (params) {
    return req.get('/goods/goodslistBypage', params)
}

// 单条数据删除
export function singledataDelete(params) {
    return req.get('/goods/singledataDelete', params)
}

// 编辑按钮
export function goodsaddedeet(params) {
    return req.get('/goods/goodsaddedeet', params)
}

// 保存修改
export function saveedit(params) {
    return req.get('/goods/saveedit', params)
}

// 批量删除
export function goodsDelete(params) {
    return req.get('/goods/goodsDelete', params)
}


// 模糊查询
export function searchGoods(params) {
    return req.get('/goods/searchGoods', params)
}
