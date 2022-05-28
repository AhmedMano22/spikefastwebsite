import { Component, OnInit,HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  

  enrolled:any;
  imageHost = environment.imageUrl;
  id:any;
  name:string;
  email:any;
  image:any;
  header_variable=false; 
  constructor(private router:Router,public translate:TranslateService) 
  {
    this.name = localStorage.getItem('firstName') + " " +localStorage.getItem('lastName');
    this.id =  localStorage.getItem('id');
    this.email =  localStorage.getItem('email');
    this.image =  localStorage.getItem('image');
    this.enrolled =  localStorage.getItem('token');

  }

  ngOnInit() {}
  
  @HostListener("document:scroll")
  scrollfuction(){
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
      this.header_variable=true;
    }else{
      this.header_variable=false;
    }
  }

  logout(){
    
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });

  }

}
