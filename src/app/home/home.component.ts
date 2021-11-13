import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SessionStorageService } from "./../services/session.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  panelOpenState: boolean = false;
  avatar: string =
    "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg";
  screen = "table";
  moments = <any>[];
  constructor() {}

  ngOnInit(): void {}

  getScreenWidth() {
    return window.innerWidth;
  }

  onAdded(moment: any) {
    console.log(moment);
    this.moments.push(moment);
    this.screen = "table";
  }
  logout() {
    SessionStorageService.removeSessionValue("access_token");
  }
}
