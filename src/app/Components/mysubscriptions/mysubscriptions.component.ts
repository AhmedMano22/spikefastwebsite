import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

import { ApiService } from '../../Services/api.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-mysubscriptions',
  templateUrl: './mysubscriptions.component.html',
  styleUrls: ['./mysubscriptions.component.css']
})
export class MysubscriptionsComponent implements OnInit {


  private subscriptions: Subscription[] = [];
  taskArr: any[];
  taskArrD: any[];
  mainid: any;
  taskid: any;
  currentPage: string = "list";
  imgSrc: string = "assets/images/image-placeholder.jpg";
  imgPath: string = '';
  page: number = 1;
  selectedImage: any = null;
  isSubmitted: boolean;
  taskArrlength: any;
  loading: boolean = false;
  imageHost = environment.imageUrl;

  progressRef: NgProgressRef;
userID;
courselist: any[] = [];
copyservices: any[] = [];
spicialanalysis: any[] = [];
automated: any[] = [];
forex: any[] = [];


taskArrlengthCourse: any;
taskArrlengthcopyservices: any;
taskArrlengthspicialanalysis: any;
taskArrlengthautomated: any;
taskArrlengthforex: any;
  _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    //this.filteredAllDiscussion = this.listFilter ? this.performFilter(this.listFilter) : this.taskArr;
  }

  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.taskArr.filter((c: any) =>
      c.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  Userform = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    rate: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    award: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
    access: new FormControl('', Validators.required),
    image: new FormControl('',),
    statue: new FormControl('',)
  })

  constructor(
    private apiserv:ApiService,
     private progress: NgProgress
    , private router: Router

    , private route: ActivatedRoute
 ) {


  }


  ngOnInit() {
    this.userID = localStorage.getItem("id");
    this.taskid = this.route.snapshot.paramMap.get("id");
    console.log(this.taskid);

    this.progressRef = this.progress.ref('myProgress');
    this.progressRef.start();
    this.route.params.subscribe((params) => {
      this.taskid = params['id'];
      console.log(this.taskid);

      this.GetDataPagination(1);
      this.progressRef.complete();
    });

  }

  GetDataPagination(page: any) {

    /* ///////// corselist /////////////// */
    this.subscriptions.push(this.apiserv.Get_Course_List_Subscription_ByUserID(this.userID).subscribe(
      res => {
        let resources: any[] = res["data"];

        this.courselist = resources;
        this.taskArrlengthCourse = res["totalRecords"];
        this.progressRef.complete();
      }));


/* ///////// Special_analysis /////////////// */
 this.subscriptions.push(this.apiserv.Get_Subscriptions_analysis_ByUserID(this.userID).subscribe(
        res => {
          console.log(res);

          let resources: any[] = res["data"];

          this.spicialanalysis = resources;
          this.taskArrlengthspicialanalysis = res["totalRecords"];
          this.progressRef.complete();
        }));




         /* ///////// forex_training /////////////// */
      this.subscriptions.push(this.apiserv.Get_forex_training_Subscription_ByUserID(this.userID).subscribe(
        res => {
          let resources: any[] = res["data"];

          this.forex = resources;
          this.taskArrlengthforex = res["totalRecords"];
          this.progressRef.complete();
        }));



        /* ///////// Automated_trading /////////////// */
      this.subscriptions.push(this.apiserv.Get_Automated_trading_ByUserID(this.userID).subscribe(
        res => {
          let resources: any[] = res["data"];

          this.automated = resources;
          this.taskArrlengthautomated = res["totalRecords"];
          this.progressRef.complete();
        }));



            /* ///////// copyservice /////////////// */
           this.subscriptions.push(this.apiserv.Get_CopyService_Subscription_ByUserID(this.userID).subscribe(
            res => {
              let resources: any[] = res["data"];

              this.copyservices = resources;
              this.taskArrlengthcopyservices = res["totalRecords"];
              this.progressRef.complete();
            }));

  }
}
