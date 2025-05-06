import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginResponce, LoginUser } from '../_models/login-user';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  private accService = inject(AccountService);
  loggedIn:boolean = false;
  loginModel: LoginUser = new LoginUser();
  errorMessage: string = '';


  login() {
    this.accService.login(this.loginModel).subscribe({
        next:(res:LoginResponce) => {
          console.log(res)
          this.loggedIn = true;
          this.errorMessage = '';
        },
        error: error => {
          this.errorMessage = '';
          this.errorMessage = error.error.message;
          },

      });
  }

  clearErrorMessage(){
    this.errorMessage = '';
  }
}
