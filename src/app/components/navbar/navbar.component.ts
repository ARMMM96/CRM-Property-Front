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

  roleType: any
  showDashBoredLink: boolean = false

  constructor(protected user: UserService) {

  }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rednerUserData()
    }
  }
  rednerUserData() {
    this.user.isLogIn = true
    this.getUserInfo()

  }

  getUserInfo() {
    this.user.userInfo().subscribe({
      next: (res) => {
        this.userName = res.data.user.firstName
        if (res.data.user.image) {
          this.userImage = `${this.user.mainUrl}/pictures/${res.data.user.image.slice(16)}`
        } else {
          this.userImage = false
        }
      }
    })
  }

  toggleDashboredRouteLink() {
    if (this.roleType == 'Owner' || 'admin') {
      this.showDashBoredLink = true
    }
  }


  logOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.user.isLogIn = false
  }

}
