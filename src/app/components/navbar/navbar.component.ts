import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  userName: any
  userImage: any

  constructor(protected user: UserService) {
    if (localStorage.getItem('token')) {
      this.user.isLogIn = true
      this.user.userInfo().subscribe({
        next: (res) => {
          console.log(res.data.user)
          this.userName = res.data.user.firstName
          if (res.data.user.image) {
            console.log(`${user.mainUrl}/pictures/${res.data.user.image.slice(16)}`)
            this.userImage = `${user.mainUrl}/pictures/${res.data.user.image.slice(16)}`
          } else {
            this.userImage = false
          }
        }
      })
    }
    console.log(this.user.isLogIn)
  }



  logOut() {
    localStorage.removeItem('token')
  }

}
