import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FamilyIdTableDataSource } from './familyID-table-datasource';
import { FamilyIdService } from '../../../services/familyID.service';
import { FamilyID } from '../../../models/FamilyID';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-familyID-table',
  templateUrl: './familyID-table.component.html',
  styleUrls: ['./familyID-table.component.scss'],
})
export class FamilyIdTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<FamilyID>;

  @Output() loadingEvent = new EventEmitter<boolean>();

  dataSource: FamilyIdTableDataSource;

  displayedColumns = ['householdFullName', 'familyID', 'button', 'isActive'];

  constructor(
    private familyIdService: FamilyIdService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new FamilyIdTableDataSource(this.familyIdService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onDeleteClicked(e) {
    console.log(e);
    this.familyIdService.deleteFamilyID(e);
    this.openSnackBar('Family ID Deleted', '');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
