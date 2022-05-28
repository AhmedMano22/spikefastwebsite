import { environment } from './../../../environments/environment';
import { ApiService } from 'src/app/Services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-memmber',
  templateUrl: './team-memmber.component.html',
  styleUrls: ['./team-memmber.component.css']
})
export class TeamMemmberComponent implements OnInit {

  TeamMemmber: any[] | undefined;

  imageHost = environment.imageUrl;

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {

    this.ApiService.GetAll("TeamMemmber",1,10).subscribe(
      res => {
        this.TeamMemmber = res["data"];
      });
  }
}
