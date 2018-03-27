var Users = require('../models/user.model');

function login(req, res, next) {
    var type = req.body.loginWay,
        loginId = req.body.mobile,
        passwd = req.body.password,
        data = { error: {} };
    if (type == 1) {
        console.log(loginId + '=====' + passwd);
        Users.get(loginId, passwd)
            .then(function(user) {
                if (user && user.length > 0) {
                    console.log(user)
                    data.error.returnCode = 0;
                    data.data = user;
                    data.loginToken = new Date().getTime();
                    data.loginWay = type;
                } else {
                    data.error.returnCode = 1;
                    data.error.returnUserMessage = '用户名或密码错误';
                    data.data = null;
                }
                console.log(data);
                res.send(data);
            }).then(function(error) {
                data.error.returnCode = 1;
                data.error.returnMessage = error;
                data.data = null;
                res.send(data);
            });
    } else {
        res.send('10003');
    }
}

function getQrCode(req, res, next) {
    var resData = {
        error: {
            "returnCode": 0,
            "returnMessage": "操作成功",
            "returnUserMessage": "操作成功"
        },
        data: {
            "type": "webLogin",
            "content": "8c476ab3bc2cf9b3d7efbf6124f4f9a9f1d1be0427d51df36e9780be1785eb92"
        }
    };
    res.send(resData);
}

function getInfo(req, res, next) {
    res.send('123');
}

module.exports = { login, getQrCode, getInfo };