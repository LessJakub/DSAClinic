import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinRoleGuard implements CanLoad {

  constructor(private as: AccountService,
              private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let permittedRoles = route.data.permitted as Array<string>;

    if(permittedRoles.length == 0) {
      return true;
    }
    else if (this.as.getLoggedInState() && permittedRoles.includes(this.as.getUserRole())) {
      return true;
    }
    else {
      return this.router.parseUrl('/login');
    }
  }
}
