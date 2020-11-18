import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from 'src/app/interfaces/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router,
              private http: HttpClient) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.keepAfterRouteChange = false;
      } else {
        this.clear();
      }
    });
  }

  clear() {
    this.subject.next();
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  alert(type: AlertType, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type, message } as Alert);
  }

  success(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Success, message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Error, message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Warning, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Info, message, keepAfterRouteChange);
  }
}
