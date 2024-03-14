import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as customValidators from '../../../shared/validators/validator';
import { SharedValidatorService } from '../../../shared/services/shared-validator.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { LoginService } from '../../services/login.service';
import { SharedToasterService } from '../../../shared/services/shared-toaster.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public userForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)]],
  }, {
    validators: [
      this.sharedValidatorService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private sharedValidatorService: SharedValidatorService,
    private loginService: LoginService,
    private router: Router,
    private sharedToasterService: SharedToasterService,
  ) { }

  public isValidField(field: string): boolean | null {
    return this.sharedValidatorService.isValidField(this.userForm, field);
  }

  public getFieldError(field: string): string | null {
    return this.sharedValidatorService.getFieldError(this.userForm, field);
  }

  public currenteUser(): User {
    const user = this.userForm.value as User;
    return user;
  }
  public onSumit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loginService
      .postSignUp(this.currenteUser())
      .subscribe(user => {
        if (user) {
          this.sharedToasterService.info(`The user ${user.name} created himself successfully.`, 'Sign-Up');
          setTimeout(() => {
            this.router.navigate(['./auth/login']);
          }, 2500);
        }
      });
  }

  public onLogin(): void {
    this.router.navigate(['./auth/login']);
  }
}
