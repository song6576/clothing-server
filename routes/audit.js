/**
 * 物资申请审批
 */
const express = require('express');
const router = express.Router();
const Audit = require('../module/audit');

// 添加物资审批信息
router.post('/addAuditSupplies', async(req,res) => {
  const now = new Date()
  const content = await Audit.create({
    suppliesName: req.query.suppliesName,
    amount: req.query.amount,
    auditPeople: req.query.auditPeople,
    type: req.query.type,
    text: req.query.text,
    status: 0,
    createTime: now,
  })
  res.send({ status:200, msg:'添加服装信息成功!', content})
})

// 查询所有物资申请审批
router.post('/audits',(req,res) => {
  Audit.findAll().then( data => {
    res.send({status:200,msg:'信息查询成功!',data})
  })
})

// 删除物资信息审批
router.post('/delAudit',(req,res) => {
  Audit.findByPk(req.query.id).then( id => {
    if(id) {
      Audit.destroy({
        where: {
          id: req.query.id
        }
      })
      res.send({status:200,msg:'删除服装审批成功!'})
    } else {
      res.send({msg:'删除失败/服装已经删除过了!'})
    }
  })
  .catch( err => res.send('error' + err))
})

// 修改物资审批信息
router.post('/updateAudit',async(req,res) => {
  const now = new Date()
  const content = await Audit.findByPk(req.query.id).then( post => {
    post.update({
      suppliesName: req.query.suppliesName,
      amount: req.query.amount,
      auditPeople: req.query.auditPeople,
      type: req.query.type,
      text: req.query.text,
      status: req.query.status,
      createTime: now,
    })
  })
  res.send({status:200,msg:'服装审批信息修改成功!',content})
})


module.exports = router;