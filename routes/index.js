var express = require('express');
const User = require('../module/User');
const bcrypt = require('bcryptjs');
const db = require('../utils/db')
var router = express.Router();

// 定义一个格式化响应的函数
const formatResponse = (status, msg, data = null) => {
    return {
        status,
        msg,
        data
    };
};
// 注册接口
router.post('/register', (req, res) => {
    // console.log(res.json(req.query));
    const now = new Date()
    const userData = {
        // email: req.query.email,
        username: req.query.username,
        password: req.query.password,
        role: '普通用户',
        iphone: req.query.iphone,
        created: now
    }
    User.findOne({ where: { username: userData.username } }).then(user => {
        if (!user) {
            // 加密
            // bcrypt.hash(req.query.password,10,(err,hash) => {
            // hash加密后的内容
            // userData.password = hash
            User.create(userData)
                .then(user => {
                    res.json({ status: '200' })
                })
                .catch(err => res.send('error:' + err))
        } else {
            res.json({ msg: "账号已存在" })
        }
    }).catch(err => res.send('error:' + err))
})


// 登录接口
router.get('/login', async (req, res) => {
    const { username, password } = req.query;

    try {
        const user = await User.findOne({
            where: {
                username,
                // password
            },
            attributes: ['id','role', 'iphone', 'password']
        });

        if (user) {
            if (password === user.password) {
                const data = {
                    id: user.id,
                    username,
                    password,
                    role: user.role,
                    iphone: user.iphone
                };
                res.send(formatResponse(200, '登录成功', data));
            } else {
                res.send(formatResponse(400, '密码错误'));
            }
        } else {
            res.send(formatResponse(400, '用户不存在'));
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(formatResponse(500, '服务器错误'));
    }
});

// 查询所有用户表
router.post('/user', async (req, res) => {
    User.findAll().then(data => {
        res.send({ status: 200, msg: '查询成功', data })
    }).catch(err => res.send("error:" + err))
})

// 根据条件查询，比如用户名称
// router.post('/reqUserByNameData', async (req, res) => {
//     User.findAll({
//         where: {
//             username: req.query.username
//         }
//     })
//         .then(data => {
//             res.send({ code: 200, msg: '查询成功!', data })
//         })
// })

// 添加用户
router.get('/adduser', (req, res) => {
    const now = new Date()
    const userData = {
        username: req.query.username,
        password: req.query.password,
        imgUrl: req.query.imgUrl,
        role: '普通用户',
        iphone: req.query.iphone,
        created: now
    }
    User.findOne({ where: { username: userData.username } }).then(user => {
        if (!user) {
            // 加密
            // bcrypt.hash(req.query.password,10,(err,hash) => {
            // hash加密后的内容
            // userData.password = hash
            User.create(userData)
                .then(user => {
                    res.json({ status: 200 })
                })
                .catch(err => res.send('error:' + err))
        } else {
            res.json({ msg: "账号已存在" })
        }
    }).catch(err => res.send('error:' + err))
})

// 删除用户
router.post('/delUser', async (req, res) => {
    const deluser = await User.destroy({
        where: {
            id: req.query.id
        }
    })
    res.send({ status: 200, msg: '删除用户成功!' })
})

// 修改用户
router.post('/updateUser', async (req, res) => {
    const content = await User.findByPk(req.query.id).then(function (post) {
        post.update({
            username: req.query.username,
            password: req.query.password,
            imgUrl: req.query.imgUrl,
            role: req.query.role,
            iphone: req.query.iphone,
        });
    });
    res.send({ status: 200, msg: '用户更新成功！', content })
})

// 修改密码
router.post('/updateUserPassword', async (req, res) => {
    const content = await User.findByPk(req.query.id).then(function (post) {
        post.update({
            password: req.query.password,
        });
    });
    res.send({ status: 200, msg: '用户密码修改成功！', content })
})

router.post('/reqUserByNameData', async (req, res) => {
    User.findAll({
        where: {
            username: req.query?.username
        }
    })
        .then(data => {
            res.send({ code: 200, msg: '查询成功!', data })
        })
})

module.exports = router;