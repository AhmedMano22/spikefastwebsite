import { TranslateService } from '@ngx-translate/core';
import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegestrationComponent } from './regestration/regestration.component';
import { LogInComponent } from './log-in/log-in.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { AuthRoutes } from './Auth.Routes';
// import shared module
import { LayoutsModule } from '../../app/Layouts/layouts.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    LogInComponent,
    RegestrationComponent,
    ProfileComponent,
    SettingComponent,
    ForgetPassComponent
    
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    RouterModule.forChild(AuthRoutes),
    TranslateModule.forRoot({
      defaultLanguage:'ar',
      loader:{
        provide:TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[HttpClient]
      }
    })
    
    ]
})
export class AuthModule { }


export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}

