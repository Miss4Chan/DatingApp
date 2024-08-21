import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';

//can be injected into components
//created when called disposed of ??
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';

  currentUser = signal<User | null>(null);


  login(model: any) { 
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(user=> {
        if(user)
        {
          localStorage.setItem('user',JSON.stringify(user)); 
          this.currentUser.set(user);
        }
      }
    ));
  }

  register(model: any) { 
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user=> {
        if(user)
        {
          localStorage.setItem('user',JSON.stringify(user)); 
          this.currentUser.set(user);
        }
        return user; //ova e samo za da mozham da go printam koa ke projde register func vo register comp
      }
    ));
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
