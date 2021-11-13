import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionStorageService } from './session.service';
import {Constants} from '../shared/constants';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    return this.validateLogin();
  }

  validateLogin() {
    if (SessionStorageService.getSessionValue(Constants.accessToken)) {
      return true;
    } else {
      this.router.navigateByUrl(Constants.login).then();
      return false;
    }
  }
}
