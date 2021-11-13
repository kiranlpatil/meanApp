import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../services/session.service';
import {Constants} from '../shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  avatar = 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg';
  screen = 'table';
  moments = [] as any;
  constructor() {}

  ngOnInit(): void {}

  public getScreenWidth() {
    return window.innerWidth;
  }

  public onAdded(moment: any): void {
    this.moments.push(moment);
    this.screen = 'table';
  }

  public logout(): void {
    SessionStorageService.removeSessionValue(Constants.accessToken);
  }
}
