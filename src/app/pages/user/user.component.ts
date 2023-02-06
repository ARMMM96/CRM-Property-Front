import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userName: any
  userImage: any
  currentUser: any
  currentUserAge: any
  currentUserEmail: any
  currentUserPhone: any
  currentUserPosition: any
  showEditForom: boolean = false
  currentUserAddresses = []

  editProfileForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$')]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$')]),
    age: new FormControl("", [Validators.required, Validators.min(18), Validators.max(60)]),
    phoneNum: new FormControl("", [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^01[0125][0-9]{8}$")]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  })

  addressForm = new FormGroup({
    addressType: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$')]),
    details: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$')])
  })




  get firstName() { return this.editProfileForm.get('firstName') }
  get lastName() { return this.editProfileForm.get('lastName') }
  get age() { return this.editProfileForm.get('age') }
  get phoneNum() { return this.editProfileForm.get('phoneNum') }
  get email() { return this.editProfileForm.get('email') }






  constructor(protected user: UserService) {


  }



  ngOnInit(): void {
    this.user.userInfo().subscribe({
      next: (res) => {
        this.userName = `${res.data.user.firstName} ${res.data.user.lastName}`
        this.currentUserAge = res.data.user.age
        this.currentUserEmail = res.data.user.email
        this.currentUserPhone = res.data.user.phoneNum
        this.currentUserPosition = res.data.user.role || null
        this.currentUserAddresses = res.data.user.addresses
        this.currentUser = res.data.user
        console.log(res.data.user)

        if (res.data.user.image) {
          this.userImage = `${this.user.mainUrl}/pictures/${res.data.user.image.slice(16)}`
        } else {
          this.userImage = `https://thumbs.dreamstime.com/b/no-user-profile-picture-24185395.jpg`
        }
      }
    })
  }

  toggleForm() {
    this.showEditForom = !this.showEditForom
  }

  handleSave() {

  }








}
