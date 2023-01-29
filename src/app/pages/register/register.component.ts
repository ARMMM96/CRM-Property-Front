import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isSubmit: boolean = false
  errorFlag = false
  errorMsg = ''



  registerForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.min(3)]),
    lastName: new FormControl("", [Validators.required, Validators.min(3)]),
    age: new FormControl("", [Validators.required, Validators.min(2)]),
    phoneNum: new FormControl("", [Validators.required, Validators.min(11)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.min(6)]),
    repeatedPassword: new FormControl("", [Validators.required, Validators.min(6)]),
    gender: new FormControl("", [Validators.required]),

  })
  constructor(private user: UserService, private router: Router) { }

  handleRegister() {
    console.log("fire?")
    console.log(this.registerForm.value.password)
    this.isSubmit = true
    if (this.registerForm.value.password != this.registerForm.value.repeatedPassword) {
      this.errorFlag = true
      this.errorMsg = 'Passowrd and repeat password must be the same'

    } else {
      this.errorFlag = false
      this.errorMsg = ''
    }

    if (this.registerForm.valid) {
      this.user.retisterUser(this.registerForm.value).subscribe(
        {
          next: (res) => {
            complete: () => this.router.navigateByUrl('/login')
          },
          error: (e) => {
            console.log(e.error.message)
            this.errorFlag = true
            this.errorMsg = e.error.message
          }
        }
      )
    }






  }

}
