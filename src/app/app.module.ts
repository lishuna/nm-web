import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { QRCodeModule } from 'angular2-qrcode';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { JdbPlgUiModule, JdbPlgBaseService } from './jdb-plg-ui/jdb-plg-ui.module';
import { LoginComponent } from './login/login.component';
import { AppRoutes } from './app.routes';
import { PermissionService } from './jdb-plg-ui/core/services/jdb-plg-base/permission.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
    HttpModule,
    JsonpModule,
    NgZorroAntdModule,
    QRCodeModule,
    JdbPlgUiModule
  ],
  providers: [
    {
      provide: 'jdbPlgBaseApi',
      useClass: JdbPlgBaseService
    },
    JdbPlgBaseService,
    PermissionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
