const crypto = require('crypto')

// 加密方法
function md5 (s) {
  return crypto.createHash('md5').update(String(s)).digest('hex');
}

module.exports = md5