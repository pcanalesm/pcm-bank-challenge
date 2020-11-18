import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import RutValidator from 'w2-rut-validator';
import { AuthService } from '../user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpValidator {


  constructor(private authService: AuthService) {

  }


  AvailableDni(control: AbstractControl): Observable<{ isAvailable: boolean }> | null{
    
      if(!RutValidator.validate(control.value)) {
        return of(null);
      }
      
      const dni = RutValidator.unformat(control.value);
      
      return this.authService.getUserByDni(dni).pipe(map(user => {   
        
        return user ?  {isAvailable: true} : null;
      }));
    
  }

  RutValidate(value: string) {
    return (formGroup: FormGroup) => {
      const rutValue = formGroup.controls[value];
      if(rutValue.errors && !rutValue.errors.isRutValid) {
        return;
      }
      if(!RutValidator.validate(rutValue.value)) {
        rutValue.setErrors({ isRutValid: true });
      } else {
        rutValue.setErrors(null);
      }
    }
}

 Match(mainValue: string, matchingValue) {
   return (formGroup: FormGroup) => {
      const valueInput = formGroup.controls[mainValue];
      const valueInputMatching = formGroup.controls[matchingValue];
      
      if(valueInputMatching.errors && !valueInputMatching.errors.isMatch) {
        return;
      }

      if(valueInput.value !== valueInputMatching.value) {
        valueInputMatching.setErrors({ isMatch: true });
      } else {
        valueInputMatching.setErrors(null);
      }

   }
  }
}