import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  likeIds = signal<number[]>([]);

  paginatedResults = signal<PaginatedResult<Member[]> | null>(null);

  constructor() { }

  toggleLike(tagetId: number) {
    return this.http.post(`${this.baseUrl}likes/${tagetId}`, {}); //deka e post mora da staime body ama go prakjame prazen 
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = setPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate',predicate);
    return this.http.get<Member[]>(`${this.baseUrl}likes`, {observe: 'response', params})
      .subscribe({
        next: response => setPaginatedResponse(response, this.paginatedResults)
      })
  }

  getLikeIds(){ //ova ke se izvrshuva koa ke se logne in userot ili ke refreshne i ni treba za da obelezhime koi gi ima liked the user 
    return this.http.get<number[]>(`${this.baseUrl}likes/list`).subscribe({
      next: ids => this.likeIds.set(ids)
    })
  }

}
