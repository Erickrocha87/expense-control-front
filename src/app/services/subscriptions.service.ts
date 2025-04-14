import { Injectable } from '@angular/core';
import { Subscriptions } from '../model/subscriptions';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private httpCliente: HttpClient) { }

  findAll(): Subscriptions[] {
    return[{
        name: 'Netflix',
        price: 100,
        dueDate: new Date('2025-01-01'),
        frequency: 'Mensal'
      }
    ];
  }
}