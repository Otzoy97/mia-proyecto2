import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recover-pwd',
  templateUrl: './recover-pwd.component.html',
  styleUrls: ['./recover-pwd.component.css']
})
export class RecoverPwdComponent implements OnInit {

  constructor(private user: UserService, private router: Router, private active:ActivatedRoute) { }
  pwd = ''
  pwdRef = ''
  id = ''
  ngOnInit(): void {
    const param = this.active.snapshot.params
    this.id = param.id
  }

  recover() {
    if(this.pwd.length === 0 || this.pwdRef.length === 0) {
      alert('Llene todos los campos')
      return
    }
    if(this.pwd !== this.pwdRef) {
      alert('Contraseñas no coinciden')
      return
    }
    this.user.recoverPassword(this.id,this.pwd).subscribe(()=> {
      alert('Contraseña actualizada')
      this.router.navigate(['/signin'])
    }, ()=> {
      this.router.navigate(['error-500'])
    })
  }
}
