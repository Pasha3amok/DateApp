import { routes } from './../app.routes';
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
} from '../_models/login-user';
import { AccountService } from '../_services/account.service';
import {
    CommonModule,
    TitleCasePipe,
} from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {
    Router,
    RouterLink,
    RouterLinkActive,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        BsDropdownModule,
        RouterLink,
        RouterLinkActive,
        TitleCasePipe,
    ],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.scss',
})
export class NavComponent {
    accService = inject(AccountService);
    private router = inject(Router);
    private toastr = inject(ToastrService);
    loginModel: LoginUser = new LoginUser();
    currentUser = localStorage.getItem('user');

    login() {
        this.accService
            .login(this.loginModel)
            .subscribe({
                next: () => {
                    void this.router.navigateByUrl(
                        '/members'
                    );
                    this.toastr.success(
                        'You successfully logged in!'
                    );
                },
                error: (error) => {
                    this.toastr.error(
                        error.error
                    );
                },
            });
    }
    logout() {
        this.accService.logout();
        this.loginModel = new LoginUser();
        this.router.navigateByUrl('/');
    }
}
