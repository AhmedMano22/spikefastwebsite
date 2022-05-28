import { ApiService } from 'src/app/Services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { NotifierService } from "angular-notifier"
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private subscriptions:Subscription[]=[];
  progressRef: NgProgressRef;
  About: any[] | undefined;
  TeamMemmber: any[] | undefined;

  imageHost = environment.imageUrl;

  constructor(private apiservice: ApiService,private progress: NgProgress) {
    this.progressRef = this.progress.ref('myProgress');
   }

  ngOnInit(): void {
    this.progressRef.start();

    this.subscriptions.push(this.apiservice.GetAll("AboutUs",1,10).subscribe(
      res => {
       this.About = res["data"];
      }));
      this.subscriptions.push(this.apiservice.GetAll("TeamMemmber",1,10).subscribe(
        res => {
         this.TeamMemmber = res["data"];
         this.progressRef.complete();
      }));
  }

}
