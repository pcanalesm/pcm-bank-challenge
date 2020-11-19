import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AppConfig } from 'src/app/app.config';
import { AccountUser } from 'src/app/interfaces/account';
import { AlertService } from '../shared/alert.service';
import RutValidator from 'w2-rut-validator';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient,
              private alert: AlertService) { }

  depositAmount(form: FormGroup, formDirective: NgForm) {
    this.http.post<AccountUser>(`${AppConfig.API_URL}/account/deposit`, { amount: form.controls.amount.value })
      .subscribe(account => {
            if (account) {
              formDirective.resetForm();
              this.alert.success('Deposito exitoso');
            }
      });
  }


  orderAmount(form: FormGroup, formDirective: NgForm) {
    this.http.post<AccountUser>(`${AppConfig.API_URL}/account/order`, { amount: form.controls.amount.value })
      .subscribe(account => {
            if (account) {
              formDirective.resetForm();
              this.alert.success('Giro exitoso');
            }
      });
  }

  transferAccount(form: FormGroup, formDirective: NgForm) {
    const dni = RutValidator.unformat(form.controls.destiny_dni.value);

    this.http.post<AccountUser>(`${AppConfig.API_URL}/account/transfer`,
    { amount: form.controls.amount.value, destiny_dni: dni })
      .subscribe(account => {
            if (account) {
              formDirective.resetForm();
              this.alert.success('Transferencua exitosa');
            }
      });
  }

}
