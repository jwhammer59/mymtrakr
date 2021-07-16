import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PhonePipe } from '../pipes/phone-pipe';

import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [HeaderComponent, PhonePipe],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
  ],
  exports: [
    HeaderComponent,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    PhonePipe,
    NgxPrintModule,
  ],
})
export class SharedModule {}
