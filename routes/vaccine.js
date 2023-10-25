/**
 * 疫苗接种
 */
const express = require('express');
const router = express.Router();
const Vaccine = require('../module/vaccine');

// 添加
router.post('/addVaccine',(req,res) => {
  const now = new Date()
  Vaccine.findOne({where:{name:req.query.name}})
  .then( async name => {
    if(!name) {
      const content = await Vaccine.create({
        name: req.query.name,
        iphone: req.query.iphone,
        vaccineType: 1,
        dose: req.query.dose,
        vaccineTime: req.query.vaccineTime,
        address: req.query.address,
        createTime: now
      })
      res.send({status:200,msg:'创建成功!',content})
    } else {
      res.send({msg:'接种姓名已经存在!'})
    }
  })
  .catch( err =>res.send('error' + err))
})

// 查询
router.post('/vaccineList',(req,res) => {
  Vaccine.findAll().then( data => {
    res.send({status:200,msg:'查询成功!',data})
  })
  .catch( err => res.send( 'error' + err ))
})

// 修改
router.post('/UpdateVaccine',async(req,res) => {
  const now = new Date()
  const content = await Vaccine.findByPk(req.query.id).then( post => {
    post.update({
      name: req.query.name,
      iphone: req.query.iphone,
      vaccineType: req.query.vaccineType,
      dose: req.query.dose,
      vaccineTime: req.query.vaccineTime,
      address: req.query.address,
      createTime: now
    })
  })
  res.send({status:200,msg:'信息修改成功!',content})
})

// 删除
router.post('/delVaccine',(req,res) => {
  Vaccine.findByPk(req.query.id).then( id => {
    if(id) {
      Vaccine.destroy({
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