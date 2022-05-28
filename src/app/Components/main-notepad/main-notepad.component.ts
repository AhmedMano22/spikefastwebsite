import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-notepad',
  templateUrl: './main-notepad.component.html',
  styleUrls: ['./main-notepad.component.css']
})
export class MainNotepadComponent implements OnInit {
  private subscriptions:Subscription[]=[];
  progressRef: NgProgressRef;
  currentPage:any="Crypto";
  page: number = 1;
  taskArr:any[]=[];
  taskArrlength:number=0;

  constructor(private apiService:ApiService,private progress: NgProgress) { 
    this.progressRef = this.progress.ref('myProgress');

  }

  ngOnInit(): void {
    this.progressRef.start();
    this.changePage("Crypto");
    this.GetDataPagination(1);
   
  }

  GetDataPagination(page: any) {
    this.progressRef.start();
    this.subscriptions.push(this.apiService.GetAll('economic_calendar',page,10).subscribe(
      res => {
        let resources: any[] = res["data"];
        this.taskArr = resources;
        this.taskArrlength = res["totalRecords"];
        this.progressRef.complete();
      }))
    
  }


  changePage(page:string){
    this.currentPage=page;
  }

  

}
