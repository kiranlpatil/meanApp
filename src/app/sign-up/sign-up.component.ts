import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionStorageService } from '../services/session.service';
import {environment} from '../../environments/environment';
import {Constants} from '../shared/constants';

export interface UserInfo {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  email: string;
  city: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent implements OnInit {
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) {}
  public userInfo: UserInfo = {
    firstName: '',
    lastName: '',
    mobileNumber: null,
    email: '',
    city: '',
    password: '',
  };
  public hide = true;
  public breakpoint = 0;

  private static validateEmail(email: string): boolean {
    const re = Constants.regex;
    return re.test(String(email).toLowerCase());
  }

  ngOnInit(): void {
    this.breakpoint = window.innerWidth <= 650 ? 1 : 2;
  }

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 650 ? 1 : 2;
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  validateInputs(userInfo: UserInfo): boolean {
    if (!userInfo.firstName) {
      this.openSnackBar(Constants.firstName);
      return false;
    }
    if (!userInfo.lastName) {
      this.openSnackBar(Constants.lastName);
      return false;
    }
    if (
      !(userInfo.mobileNumber && userInfo.mobileNumber.toString().length === 10)
    ) {
      this.openSnackBar(Constants.mobileNo);
      return false;
    }
    if (!(userInfo.email && SignUpComponent.validateEmail(userInfo.email))) {
      this.openSnackBar(Constants.email);
      return false;
    }
    if (!userInfo.city) {
      this.openSnackBar(Constants.city);
      return false;
    }
    if (!(userInfo.password && userInfo.password.length >= 6)) {
      this.openSnackBar(Constants.password);
      return false;
    }
    return true;
  }

  onSignUp(userInfo: UserInfo): void {
    if (!this.validateInputs(userInfo)) {
      return;
    }
    const url = environment.apiUrl + 'user/sign-up';
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
