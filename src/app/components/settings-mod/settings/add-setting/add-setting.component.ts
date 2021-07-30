import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Setting } from 'src/app/models/Setting';
import { SettingsService } from 'src/app/services/settings.service';

import { STATES } from 'src/app/data/state-data';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-setting',
  templateUrl: './add-setting.component.html',
  styleUrls: ['./add-setting.component.scss'],
})
export class AddSettingComponent implements OnInit {
  headerTitle = 'Add Settings';
  headerColor = 'accent';
  headerIcon = 'settings';

  @ViewChild(MatSnackBar, { static: false }) snackbar: MatSnackBar;

  settingsForm: FormGroup;
  states = STATES;

  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.settingsForm = this.fb.group({
      churchName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: '',
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      mainContact: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit({ value, valid }: { value: Setting; valid: boolean }) {
    console.log('Settings Submitted!');
    if (!valid) {
      // Show error message
      this.autoDismissSnackBar('Form Invalid!', '');
      console.log(this.settingsForm.errors);
      console.log(value, valid);
    } else {
      this.settingsService.addSetting(value);
      this.autoDismissSnackBar('Setting Added!', '');
      this.router.navigate(['/setting']);
    }
  }

  autoDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
