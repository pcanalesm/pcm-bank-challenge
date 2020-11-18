import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/app.config';
import { User } from 'src/app/interfaces/user';
import { AlertService } from '../shared/alert.service';
import RutValidator from 'w2-rut-validator';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router,
              private alertService: AlertService) { }

  login(user: User) {

    this.http.post<User>(`${AppConfig.API_URL}/auth`, { user }).subscribe(usr => {
        if (usr) {
          localStorage.setItem('access_token', user.token);
          this.router.navigate(['/account']);
        }
    }, error => this.handlingError(error));

  }

  handlingError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.alertService.error('Credenciales incorrectas');
    }

    if (error.status === 404) {
      this.alertService.error('Usuario no encontrado');
    }
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  getUserByDni(dni: string) { 
    return this.http.get(`${AppConfig.API_URL}/user/dni/get/${dni}`);
  }

  signUp(form: FormGroup, formDirective: NgForm) {
    const dni = RutValidator.unformat(form.controls.dni.value);
    this.http.post<User>(`${AppConfig.API_URL}/user/create`, {
          dni: dni,
          mail: form.controls.mail.value,
          firstname: form.controls.firstname.value,
          lastname: form.controls.lastname.value,
          password: form.controls.password.value
    }).subscribe(user => {
       if(user) {
         this.alertService.success('Usuario Creado');
         formDirective.resetForm();
       }
    });
  }
}
