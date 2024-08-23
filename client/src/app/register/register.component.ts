import { Component, EventEmitter, inject, input, Input, OnInit, output, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe, NgIf } from '@angular/common';
import { TextInputComponent } from "../_forms/text-input/text-input.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, TextInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService)
  // /@Input() usersFromHomeComponent: any; koga go imame vaka treba vo deklaracijata na component vo html
  //ako go staime required ke iame error na tagot deka mora da mu gi predademe ovie 
  //ova ni e parent to child communication zatoa shto gi iame u home userite i samo mu gi davame na deteto koa go praime
  //usersFromHomeComponent = input.required<any>()

  //@Output() cancelRegister = new EventEmitter();
  cancelRegister = output<boolean>();
  model: any = {}
  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initalizeForm();
  }

  initalizeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      confirmPassword: new FormControl('',[Validators.required, this.matchValues('password')]),
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string) : ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }


  register() {
    console.log(this.registerForm.value);
    // console.log(this.model);
    // this.accountService.register(this.model).subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.cancel(); //za da ja trgne ovaa komponenta
    //   },
    //   error: error => this.toastr.error(error.error)
    // });
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
