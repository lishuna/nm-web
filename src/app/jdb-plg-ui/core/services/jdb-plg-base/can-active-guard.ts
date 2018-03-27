import { Injectable, OnInit,Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionConfig } from '../../../../common/permission.config';
import { PermissionService } from './permission.service';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class CanActivateGuard implements CanActivate {

    constructor(
        private permissionService: PermissionService, 
        public router: Router
    ) {
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(!localStorage.getItem("cxLoginToken")){
            this.router.navigate(['/login']);
        }else{
            if(this.permissionService.getPermission()){
                let curruentPermission = this.permissionService.getPermissionConfig()[route.routeConfig.path].isHasPermisson;
                if(!curruentPermission){
                    alert('没有查看案件详情权限！');
                }
                return curruentPermission;
            }else{
                this.router.navigate(['/main/noPermission']);

            }
        }
        return this.permissionService.getPermission();
    }
}