import { ToastrService } from './../../Services/toastr.service';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from './../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  progressRef: NgProgressRef;
  private subscriptions:Subscription[]=[];
  // id:any;
  // email:any;
  About: any[] =[];

  contactForm = new FormGroup({
    title: new FormControl('', Validators.required),
    mess: new FormControl('', Validators.required),
    phone: new FormControl('',),
    email: new FormControl('',),
    user_Id: new FormControl('',),





  })
  constructor(
    public translate:TranslateService,
    private ApiService: ApiService,
    private router: Router,
    private toastr:ToastrService,
    private progress: NgProgress)
  {
    this.progressRef = this.progress.ref('myProgress');

    // this.email =  localStorage.getItem('email');
    // this.id =  localStorage.getItem('id');
  }

  ngOnInit(): void {
    this.subscriptions.push(this.ApiService.GetAll("AboutUs",1,10).subscribe(
      res => {
       this.About = res["data"];
      }));
  }

  // onSend(messageValue: any) {
  //   this.progressRef.start();

  //   if (this.contactForm.valid) {


  //     this.ApiService.Create(messageValue,"ContactUs").subscribe(
  //       res => {


  //         this.toastr.success(res.title,"Sent Successfully");
  //         this.contactForm.reset();


  //         this.progressRef.complete();
  //       });
  //   } else {
  //     this.toastr.error('Ops!',"please fail out all feilds");

  //   }

  // }



  onSend(messageValue){

    if (this.contactForm.valid) {
      this.progressRef.start();
      messageValue["user_Id"]=0;
      this.subscriptions.push(this.ApiService.Create(messageValue,'ContactUs').subscribe(
        res => {

          this.toastr.success(res.title,"Sent Successfully");
          this.contactForm.reset();


          this.progressRef.complete();



          }))

     }else{

      this.toastr.error('Ops!',"please fail out all feilds");

     }

 }

}
