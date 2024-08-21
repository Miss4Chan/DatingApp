import { Component, EventEmitter, inject, input, Input, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService)
  // /@Input() usersFromHomeComponent: any; koga go imame vaka treba vo deklaracijata na component vo html
  //ako go staime required ke iame error na tagot deka mora da mu gi predademe ovie 
  //ova ni e parent to child communication zatoa shto gi iame u home userite i samo mu gi davame na deteto koa go praime
  //usersFromHomeComponent = input.required<any>()

  //@Output() cancelRegister = new EventEmitter();
  cancelRegister = output<boolean>();
  model:any ={}

  register()
  {
    console.log(this.model);
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel(); //za da ja trgne ovaa komponenta
      },
      error: error => this.toastr.error(error.error)
    });
  }

  cancel()
  {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
