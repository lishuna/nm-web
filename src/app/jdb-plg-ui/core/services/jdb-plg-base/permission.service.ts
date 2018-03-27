import { Injectable,OnInit,Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PermissionConfig } from '../../../../common/permission.config';

@Injectable()
export class PermissionService {

    isShowSelected:any;
    constructor(
        @Inject('jdbPlgBaseApi') private jdbPlgBaseApi,
        public router:Router
    ){
       
    }

    getPermission(){
        let permissionList;
        let flag:boolean = false;
        if(localStorage.getItem("permissionList")){
            permissionList = JSON.parse(localStorage.getItem("permissionList"));
        }else{
            permissionList = [];
        }
        for(let key in PermissionConfig){
            let element = PermissionConfig[key];
            if(permissionList.indexOf(element.code) != -1){
                flag = true;
            }
        }
        return flag;
    }

    getPermissionConfig(){
        let permissionList;
        if(localStorage.getItem("permissionList")){
            permissionList = JSON.parse(localStorage.getItem("permissionList"));
        }else{
            permissionList = [];
        }
        for(let key in PermissionConfig){
            let element = PermissionConfig[key];
            if(permissionList.indexOf(element.code) != -1){
                element.isHasPermisson = true;
            }else{
                element.isHasPermisson = false;
            }
        }
        return PermissionConfig;
    }
}
