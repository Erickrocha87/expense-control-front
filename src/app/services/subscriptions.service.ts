import { Injectable } from '@angular/core';
import { Subscriptions } from '../model/subscriptions';
import { HttpClient } from '@angular/common/http';
import { delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private readonly API_URL = ('http://localhost:8080/api/subscriptions')
  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Subscriptions[]>(this.API_URL).pipe(
      first(),
    )
  }
}