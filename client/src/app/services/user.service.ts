import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
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
  // Reestablecer contraseña
  recoverPassword(id:any, pwd:any) {
    return this.http.put(this.URL + `/user/recover/pwd`,{id,pwd},{observe:'response'})
  }
  // Actualizar contraseña
  updatePassword(pwd:any) {
    let header = new HttpHeaders().set('token', localStorage.getItem('token'))
    return this.http.put(this.URL + '/user/update/pwd',pwd,{observe:'response',headers: header})
  }
  // Actualizar información
  updateInfo(user:any) {
    let header = new HttpHeaders().set('token', localStorage.getItem('token'))
    return this.http.put<any>(this.URL + '/user/update/info',user,{observe:'response',headers: header})
  }
  // Actualizar fotografía
  updatePhoto(photo:File) {
    let formData = new FormData()
    formData.append('photo', photo, photo.name)
    let header = new HttpHeaders().set('token', localStorage.getItem('token'))
    return this.http.put(this.URL + '/user/update/photo',formData,{observe:'response',headers: header})
  }
  // Recuperar información
  getInfo() {
    let header = new HttpHeaders().set('token', localStorage.getItem('token'))

    return this.http.get<any>(this.URL +'/user/info',{observe:'response',headers: header})
  }
  getPhoto() {
    let header = new HttpHeaders().set('token', localStorage.getItem('token'))

    return this.http.get(this.URL +'/user/info/photo',{observe:'response',headers: header, responseType: 'blob'})
  }
  // Enviar recuperación de contraseña
  sendRecoverPassword(email:any) {
    return this.http.post<any>(this.URL + '/user/recover-pwd',email,{observe:'response'})
  }
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/signin'])
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
}
