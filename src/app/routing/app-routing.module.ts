import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';

import { AuthGuard } from '../components/auth/auth-guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../components/dashboard-mod/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'events',
    loadChildren: () =>
      import('../components/event-mod/event.module').then((m) => m.EventModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'volunteers',
    loadChildren: () =>
      import('../components/volunteer-mod/volunteer.module').then(
        (m) => m.VolunteerModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'familyID',
    loadChildren: () =>
      import('../components/familyID-mod/family-id.module').then(
        (m) => m.FamilyIDModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('../components/settings-mod/settings.module').then(
        (m) => m.SettingsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'printing',
    loadChildren: () =>
      import('../components/print-mod/printing.module').then(
        (m) => m.PrintingModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
