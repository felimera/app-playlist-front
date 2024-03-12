import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { SharedValidatorService } from '../../../shared/services/shared-validator.service';
import { User } from '../../interfaces/user.interface';

import * as customValidators from '../../../shared/validators/validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private sharedValidatorService: SharedValidatorService,
  ) { }

  public isValidField(field: string): boolean | null {
    return this.sharedValidatorService.isValidField(this.loginForm, field);
  }

  public getFieldError(field: string): string | null {
    return this.sharedValidatorService.getFieldError(this.loginForm, field);
  }

  get currentLogin(): User {
    const user = this.loginForm.value as User;
    return user;
  }

  public onSumit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginService
      .postLogin(this.currentLogin)
      .subscribe(token => {
        if (token) {
          localStorage.setItem('token', token.jwtToken);
          setTimeout(() => {
            this.router.navigate(['./playlist']);
          }, 2500);
        }
      });
  }

  public onSignUp(): void {
    this.router.navigate(['./auth/sign-up']);
  }
}
