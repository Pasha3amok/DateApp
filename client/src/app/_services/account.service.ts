import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import {
    LoginResponce,
    LoginUser,
} from '../_models/login-user';
import { RegisterUser } from '../_models/register-user';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    currentUser = signal<
        LoginResponce | RegisterUser | null
    >(null);

    login(
        obj: LoginUser
    ): Observable<LoginResponce> {
        const url = `${this.baseUrl}account/login`;
        return this.http
            .post<LoginResponce>(url, obj)
            .pipe(
                map((user) => {
                    if (user) {
                        localStorage.setItem(
                            'user',
                            JSON.stringify(user)
                        );
                        this.currentUser.set(
                            user
                        );
                    }
                    return user;
                })
            );
    }
    register(
        obj: RegisterUser
    ): Observable<RegisterUser> {
        const url = `${this.baseUrl}account/register`;
        return this.http
            .post<RegisterUser>(url, obj)
            .pipe(
                map((user) => {
                    if (user) {
                        localStorage.setItem(
                            'user',
                            JSON.stringify(user)
                        );
                        this.currentUser.set(
                            user
                        );
                    }
                    return user;
                })
            );
    }
    logout() {
        localStorage.removeItem('user');
        this.currentUser.set(null);
    }
}
