var express = require('express');
const User = require('../module/User');
const bcrypt = require('bcryptjs');
const db = require('../utils/db')
var router = express.Router();

// 注册接口
router.post('/register',(req,res) => {
  // console.log(res.json(req.query));
  const now = new Date()
  const userData ={
    // email: req.query.email,
    username: req.query.username,
    password: req.query.password,
    role: '普通用户',
    iphone: req.query.iphone,
    created: now
  }
  User.findOne({where: {username:userData.username}}).then( user => {
    if(!user) {
      // 加密
      // bcrypt.hash(req.query.password,10,(err,hash) => {
        // hash加密后的内容
        // userData.password = hash
        User.create(userData)
        .then( user => {
          res.json({status: '200'})
        })
        .catch( err => res.send('error:' + err))
    } else {
      res.json({msg: "账号已存在"})
    }
  }).catch( err => res.send('error:' + err))
})


// 登录接口
router.post('/login',(req,res) => {
  User.findOne({where:{username: req.query.username,password: req.query.password}})
  .then( user => {
    // 查询用户
    if(user) {
      // 匹配密码
      // bcrypt.compareSync(req.query.password,user.password)
      if(req.query.password,user.password) {
        res.send({status:200,msg:'登录成功',data:
          {
            username:req.query.username,
            password:req.query.password,
            role:user.role,
            iphone:user.iphone
          }
        })
      } else {
        res.send({msg:'密码错误'})
      }
    } else {
      res.status(400).json({error:"用户不存在"})
    }
  })
  .catch( err => res.send("error:" + err))
})

// 查询所有用户表
router.post('/user',async(req,res) => {
  // const users = await User.findAll()
  // res.send({"status":"1","msg":"查询成功","data":{
  //   users
  // }})
  // const usersObj = Object.assign(...users)
  // console.log(usersObj.dataValues)
  User.findAll().then( data =>{
    res.send({ status:200,msg:'查询成功',data })
  }).catch( err => res.send("error:" + err))
})

// 添加用户
router.post('/adduser',(req,res) => {
  console.log("🚀 ~ file: index.js:79 ~ req,res:", req,res)
  const now = new Date()
  const userData = {
    username: req.query.username,
    password: req.query.password,
    role: '普通用户',
    iphone: req.query.iphone,
    created: now
  }
  User.findOne({where: {username:userData.username}}).then( user => {
    if(!user) {
      // 加密
      // bcrypt.hash(req.query.password,10,(err,hash) => {
        // hash加密后的内容
        // userData.password = hash
        User.create(userData)
        .then( user => {
          res.json({status: 200})
        })
        .catch( err => res.send('error:' + err))
    } else {
      res.json({msg: "账号已存在"})
    }
  }).catch( err => res.send('error:' + err))
})

// 删除用户
router.post('/delUser',async(req,res) => {
  const deluser = await User.destroy({
    where: {
      id: req.query.id
    }
  })
  res.send({status:200,msg:'删除用户成功!'})
})

// 修改用户
router.post('/updateUser',async(req,res) => {
  const content = await User.findByPk(req.query.id).then(function(post) {
    post.update({
      username: req.query.username,
      password: req.query.password,
      role: req.query.role,
      iphone: req.query.iphone,
    });
  });
  res.send({ status:200, msg:'用户更新成功！', content})
})

module.exports = router;