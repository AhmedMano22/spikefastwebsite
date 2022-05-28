import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { NavigationEnd, NavigationStart, Params, Router } from '@angular/router';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-trading-company',
  templateUrl: './trading-company.component.html',
  styleUrls: ['./trading-company.component.css']
})
export class TradingCompanyComponent implements OnInit {
  private subscriptions:Subscription[]=[];
  progressRef: NgProgressRef;
  imageHost = environment.imageUrl;
  EntityName:string="Companies";
  EntityStatue:number=1 ;
  page: number = 1;
  taskArr:any[]=[];
  taskArrlength:number=0;

statue;
  constructor(private apiService: ApiService, private progress: NgProgress,private route: ActivatedRoute) {
    this.progressRef = this.progress.ref('myProgress');
  }

    ngOnInit(): void {
      this.statue = this.route.snapshot.paramMap.get("statue")
      this.progressRef.start();
      this.route.params.subscribe((params) => {
        this.statue = params['statue'];
        this.GetDataPagination(1);
        this.progressRef.complete();
      });
    }

    GetDataPagination(page: any) {
      this.progressRef.start();
      this.subscriptions.push(this.apiService.GetAllCompanies(this.statue,page,10).subscribe(
        res => {
          let resources: any[] = res["data"];
          this.taskArr = resources;
          this.taskArrlength = res["totalRecords"];
          this.progressRef.complete();
        }))

    }

  }

