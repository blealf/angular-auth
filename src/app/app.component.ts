import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from './auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  
  authenticated: boolean = false
  constructor(private auth: AuthService, private router: Router) { }
  
  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated()
  }
  ngDoCheck() {
    this.authenticated = this.auth.isAuthenticated()
  }

  logout() {
    localStorage.setItem('token', '')
    this.router.navigate(['/login'])
  }

}
