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


//添加账号
router.post('/accountadd', (req, res) => {
    //后端接受数据
    let { account, password, userGroup } = req.body;
    // 准备sql
    const sqlstr = `insert into account(account, password, user_group) values('${account}','${password}','${userGroup}')`;
    //执行sql
    // console.log(sqlstr)
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        console.log(data);
        //判断
        if (data.affectedRows > 0) {
            res.send({ code: 0, reason: '添加账号成功' })  //响应成功的数据前端
        } else {
            res.send({ code: 1, reason: '添加账号失败' }) //响应失败的数据给前端
        }

    })
})


// 账号管理
router.get('/accountlist', (req, res) => {
    //准备sql
    const sqlstr = `select * from account order by create_date desc`;
    // console.log(sqlstr)
    //执行sql
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        res.send(data) //响应数据给前端
    })

})

// 删除单条数据
router.get('/accountdel', (req, res) => {
    //接受id
    let { id } = req.query;
    //准备sql语句
    const sqlstr = `delete from account where id=${id}`;
    //    console.log(sqlstr);

    //  执行sql
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        //判断
        if (data.affectedRows > 0) {
            res.send({ code: 0, reason: '删除成功' })
        } else {
            res.send({ code: 1, reason: '删除失败' })
        }
    })
    //    res.send(data)

})

// 编辑数据回填
router.get('/accountedeet', (req, res) => {
    //接受前端请求  id
    let { id } = req.query;
    //准备sql语句
    const sqlstr = `select * from account where id=${id}`;
    // console.log(sqlstr);
    //执行sql
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        //响应数据给前端
        res.send({ data })

    })

})

// 保存修改请求
router.post('/saveedit', (req, res) => {
    //接受新数据 和老 id
    let { account, user_group, id } = req.body;
    // 准备sqlstr
    const sqlstr = `update account set account='${account}', user_group='${user_group}' where id=${id}`;
    console.log(sqlstr);

    //执行sql
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        //判断
        if (data.affectedRows > 0) {
            res.send({ code: 0, reason: '修改成功' })
        } else {
            res.send({ code: 1, reason: '修改失败' })
        }
    })
})


// 批量删除
router.get('/batchDelete', (req, res) => {
    // 接受前端请求
    let { idArr } = req.query;
    //准备sql语句
    const sqlstr = `delete from account where id in (${idArr})`;
    //执行sql
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({ code: 0, reason: '批量删除成功' })  //响应成功数据

        } else {
            res.send({ code: 1, reason: '批量删除失败' }) //响应失败数据
        }
    })




})

//分页
router.get('/getDataByPage', (req, res) => {
    //接受前端请求数据
    let { pageSize, currentPage } = req.query;
    //  定义变量 保存数据总条数
    let total;
    // 准备sql
    let sqlstr = `select * from account order by create_date desc`;
    // console.log(sqlstr);
    //执行sql
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        total = data.length; //获取数据总条数
    })

    //构造sql 按照分页查询数据
    let n = (currentPage - 1) * pageSize; //跳过多少条
    sqlstr += ` limit ${n}, ${pageSize}`;//分页的sql拼接sql的执行语句
    console.log(sqlstr);


    // //执行sql
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        res.send({ total, data }) //把中数据条数 和当前页码对应的数据响应给前端
    })

    // res.send('111')
})

/* 获取用户角色 */
router.get('/role', (req, res) => {
    res.send({ role: req.user.userGroup })
})


// 获取旧密码是否真确
router.post('/checkoldpass', (req, res) => {
    //接收旧密码
    let { oldPwd } = req.body;
    //验证是否正确
    if (oldPwd === req.user.password) {
        res.send({ code: 0, reason: '原密码正确' })
    } else {
        res.send({ code: 1, reason: '旧密码错误' })
    }
})

//密码修改
router.post('/passwordModify', (req, res) => {
    // console.log(req.user.password);
    //接收新密码
    let { newpass } = req.body;
    //取出id
    let id = req.user.id;
    // console.log(id);
    // 准备sql
    const sqlstr = `update account set password='${newpass}' where id=${id}`;
    // 执行sql
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({ code: 0, reason: '修改密码成功' })  //响应成功数据

        } else {
            res.send({ code: 1, reason: '修改密码失败' }) //响应失败数据
        }
    })


    // res.send('111')
})
//用户信息
router.get('/getInfo', (req, res) => {
    //获取id
    let id = req.user.id;
    //准备sql
    const sqlstr = `select * from account where id=${id}`;
    // console.log(sqlstr);
    // 执行sql
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        res.send({ data })
    })

})
var multer = require('multer');
//配置存储路径和重命名

// 配置存储路径 和 重命名
var storage = multer.diskStorage({
    // 图片上传到服务器以后 要放置的路径
    destination: 'public/upload',

    // 图片重命名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        // 获取时间戳
        var filename = new Date().getTime();
        // 124354654 + "." + jpg
        cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
    }
        });

    // 上传对象
var upload = multer({
    storage,
});

// 接收上传请求
router.post('/uploadavatar', upload.single('file'), (req, res) => {
    // 接收到的文件信息
    var file = req.file;
    console.log(file)

    // 文件名
    let fileName = file.filename;
    // 拼接文件路径
    let avatarUrl = '/upload/' + fileName

    // 构造sql
    const sqlStr = `update account set avatarUrl = '${avatarUrl}' where id=${req.user.id}`;
    // 执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({ code: 0, reason: "上传成功", avatarUrl })
        } else {
            res.send({ code: 1, reason: "上传失败" })
        }
    })
})

/* ----上传结束----- */

/* 获取用户角色 */
router.post('/role', (req, res) => {
    res.send({role:req.user.user_group} )
})




module.exports = router;