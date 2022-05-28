import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-educational-library',
  templateUrl: './educational-library.component.html',
  styleUrls: ['./educational-library.component.css']
})
export class EducationalLibraryComponent implements OnInit {
  private subscriptions:Subscription[]=[];
  progressRef: NgProgressRef;
  imageHost = environment.imageUrl;
  forexTraining:any[]=[]; 
  Books:any[]=[];


  constructor(private apiservice:ApiService,private progress: NgProgress) {
    this.progressRef = this.progress.ref('myProgress');

   }

  ngOnInit(): void {
   
  }


}





