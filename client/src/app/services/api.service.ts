import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersList } from '../models/Interface';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  url: string = 'https://localhost:5001/api/';
  http = inject(HttpClient);

  constructor() {}

  getUsers(): Observable<UsersList[]> {
    const url = `${this.url}users`;
    return this.http.get<UsersList[]>(url);
  }
}
