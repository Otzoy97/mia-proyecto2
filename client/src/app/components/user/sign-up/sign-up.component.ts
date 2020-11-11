import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user = {
    name: '',
    surname: '',
    country: '',
    date: '',
    email: '',
    pwd: '',
    pwdRef: '',
    photo: ''
  }

  refPwd = {
    class: '',
    text: ''
  }

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    if (this.userService.loggedIn()) {
      this.router.navigate(['/user/info'])
    }
  }

  signUp(): void {
    if (this.user.name.trim().length === 0||
      this.user.surname.trim().length === 0 ||
      this.user.country.trim().length === 0 ||
      this.user.date.trim().length === 0 ||
      this.user.email.trim().length === 0 ||
      this.user.pwd.trim().length === 0 ||
      this.user.pwdRef.trim().length === 0) {
        alert('Llene todos los campos')
      return
    }
    if (this.user.pwd !== this.user.pwdRef) {
      alert('Contraseñas no coinciden')
      return
    }
    this.userService.singUp(this.user).subscribe(() => {
        alert('Usuario creado')
        this.router.navigate(['/signin'])
      
    }, (err) => {
      if (err.status === 422) {
        alert('Correo ya fue utilizado')
      } else {
        this.router.navigate(['/error-500'])
      }
    })
  }
}
