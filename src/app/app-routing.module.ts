import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './Components/Analysis/analysis.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AuthGuard } from './Services/auth-guard.service';


const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent,pathMatch:"full"},
  {path:"analysis",component:AnalysisComponent,pathMatch:"full"},

  {path:'user',loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule)},
  {path:'spike',loadChildren: () => import('./Components/components.module').then(m => m.ComponentsModule)},
  {path:"**",redirectTo:"home",pathMatch:"full"},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
