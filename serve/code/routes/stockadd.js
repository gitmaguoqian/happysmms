var express = require('express');
var router = express.Router();


// 验证token开始
const expressJwt = require('express-jwt');
const secret = 'itsource';
router.use(expressJwt({
    secret
}).unless({
    path: ['/login/checklogin'] //除了这个地址，其他得都需要验证
}));
router.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('必须携带token')
    }
})



// 统一设置响应头解决跨域问题
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'authorization') //允许携带得头
    next() //放行
})


// 引入数据库连接模块
const connection = require('./js/conn')

router.get('/', (req, res) => {
    res.send('测试账号管理模块路由!')
})














module.exports = router;