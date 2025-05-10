import { Component, inject, input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterUser } from '../_models/RegisterUser';
import { AccountService } from '../_services/account.service';
import { UsersList } from '../_models/UsersList';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    accService = inject(AccountService);
    usersFromHomeComponent = input.required<UsersList[]>() ;
    regModel: RegisterUser = new RegisterUser();

    register(){
        this.accService.register(this.regModel).subscribe();
    }

    cancel(){

    }
}
