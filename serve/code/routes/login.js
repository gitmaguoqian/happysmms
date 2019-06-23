var express = require('express');
var router = express.Router();

// 统一设置请求头跨域问题
router.all("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
    next() //放行
})


/*--- 验证token --- 开始 */ 
const expressJwt = require('express-jwt');
const secret = 'itsource';
router.use(expressJwt ({
    secret 
}).unless({
    path: ['/login/chenckLogin']  //除了这些地址，其他的URL都需要验证
}));
router.use(function (err, req, res, next) {
    //当token验证失败时会抛出如下错误
    if (err.name === 'UnauthorizedError') {   
        //这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
        res.status(401).send('invalid token...');
    }
})
/*--- 验证token -- 结束 ---*/ 




// 引入连接数据库模块
const connection = require('./js/conn')

//1 引入toke
const jwt = require('jsonwebtoken');


//登录功能
router.post('/chenckLogin', (req, res) => {
   //接受参数
   let { account, password} =req.body;
   //准备sql
   const sqlstr =`select * from account where account='${ account }' and password ='${ password }'`;
//    console.log(sqlstr);
   
   //执行sql
   connection.query(sqlstr, (err, data) => {
       if (err) throw err;
       //判断
       if (data.length) {
           //3生成用tocken
            const token = jwt.sign(Object.assign({},  data[0]), secret, {
                expiresIn: 60 * 60 *2 //过期时间
            })
            // console.log(token);
           //成功
           res.send({ code:0, reason:'欢迎你，登录成功', token})
       } else {
           res.send({code:1, reason:'请检查用户名或密码'})
       }

   }) 

   
})




module.exports = router;