import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  private subscriptions:Subscription[]=[];
  progressRef: NgProgressRef;
  Terms:any[]|undefined;
 
  constructor(private apiservice:ApiService,private progress: NgProgress) { 
    this.progressRef = this.progress.ref('myProgress');

  }

  ngOnInit(): void {
    this.progressRef.start();

    this.subscriptions.push(this.apiservice.GetAll("Terms",1,10).subscribe(
      res => {
       this.Terms = res["data"];
       this.progressRef.complete();
      }));

  }
}
