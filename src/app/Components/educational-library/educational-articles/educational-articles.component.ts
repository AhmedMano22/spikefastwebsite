import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import {
  NavigationEnd,
  NavigationStart,
  Params,
  Router,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'app-educational-articles',
  templateUrl: './educational-articles.component.html',
  styleUrls: ['./educational-articles.component.css'],
})
export class EducationalArticlesComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  progressRef: NgProgressRef;
  imageHost = environment.imageUrl;
  EntityName: string = 'blog';
  EntityStatue: number = 1;
  page: number = 1;
  taskArr: any[] = [];
  taskArrlength: number = 0;
  lecture:any[]=[];
  forexTraining: any[] = [];
  blogStatus;
  private userTest = { forex_training_Id: '', user_Id: '' ,statue:'' };
  constructor(
    private apiService: ApiService,
    private progress: NgProgress,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.progressRef = this.progress.ref('myProgress');
    this.blogStatus = this.route.snapshot.paramMap.get('statue');
    console.log(this.blogStatus);
  }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('myProgress');
    this.progressRef.start();
    this.route.params.subscribe((params) => {
      this.EntityStatue = params['statue'];
      console.log(this.EntityStatue);

      this.GetDataPagination(1);
      this.progressRef.complete();
    });
  }

  GetDataPagination(page: any) {
    this.progressRef.start();
    this.subscriptions.push(
      this.apiService
        .GetAllByStatue('blog', this.EntityStatue, page, 10)
        .subscribe((res) => {
          let resources: any[] = res['data'];
          this.taskArr = resources;
          this.taskArrlength = res['totalRecords'];
          this.progressRef.complete();
        })
    );
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
