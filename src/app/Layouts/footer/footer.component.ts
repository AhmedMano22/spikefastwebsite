import { ApiService } from 'src/app/Services/api.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  email:any;
  subscriptions: Subscription[] = [];
  currentPage: string = "list";
  imgSrc: string = "assets/images/image-placeholder.jpg";
  p: number = 1;
  selectedImage: any = null;
  isSubmitted: boolean;
  taskArrlength: any;
  loading: boolean = false;
  taskArr: any[];
  taskArrD: any[];
  filteredAllDiscussion: any[] = [];

  constructor(public translate:TranslateService, private apiservice:ApiService) {
    this.email =  localStorage.getItem('email');
  }

  ngOnInit(): void {
    this.subscriptions.push(this.apiservice.GetAll('AboutUs', 1, 20).subscribe(
      res => {
        let resources: any[] = res["data"];
        this.taskArr = resources;
        this.filteredAllDiscussion = resources;
        this.taskArrlength = resources.length;

        this.taskArrD = resources[0];
      }
    )

    )

}
}
