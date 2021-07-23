import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Volunteer } from '../../../../models/Volunteer';
import { VolunteersService } from '../../../../services/volunteers.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FamilyID } from 'src/app/models/FamilyID';
import { FamilyIdService } from 'src/app/services/familyID.service';

@Component({
  selector: 'app-add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.scss'],
})
export class AddVolunteerComponent implements OnInit {
  headerTitle = 'Add Volunteers Page';
  headerColor = 'accent';
  headerIcon = 'person_add';

  @ViewChild(MatSnackBar, { static: false }) snackbar: MatSnackBar;

  volunteerForm: FormGroup;

  allFamilyIDs$: Observable<FamilyID[]>;

  constructor(
    private volunteersService: VolunteersService,
    private familyIdService: FamilyIdService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.volunteerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      familyID: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      dateUnAvailable: [[]],
      isAdmin: [false, Validators.required],
      isAvailable: [false, Validators.required],
      isCantor: [false, Validators.required],
      isEMoHC: [false, Validators.required],
      isGifts: [false, Validators.required],
      isGiftsChild: [false, Validators.required],
      isLector: [false, Validators.required],
      isRosary: [false, Validators.required],
      isServer: [false, Validators.required],
      isTech: [false, Validators.required],
      isUsher: [false, Validators.required],
      isOther: [false, Validators.required],
      isMassCoord: [false, Validators.required],
      isSaturday: [false, Validators.required],
      isSundayEarly: [false, Validators.required],
      isSundayLate: [false, Validators.required],
      isWeekday: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    // Get All Family ID's
    this.allFamilyIDs$ = this.familyIdService.getFamilyIDs();
  }

  onSubmit({ value, valid }: { value: Volunteer; valid: boolean }) {
    if (!valid) {
      // Show error message
      this.autoDismissSnackBar('Form Invalid!', '');
      console.log(this.volunteerForm.errors);
      console.log(value, valid);
    } else {
      this.volunteersService.addVolunteer(value);
      this.autoDismissSnackBar('Volunteer Added!', '');
      this.router.navigate(['/volunteers']);
    }
  }

  autoDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
