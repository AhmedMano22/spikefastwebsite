import { ApiService } from 'src/app/Services/api.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComponentResolverService implements Resolve<any> {

  constructor(private apiservice:ApiService) { }

  resolve(){
    // return this.apiservice.GetAll("blog").pipe(map(Blogs=>Blogs['data']))
  }
}
