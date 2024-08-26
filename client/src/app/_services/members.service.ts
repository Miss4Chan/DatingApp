import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { AccountService } from './account.service';
import { of, tap } from 'rxjs';
import { Photo } from '../_models/photo';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  //private accountService = inject(AccountService);
  baseUrl = environment.apiUrl;
  //members = signal<Member[]>([]);
  paginatedResults = signal<PaginatedResult<Member[]> | null> (null);

  getMembers(pageNumber?: number, pageSize?: number) {
    let params = new HttpParams();
    if(pageNumber && pageSize){
      params = params.append('pageNumber',pageNumber);
      params = params.append('pageSize',pageSize);
    }

    return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response',params}).subscribe({
      next: response => {
        this.paginatedResults.set({
          items: response.body as Member[],
          pagination: JSON.parse(response.headers.get('Pagination')!)
        })
      }
    });
  }

  getMember(username: string) {
    // const member = this.members().find(x => x.username === username);
    // if (member !== undefined) return of(member); //ova of e tuka za da vratime observable
    //ni treba observableot deka praime subscribe na nego posle
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => m.username === member.username ? member : m))
      // })
    )
  }

  setMainPhoto(photo: Photo) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photo.id, {}).pipe(
      // tap(()=>{
      //   this.members.update(members => members.map(m=>{
      //     if(m.photos.includes(photo)) {
      //       m.photoUrl = photo.url
      //     }
      //     return m;
      //   }))
      // })
    );
  }

  deletePhoto(photo: Photo)
  {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photo.id).pipe(
    //   tap(()=>{
    //     this.members.update(members=>members.map(m=>{
    //       if(m.photos.includes(photo))
    //       {
    //         m.photos = m.photos.filter(x=> x.id !== photo.id)
    //       }
    //       return m;
    //     }))
    //   })
     );
  }

  //Go zamenivme ova so interceptor 
  //sekoj pat koga se prakja request se pravi klon na toj request i se lupa tokenot kako header ofc ako postoi token
  // getHttpOptions()
  // {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${this.accountService.currentUser()?.token}` //backticks se ova ne quotes
  //     })
  //   }
  // }
}
