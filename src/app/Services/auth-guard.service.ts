import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from "@angular/router";

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  state:any;
  constructor(private router: Router) {   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    if (localStorage.getItem("token") && localStorage.getItem("statue")) {
    
    return true;
    } else {
      this.router.navigate(['/user/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }

  }

}
