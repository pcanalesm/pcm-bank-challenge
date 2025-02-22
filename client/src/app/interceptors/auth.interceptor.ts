import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/user/auth.service';
import { AppConfig } from '../app.config';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AlertService } from '../services/shared/alert.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    excludesUrl = [`${AppConfig.API_URL}/auth`];

    constructor(private authService: AuthService,
                private router: Router,
                private alertService: AlertService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this.excludesUrl.indexOf(req.url) === -1) {
            const authToken = this.authService.getToken();
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + authToken
                }
            });
            return next.handle(req).pipe(
                catchError(error => {
                    console.log(error);
                    
                    let errorMsg = '';
                    if (error instanceof ErrorEvent) {
                        errorMsg = 'Error al procesar la solicitud';
                    }

                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401) {
                            this.authService.logout();
                            return;
                        }
                       
                            errorMsg = 'Ha ocurrido un error en el Servidor';
                        
                    }

                    this.alertService.error(errorMsg);
                    return throwError(errorMsg);

                })
            );
        }  else {
           return next.handle(req);
        }
    }
}
