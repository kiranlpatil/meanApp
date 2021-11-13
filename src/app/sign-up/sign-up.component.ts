import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/internal/operators";
import { SessionStorageService } from "./../services/session.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  public ngUnsubscribe = new Subject();
  public userInfo: any = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    city: "",
    password: "",
  };
  hide = true;
  breakpoint = 0;
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.breakpoint = window.innerWidth <= 650 ? 1 : 2;
  }

  validateEmail(email: string) {
    const re =
      // tslint:disable-next-line:max-line-length
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 650 ? 1 : 2;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  validateInputs(userInfo: any) {
    if (!userInfo.firstName) {
      this.openSnackBar("Please enter first name.", "");
      return false;
    }
    if (!userInfo.lastName) {
      this.openSnackBar("Please enter last name.", "");
      return false;
    }
    if (
      !(userInfo.mobileNumber && userInfo.mobileNumber.toString().length === 10)
    ) {
      this.openSnackBar("Please enter valid mobile no.", "");
      return false;
    }
    if (!(userInfo.email && this.validateEmail(userInfo.email))) {
      this.openSnackBar("Please enter a valid email id.", "");
      return false;
    }
    if (!userInfo.city) {
      this.openSnackBar("Please enter city.", "");
      return false;
    }
    if (!(userInfo.password && userInfo.password.length >= 6)) {
      this.openSnackBar("Please enter a valid password.", "");
      return false;
    }
    return true;
  }

  onSignUp(userInfo: any) {
    if (!this.validateInputs(userInfo)) {
      return;
    }
    const url = "http://localhost:3000/api/user/sign-up";
    this.httpClient.post(url, userInfo).subscribe(
      (success: any) => {
        SessionStorageService.setSessionValue("access_token", success.token);
        this.router.navigateByUrl("/home");
      },
      (error) =>
        this.snackBar.open(error.message, "", {
          duration: 2000,
        })
    );
  }
}
