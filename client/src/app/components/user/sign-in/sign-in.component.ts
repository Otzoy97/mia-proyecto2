import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user = {
    email: '',
    pwd: ''
  }

  userRec = ''

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    if (this.userService.loggedIn()) {
      this.router.navigate(['/user/info'])
    }
  }

  singin() {
    if (this.user.email.trim().length === 0 || this.user.pwd.length === 0) {
      alert('Correo o contraseña inválidos')
      return;
    }
    this.userService.singIn(this.user).subscribe((response)=> {
        localStorage.setItem('token', response.body.token)
        localStorage.setItem('esAdmin', response.body.esAdmin)
        this.router.navigate(['/user/info'])
    }, (err)=>{
      if (err.status === 403) {
        alert('Correo no confirmado')
      } else if (err.status === 401) {
        alert('Correo o contraseña incorrectos')
      } else {
        this.router.navigate(['/error-500']) 
      }
    })
  }

  recoveryPwd() {
    if(this.userRec.trim().length !== 0) {
      this.userService.sendRecoverPassword({'email':this.userRec.trim()}).subscribe((response)=>{
        alert('se ha enviado un correo de confirmación')
        this.router.navigate(['/signin'])
      }, (err)=>{
        console.log(err)
      })
    }
  }
}
