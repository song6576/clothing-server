/**
 * 头像
 */
const express = require('express');
const router = express.Router();
const avatar = require('../module/avatar');
const cors = require('cors');
router.use(cors());

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 添加
router.post('/addAvatar', async (req, res) => {
    const content = await avatar.create({
        username: req.query.username,
        imgUrl: req.query.imgUrl,
        createTime: formatDate(new Date()),
    })
    res.send({ code: 200, msg: '添加成功!', content })
})

// 查询
router.get('/reqAvatar', async (req, res) => {
    avatar.findAll()
        .then(data => {
            res.send({ code: 200, msg: '查询成功!', data })
        })
})

// 根据条件查询，比如用户名称
router.get('/reqAvatarByName', async (req, res) => {
    avatar.findAll({
        where: {
            username: req.query.username
        }
    })
        .then(data => {
            res.send({ code: 200, msg: '查询成功!', data })
        })
})

// 删除
router.post('/delAvatar', (req, res) => {
    avatar.destroy({
        where: {
            id: req.query.id
        }
    }).then(data => {
        res.send({ code: 200, msg: '删除成功!', data })
    })
})

// 修改
router.post('/updateAvatar', async (req, res) => {
    const content = await avatar.findByPk(req.query.id).then(post => {
        post.update({
            imgUrl: req.query.imgUrl,
            createTime: formatDate(new Date())
        })
    })
    res.send({ code: 200, msg: '修改成功!', content })
})


module.exports = router;