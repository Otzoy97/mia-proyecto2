import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {

  fileToUpload: File = null
  user = {
    email: '',
    name: '',
    surname: '',
    country: '',
    date: '',
    photo: '../../../../assets/default-user-image.png'
  }

  dateFormatted = ''
  userLoaded = false

  constructor(private router : Router, private userServices : UserService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    if (!this.userServices.loggedIn()) {
      this.router.navigate(['/signin'])
    }
    this.userServices.getInfo().subscribe((response)=>{
      console.log(response)
      const body = response.body
      const result = body.result
      this.user.email = result.email
      this.user.name = result.name
      this.user.surname = result.surname
      this.user.country = result.country
      this.user.date = result.birthday
      if(result.photo !== null) {
        this.user.photo = result.photo
      }
      let date = new Date(this.user.date)
      this.dateFormatted = date.getFullYear() + '-' + date.getMonth()+1 + '-' + date.getDate()
      this.userLoaded = true
    },(err)=>{
      console.log(err)
      this.userServices.logout()
      if (err.status === 401){
        this.router.navigate(['/error-401'])
        return;
      }
      this.router.navigate(['/error-500'])
    })
  }

  handleFileInput(event) {
    let fileList : FileList = event.target.files
    if(fileList.length > 0) {
      this.fileToUpload = fileList[0]
      console.log(this.fileToUpload)
    }
  }

  updateImg() {
    console.log(this.fileToUpload)
  }
}
