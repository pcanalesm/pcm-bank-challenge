import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { User } from 'src/app/interfaces/user';
import { AlertService } from '../shared/alert.service';

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
}
