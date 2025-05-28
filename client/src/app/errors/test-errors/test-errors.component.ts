import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-test-errors',
    standalone: true,
    imports: [],
    templateUrl: './test-errors.component.html',
    styleUrl: './test-errors.component.scss',
})
export class TestErrorsComponent {
    baseUrl = environment.apiUrl;
    private http = inject(HttpClient);
    validationErrors: string[] = [];

    get400Error() {
        this.http
            .get(
                this.baseUrl + 'buggy/bad-request'
            )
            .subscribe();
    }
    get401Error() {
        this.http
            .get(this.baseUrl + 'buggy/auth')
            .subscribe();
    }
    get404Error() {
        this.http
            .get(this.baseUrl + 'buggy/not-found')
            .subscribe();
    }
    get500Error() {
        this.http
            .get(
                this.baseUrl +
                    'buggy/server-error'
            )
            .subscribe();
    }
    get400ValidError() {
        this.http
            .post(
                this.baseUrl + 'account/register',
                {}
            )
            .subscribe({
                next: (res) => console.log(res),
                error: (error) =>
                    (this.validationErrors =
                        error),
            });
    }
}
