import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, DoCheck {

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    // console.log(this.signupForm)
  }

  signupForm = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    password: ['', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#^$!%*?&]{8,16}$/ig)
    ]],
    confirmPassword: ['',[
      Validators.required,
      (control: AbstractControl<any>): { [key: string]: boolean } | null => {
        const invalid = this.signupForm?.get('password')?.value !== control.value
        return invalid ? { confirmPassword: invalid } : null
      }
    ]]
  })
  // Signup1234@

  get username() {
    return this.signupForm.get('username')
  }
  get password() {
    return this.signupForm.get('password')
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword')
  }

  signup() {
    this.auth.signup(this.signupForm.value)
      .subscribe(
        {
          next: (response) => {
            console.log(response)
            this.signupForm.reset(this.signupForm.value)
            localStorage.setItem('token', response.subject)
            this.router.navigate(['/todos'])
          },
          error: (e) => console.log(e)
        }
    )
  }
  // Signup1234@

}
