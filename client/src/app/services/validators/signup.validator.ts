import { AbstractControl, FormGroup } from '@angular/forms';
import RutValidator from 'w2-rut-validator';


export function rutValidate() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (

          control.value !== null
          && !RutValidator.validate(control.value)
        ) {
          return { rutValidator: true };
        }

        return null;
    };
}

export function checkPasswords(group: FormGroup): { notMatch: boolean } {
  const password = group.get('password').value;
  const confirmPassword = group.get('password_confirm').value;
  console.log(password);
  console.log(confirmPassword);
  return password === confirmPassword ? null : { notMatch: true };
}