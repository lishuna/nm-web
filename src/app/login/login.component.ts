import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { PermissionService } from '../jdb-plg-ui/core/services/jdb-plg-base/permission.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    // loginType:  true为二维码登陆，false 为账号密码登录方式
    loginType: boolean;
    qrcode: any;
    url: any;
    content: any;
    nextRout: string;
    codeError: boolean = false;
    codeErrorMessage: string;
    codeRedStatus: boolean = false;
    codeRedMessage: string;
    loginStatus: boolean = false;
    entryButtonStatus: boolean = true;
    name: string;
    password: string;
    errorMessage: string;
    timer: number;
    clearBtnName: boolean = false;
    clearBtnPassword: boolean = false;
    // CookieEffectiveTime: number = 1;
    constructor(
        @Inject('jdbPlgBaseApi') private jdbPlgBaseApi,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private permissionService: PermissionService
    ) {

    }

    ngOnInit() {
        localStorage.removeItem("orgUid");
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.loginType = true;
        this.activatedRoute.queryParams.subscribe(params => {

            this.nextRout = params.url || '/main';
        });
        this.getQrCodeURL();
    }

    // 改变登陆方式
    changeLoginType() {
        this.loginType = !this.loginType;
        if (this.loginType) {
            this.setCodeError(false);
            this.setCodeRed(false);
            this.getQrCodeURL();
        } else if (this.timer) {
            clearTimeout(this.timer);
        }
        // 账号登入状态初始化
        this.setIdStatus(false);
        this.inputChange();
    }
    clearBtn(status: string) {
        if (status === "name") {
            this.name = "";
        } else if (status === "password") {
            this.password = "";
        }
        this.inputChange();
    }
    // 账号登入状态初始化
    setIdStatus(showStatus: boolean, message?: string) {
        if (showStatus) {
            this.loginStatus = true;
            this.errorMessage = message;
        } else {
            this.errorMessage = "";
            this.loginStatus = false;
            this.entryButtonStatus = true;
            this.name = "";
            this.password = "";
        }

    }
    /**
     * 设置二维码红色提示
     *
     * @param {boolean} showStatus 展示状态
     * @param {string} message 提示文案【可选参数】
     */
    setCodeRed(showStatus: boolean, message?: string) {
        this.codeRedStatus = showStatus;
        this.codeRedMessage = message || "";
    }
    /**
     * 设置二维码图片上提示
     *
     * @param {boolean} showStatus 展示状态
     * @param {string} message 提示文案【可选参数】
     */
    setCodeError(showStatus: boolean, message?: string) {
        this.codeError = showStatus;
        this.codeErrorMessage = message || "";
    }
    refreshQrCode() {
        console.log("刷新");
        this.setCodeRed(false);
        this.setCodeError(false);
        //刷新二维码,回调中使用一下方法。避免数据传递未更新连续失效
        this.getQrCodeURL();
    }
    // 二维码方式登陆
    getQrCodeURL() {
        if (!this.loginType) {
            return;
        }
        console.log("更新二维码");
        this.jdbPlgBaseApi.post("qrcodeApi", {
            from: 'CUXIN'
        }).subscribe(
            (res) => {
                this.url = JSON.stringify(res.data);
                this.content = res.data.content;
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(this.pollingLoginStatusInterface.bind(this), 2000);
            },
            (error) => {
                this.jdbPlgBaseApi.toast('获取登录地址失败！');
                this.setCodeError(true, "二维码获取失败");
            }
            )
    }

    // 轮训登录态接口 看看用户是否登录
    pollingLoginStatusInterface() {
        let param: any = {
            from: 'CUXIN',
            loginWay: 0,
            content: this.content
        };
        this.login(param);

    }
    // 账号密码登入
    enter() {
        this.entryButtonStatus = true;
        let param: any = {
            from: 'CUXIN',
            loginWay: 1,
            mobile: this.name,
            password: this.password
        };
        this.login(param);
    }

    //  登录请求  0登录成功,10003用户未登录,10008二维码已失效
    login(param) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        localStorage.removeItem("cxLoginToken");
        localStorage.removeItem("cxLoginWay");
        this.jdbPlgBaseApi.post("loginApi", param, false).subscribe(
            (res) => {
                this.entryButtonStatus = false;
                if (res.error && res.error.returnCode * 1 === 0) {
                    localStorage.setItem("cxLoginToken", res.data.loginToken);
                    localStorage.setItem("cxLoginWay", res.data.loginWay);
                    this.loginStatus = false;
                    this.errorMessage = "";
                    this.setCodeError(false);
                    this.jdbPlgBaseApi.toast("登入成功");
                    this.getUserName();
                } else if (res.error && res.error.returnCode * 1 === 10008) {
                    this.setCodeError(false);
                    this.getQrCodeURL();
                } else if (res.error && res.error.returnCode * 1 === 10003) {
                    //避免请求时间过长进入else，把对this.loginType判断放在内部
                    if (this.loginType) {
                        this.timer = setTimeout(this.pollingLoginStatusInterface.bind(this), 2000);
                    }
                    return;
                } else if (res.error && res.error.returnCode * 1 === 10011) {
                    this.setIdStatus(true, res.error.returnUserMessage);
                    this.entryButtonStatus = true;
                    return;
                } else {
                    this.setCodeRed(true, res.error.returnUserMessage);
                    this.setIdStatus(true, res.error.returnUserMessage);
                    return;
                }
            },
            (error) => {
                this.jdbPlgBaseApi.toast("网络请求错误");
            }
        )
    }
    // 输入框change事件
    inputChange() {
        if (this.name) {
            this.clearBtnName = true;
        } else {
            this.clearBtnName = false;
        }
        if (this.password) {
            this.clearBtnPassword = true;
        } else {
            this.clearBtnPassword = false;
        }
        // 禁用启用按钮
        if (this.name && this.password) {
            this.entryButtonStatus = false;
        } else {
            this.entryButtonStatus = true;
        }
    }
    getUserName() {
        this.jdbPlgBaseApi.post("getInfoApi", {}, false).subscribe(
            (res) => {
                this.getUserMenu(res.data.orgList[0].orgName, res.data.orgList[0].orgUid);
                localStorage.setItem("orgUid", res.data.orgList[0].orgUid);
            },
            (error) => {
                this.jdbPlgBaseApi.toast("获取用户信息请求错误");
            }
        )
    }

    //获取组织资源
    getUserMenu(orgName, orgUid) {
        this.jdbPlgBaseApi.post("getUserMenuApi", {
            orgUid: orgUid
        }).subscribe(
            (res) => {
                localStorage.setItem("permissionList", JSON.stringify(res.data.list));
                // if (!this.permissionService.getPermission()) {
                //     this.router.navigate(['/main/noPermission']);
                // } else {
                    this.router.navigate(['/main/index']);
                // }
            },
            (error) => {
                this.jdbPlgBaseApi.toast("获取组织资源请求错误");
            }
            )
    }
}
