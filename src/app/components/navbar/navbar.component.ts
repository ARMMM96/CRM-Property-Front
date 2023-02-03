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
  userRoleId: any
  roleType: any
  showDashBoredLink: boolean = false

  constructor(protected user: UserService) {

  }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rednerUserData()
    }
    console.log(this.user.isLogIn)
  }
  rednerUserData() {
    this.user.isLogIn = true

  }

  getUserInfo() {
    this.user.userInfo().subscribe({
      next: (res) => {
        if (res.data.user.role) {
          this.userRoleId = res.data.user.role
          this.user.getUserRole(this.userRoleId).subscribe({
            next: (res) => {
              this.roleType = res.data.roleType
              console.log(res.data.roleType)
            }
          })

        }

        this.userName = res.data.user.firstName
        if (res.data.user.image) {
          console.log(`${this.user.mainUrl}/pictures/${res.data.user.image.slice(16)}`)
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
  }

}
