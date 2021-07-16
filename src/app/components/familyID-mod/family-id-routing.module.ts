import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyIDsComponent } from './family-ids/family-ids.component';
import { AddFamilyIDComponent } from './family-ids/add-family-id/add-family-id.component';
import { EditFamilyIDComponent } from './family-ids/edit-family-id/edit-family-id.component';
import { DetailFamilyIDComponent } from './family-ids/detail-family-id/detail-family-id.component';

const routes: Routes = [
  { path: '', component: FamilyIDsComponent },
  { path: 'add-familyID', component: AddFamilyIDComponent },
  { path: 'edit-familyID/:id', component: EditFamilyIDComponent },
  { path: 'familyID-detail/:id', component: DetailFamilyIDComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyIDRoutingModule {}
