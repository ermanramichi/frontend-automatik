import { AbstractControl, ValidationErrors } from "@angular/forms";

function emailValidator(control: AbstractControl): ValidationErrors | null{
  const email = control.value;
  if( email && !email.endsWith('.com') && !email.endsWith('.mk')){
    return {
      invalidEmail:true
    }; // valid email
  }
  return null;
}
