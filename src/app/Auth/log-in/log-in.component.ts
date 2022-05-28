import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { ToastrService } from 'src/app/Services/toastr.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  progressRef!: NgProgressRef;



  Userform = new FormGroup({

    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

  })

  constructor(private ApiService: ApiService,private progress: NgProgress,
    private router: Router,
    private route: ActivatedRoute,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('myProgress');

  }

  onSubmit(formValue: any) {

    if (this.Userform.valid) {

      this.progressRef.start();
      this.ApiService.login(formValue).subscribe(
        res => {

          let error: any = res.error;


          if (error == 0) {
            this.toastr.success("اهلا بك,",res.email);

            let id: any = res.id;
            let email: any = res.email;
            let token: any = res.token;
            let firstName: any = res["firstName"];
            let lastName: any = res["lastName"];
            let statue: any = res["statue"];
            let image: any = res["image"];
            let phone: any = res["phone"];

            localStorage.setItem("id", id);
            localStorage.setItem("email", email);
            localStorage.setItem("token", token);
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("statue", statue);
            localStorage.setItem("image", image);
            localStorage.setItem("Phone", phone);
            this.progressRef.complete();

            this.router.navigate(['/spike/analysis']).then(() => {
              window.location.reload();
            });


          } else {
            this.progressRef.complete();
            this.toastr.error("البيانات غير صحيحه",error.message);
          }
          


        });

    } else {

      this.toastr.warning("يرجي  ملئ البيانات بشكل صحيح");

    }




  }


}
