import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) { }

  public isValidField(field: string): boolean | null {
    return this.loginForm.controls[field].errors
      && this.loginForm.controls[field].touched;
  }

  public getFieldError(field: string): string | null {
    if (!this.loginForm.controls[field]) return null;

    const errors = this.loginForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required.';

        case 'minlength':
          return `Minimum ${errors['minlength'].requiredLength} caracters.`;

        case 'email':
          return `The format of the email ${this.loginForm.get('email')} is incorrect.`;
      }
    }
    return null;
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
        if (token)
          console.log('token', token);
      });
  }

  public onSignUp(): void {
    this.router.navigate(['./auth/sign-up']);
  }
}
