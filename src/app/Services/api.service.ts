import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http'
import { Observable, of, throwError, } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  endpoint = environment.apiHost;
  user_id: string|undefined;
  token: string|undefined;

  constructor(private http: HttpClient) {

   }

   httpOptions = {
    headers: new HttpHeaders({
      'content': 'application/json',
      'Authorization': 'Bearer'+' '+ localStorage.getItem("token"),
    })
  }



  getAnalysisOrBlog(statue:any,pageNum:number,pageSiz:number): Observable<any> {
    return this.http.get(this.endpoint +'/api/blog/GetAll?statue='+statue+'&PageNumber='+pageNum+'&PageSize='+pageSiz,this.httpOptions).pipe(
      catchError(
        (err)=>
        {
          return throwError(()=>(err.message));
        }
      )
    );
  }
  GetAll_Subscriptions_analysisByID(id): Observable<any> {
    return this.http.get(this.endpoint + `/api/Subscriptions/GetAll_Subscriptions_analysis_id/${id}`, this.httpOptions);
  }
  GetAllspecialAnalysis(catID,pageNumber?,pageSize?): Observable<any> {
    return this.http.get(this.endpoint + `/api/Special_analysis/GetAll/${catID}`, this.httpOptions).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    );
  }
  Get_Special_analysisByID(id): Observable<any> {
    return this.http.get(this.endpoint + `/api/Special_analysis/GetById/${id}`, this.httpOptions);
  }
  GetAll(EntityName:string,pageNumber:number,pageSize:number): Observable<any> {

    // console.log(this.endpoint + '/api/'+EntityName+'/GetAll?pageNumber='+pageNumber+'&pageSize='+pageSize);

    return this.http.get(this.endpoint +'/api/'+EntityName+'/GetAll?pageNumber='+pageNumber+'&pageSize='+pageSize).pipe(
      catchError(
        (err)=>
        {
          return throwError(()=>(err.message));
        }
      )
    );
  }

  GetAllByStatue(EntityName:string,Statue:number,pageNumber:number,pageSize:number): Observable<any> {
    // return this.http.get(this.endpoint + '/api/'+EntityName+'/GetAll_by_statue?statue='+Statue+'&pageNumber='+pageNumber+'&pageSize='+pageSize, this.httpOptions).pipe(

    return this.http.get(this.endpoint + '/api/'+EntityName+'/GetAll?statue='+Statue+'&pageNumber='+pageNumber+'&pageSize='+pageSize, this.httpOptions).pipe(
      catchError(
        (err)=>
        {
          return throwError(()=>(err.message));
        }
      )
    );
  }


  GetAllCompanies(statue,pageNumber,pageSize): Observable<any> {
    return this.http.get(this.endpoint + '/api/Companies/GetAllbystatue?statue='+statue+'&PageNumber='+pageNumber+'&PageSize='+pageSize, this.httpOptions).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    );
  }
  GetAllBlogByStatue(EntityName:string,Statue:number): Observable<any> {
    // return this.http.get(this.endpoint + '/api/'+EntityName+'/GetAll_by_statue?statue='+Statue+'&pageNumber='+pageNumber+'&pageSize='+pageSize, this.httpOptions).pipe(

    return this.http.get(this.endpoint + '/api/'+EntityName+'/GetAll?statue='+Statue, this.httpOptions).pipe(
      catchError(
        (err)=>
        {
          return throwError(()=>(err.message));
        }
      )
    );
  }

  GetById(id:any,EntityName:string): Observable<any> {
    return this.http.get(this.endpoint + '/api/'+ EntityName +'/GetById/'+ id , this.httpOptions).pipe(
      catchError(
        (err)=>
        {
          return throwError(()=>(err.message));
        }
      )
    );
  }

  Create(body:any,EntityName:string): Observable<any> {

    return this.http.post(this.endpoint + '/api/'+ EntityName +'/Create', body, this.httpOptions).pipe(
      catchError(
        (err)=>
        {
          return throwError(()=>(err.message));
        }
      )
    )
  }

  Update(body:any, id:number,EntityName:string): Observable<any> {

    return this.http.put(this.endpoint + '/api/'+ EntityName +'/Update/'+id, body, this.httpOptions).pipe(
      catchError(
        (err)=>
        {
          return throwError(()=>(err.message));
        }
      )
    )
  }



