import { Injectable } from '@angular/core';
import { Subscriptions } from '../model/subscriptions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, first } from 'rxjs';
import { PageResponse } from '../model/page-response';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private readonly API_URL = ('http://localhost:8080/api/subscriptions')
  constructor(private httpClient: HttpClient) { }

  findAll(page: number, size: number) {
    return this.httpClient.get<PageResponse<Subscriptions>>(`${this.API_URL}?page=${page}&size=${size}`).pipe(
      first(),
    );
  }

  findByStatus(status: string, page: number, size: number){
    return this.httpClient.get<PageResponse<Subscriptions>>(`${this.API_URL}?status=${status}&page=${page}&size=${size}`).pipe(
      first()
    );
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.API_URL}/${id}`).pipe(
      first(),
    );
  }

  create(subscription: Subscriptions) {
    console.log('Service subs',subscription)
    return this.httpClient.post<Subscriptions>(this.API_URL, subscription).pipe(
      first(),
    );
  }

  update(id: number, subscription: Subscriptions ){
    console.log('ENVIANDO PARA O BACKEND: ', subscription)
    return this.httpClient.put<Subscriptions>(`${this.API_URL}/${id}`, subscription).pipe(
      first(),
    );
  }
}