import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    public router: Router) { }
  username: string;

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    console.log('hi')
    this.router.navigate(['/login'])
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}