import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../Services/api.service';
import { MyModalComponent } from '../../my-modal/my-modal.component';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-private-analysis',
  templateUrl: './private-analysis.component.html',
  styleUrls: ['./private-analysis.component.css']
})
export class PrivateAnalysisComponent implements OnInit {


  private subscriptions: Subscription[] = [];
  taskArr: any[];
  taskArrD: any[];
  mainid: any;
  taskid: any;
  currentPage: string = "list";
  imgSrc: string = "assets/images/image-placeholder.jpg";

  page: number = 1;
  selectedImage: any = null;
  isSubmitted: boolean;
  taskArrlength: any;
  loading: boolean = false;
  imageHost = environment.imageUrl;
  EntityName: string = "Special_analysis";
  private userTest = { analysis_id: '', user_Id: '' ,statue:'' };
 ServicePrice;
 totalPakages;
  analysis:any;
  closeModal: string;

  _listFilter = '';
  filteredAllDiscussion: any[] = [];
  filteredAllDiscussion2: any[] = [];
  filteredAllDiscussion3: any[] = [];
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAllDiscussion = this.listFilter ? this.performFilter(this.listFilter) : this.taskArr;
  }

  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.taskArr.filter((c: any) =>
      c.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  catid;
  Userform = new FormGroup({
    currency: new FormControl('', Validators.required),
    cat_id: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required),
    total_cost: new FormControl(0),
    total_package: new FormControl(0 ),

  })
  Userform2 = new FormGroup({
    currency: new FormControl(''),
    cat_id: new FormControl(''),
    cost: new FormControl(''),
    total_cost: new FormControl(''),
    total_package: new FormControl(''),

  })

  constructor(
    private dialog: MatDialog,
    private ApiService: ApiService
    , private progress: NgProgress
    , private router: Router,
    private  dialogRef : MatDialog,
    private modalService: NgbModal
    , private route: ActivatedRoute
  ) {}
  openDialog(){
    this.dialogRef.open(MyModalComponent,{
      data : {
        name : 'Samuel'
      }
    })

  }


  ngOnInit() {

    this.GetDataPagination();

  }

  GetDataPagination() {


    this.subscriptions.push(this.ApiService.GetAllspecialAnalysis(1).subscribe(
      res => {



        let resources: any[] = res["data"];
        this.taskArr = resources;
        this.filteredAllDiscussion = resources;
        this.taskArrlength = res["totalRecords"];

      }));

      this.subscriptions.push(this.ApiService.GetAllspecialAnalysis(2).subscribe(
        res => {



          let resources: any[] = res["data"];
          this.taskArr = resources;
          this.filteredAllDiscussion2 = resources;
          this.taskArrlength = res["totalRecords"];

        }));
        this.subscriptions.push(this.ApiService.GetAllspecialAnalysis(3).subscribe(
          res => {



            let resources: any[] = res["data"];
            this.taskArr = resources;
            this.filteredAllDiscussion3 = resources;
            this.taskArrlength = res["totalRecords"];

          }));



       this.subscriptions.push(this.ApiService.Get_Special_analysisByID(1).subscribe(
          data =>
          {
               this.analysis = data["data"];

               console.log(this.analysis);

          },
           err => console.error(err),
           () => console.log('completed')
      ) )


  }



  create(id)
  {
    let statue = localStorage.getItem("statue");
    if(statue){
      this.userTest.analysis_id = id;
      this.userTest.statue = '1';
      this.userTest.user_Id = JSON.parse(localStorage.getItem('id')!) ;
      this.ApiService.create_user_Subscrip(this.userTest).subscribe((res) => {
        console.log(res);
        let error: any = res.error;
        if (error == 1)
         {
           swal.fire('اهلا وسهلا', 'لقد تم الاشتراك في هذه الخدمه من قبل سوف يتم التواصل معك قريبا', 'error');
         }

   else {
        swal.fire('اهلا وسهلا', 'تم ارسال طلبك بالاشتراك سوف يتم التواصل معك في خلال 24 ساعه', 'success');
        }

  });
}else{
  swal.fire(
    ' عذرا',
    'يجب تسجيل الدخول اولا',
    'error'
  );
  this.router.navigate(['/user/login']);
}


}

  showPage(page: string) {
    this.currentPage = page;
    this.ngOnInit()

  }

  demand = new FormGroup({
    item_for: new FormControl(""),
    category_Id: new FormControl(""),
    is_paid: new FormControl(""),
  });


  ngOnDestory() {
    for (const subscribtion of this.subscriptions) {
      subscribtion.unsubscribe();
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  onSubmit2(formValue) {
    // this.progressRef = this.progress.ref("myProgress");
    // this.progressRef.start();

    // this.catId = formValue["category_Id"];
    // this.Paid = formValue["is_paid"];
    // this.selectedFor = formValue["item_for"];

    // this.ApiService.GetAllItemsByFiltering(
    //   11,
    //   this.catId,
    //   this.Paid,
    //   this.selectedFor
    // ).subscribe((res) => {
    //   let resources: any[] = res["data"];

    //   this.taskArr = resources;
    //   this.filteredAllDiscussion = resources;
    //   this.taskArrlength = resources.length;
    //   this.progressRef.complete();

    //   this.resetForm();

    //   this.currentPage = "list";
    // });
  }
  triggerModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }


}
