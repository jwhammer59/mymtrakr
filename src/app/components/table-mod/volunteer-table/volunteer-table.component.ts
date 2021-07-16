import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VolunteerTableDataSource } from './volunteer-table-datasource';
import { VolunteersService } from '../../../services/volunteers.service';
import { Volunteer } from '../../../models/Volunteer';

@Component({
  selector: 'app-volunteer-table',
  templateUrl: './volunteer-table.component.html',
  styleUrls: ['./volunteer-table.component.scss'],
})
export class VolunteerTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<Volunteer>;
  dataSource: VolunteerTableDataSource;

  displayedColumns = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'familyID',
    'button',
    'isAvailable',
  ];

  ngOnInit() {
    this.dataSource = new VolunteerTableDataSource(this.volunteersService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  constructor(private volunteersService: VolunteersService) {}
}
