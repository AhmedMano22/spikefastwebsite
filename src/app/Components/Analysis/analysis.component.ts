import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import swal from "sweetalert2";


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  private subscriptions:Subscription[]=[];
  progressRef: NgProgressRef;
  imageHost = environment.imageUrl;
  EntityStatue:number=1 ;
  page: number = 1;
  taskArr:any[]=[];
  taskArrlength:number=0;
  lecture:any[]=[];
  private userTest = { forex_training_Id: '', user_Id: '' ,statue:'' };
  constructor(private apiService: ApiService, private progress: NgProgress,private route: ActivatedRoute) {
    this.progressRef = this.progress.ref('myProgress');
  }

  ngOnInit(): void {
    this.progressRef.start();
    this.route.params.subscribe(params => {
      this.EntityStatue = params['statue'];
      this.GetDataPagination(1);
    });

  }

  GetDataPagination(page: any) {
    this.progressRef.start();
    this.subscriptions.push(this.apiService.getAnalysisOrBlog(this.EntityStatue,page,10).subscribe(
      res => {
        let resources: any[] = res["data"];
        this.taskArr = resources;
        this.taskArrlength = res["totalRecords"];
        this.progressRef.complete();
      }))
      this.subscriptions.push(this.apiService.GetAll("forex_training",1,10).subscribe(
        res => {
          let resources: any[] = res["data"];
          this.lecture = resources.reverse();
          this.taskArrlength = res["totalRecords"];
          this.progressRef.complete();
    }))

  }
  create(id) {
    let statue = localStorage.getItem("statue");
    if(statue){
      this.userTest.forex_training_Id = id;
      this.userTest.statue = '1';
      this.userTest.user_Id = JSON.parse(localStorage.getItem('id')!);
      this.apiService
        .create_forix_subscription(this.userTest).subscribe((res) => {
          console.log(res);

          let error: any = res.error;
          if (error == 1) {
            swal.fire(
              ' ',
              'لقد تم الاشتراك في هذه الخدمه من قبل سوف يتم التواصل معك قريبا',
              'error'
            );
          } else {
            swal.fire(
              'اهلا وسهلا',
              'تم ارسال طلبك بالاشتراك سوف يتم التواصل معك في خلال 24 ساعه',
              'success'
            );
          }
        });
    }
    else{
      swal.fire(
        ' عذرا',
        'يجب تسجيل الدخول اولا',
        'error'
      );
    //  this.router.navigate(['/user/login']);
    }

  }

}
