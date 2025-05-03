import { APIService } from './services/api.service';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersList } from './models/Interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'DatingApp';
  http = inject(HttpClient);
  apiService = inject(APIService);
  users: UsersList[] = [];

  ngOnInit(): void {
    this.apiService.getUsers().subscribe({
      next: (res: UsersList[]) => {
        this.users = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
