import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Route, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { UtilService } from '../../services/util.service';



@Injectable()
export class AuthGuard implements CanActivate {

  util : UtilService;

  constructor(private router: Router) {
      this.util = UtilService.getInstance();
  }

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): Observable<boolean> | boolean {

    if(this.util.isLoggedIn()){
        return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
