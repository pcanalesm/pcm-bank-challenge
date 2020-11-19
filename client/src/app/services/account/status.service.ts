import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { AccountUser } from 'src/app/interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getAccountData(): Observable<AccountUser> {
    return this.http.get<AccountUser>(`${AppConfig.API_URL}/account/get`);
  }

  getAccountDestiny(dni: string) {
    return this.http.get<AccountUser>(`${AppConfig.API_URL}/account/get/${dni}`);
  }


}
