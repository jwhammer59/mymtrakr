import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FamilyID } from '../../../models/FamilyID';
import { FamilyIdService } from '../../../services/familyID.service';

@Component({
  selector: 'app-print-family-id',
  templateUrl: './print-family-id.component.html',
  styleUrls: ['./print-family-id.component.scss'],
})
export class PrintFamilyIdComponent implements OnInit {
  headerTitle = 'Print Family IDs';
  headerColor = 'accent';
  headerIcon = 'print';

  allFamilyIDs$: Observable<FamilyID[]>;
  familyIdArray: FamilyID[] = [];

  displayedColumns: string[] = ['familyID', 'fullName'];
  dataSource = this.familyIdArray;

  constructor(private familyIdService: FamilyIdService) {}

  ngOnInit(): void {
    // Get All Family ID Objects
    this.allFamilyIDs$ = this.familyIdService.getFamilyIDs();
    this.allFamilyIDs$.subscribe((famData) => {
      this.familyIdArray = famData;
    });
  }
}
