import { ForgetPassComponent } from './forget-pass/forget-pass.component';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Services/auth-guard.service';
import { LogInComponent } from './log-in/log-in.component';
import { RegestrationComponent } from './regestration/regestration.component';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';


export const AuthRoutes =[
    {path:"login",component:LogInComponent,pathMatch:"full"},
    {path:"register",component:RegestrationComponent,pathMatch:"full"},
    {path:"profile",component:ProfileComponent,pathMatch:"full",canActivate: [AuthGuard]},
    {path:"setting",component:SettingComponent,pathMatch:"full",canActivate: [AuthGuard]},
    {path:"forgetpass",component:ForgetPassComponent,pathMatch:"full"},

  ]