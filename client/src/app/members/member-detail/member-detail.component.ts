import { routes } from './../../app.routes';
import { MembersService } from './../../_services/members.service';
import {
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';

@Component({
    selector: 'app-member-detail',
    standalone: true,
    imports: [],
    templateUrl: './member-detail.component.html',
    styleUrl: './member-detail.component.scss',
})
export class MemberDetailComponent
    implements OnInit
{
    private membersService = inject(
        MembersService
    );
    private route = inject(ActivatedRoute);
    member?: Member;

    ngOnInit(): void {
        this.loadMember();
    }

    loadMember() {
        const username =
            this.route.snapshot.paramMap.get(
                'username'
            );
        if (!username) return;
        this.membersService
            .getMember(username)
            .subscribe({
                next: (member) =>
                    (this.member = member),
            });
    }
}
