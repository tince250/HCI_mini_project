import { AbstractControl, FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'

  export function prepTimeValidator( control: AbstractControl): { [key: string]: boolean } | null {
    // const regex = /^([a-zA-Z ]*)$/;
    if (control.value !== undefined && control.value < 0) {
        return { prepTimeValidator: true };
    }
    return null;
  }

  export function numberRegexValidator( control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^[0-9]*$/;
    if (control.value !== undefined && !regex.test(control.value) && control.dirty) {
        return { numberRegexError: true };
    }
    return null;
  }
