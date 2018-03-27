var express = require('express');
var router = express.Router();
var usersCtrl = require('../controller/users.controller');

// 登录接口
router.route('/pcweb/login').post(usersCtrl.login);

// 二维码生成
router.post('/pcweb/getQrCode', usersCtrl.getQrCode);

router.post('/admin/user/getInfo', usersCtrl.getInfo)
module.exports = router;