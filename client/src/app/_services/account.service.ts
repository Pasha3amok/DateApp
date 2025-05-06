import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponce, LoginUser } from '../_models/login-user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient)
  baseUrl = "https://localhost:5001/api/"

  login(obj: LoginUser): Observable<LoginResponce>{
    const url = `${this.baseUrl}account/login`
    return this.http.post<LoginResponce>(url,obj)
  }

}
