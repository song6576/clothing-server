/**
 * 服装分类管理模块
 */
const express = require('express');
const router = express.Router();
const Supplies = require('../module/supplies');

// 添加服装分类信息
router.post('/addSupplies', (req,res) => {
  Supplies.findOne({where:{suppliesName:req.query.suppliesName}})
  .then( async suppliesName => {
    // 判断用户是否存在
    if (!suppliesName) {
      const now = new Date()
      const SuppliesUser = await Supplies.create({
        suppliesName: req.query.suppliesName,
        count: req.query.count,
        type: req.query.type,
        username: req.query.username,
        createTime: now,
      })
      res.send({ status:200, msg:'添加物资信息成功!', SuppliesUser})
    } else {
      res.send({msg: '物资信息已存在'})
    }
  })
  .catch( err => res.send('error' + err))
})

// 查询所有服装分类信息
router.post('/suppliesUser',async(req,res) => {
    Supplies.findAll()
    .then( data => {
      res.send({status:200,msg: '查询所有物资信息成功!',data})
    })
})

// 根据条件查询
router.post('/reqClothingUser', async(req, res) => {
  let clothingUser = await Supplies.findAll({
    where: {//获取id在[1,2,3]中并且age=20的
      username: req.query.username,
    },
    attributes: ['username', 'suppliesName', 'count', 'type', 'createTime'], //允许显示的字段
  });
  res.send({
    code: 200,
    clothingUser
  })
})

// 删除服装分类信息
router.post('/delSupplies',(req,res) => {
  Supplies.findByPk(req.query.id)
  .then( id => {
    if(id) {
      Supplies.destroy({
        where: {
          id: req.query.id
        }
      })
      res.send({status:200,msg: '删除物资信息成功!'})
    } else {
      res.send({msg: '物资已经删除过了!'})
    }
  })
  .catch( err => res.send('error' + err))
})

// 修改服装分类信息
router.post('/updateSupplies', async(req,res) => {
  const now = new Date()
  const content = await Supplies.findByPk(req.query.id).then( post => {
      post.update({
        suppliesName: req.query.suppliesName,
        count: req.query.count,
        type: req.query.type,
        username: req.query.username,
        createTime: now,
      })
    })
    res.send({status:200,msg: '修改物资信息成功!',content})
})

module.exports = router;