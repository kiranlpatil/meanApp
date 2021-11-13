import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-add-moment",
  templateUrl: "./add-moment.component.html",
  styleUrls: ["./add-moment.component.scss"],
})
export class AddMomentComponent implements OnInit {
  @Output() done = new EventEmitter<any>();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  tags: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() moment = {
    _id: null,
    title: "",
    tags: this.tags,
    imageUrl: "",
    file: null,
  };

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (value.trim() !== "") {
      this.moment.tags.push(value);
    }
    input.value = "";
  }

  remove(tag: any): void {
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  validateInputs(moment: any) {
    if (!moment.title) {
      this.openSnackBar("Please enter title.", "");
      return false;
    }
    if (moment.tags.length === 0) {
      this.openSnackBar("Please add tags", "");
      return false;
    }
    if (!moment.imageUrl) {
      this.openSnackBar("Please upload image.", "");
      return false;
    }
    return true;
  }

  addMoment() {
    if (!this.validateInputs(this.moment)) {
      return;
    }
    const url = "http://localhost:3000/api/moment";
    if (this.moment._id) {
      this.httpClient.patch(url + "/" + this.moment._id, this.moment).subscribe(
        (success: { status: string; message: string; data }) => {
          if (success.status === "success") {
            this.openSnackBar("Moment Added Successfully", "");
            this.done.emit(success.data);
          } else {
            this.openSnackBar(success.message, "");
          }
        },
        () => {
          this.openSnackBar("Failed", "");
        }
      );
    } else {
      this.httpClient.post(url, this.moment).subscribe(
        (success: { status: string; message: string }) => {
          if (success.status === "success") {
            this.openSnackBar("Moment Added Successfully", "");
          } else {
            this.openSnackBar(success.message, "");
          }
        },
        () => {
          this.openSnackBar("Failed", "");
        }
      );
    }
  }
}
