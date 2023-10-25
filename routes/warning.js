/**
 * 疫苗接种
 */
const express = require('express');
const router = express.Router();
const Warning = require('../module/warning');

// 添加
router.post('/addWarning',(req,res) => {
  const now = new Date()
  Warning.findOne({where:{region:req.query.region}})
  .then( async region => {
      const content = await Warning.create({
        region: req.query.region,
        address: req.query.address,
        tag: req.query.tag,
        createTime: now
      })
      res.send({status:200,msg:'创建成功!',content})
  })
  .catch( err =>res.send('error' + err))
})

// 查询
router.post('/WarningList',(req,res) => {
  Warning.findAll().then( data => {
    res.send({status:200,msg:'查询成功!',data})
  })
  .catch( err => res.send( 'error' + err ))
})

// 修改
router.post('/UpdateWarning',async(req,res) => {
  const now = new Date()
  const content = await Warning.findByPk(req.query.id).then( post => {
    post.update({
      region: req.query.region,
      address: req.query.address,
      tag: req.query.tag,
      createTime: now
    })
  })
  res.send({status:200,msg:'信息修改成功!',content})
})

// 删除
router.post('/delWarning',(req,res) => {
  Warning.findByPk(req.query.id)
  .then( id => {
    if(id) {
      Warning.destroy({
        where: {
          id: req.query.id
        }
      })
      res.send({status:200,msg:'删除信息成功!'})
    } else {
      res.send({msg: '已经删除过了!'})
    }
  })
  .catch( err => res.send('error' + err))
})

module.exports = router