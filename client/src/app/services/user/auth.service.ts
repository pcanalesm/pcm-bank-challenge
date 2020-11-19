import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/app.config';
import { User } from 'src/app/interfaces/user';
import { AlertService } from '../shared/alert.service';
import RutValidator from 'w2-rut-validator';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router,
              private alertService: AlertService) { }


  get isLoggedIn(): Observable<boolean> {
      if (this.getToken() == null) {
          this.loggedIn.next(false);
      } else {
        this.loggedIn.next(true);
      }
      return this.loggedIn.asObservable();
  }


  getSession(): Observable<User> {
    return this.http.post<User>(`${AppConfig.API_URL}/user/session`, {});
  }

  login(form: FormGroup) {
    const dni = RutValidator.unformat(form.controls.dni.value);
    this.http.post<User>(`${AppConfig.API_URL}/auth`, {dni, password: form.controls.password.value}).subscribe(usr => {
        if (usr) {

          localStorage.setItem('access_token', usr.token);
          this.loggedIn.next(true);
          this.router.navigate(['/account']);

        }
    }, error => this.handlingError(error));

  }

  handlingError(error: HttpErrorResponse) {
    this.loggedIn.next(false);
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

  logout() {
    localStorage.removeItem('access_token');

    this.loggedIn.next(false);

    this.router.navigate(['']);
  }

  chekLogin() {
    this.getSession().subscribe(session => {
        if (session) {
            this.router.navigate(['account']);
        }
    });
  }

  getUserByDni(dni: string) {
    return this.http.get(`${AppConfig.API_URL}/user/dni/get/${dni}`);
  }

  signUp(form: FormGroup, formDirective: NgForm) {
    const dni = RutValidator.unformat(form.controls.dni.value);
    this.http.post<User>(`${AppConfig.API_URL}/user/create`, {
          dni,
          mail: form.controls.mail.value,
          firstname: form.controls.firstname.value,
          lastname: form.controls.lastname.value,
          password: form.controls.password.value
    }).subscribe(user => {
       if (user) {
         this.alertService.success('Usuario Creado');
         formDirective.resetForm();
       }
    });
  }
}
