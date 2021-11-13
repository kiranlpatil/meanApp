import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SessionStorageService } from "./session.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(): boolean {
    return this.validateLogin();
  }

  validateLogin() {
    if (SessionStorageService.getSessionValue("access_token")) {
      return true;
    } else {
      this._router.navigateByUrl("/login").then();
      return false;
    }
  }
}
