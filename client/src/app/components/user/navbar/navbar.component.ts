import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userServices : UserService) { }

  ngOnInit(): void {
  }

  logout() {
    this.userServices.logout()
    this.router.navigate(['/signin'])
  }
}
