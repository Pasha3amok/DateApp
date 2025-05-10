import {
    Component,
    inject,
    input,
    output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterUser } from '../_models/register-user';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    accService = inject(AccountService);
    private toastr = inject(ToastrService);
    cancelRegister = output<boolean>();
    regModel: RegisterUser = new RegisterUser();

    register() {
        this.accService
            .register(this.regModel)
            .subscribe({
                next: () => {
                    this.cancel(),
                        this.toastr.success(
                            'You successfully sign up!'
                        );
                },
                error: (error) =>
                    this.toastr.error(
                        error.error
                    ),
            });
    }

    cancel() {
        this.cancelRegister.emit(false);
    }
}
