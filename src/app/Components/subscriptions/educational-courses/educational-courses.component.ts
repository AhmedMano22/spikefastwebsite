import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { NavigationEnd, NavigationStart, Params, Router } from '@angular/router';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import swal from "sweetalert2";
@Component({
  selector: 'app-educational-courses',
  templateUrl: './educational-courses.component.html',
  styleUrls: ['./educational-courses.component.css'],
})
export class EducationalCoursesComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  progressRef: NgProgressRef;
  imageHost = environment.imageUrl;
  page: number = 1;
  taskArr: any[] = [];
  taskArrlength: number = 0;
  private userTest = { courselist_Id: '', user_Id: '' ,statue:'' };
  constructor(
    private apiService: ApiService,
    private progress: NgProgress,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.progressRef = this.progress.ref('myProgress');
  }

  ngOnInit(): void {
    this.progressRef.start();
    this.GetDataPagination(1);
  }

  GetDataPagination(page: any) {
    this.progressRef.start();
    this.subscriptions.push(
      this.apiService.GetAll('Courselist', page, 10).subscribe((res) => {
        let resources: any[] = res['data'];
        this.taskArr = resources;
        this.taskArrlength = res['totalRecords'];
        this.progressRef.complete();
      })
    );
  }

  create(id) {
    let statue = localStorage.getItem("statue");
    if(statue){
      this.userTest.courselist_Id = id;
      this.userTest.statue = '1';
      this.userTest.user_Id = JSON.parse(localStorage.getItem('id')!);
      this.apiService
        .create_Coruse_subscription(this.userTest)
        .subscribe((res) => {
          console.log(res);

          let error: any = res.error;
          if (error == 1) {
            swal.fire(
              ' ',
              '?????? ???? ???????????????? ???? ?????? ???????????? ???? ?????? ?????? ?????? ?????????????? ?????? ??????????',
              'error'
            );
          } else {
            swal.fire(
              '???????? ??????????',
              '???? ?????????? ???????? ?????????????????? ?????? ?????? ?????????????? ?????? ???? ???????? 24 ????????',
              'success'
            );
          }
        });
    } else{
      swal.fire(
        ' ????????',
        '?????? ?????????? ???????????? ????????',
        'error'
      );
      this.router.navigate(['/user/login']);
    }

  }
}
