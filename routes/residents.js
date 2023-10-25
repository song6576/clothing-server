/**
 * 分类管理api模块
 */
const express = require('express');
const router = express.Router();
const Residents = require('../module/residents');

// 添加分类信息
router.post('/addResidents',(req,res) => {
  Residents.findOne({where:{type:req.query.type}})
  .then( async name => {
    // 判断用户是否存在
    if (!name) {
      const residentsUser = await Residents.create({
        type: req.query.type,
        text: req.query.text,
      })
      res.send({ status:200, msg:'添加分类信息成功!', residentsUser})
    } else {
      res.send({msg: '该分类已存在'})
    }
  })
  .catch( err => res.send('error' + err))
})

// 查询所有分类信息
router.post('/residentsUsers',async(req,res) => {
  Residents.findAll()
  .then( data => {
    res.send({status:200,msg: '查询分类信息成功!',data})
  })
})

// 删除分类信息
router.post('/delResidents',(req,res) => {
  Residents.findByPk(req.query.id)
  .then( id => {
    // 判断用户id是否存在
    if(id) {
      Residents.destroy({
      where: {
        id: req.query.id
      }
    })
      res.send({status:200,msg:'删除分类信息成功!'})
    } else {
      res.send({msg:'该分类已经删除过了'})
    }
  })
  .catch( err => res.send('error' + err))
})

// 修改分类信息
router.post('/updateResidents',async(req,res) => {
  const content = await Residents.findByPk(req.query.id).then( post => {
    post.update({
      type: req.query.type,
      text: req.query.text,
    })
  })
  res.send({ status:200, msg:'分类信息修改成功!', content})
})

module.exports = router;