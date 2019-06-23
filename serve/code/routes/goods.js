var express = require('express');
var router = express.Router();




// 统一设置响应头解决跨域问题
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
    next() //放行
})

// 验证token开始
const expressJwt = require('express-jwt');
const secret = 'itsource';
router.use(expressJwt ({
    secret 
}).unless({
    path: ['/login/checklogin']  //除了这些地址，其他的URL都需要验证
}));
router.use(function (err, req, res, next) {
    //当token验证失败时会抛出如下错误
    if (err.name === 'UnauthorizedError') {   
        //这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
        res.status(401).send('invalid token...');
    }
})
/*--- 验证token -- 结束 ---*/ 

// 引入数据库连接模块
const connection = require('./js/conn')

// 商品添加
router.post('/goodsadd', (req, res) => {
    //后端接受数据
    let {region, barCode, name, price, market, purchasing, quantity, weight, unit, discounts, promotion, textarea} = req.body;
    //准备sql
    const sqlstr = `insert into goods(region, barCode, name, price, market, purchasing, quantity, weight, unit, discounts, promotion, textarea) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const sqlparams = [region, barCode, name, price, market, purchasing, quantity, weight, unit, discounts, promotion, textarea];
    //执行sql
    connection.query(sqlstr, sqlparams, (err, data) => {
        if (err) throw err;
        // console.log(data);
        //判断
        if (data.affectedRows > 0) {
            res.send({ code: 0, reason:'添加商品成功'}) //响应成功得数据
        } else {
            res.send({ code:1, reason:'添加商品失败'}) //响应失败得数据
        }
        
    })
    
    // res.send('111')
})


// 商品管理列表 分页
 router.get('/goodslistBypage', (req, res) => {
     //接收前端请求
     let {pageSize,currentPage, region, keyWord} = req.query;
     //准备sql
    let sqlstr = `select * from goods where 1=1`
    //  console.log(sqlstr);
     
     //定义变量保存总条数
     let total;

    if (region !=='' && region !== '全部分类') {
        // 拼接第一个查询条件
        sqlstr += ` and region='${region}'`;
        // console.log(sqlstr);
    }
    // 如果第二个关键字不为空 那么就拼接sql
    if (keyWord !== '') {
        sqlstr += ` and (name like '%${keyWord}%' or barCode like '%${keyWord}%')`
        // console.log(sqlstr);
    }
        // 拼接排序
        sqlstr += ` order by create_date desc`
        // console.log(sqlstr);
            // 执行sql
            connection.query(sqlstr, (err, data) => {
                if (err) throw err;
                //获取总条数
                let total = data.length;
                // 计算需要跳过的条数
                let n = (currentPage - 1) * pageSize;
                // 拼接sql
                sqlstr += ` limit ${n}, ${pageSize}`;
                // 执行sql
                connection.query(sqlstr, (err, data) => {
                    if (err) throw err;
                    res.send({ total, data })
                })
            })


     
    //  //执行sql
    //  connection.query(sqlstr, (err, data) => {
    //      if (err) throw err;
    //      total = data.length;
    //  })
    //  //拼接sql
    //  let n = (currentPage - 1) * pageSize;
    //  sqlstr += ` limit ${n}, ${pageSize}`;

    // // console.log(sqlstr);
     
    //  //执行sql
    //  connection.query(sqlstr, (err, data) => {
    //      if (err) throw err;
    //      console.log(data);
         
    //      res.send({ total, data })
    //  })

 
 })

//  单条数据删除
router.get('/singledataDelete', (req, res) => {
    //接受数据
    let {id }= req.query
    // 准备sql
    const sqlstr = `delete from goods where id=${id}`;
    // console.log(sqlstr);
    //执行sql
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        //响应数据给前端
         //判断
         if (data.affectedRows > 0) {
            res.send({ code: 0, reason: '删除成功' })
        } else {
            res.send({ code: 1, reason: '删除失败' })
        }
    })
    

})

// 数据回填
router.get('/goodsaddedeet', (req, res) => {
    //接受前端请求id
    let { id } =req.query;
    //准备sql
    const sqlstr = `select * from goods where id=${id}`;
    // console.log(sqlstr);
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        //响应数据给前端
        res.send({ data })
    })
    
})

//保存修改
router.get('/saveedit', (req, res) => {
   //接受前端参数
   let {barCode, name, region, market, promotion, id} =req.query;
   console.log(barCode, name);
   
   //准备sql
   const sqlstr = `update goods set barCode='${barCode}', name='${name}', region='${region}', market='${market}', promotion='${promotion}' where id='${id}' `;
    // console.log(sqlstr);
    //执行sql
    connection.query(sqlstr, (err, data) => {
        if  (err) throw err;
        //判断
        if (data.affectedRows > 0 ) {
            res.send({code:0, reason:'修改成功'})
        } else {
            res.send({code:1, reason:'修改失败'})
        }
    })
})

// 批量删除
router.get('/goodsDelete', (req, res) => {
    //接受前端请求
    let { idArr } = req.query;
    //准备sql
    const sqlstr = `delete from goods where id in (${idArr})`;
    //执行sql
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({code:0, reason:'批量删除成功'})  //响应成功数据
 
        } else {
            res.send({code:1, reason:'批量删除失败'}) //响应失败数据
        }
    })

})


//模糊查询
// router.get('/searchGoods', (req,res) => {
//     res.send('22')
// })






module.exports = router;