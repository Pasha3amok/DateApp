import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LoginResponce,
  LoginUser,
} from '../_models/loginUser';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    BsDropdownModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  accService = inject(AccountService);
  loginModel: LoginUser = new LoginUser();
  errorMessage = signal<string>('');
  currentUser = localStorage.getItem('user');

  login() {
    this.accService
      .login(this.loginModel)
      .subscribe({
        error: (error) => {
          this.errorMessage.set('');
          this.errorMessage.set(
            error.error.message
          );
        },
      });
  }
  logout() {
    this.accService.logout();
    this.loginModel = new LoginUser();
  }

  clearErrorMessage() {
    this.errorMessage.set('');
  }
}
