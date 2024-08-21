import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgIf, TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

//template form i reactive form 
//look at this 
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService)
  model: any = {};

  //Observable: A producer of data that pushes values to subscribers over time.
  //Observer: An object that defines how to handle the data emitted by the Observable.

  //Http observables always complete
  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl('/members'); //ova vrakja promise huh
      },
      error: error => this.toastr.error(error.error),
      complete: () => console.log("completed")
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('');
  }
}
