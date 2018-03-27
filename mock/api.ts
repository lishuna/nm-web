export default {
    defaultHost: {
        "debug": "",
        "test": "",
        "huidu": "http://wd.huidu.jiedaibao.com",
        "prod": "//wd.jiedaibao.com"
    },
    apis: {
        // 获取二维码
        "qrcodeApi": {
            "host": {
                "test": "",
                "huidu": "http://dhgg.huidu.jiedaibao.com/rrcag",
                "prod": "//dhgg.jiedaibao.com/rrcag"
            },
            "serve": "qrcode.json",
            "path": "/cmui/pcweb/getQrCode"
        },

        // 登陆接口
        "loginApi": {
            "host": {
                "test": "",
                "beat": "http://cxag.newbeta.jiedaibao.com",
                "huidu": "http://dhgg.huidu.jiedaibao.com/rrcag",
                "prod": "//dhgg.jiedaibao.com/rrcag"
            },
            "serve": "login.json",
            "path": "/cmui/pcweb/login"
        },
        // 登出接口
        "logoutApi": {
            "host": {
                "test": "",
                "beat": "http://cxag.newbeta.jiedaibao.com",
                "huidu": "http://dhgg.huidu.jiedaibao.com/rrcag",
                "prod": "//dhgg.jiedaibao.com/rrcag"
            },
            "serve": "logout.json",
            "path": "/cmui/pcweb/logout"
        },
        //  获取用户基本信息
        "getInfoApi": {
            "serve": "getInfo.json",
            "path": "/cuxin/admin/user/getInfo"

        },
        // 获取用户资源
        "getUserMenuApi": {
            "serve": "getUserMenu.json",
            "path": "/cuxin/admin/user/getMenu"
        }
    }
};
