import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  getEmailErrorMessage() {
    return this.f.email.hasError('required')
      ? 'You must enter a value'
      : this.f.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    return this.f.password.hasError('required')
      ? 'You must enter a value'
      : this.f.password.hasError('minlength')
      ? 'Password must be at least 6 characters'
      : '';
  }

  onSubmit({ value, valid }: { value: User; valid: boolean }) {
    this.authService
      .login(this.f.email.value, this.f.password.value)
      .then((res) => {
        this.autoDismissSnackBar('You are logged in!', 'Welcome!');
        this.router.navigate(['/events']);
      })
      .catch((err) => {
        this.autoDismissSnackBar(err, 'Sorry!');
      });
  }

  autoDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
