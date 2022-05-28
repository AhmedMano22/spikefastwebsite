import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/Models/User';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {




  private subscriptions:Subscription[]=[];
  taskArrD:User[];

  imageHost = environment.imageUrl;
  progressRef: NgProgressRef;
  currentPage: string = "list";
  imgSrc: string = "assets/images/image-placeholder.jpg";
  p: number = 1;
  selectedImage: any = null;
  isSubmitted: boolean;
  imgPath: string ;
  loading: boolean = false;
  user_id

  Userform = new FormGroup({

    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('',),
    statue: new FormControl('',),
    image: new FormControl('', ),

  })
  constructor(

    private userService:ApiService
    ,private progress: NgProgress
    ,private router:Router

    , private route: ActivatedRoute
    ,private uploadService:ApiService) {


    this.user_id =localStorage.getItem("id");

    this.firstName = localStorage.getItem('firstName') ;
    this.lastName =  localStorage.getItem('lastName');
    this.email =  localStorage.getItem('email');
    this.image =  localStorage.getItem('image');
    this.phone =  localStorage.getItem('Phone');

  }

  firstName;lastName ;email; phone; image ;
  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
    this.progressRef.start();

  this.subscriptions.push( this.userService.GetByIdUser(this.user_id).subscribe(
     res => {

       let resources: User[] = res["data"];
       this.taskArrD = resources

       this.Userform.setValue({
        firstName: this.taskArrD['firstName'],
        lastName: this.taskArrD['lastName'],
        phone: this.taskArrD['phone'],
        email: this.taskArrD['email'],
        statue: this.taskArrD['statue'],
        image: this.taskArrD['image'],
        password: '',
       });

       this.imgPath=this.taskArrD['image']
       this.imgSrc= this.imageHost + this.taskArrD['image']
       this.progressRef.complete();

     }))



    }


  onUpdate(formValue) {


    if (this.Userform.valid) {
      this.progressRef.start();
      formValue["image"]=this.imgPath;

     this.subscriptions.push( this.userService.UpdateUser(formValue,this.user_id).subscribe(
        res => {
          let resources: User[] = res["data"];

              localStorage.setItem("email", resources['email']);
              localStorage.setItem("firstName", resources['firstName']);
              localStorage.setItem("lastName", resources['lastName']);
              localStorage.setItem("image", resources['image']);
              localStorage.setItem("Phone", resources['phone']);

              swal.fire('', 'تم التعديل بنجاح', 'success');
              this.ngOnInit();
              this.resetForm();

              this.router.navigate(['/user/profile']).then(() => {
                window.location.reload();
              });

          },(error: any) => {
            swal.fire('عذراً ', ' هذاالبريد الالكتروني موجود مسبقاً', 'error');


          }))
     }else{
      swal.fire('عذراً', 'تأكد من ملئ البيانات بشكل صحيح', 'error');


     }


  }





  resetForm() {
    this.Userform.reset();
    this.imgSrc = "assets/images/image-placeholder.jpg";
    this.selectedImage = null;
    this.isSubmitted = false;
  }


  showPreview(event: any) {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.progressRef.start();

      this.subscriptions.push(this.uploadService.UploadsPost(this.selectedImage).subscribe(
        res => {

          let filePath: any = res["filePath"];
          this.imgPath =  filePath
          this.isSubmitted =  true
          this.progressRef.complete();

        }))

    }
    else {
      this.imgSrc = "assets/images/image-placeholder.jpg";
      this.selectedImage = null;
    }
  }


  showPage(page: string) {
    this.currentPage = page;
    this.ngOnInit()
    this.resetForm();

  }

ngOnDestory()
{
  for (const subscribtion of this.subscriptions) {
   subscribtion.unsubscribe();

  }

}
}

