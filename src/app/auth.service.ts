import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  }

  signup(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/register', payload)
      .pipe(
        catchError((e) => this.handleError(e))
      )
  }

  login(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/login', payload)
      .pipe( catchError((e) => this.handleError(e)))
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(() =>
      new Error(error.message || 'Server error occurred')
    )
  }
}
