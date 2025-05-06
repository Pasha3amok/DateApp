import { APIService } from './_services/api.service';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  RouterOutlet,
  RouterModule,
} from '@angular/router';
import { UsersList } from './_models/UsersList';
import { Observable } from 'rxjs';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
  ],
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
