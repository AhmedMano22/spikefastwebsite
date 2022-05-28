import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../Layouts/header/header.component';
import { FooterComponent } from '../Layouts/footer/footer.component';

// import shared libarary
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from "@angular/common/http";
// Angular Progressbar Core

import { NgProgressModule } from '@ngx-progressbar/core';

// Angular Progressbar router module



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule ,FormsModule,ReactiveFormsModule ,HttpClientModule ,
    NgProgressModule.withConfig({
    }),
  ],exports :[
   
    FormsModule,ReactiveFormsModule ,HttpClientModule ,NgProgressModule
  ]
})
export class LayoutsModule { }
