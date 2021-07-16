import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../../../../models/Event';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss'],
})
export class DeleteEventComponent {
  deleteEvent: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close(this.deleteEvent);
  }

  onDeleteClick() {
    this.autoDismissSnackBar('Event Deleted!', '');
    this.deleteEvent = true;
  }

  autoDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
