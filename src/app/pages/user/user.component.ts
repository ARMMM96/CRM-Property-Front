import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  userName: any
  userImage: any
  currentUser: any


  constructor(protected user: UserService) {

    this.user.userInfo().subscribe({
      next: (res) => {
        console.log(res.data.user)
        this.userName = `${res.data.user.firstName} ${res.data.user.lastName}`
        this.currentUser = {...res.data.user}
        if (res.data.user.image) {
          console.log(`${user.mainUrl}/pictures/${res.data.user.image.slice(16)}`)
          this.userImage = `${user.mainUrl}/pictures/${res.data.user.image.slice(16)}`
        } else {
          this.userImage = false
        }
      }
    })
  }














}
