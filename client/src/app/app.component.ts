import { DarkModeService } from './_services/dark-mode.service';
import {
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        NavComponent,
        NgxSpinnerComponent,
    ],
})
export class AppComponent implements OnInit {
    private accService = inject(AccountService);
    darkModeService = inject(DarkModeService);

    ngOnInit(): void {
        this.setCurrentUser();
    }

    setCurrentUser() {
        const userString =
            localStorage.getItem('user');
        if (!userString) {
            return;
        }
        const user = JSON.parse(userString);
        this.accService.currentUser.set(user);
    }
}
