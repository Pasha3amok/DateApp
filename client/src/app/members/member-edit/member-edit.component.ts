import { MembersService } from './../../_services/members.service';
import { AccountService } from './../../_services/account.service';
import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule,FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload',['$event']) notify($event:any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }

  member?: Member;
  private accountService = inject(AccountService);
  private membersService = inject(MembersService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const user = this.accountService.currentUser();
    if  (!user) return;
    this.membersService.getMember(user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember(){
    this.membersService.updateMember(this.editForm?.value).subscribe({
      next: _ =>{
        this.toastr.success('Proffile updated successfully');
        this.editForm?.reset(this.member);
      }
    })

  }
}
