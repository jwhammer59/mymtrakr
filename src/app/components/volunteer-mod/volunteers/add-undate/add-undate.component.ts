import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Volunteer } from '../../../../models/Volunteer';
import { VolunteersService } from '../../../../services/volunteers.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-undate',
  templateUrl: './add-undate.component.html',
  styleUrls: ['./add-undate.component.scss'],
})
export class AddUnDateComponent implements OnInit {
  headerTitle = 'Add UnAvailable Date Page';
  headerColor = 'accent';

  @ViewChild(MatSnackBar, { static: false }) snackbar: MatSnackBar;

  addUnDateForm: FormGroup;
  unAvailableDateArray = [];
  dateToAdd: number;

  addUnAvailableDate: boolean = false;
  id: string;
  volunteer: Volunteer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: 0,
    familyID: '',
    isAdmin: false,
    isAvailable: false,
    isCantor: false,
    isEMoHC: false,
    isGifts: false,
    isGiftsChild: false,
    isLector: false,
    isMassCoord: false,
    isRosary: false,
    isServer: false,
    isTech: false,
    isUsher: false,
    isSaturday: false,
    isSundayEarly: false,
    isSundayLate: false,
    isWeekday: false,
  };

  constructor(
    public dialogRef: MatDialogRef<AddUnDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Volunteer,
    private volunteersService: VolunteersService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.volunteersService.getVolunteer(this.id).subscribe((volunteer) => {
      this.volunteer = volunteer;
      this.getVolunteerUnAvailableDates(volunteer);
    });

    this.addUnDateForm = this.fb.group({
      id: this.id,
      dateUnAvailable: ['', Validators.required],
    });
  }

  getVolunteerUnAvailableDates(data: Volunteer) {
    this.unAvailableDateArray = data.dateUnAvailable;
  }

  onNoClick(): void {
    this.dialogRef.close(this.addUnAvailableDate);
  }

  onSubmit({ value, valid }: { value: Volunteer; valid: boolean }) {
    let newValue = value;
    this.dateToAdd = Math.floor(value.dateUnAvailable);
    newValue.dateUnAvailable = this.dateToAdd;

    if (!valid) {
      this.autoDismissSnackBar('Invalid Date', 'Ex: mm/dd/yyyy');
    } else if (this.unAvailableDateArray.includes(this.dateToAdd)) {
      const tempDateToAdd = new Date(this.dateToAdd).toLocaleDateString();
      this.manualDismissSnackBar(
        `UnAvailable Date ${tempDateToAdd} has already been added.`,
        'OK'
      );
    } else {
      this.volunteersService.updateVolUnAvailableDate(newValue);
      this.dialogRef.close(this.addUnAvailableDate);
      this.autoDismissSnackBar('Success!', 'Date Added!');
    }
  }

  autoDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  manualDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
    });
  }
}
