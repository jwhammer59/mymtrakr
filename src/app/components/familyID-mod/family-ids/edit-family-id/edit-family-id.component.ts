import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map, find } from 'rxjs/operators';

import { FamilyID } from 'src/app/models/FamilyID';
import { FamilyIdService } from 'src/app/services/familyID.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-edit-family-id',
  templateUrl: './edit-family-id.component.html',
  styleUrls: ['./edit-family-id.component.scss'],
})
export class EditFamilyIDComponent implements OnInit {
  headerTitle = 'Edit Family ID Page';
  headerColor = 'accent';

  @ViewChild(MatSnackBar, { static: false }) snackbar: MatSnackBar;

  allFamilyIDs$: Observable<FamilyID[]>;
  matchingFamilyID: string;
  matchingFamilyIdArray: FamilyID[];
  isMatchingFamilyID: boolean = false;
  beforeEditFamilyID: string;

  familyIdEditForm: FormGroup;
  familyID: Observable<FamilyID>;
  id: string;

  constructor(
    private familyIdService: FamilyIdService,
    public loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.allFamilyIDs$ = this.familyIdService.getFamilyIDs();

    this.familyIdEditForm = this.fb.group({
      id: '',
      familyID: ['', Validators.required],
      householdFullName: ['', Validators.required],
      isActive: [false, Validators.required],
    });

    this.loadAllFamilyIds();
  }

  loadAllFamilyIds() {
    this.familyID = this.familyIdService
      .getFamilyID(this.id)
      .pipe(tap((familyID) => this.familyIdEditForm.patchValue(familyID)));

    this.updateAfterLoad();
  }

  updateAfterLoad() {
    this.loadingService.loadingOn();
    setTimeout(() => {
      this.beforeEditFamilyID = this.familyIdEditForm.controls.familyID.value;
      this.loadingService.loadingOff();
    }, 2000);
  }

  onSubmit({ value, valid }: { value: FamilyID; valid: boolean }) {
    let familyIdStatus = false;
    let currentFamilyID = value.familyID;
    if (currentFamilyID === this.beforeEditFamilyID) {
      familyIdStatus = true;
    }
    /*
    Get all family ID's and filter for the Family ID that matches the
    Family ID from the form (if it exists)
    */
    const onlyFamilyIDs$ = this.allFamilyIDs$.pipe(
      map((familyIDs) =>
        familyIDs.filter((familyIDs) => familyIDs.familyID === currentFamilyID)
      )
    );

    /*
    Subscribe to onlyFamilyIDs$ and take the value passed
    into the data parameter and store it in "matchingFamilyID".
    Get all family ID's and filter for the
    */
    onlyFamilyIDs$.subscribe((data) => {
      console.log(data);
      this.matchingFamilyID = data.shift().familyID;
      const tempFamilyID$ = this.allFamilyIDs$.pipe(
        map((familyIDs) =>
          familyIDs.filter(
            (familyIDs) => familyIDs.familyID === this.matchingFamilyID
          )
        )
      );

      /*
      Subscribe to tempFamilyID stream and get any data available.
      Check for data, if data exists this means that there is a matching
      Family ID.
      */
      tempFamilyID$.subscribe((idData) => {
        console.log(idData);
        this.matchingFamilyIdArray = idData;
        if (this.matchingFamilyIdArray.length > 0) {
          return (this.isMatchingFamilyID = true);
        }
      });
    });

    // Wait for Observables to complete before processing OnSubmit
    // **** Need to learn how to do this programatically ****
    setTimeout(() => {
      if (!valid) {
        this.manualDismissSnackBar('Form Invalid!', '');
      } else if (this.isMatchingFamilyID) {
        this.manualDismissSnackBar('Family ID already taken!', 'OK');
        this.isMatchingFamilyID = false;
      } else {
        this.familyIdService.updateFamilyID(value);
        this.autoDismissSnackBar('Family ID Updated!', '');
        this.router.navigate(['/familyID']);
      }
      console.log(this.isMatchingFamilyID);
    }, 1000);
  }

  manualDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
    });
  }

  autoDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
