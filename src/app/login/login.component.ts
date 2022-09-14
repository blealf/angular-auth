import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    username: ['', [
      Validators.required,
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
  })
  // Signup1234@

  get username() {
    return this.loginForm.get('username')
  }
  get password() {
    return this.loginForm.get('password')
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.subject)
        this.router.navigate(['/todos'])
      },
      error: () => console.log
    })
  }
}
