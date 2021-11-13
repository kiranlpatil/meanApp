import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import {Constants} from '../shared/constants';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.scss'],
})
export class AddMomentComponent implements OnInit {
  @Output() updatedMoment = new EventEmitter<any>();
  selectable = true;
  removable = true;
  addOnBlur = true;
  tags: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() moment = {
    _id: null,
    title: '',
    tags: this.tags,
    imageUrl: '',
    file: null,
  };

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (value.trim() !== '') {
      this.moment.tags.push(value);
    }
    input.value = '';
  }

  remove(tag: string): void {
    const index = this.moment.tags.indexOf(tag);
    if (index >= 0) {
      this.moment.tags.splice(index, 1);
    }
  }

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}

  ngOnInit(): void {}

  imagePath(path: string) {
    this.moment.imageUrl = path;
    console.log(this.moment);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  validateInputs(moment: any) {
    if (!moment.title) {
      this.openSnackBar(Constants.title);
      return false;
    }
    if (moment.tags.length === 0) {
      this.openSnackBar(Constants.tags);
      return false;
    }
    if (!moment.imageUrl) {
      this.openSnackBar(Constants.image);
      return false;
    }
    return true;
  }

  addMoment() {
    if (!this.validateInputs(this.moment)) {
      return;
    }
    const url = environment.apiUrl + 'moment';
    if (this.moment._id) {
      this.httpClient.patch(url + '/' + this.moment._id, this.moment).subscribe(
        (success: { status: string; message: string; data }) => {
          if (success.status === Constants.success) {
            this.openSnackBar(Constants.momentAdded);
            this.updatedMoment.emit(success.data);
          } else {
            this.openSnackBar(success.message);
          }
        },
        () => {
          this.openSnackBar(Constants.failed);
        }
      );
    } else {
      this.httpClient.post(url, this.moment).subscribe(
        (success: { status: string; message: string }) => {
          if (success.status === Constants.success) {
            this.openSnackBar(Constants.momentAdded);
          } else {
            this.openSnackBar(success.message);
          }
        },
        () => {
          this.openSnackBar(Constants.failed);
        }
      );
    }
  }
}
