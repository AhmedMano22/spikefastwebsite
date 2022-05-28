import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/Models/User';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { ToastrService } from 'src/app/Services/toastr.service';


@Component({
  selector: 'app-regestration',
  templateUrl: './regestration.component.html',
  styleUrls: ['./regestration.component.css']
})
export class RegestrationComponent implements OnInit {

  


  taskArr: any[] | undefined;
  taskArrD: any[] | undefined;
  mainid: any;
  taskid: any;
  imgSrc: string = "assets/images/image-placeholder.jpg";
  imgPath: string | undefined;
  p: number = 1;
  selectedImage: any = null;
  isSubmitted: boolean | undefined;
  taskArrlength: any;
  imageHost = environment.imageUrl;
  progressRef!: NgProgressRef;



  Userform = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    statue: new FormControl('',),
    image: new FormControl('',),

    

  })

  constructor(
    private ApiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr:ToastrService,
    private progress: NgProgress) {}

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');

  }


  onSubmit(formValue: User) {

    if (this.Userform.valid) {

      formValue["image"] = this.imgPath;
      this.progressRef.start();
      this.ApiService.CreateUser(formValue).subscribe(
        res => { 
            let data:any=res.data
            let token: any = res['token'];
            let id: any = data['id'];
            let email: any = data['email'];   
            let firstName: any = data["firstName"];
            let lastName: any = data["lastName"];
            let address: any = data["address"];
            let statue: any = data["statue"];
            let image: any = data["image"];
            let phone: any = data["phone"];

            localStorage.setItem("id", id);
            localStorage.setItem("email", email);
            localStorage.setItem("token", token);
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("address", address);
            localStorage.setItem("statue", statue);
            localStorage.setItem("image", image);
            localStorage.setItem("Phone", phone);

            this.progressRef.complete();
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });


        },error =>{
          this.toastr.error("هذا الحساب مسجل بالفعل");
          this.progressRef.complete();

        });
    } else {
      this.toastr.warning("يرجي ملئ البيانات بشكل صحيح");
    }

  }




  // resetForm() {
  //   this.Userform.reset();
  //   this.imgSrc = "assets/images/image-placeholder.jpg";
  //   this.selectedImage = null;
  //   this.isSubmitted = false;
  // }




  showPreview(event: any) {

    if (event.target.files && event.target.files[0]) {
      
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
       this.progressRef.start();

      this.ApiService.UploadsPost(this.selectedImage).subscribe(
        res => {

          let filePath: any = res["filePath"];
          this.imgPath = filePath
          this.isSubmitted = true
          this.progressRef.complete();

        });

    }
    else {
      this.imgSrc = "assets/images/image-placeholder.jpg";
      this.selectedImage = null;
    }
  }
}
