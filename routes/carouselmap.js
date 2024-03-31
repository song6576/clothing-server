/**
 * 轮播图片
 */
const express = require('express');
const router = express.Router();
const Carouselmap = require('../module/carouselmap');

// 添加
router.post('/addCarouselmap', async (req, res) => {
    const now = new Date();
    const content = await Carouselmap.create({
        imgUrl: req.query.imgUrl,
        createTime: now,
    })
    res.send({ code: 200, msg: '添加成功!', content })
})

// 查询
router.get('/reqCarouselmap', async (req, res) => {
    Carouselmap.findAll()
        .then(data => {
            res.send({ code: 200, msg: '查询成功!', data })
        })
})

// 删除
router.post('/delCarouselmap', (req, res) => {
    Carouselmap.destroy({
        where: {
            id: req.query.id
        }
    }).then(data => {
        res.send({ code: 200, msg: '删除成功!', data })
    })
})

// 修改
router.post('/updateCarouselmap', async (req, res) => {
    const content = await Carouselmap.findByPk(req.query.id).then(post => {
        post.update({
            imgUrl: req.query.imgUrl,
        })
    })
    res.send({ code: 200, msg: '修改成功!', content })
})

module.exports = router;