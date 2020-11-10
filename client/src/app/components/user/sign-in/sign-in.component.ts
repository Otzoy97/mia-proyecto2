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

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  singin() {
    if (this.user.email.trim.length === 0 || this.user.pwd.length === 0) {
      alert('Correo o contraseña inválidos')
      return;
    }
    this.userService.singIn(this.user).subscribe((response)=> {
      if (response.status === 200) {
        localStorage.setItem('token', response.body.token)
        localStorage.setItem('esAdmin', response.body.esAdmin)
        this.router.navigate(['/user/info'])
      } else if (response.status === 403) {
        alert('Correo no confirmado')
      } else if (response.status === 401) {
        alert('Correo o contraseña incorrectos')
      } else {
        this.router.navigate(['/error-500']) 
      }
    }, (err)=>{
      console.error(err)
    })
  }

}
