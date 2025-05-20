import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user-data';
import { first } from 'rxjs';
import { ChangePassword } from '../model/changePassword';


@Injectable({
  providedIn: 'root'
})
export class DataUserService {

  private readonly API_URL = ('http://localhost:8080/users')

  constructor(private httpClient: HttpClient) { }

  getDataUser(){
    return this.httpClient.get<User>(this.API_URL).pipe(
      first()
    );
  }

}
