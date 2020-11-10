import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
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
      console.log(response)
      //this.router.navigate(['/signin'])
    }, (err) => {
      console.log(err)
    })
  }

}
