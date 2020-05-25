import {Injectable} from '@angular/core';
import {FormGroup, ValidationErrors, Validator} from '@angular/forms';

@Injectable({providedIn: 'root'})
export class MatchPassword implements Validator {


  validate(formGroup: FormGroup): ValidationErrors | null {
    const {password, passwordConfirmation} = formGroup.value;

    if (password === passwordConfirmation) {
      return null;
    } else {
      return {passwordsDontMatch: true};
    }

  }
}
