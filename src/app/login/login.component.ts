import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionStorageService } from '../services/session.service';
import {Constants} from '../shared/constants';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public userInfo: { email: string, password: string } = {
    email: '',
    password: '',
  };
  public hide = true;
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  private openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  private validateInputs(userInfo: { email: string, password: string }): boolean {
    if (!(userInfo.email && Constants.validateEmail(userInfo.email))) {
      this.openSnackBar(Constants.email);
      return false;
    }
    if (!(userInfo.password && userInfo.password.length >= 6)) {
      this.openSnackBar(Constants.password);
      return false;
    }
    return true;
  }

  public onLogin(userInfo: { email: string, password: string }): void {
    if (!this.validateInputs(userInfo)) {
      return;
    }
    const url = environment.apiUrl + 'user/login';
    this.httpClient.post(url, userInfo).subscribe(
      (success: any) => {
        SessionStorageService.setSessionValue(Constants.accessToken, success.token);
        this.router.navigateByUrl(Constants.home).then();
      },
      (error) =>
        this.openSnackBar(error.message)
    );
  }
}
