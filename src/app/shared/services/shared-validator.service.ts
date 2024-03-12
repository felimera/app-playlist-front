import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedValidatorService {

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required.';

        case 'minlength':
          return `Minimum ${errors['minlength'].requiredLength} caracters.`;

        case 'email':
          return `The format of the email ${form.get('email')} is incorrect.`;
      }
    }
    return null;
  }
}
