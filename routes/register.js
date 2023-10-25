const express = require('express');
const router = express.Router();
const Users = require('../module/Users');

router.all('/',(req,res) => {
  console.log(res.body)
})

module.exports = router;