import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/blog']);
      return false;
    }
    else {
      if (localStorage.getItem('skip-home')) {
        this.router.navigate(['/login']);
        return false;
      }
      else {
        return true;
      }
    }
  }


}
