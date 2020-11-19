import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import RutValidator from 'w2-rut-validator';
import { StatusService } from '../account/status.service';


@Injectable({
  providedIn: 'root'
})
export class TransactionValidator {

    constructor(private accountService: StatusService) {}

    validateOrder(control: AbstractControl): Observable<{ orderAvailable: boolean }> | null {
        if (!control.value) {
           return of(null);
        }
        return this.accountService.getAccountData().pipe(map(account => {
            if (!account){
                return null;
            }

            return account.amount >= Number(control.value) ? null : { orderAvailable: true };

        }));
    }

    validateDestiny(control: AbstractControl): Observable<{ destinyAvailable: boolean }> | null {
        if (!control.value) {
           return of(null);
        }
        const dni =  RutValidator.unformat(control.value);
        return this.accountService.getAccountDestiny(dni).pipe(map(account => {
            return account ? null : { destinyAvailable: true };

        }));
    }


    validateSameAccount(control: AbstractControl): Observable<{ sameAccount: boolean }> | null {
        if (!control.value) {
           return of(null);
        }
        const dni =  RutValidator.unformat(control.value);
        return this.accountService.getAccountData().pipe(map(account => {
            console.log(account.user.dni !== dni);
            
            return account.user.dni !== dni ? null : { sameAccount: true };

        }));
    }
}
