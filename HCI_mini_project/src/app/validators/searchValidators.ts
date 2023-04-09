import { AbstractControl, FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'

  export function prepTimeValidator( control: AbstractControl): { [key: string]: boolean } | null {
    // const regex = /^([a-zA-Z ]*)$/;
    if (control.value !== undefined && control.value < 0) {
        return { prepTimeValidator: true };
    }
    return null;
  }