/*************************************User*******************************************/

  CreateUser(body:User): Observable<any> {
    return this.http.post(this.endpoint +'/api/User/Register', body, this.httpOptions)
  }

  login(body: User): Observable<User> {
    return this.http.post<User>(this.endpoint +'/api/User/login', body, this.httpOptions)
  }


  loginAdmin(body:User): Observable<any> {

    return this.http.post(this.endpoint + '/api/User/loginAdmin', body, this.httpOptions)
  }

  GetByIdUser(id): Observable<User> {
    return this.http.get<User>(this.endpoint + `/api/User/GetById/${id}`, this.httpOptions).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    );;
  }


  UpdateUser(body, id): Observable<any> {

    return this.http.put(this.endpoint + `/api/User/Update/${id}`, body, this.httpOptions).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    );
  }
// **************************Upload Image***********************************************
  UploadsPost(selectedImage:any): Observable<any> {

    const formData = new FormData();
    formData.append("myFile", selectedImage);

    return this.http.post(this.endpoint + '/api/Uploads/Post', formData, this.httpOptions)
  }

/* ////////////////////////////////// */
create_user_Subscripton(body): Observable<any> {
  return this.http.post(this.endpoint + `/api/CopyServices_Subscriptions/Create`,body, this.httpOptions);
}

create_user_SubscriptonAuto(body): Observable<any> {
  return this.http.post(this.endpoint + `/api/Automated_trading_Subscriptions/Create`,body, this.httpOptions);
}
create_user_Subscrip(body): Observable<any> {
  return this.http.post(this.endpoint + `/api/Subscriptions/Create`,body, this.httpOptions);
}
create_Coruse_subscription(body): Observable<any> {
  return this.http.post(this.endpoint + `/api/Courselist_Subscriptions/Create`,body, this.httpOptions);
}
create_forix_subscription(body): Observable<any> {
  return this.http.post(this.endpoint + `/api/forex_training_Subscription/Create`,body, this.httpOptions);
}
GetAllItemsImages( statue,blogID):Observable<any> {

  return this.http.get(this.endpoint+'/api/BlogImages/GetAllByStatue?statue='+statue+'&blog_id='+blogID,this.httpOptions).pipe(
    // retry(2),
    // delay(1000),
    catchError(
      (err)=>
      {
        return throwError(err.message ||'Unstable Connection');
      }
    )
  );
}

Get_Course_List_Subscription_ByUserID(id): Observable<any> {
  return this.http.get(this.endpoint + `/api/Courselist_Subscriptions/GetAll_Courselist_Subscriptions_User_id/${id}`, this.httpOptions);
}
Get_CopyService_Subscription_ByUserID(id): Observable<any> {
  return this.http.get(this.endpoint + `/api/CopyServices_Subscriptions/GetAll_CopyServices_Subscriptions_User_id/${id}`, this.httpOptions);
}
Get_forex_training_Subscription_ByUserID(id): Observable<any> {
  return this.http.get(this.endpoint + `/api/forex_training_Subscription/GetAll_forex_training_Subscription_User_id/${id}`, this.httpOptions);
}
Get_Subscriptions_analysis_ByUserID(id): Observable<any> {
  return this.http.get(this.endpoint + `/api/Subscriptions/GetAll_Subscriptions_User_id/${id}`, this.httpOptions);
}
Get_Automated_trading_ByUserID(id): Observable<any> {
  return this.http.get(this.endpoint + `/api/Automated_trading_Subscriptions/GetAll_Automated_trading_Subscriptions_User_id/${id}`, this.httpOptions);
}
}
