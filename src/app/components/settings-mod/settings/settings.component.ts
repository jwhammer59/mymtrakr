import { Component, OnInit } from '@angular/core';
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

  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((settings) => {
      this.settings = settings;
    });
  }

  onDeleteClicked() {
    console.log(this.settings);
  }
}
