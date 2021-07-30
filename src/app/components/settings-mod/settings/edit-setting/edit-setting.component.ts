import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Setting } from 'src/app/models/Setting';
import { SettingsService } from 'src/app/services/settings.service';
import { LoadingService } from 'src/app/services/loading.service';

import { STATES } from 'src/app/data/state-data';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.scss'],
})
export class EditSettingComponent implements OnInit {
  headerTitle = 'Edit Settings Page';
  headerColor = 'accent';
  headerIcon = 'edit';

  states = STATES;

  settingEditForm: FormGroup;
  setting: Observable<Setting>;
  id: string;

  constructor(
    private settingsService: SettingsService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.settingEditForm = this.fb.group({
      id: '',
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
    this.loadSettings();
    console.log(this.id);
  }

  loadSettings() {
    this.setting = this.settingsService
      .getSetting(this.id)
      .pipe(tap((setting) => this.settingEditForm.patchValue(setting)));

    this.updateAfterLoad();
  }

  updateAfterLoad() {
    this.loadingService.loadingOn();
    setTimeout(() => {
      this.loadingService.loadingOff();
    }, 2000);
  }

  get f() {
    return this.settingEditForm.controls;
  }

  onSubmit({ value }: { value: Setting }) {
    this.settingsService.updateSetting(value);
    this.autoDismissSnackBar('Settings Updated!', '');
    this.router.navigate(['/settings']);
  }

  autoDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
