import { Component, ViewChild, Inject, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { LoginComponent } from './login/login.component';
declare var window;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  @ViewChild(LoginComponent) loginComponent: LoginComponent;
  constructor( @Inject('jdbPlgBaseApi') private jdbPlgBaseApi, vRef: ViewContainerRef) {
    this.jdbPlgBaseApi.setRootViewContainerRef(vRef);
  }
}
