import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { UsersList } from '../_models/UsersList';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../_services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  apiService = inject(APIService)
  registerMode = false;
  users: UsersList[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

    getUsers() {
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
