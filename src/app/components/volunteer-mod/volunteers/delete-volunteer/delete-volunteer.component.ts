import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Volunteer } from '../../../../models/Volunteer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-volunteer',
  templateUrl: './delete-volunteer.component.html',
  styleUrls: ['./delete-volunteer.component.scss'],
})
export class DeleteVolunteerComponent {
  deleteVolunteer: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteVolunteerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Volunteer,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close(this.deleteVolunteer);
  }

  onDeleteClick() {
    this.autoDismissSnackBar('Volunteer Deleted!', 'Goodbye!');
    this.deleteVolunteer = true;
  }

  autoDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
