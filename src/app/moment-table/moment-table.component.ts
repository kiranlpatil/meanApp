import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-moment-table',
  styleUrls: ['moment-table.component.scss'],
  templateUrl: 'moment-table.component.html',
})
export class MomentTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['serial', 'image', 'title', 'tags', 'action'];
  isEditMoment = false;
  pageSize = 5;
  totalCount = 100;
  pageIndex = 0;
  pageEvent: PageEvent | any;
  data = new MatTableDataSource<TableElement>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  editMoment: TableElement;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getMoments(0);
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }

  public handlePage(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getMoments(this.pageIndex);
  }

  getMoments(page: number) {
    const url = environment.apiUrl + 'moment' + '/' + page + '/' + this.pageSize;
    this.httpClient.get(url).subscribe(
      (success: { count: number; data: []; status: string }) => {
        this.data.data = success.data.reverse();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDelete(moment: TableElement) {
    const url = environment.apiUrl + '/moment' + '/' + moment._id;
    this.httpClient.delete(url).subscribe(
      () => {
        const dataSource = this.data.data;
        dataSource.splice(this.data.data.indexOf(moment), 1);
        this.data.data = dataSource;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onEditFinished(editedMoment: TableElement) {
    this.isEditMoment = false;
    console.log(this.editMoment);
    const dataSource = this.data.data;
    dataSource.map((element) => {
      if (element._id === editedMoment._id) {
        return (element = editedMoment);
      }
    });
    this.data.data = dataSource;
  }

  onEdit(moment: TableElement) {
    this.isEditMoment = true;
    this.editMoment = moment;
  }
}

export interface TableElement {
  _id: string;
  title: string;
  imageUrl: number;
  tags: Array<number>;
}
