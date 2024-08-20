import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgIf } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

//template form i reactive form 
//look at this 
export class NavComponent {
  private accountService = inject(AccountService);
  loggedIn = false;
  model: any = {};

  //Observable: A producer of data that pushes values to subscribers over time.
  //Observer: An object that defines how to handle the data emitted by the Observable.
  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.loggedIn = true;
      },
      error: error => console.log(error),
      complete: () => console.log("completed")
    });
  }

  logout() {
    this.loggedIn = false;
  }
}
