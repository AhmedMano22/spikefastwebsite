import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import swal from "sweetalert2";
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  progressRef: NgProgressRef;
  imageHost = environment.imageUrl;
  DetailsId: number = 0;
  page: number = 1;
  id;
  lecture:any[]=[];
  taskArr: any[] = [];
  taskArrimg: any[] = [];
  taskArrlength: number = 0;
  taskArrlengthImg: number = 0;
  filteredAllDiscussion: any[] = [];
  private userTest = { courselist_Id: '', user_Id: '' };
  constructor(
    private apiService: ApiService,
    private progress: NgProgress,
    private route: ActivatedRoute
  ) {
    this.progressRef = this.progress.ref('myProgress');
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.progressRef.start();
    this.route.params.subscribe((params) => {
      this.DetailsId = params['id'];
      console.log(this.DetailsId);

      this.subscriptions.push(
        this.apiService.GetById(this.id, 'blog').subscribe((res) => {
          let resources: any[] = res['data'];
          console.log(resources);
          if (!Array.isArray(resources)) {
            this.taskArr = [resources];
          }
          this.taskArrlength = res['totalRecords'];
          this.progressRef.complete();
        })
      );
/* ////////////////////////////////////////// */
this.subscriptions.push(
  this.apiService.GetAllItemsImages(1,this.id).subscribe(
    (res) => {


      let resources: any[] = res["data"];
      console.log(resources.length);
      this.taskArrimg = resources;
      this.filteredAllDiscussion = resources;
      this.taskArrlengthImg = resources.length;
      this.progressRef.complete();
    }
  )
);

this.subscriptions.push(this.apiService.GetAll("forex_training",1,10).subscribe(
  res => {
    let resources: any[] = res["data"];
    this.lecture = resources.reverse();
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
