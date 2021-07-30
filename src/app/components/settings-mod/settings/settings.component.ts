import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

import { Setting } from 'src/app/models/Setting';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  headerTitle = 'Settings';
  headerColor = 'accent';
  headerIcon = 'settings';

  settings: Setting[];
  docID: string;

  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((settings) => {
      this.settings = settings;
    });
  }

  onEditSetting() {
    this.settings.filter((res) => {
      this.docID = res.id;
    });
    this.router.navigate([`/settings/edit-setting/${this.docID}`]);
  }
}
