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


  constructor(private user: UserService, private router: Router) { }

  registerForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$')]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$')]),
    age: new FormControl("", [Validators.required, Validators.min(18), Validators.max(60)]),
    phoneNum: new FormControl("", [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^01[0125][0-9]{8}$")]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)]),
    repeatedPassword: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),

  })


  get firstName() { return this.registerForm.get('firstName') }
  get lastName() { return this.registerForm.get('lastName') }
  get age() { return this.registerForm.get('age') }
  get phoneNum() { return this.registerForm.get('phoneNum') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get repeatedPassword() { return this.registerForm.get('repeatedPassword') }
  get gender() { return this.registerForm.get('gender') }


  handleRegister() {
    console.log("fire?")

    this.isSubmit = true

    console.log(this.registerForm.value.password)
    if (this.registerForm.value.password != this.registerForm.value.repeatedPassword) {
      this.errorFlag = true
      this.errorMsg = 'Passowrd and repeat password must be the same'

    } else {
      this.errorFlag = false
      this.errorMsg = ''
    }
    console.log(this.registerForm.errors)
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
          },
          complete: () => this.router.navigateByUrl('/login')
        }
      )
    }





  }

}
