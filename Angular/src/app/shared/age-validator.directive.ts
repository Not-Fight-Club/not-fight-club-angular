import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import * as moment from "moment";

@Directive({
  selector: '[appAgeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ageValidatorDirective,
    multi: true
  }]

})
export class ageValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const date = control.value;
    const resultFormat = 'years';
    const age = moment().diff(moment(date), resultFormat, true);
    return age < 13 ? { 'ageInvalid': true } : null;


  }
}
