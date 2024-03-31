const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const cors = require('cors');

const Shop = require('../module/shop');
// 添加 CORS 中间件处理跨域请求
router.use(cors());

// 添加
router.post('/addShop', async (req, res) => {
    try {
        const { shopName,imgUrl, price, destory, inventory } = req.query;
        const now = new Date();
        const content = await Shop.create({
            shopName,
            imgUrl,
            price,
            destory,
            inventory,
            createTime: now,
        });

        res.send({ code: 200, msg: '添加商品信息成功!', content });
    } catch (error) {
        console.error('Error adding shop: ', error);
        res.status(500).send({ code: 500, msg: '添加商品信息失败!' });
    }
});

// 查询
router.post('/shopList', (req, res) => {
    Shop.findAll().then(data => {
        res.send({ code: 200, msg: '查询成功!', data })
    })
        .catch(err => res.send('error' + err))
})

// 修改
router.post('/Updateshop', async (req, res) => {
    const now = new Date();
    console.log(req.query);
    const post = await Shop.findByPk(req.query.id);
    if (post) {
        const updatedPost = await post.update({
            shopName: req.query.shopName,
            imgUrl: req.query.imgUrl,
            price: req.query.price,
            destory: req.query.destory,
            inventory: req.query.inventory,
            createTime: now,
        });
        res.send({ status: 200, msg: '信息修改成功!', content: updatedPost });
    } else {
        res.status(404).send({ status: 404, msg: '未找到该商品信息!' });
    }
});

// 删除
router.post('/delShop', (req, res) => {
    Shop.findByPk(req.query.id)
        .then(id => {
            if (id) {
                Shop.destroy({
                    where: {
                        id: req.query.id
                    }
                })
                res.send({ status: 200, msg: '删除信息成功!' })
            } else {
                res.send({ msg: '已经删除过了!' })
            }
        })
        .catch(err => res.send('error' + err))
})

module.exports = router;