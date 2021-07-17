import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Volunteer } from '../../../../models/Volunteer';
import { VolunteersService } from '../../../../services/volunteers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FamilyID } from 'src/app/models/FamilyID';
import { FamilyIdService } from 'src/app/services/familyID.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-edit-volunteer',
  templateUrl: './edit-volunteer.component.html',
  styleUrls: ['./edit-volunteer.component.scss'],
})
export class EditVolunteerComponent implements OnInit {
  headerTitle = 'Edit Volunteers Page';
  headerColor = 'accent';
  headerIcon = 'edit';

  volunteerEditForm: FormGroup;
  volunteer: Observable<Volunteer>;
  id: string;

  allFamilyIDs$: Observable<FamilyID[]>;

  constructor(
    private volunteersService: VolunteersService,
    private familyIdService: FamilyIdService,
    public loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.volunteerEditForm = this.fb.group({
      id: '',
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      familyID: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
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

    this.loadAllVolunteers();
  }

  loadAllVolunteers() {
    this.volunteer = this.volunteersService
      .getVolunteer(this.id)
      .pipe(tap((volunteer) => this.volunteerEditForm.patchValue(volunteer)));

    // Get All Family ID's
    this.allFamilyIDs$ = this.familyIdService.getFamilyIDs();
    this.updateAfterLoad();
  }

  get f() {
    return this.volunteerEditForm.controls;
  }

  updateAfterLoad() {
    this.loadingService.loadingOn();
    setTimeout(() => {
      this.loadingService.loadingOff();
    }, 2000);
  }

  onSubmit({ value }: { value: Volunteer }) {
    this.volunteersService.updateVolunteer(value);
    this.autoDismissSnackBar('Volunteer Updated!', '');
    this.router.navigate(['/volunteers']);
  }

  autoDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
