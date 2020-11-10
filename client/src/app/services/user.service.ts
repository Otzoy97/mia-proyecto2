import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:3000/api'
  constructor(private http: HttpClient, private router: Router) { }

  singUp(user :any) {
    return this.http.post<any>(this.URL + '/user/signup',user, {observe: 'response'})
  }
  singIn(user:any) {
    return this.http.post<any>(this.URL +'/user/login', user, {observe:'response'})
  }
  verifyAccount(id:any) {
    return this.http.get(this.URL + `/user/update/account-status/${id}`,{observe: 'response'})
  }
}
