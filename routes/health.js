/**
 * 物资管理模块
 */
const express = require('express');
const router = express.Router();
const Health = require('../module/health');

// 打卡
router.post('/addHealth', (req, res) => {
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var date = now.getDate()
  var time = year + '-' + month + '-' + date;
  Health.findAll({ where: { createTime: req.query.time} })
    .then(async createTime => {
      const healthUser = await Health.create({
        name: req.query.name,
        integral: req.query.integral,
        createTime: time,
      })
      res.send({ status: 200, msg: '打卡成功成功!', healthUser })
    })
    .catch(err => res.send('error' + err))
})

// 查询所有信息
router.post('/healthUser', async (req, res) => {
  Health.findAll()
    .then(data => {
      res.send({ status: 200, msg: '查询信息成功!', data })
    })
})

// 查询单个打卡信息
router.post('/reqClockUser', async(req, res) => {
  let users = await Health.findAll({
    where: {
      createTime: req.query.time,
    },
    attributes: ['name', 'integral', 'createTime'], //允许显示的字段
  });
  res.send({
    code: 200,
    users
  })
})

// 删除信息
router.post('/delHealth', (req, res) => {
  Health.findByPk(req.query.id)
    .then(id => {
      if (id) {
        Health.destroy({
          where: {
            id: req.query.id
          }
        })
        res.send({ status: 200, msg: '删除成功!' })
      } else {
        res.send({ msg: '你已经删除过了!' })
      }
    })
    .catch(err => res.send('error' + err))
})

// 修改信息
// router.post('/updateHealth', async(req,res) => {
//   var now = new Date()
//   var year= now.getFullYear()
//   var month = now.getMonth() + 1
//   var date = now.getDate()
//   var time = year + '-' + month + '-' + date
//   const content = await Health.findByPk(req.query.id).then( post => {
//       post.update({
//         animal: req.query.animal,
//         name: req.query.name,
//         iphone: req.query.iphone,
//         address: req.query.address,
//         status: req.query.status,
//         createTime: time,
//       })
//     })
//     res.send({status:200,msg: '修改信息成功!',content})
// })

module.exports = router;