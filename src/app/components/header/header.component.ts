import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatToolbar, { static: false }) toolbar: MatToolbar;
  @Input() title: string;
  @Input() color: string;
  @Input() icon: string;

  constructor() {}

  ngOnInit(): void {}
}
