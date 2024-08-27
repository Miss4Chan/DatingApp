import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { LikesService } from './likes.service';

//can be injected into components
//created when called disposed of ??
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private likeService = inject(LikesService); //pazi koa inject service vo service mozhe da se desi circular dependencies i posle rip:(
  baseUrl = environment.apiUrl;

  currentUser = signal<User | null>(null);


  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      }
      ));
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user; //ova e samo za da mozham da go printam koa ke projde register func vo register comp
      }
      ));
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.likeService.getLikeIds(); //ova ke go updatene signalot shto go iame vo toj service
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
