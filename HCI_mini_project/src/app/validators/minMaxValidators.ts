import { AbstractControl, FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'

export function minMaxValidator(min_cal: string, max_cal: string) {

    return function(form: AbstractControl) {
        const minValue = form.get(min_cal)?.value;
        const maxValue = form.get(max_cal)?.value;

        if (minValue <= maxValue) {
            return null;
        }

        return { minMaxError: true };
    }
}

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		if (control?.parent?.errors?.['passwordMismatchError'] && control.dirty) return true;
        return false;
	}
}