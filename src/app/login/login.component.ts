import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs/internal/operators";
import { SessionStorageService } from "../services/session.service";
import { HttpDelegateService } from "../services/http-delegate.service";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public ngUnsubscribe = new Subject();

  title = "Solutions";
  userInfo: any = {
    email: "",
    password: "",
  };
  momentList = [];
  hide = true;
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {}

  validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  validateInputs(userInfo: any) {
    if (!(userInfo.email && this.validateEmail(userInfo.email))) {
      this.openSnackBar("Please enter a valid email id.", "");
      return false;
    }
    if (!(userInfo.password && userInfo.password.length >= 6)) {
      this.openSnackBar("Please enter a valid password.", "");
      return false;
    }
    return true;
  }

  login(userInfo: any) {
    if (!this.validateInputs(userInfo)) {
      return;
    }
    const url = "http://localhost:3000/api/user/login";
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
