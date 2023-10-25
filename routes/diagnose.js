/**
 * 诊断记录
 */
const express = require('express');
const router = express.Router();
const Diagnose = require('../module/diagnose');

// 添加
router.post('/addDiagnose',(req,res) => {
  const now = new Date()
  Diagnose.findOne({where: {name:req.query.name}})
  .then( async name => {
    if(!name) {
      const content = await Diagnose.create({
        name: req.query.name,
        diagnoseTime: req.query.diagnoseTime,
        iphone: req.query.iphone,
        address: req.query.address,
        status: 0,
        createTime: now
      })
      res.send({status:200,msg:'创建成功!',content})
    } else {
      res.send({msg:'患者姓名已经存在!'})
    }
  })
  .catch( err =>res.send('error' + err))
})

// 查询
router.post('/diagnoseList',(req,res) => {
  Diagnose.findAll().then( data => {
    res.send({status:200,msg:'查询成功!',data})
  })
  .catch( err => res.send( 'error' + err ))
})
// 修改
router.post('/UpdateDiagnose',async(req,res) => {
  const now = new Date()
  const content = await Diagnose.findByPk(req.query.id).then( post => {
    post.update({
      name: req.query.name,
      diagnoseTime: req.query.diagnoseTime,
      iphone: req.query.iphone,
      address: req.query.address,
      status: req.query.status,
      createTime: now
    })
  })
  res.send({status:200,msg:'信息修改成功!',content})
})
// 删除
router.post('/delDiagnose',(req,res) => {
  Diagnose.findByPk(req.query.id).then( id => {
    if(id) {
      Diagnose.destroy({
        where: {
          id: req.query.id
        }
      })
      res.send({status:200,msg:'删除信息成功!'})
    } else {
      res.send({msg: '用户已经删除过了!'})
    }
  })
  .catch( err => res.send('error' + err))
})

module.exports = router