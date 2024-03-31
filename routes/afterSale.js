/**
 * 售后管理
 */
const express = require('express');
const router = express.Router();
const afterSale = require('../module/afterSale');

// 查询
router.get('/afterSale', (req, res) => {
    afterSale.findAll().then(data => {
        res.send({ code: 200, msg: '查询成功!', data })
    })
        .catch(err => res.send('error' + err))
})

// 修改
router.post('/updateAfterSale', async (req, res) => {
    const now = new Date();
    const { id, title } = req.query; // 从请求体中获取 id 和 title
    try {
        const post = await afterSale.findByPk(id); // 根据 id 查找售后信息
        if (!post) {
            return res.status(404).send({ code: 404, msg: '未找到相关信息' });
        }
        // 更新标题和创建时间
        await post.update({
            title: title,
            createTime: now
        });
        res.send({ code: 200, msg: '信息修改成功!', content: post });
    } catch (error) {
        console.error('信息修改失败:', error);
        res.status(500).send({ code: 500, msg: '信息修改失败!' });
    }
});


module.exports = router