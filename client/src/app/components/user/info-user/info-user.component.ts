import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
    birthday: '',
    photo: '../../../../assets/default-user-image.png'
  }

  pwd = ''
  pwdRef = ''

  userLoaded = false
  constructor(private router : Router, private userServices : UserService,
    private sanitization: DomSanitizer) { }

  ngOnInit(): void {
    if (!this.userServices.loggedIn()) {
      this.router.navigate(['/signin'])
      return;
    }
    this.userServices.getInfo().subscribe((response)=>{
      console.log(response)
      const body = response.body
      const result = body.result
      this.user.email = result.email
      this.user.name = result.name
      this.user.surname = result.surname
      this.user.country = result.country
      this.user.birthday = result.birthday
      if(result.photo !== null) {
        this.userServices.getPhoto().subscribe((response) =>{
          const imgURL = URL.createObjectURL(response.body)
          this.user.photo =  imgURL
        })
        
      }
      let date = new Date(result.birthday)
      this.user.birthday = date.getFullYear() + '-' + date.getMonth()+1 + '-' + date.getDate()
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
    }
  }

  updateImg() {
    if (this.fileToUpload === null){
      return;
    }
    console.log(this.fileToUpload.name)
    this.userServices.updatePhoto(this.fileToUpload).subscribe(()=>{
      this.userServices.getPhoto().subscribe((response) =>{
        const imgURL = URL.createObjectURL(response.body)
        this.user.photo = imgURL
      })
    }, (err)=> {
      console.log(err)
    })
  }

  updateInfo() {
    if(this.user.country.trim().length === 0 ||
    this.user.name.trim().length === 0 ||
    this.user.surname.trim().length === 0 ||
    this.user.birthday.trim().length === 0 ){
      alert('Lleno toda la info para actualizar')
      return;
    }
    this.userServices.updateInfo(this.user).subscribe((res)=>{console.log(res)},(err)=>{console.log(err)})
    this.router.navigate(['/user/info'])
  }

  updatePwd() {
    if(this.pwd.length === 0 || this.pwdRef.length === 0){
      alert('Escriba las dos contraseñas')
      return;
    }
    if(this.pwd !== this.pwdRef){
      alert('Las contraseñas no coinciden')
      return;
    }
    this.userServices.updatePassword({pwd:this.pwd}).subscribe((res)=>{console.log(res)},(err)=>{console.log(err)})
    this.router.navigate(['/user/info'])
  }

}
