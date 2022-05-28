import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import swal from "sweetalert2";
@Component({
  selector: 'app-copservice-details',
  templateUrl: './copservice-details.component.html',
  styleUrls: ['./copservice-details.component.css']
})
export class CopserviceDetailsComponent implements OnInit {
  private userTest = { courselist_Id: '', user_Id: '' };
  private subscriptions:Subscription[]=[];
  progressRef: NgProgressRef;
  imageHost = environment.imageUrl;
  DetailsId:number=0;
  page: number = 1;
  id;
  taskArr:any[]=[];
  taskArrlength:number=0;

  constructor(private apiService: ApiService, private progress: NgProgress,private route: ActivatedRoute) {
    this.progressRef = this.progress.ref('myProgress');
    this.id = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.progressRef.start();
    this.route.params.subscribe(params => {
      this.DetailsId = params['id'];
      console.log(this.DetailsId);

      this.subscriptions.push(this.apiService.GetById(this.id,'CopyServices').subscribe(
        res => {


          let resources: any[] = res["data"];
          console.log(resources);
         // this.taskArr = resources;
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
