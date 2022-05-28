import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import swal from "sweetalert2";
@Component({
  selector: 'app-edu-details',
  templateUrl: './edu-details.component.html',
  styleUrls: ['./edu-details.component.css']
})
export class EduDetailsComponent implements OnInit {
  private subscriptions:Subscription[]=[];
  progressRef: NgProgressRef;
  imageHost = environment.imageUrl;
  DetailsId:number=0;
  page: number = 1;
  taskArr:any[]=[];
  taskArrlength:number=0;
  private userTest = { courselist_Id: '', user_Id: '' };
  constructor(private apiService: ApiService, private progress: NgProgress,private route: ActivatedRoute) {
    this.progressRef = this.progress.ref('myProgress');
  }

  ngOnInit(): void {
    this.progressRef.start();
    this.route.params.subscribe(params => {
      this.DetailsId = params['id'];
      this.subscriptions.push(this.apiService.GetById(this.DetailsId,'Courselist').subscribe(
        res => {
          let resources: any[] = res["data"];
          if (!Array.isArray(resources)) {
            this.taskArr = [resources];
          }
          this.taskArrlength = res["totalRecords"];
          this.progressRef.complete();
        }))
    });
  }

  create(id) {
    this.userTest.courselist_Id = id;
    console.log(this.userTest.courselist_Id);
    this.userTest.user_Id = JSON.parse(localStorage.getItem('id')!);
    this.apiService
      .create_Coruse_subscription(this.userTest)
      .subscribe((res) => {
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

}
