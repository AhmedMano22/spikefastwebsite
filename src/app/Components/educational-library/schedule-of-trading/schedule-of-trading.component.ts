import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';
import { format } from 'date-fns';
import swal from "sweetalert2";
@Component({
  selector: 'app-schedule-of-trading',
  templateUrl: './schedule-of-trading.component.html',
  styleUrls: ['./schedule-of-trading.component.css'],
  // host: {
  //   '[class.card]': `true`,
  //   '[class.text-center]': `true`,
  // },
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleOfTradingComponent implements OnInit {
  private subscriptions:Subscription[]=[];
  private userTest = { forex_training_Id: '', user_Id: '' ,statue:'' };
  progressRef: NgProgressRef;
  imageHost = environment.imageUrl;
  showPopUp:boolean=false;
  userAlresdyLogedIn:any='';
  page: number = 1;
  taskArr:any[]=[];
  taskArrlength:number=0;
  // ~~~~~~~~CountDown Timer~~~~~~~~
  config: CountdownConfig = {
    leftTime: 60 * 60 * 24 * 365 * (2050 - 1970),
    // stopTime
    format: 'yyyy-MM-dd E HH:mm:ss a',
    formatDate: ({ date, formatStr }) => format(date,formatStr),
  };

  constructor(private apiService: ApiService, private progress: NgProgress,private router:Router) {
    this.progressRef = this.progress.ref('myProgress');
    this.userAlresdyLogedIn =  localStorage.getItem('token');
  }

   ngOnInit(): void {
      this.progressRef.start();
      this.GetDataPagination(1);
    }

    GetDataPagination(page: any) {
      this.progressRef.start();
      this.subscriptions.push(this.apiService.GetAll("forex_training",page,10).subscribe(
        res => {
          let resources: any[] = res["data"];
          this.taskArr = resources;
          this.taskArrlength = res["totalRecords"];
          this.progressRef.complete();
    }))
  }

  logBeforeEnrolled(){

    if(this.userAlresdyLogedIn){
      this.router.navigate(['/home']);
    }else{

      this.showPopUp=true;
    }
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
      this.router.navigate(['/user/login']);
    }

  }
}

