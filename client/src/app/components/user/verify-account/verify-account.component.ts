import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  constructor( private active:ActivatedRoute, private userService: UserService, private router: Router) { }

  htmlInsert = ""

  ngOnInit(): void {
    const parm = this.active.snapshot.params
    const id = parm.id
    this.userService.verifyAccount(id).subscribe((response)=>{
      if(response.status == 200) {
        this.htmlInsert = `<strong>Cuenta verificada</strong>`
      } else {
        this.htmlInsert = `<strong>No se pudo verificar cuenta</strong>`
      }
      waits(5)
      this.router.navigate(['/signin'])
    }, (err) => {
      console.log(err)
    })
  }

}
