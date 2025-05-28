import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenData } from '../model/token-data';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
private readonly API_URL = ('http://localhost:8080/auth/forget-password')
  constructor(private httpClient: HttpClient) { }

  forgetPassword(tokenAndPasswordData: TokenData) {
    return this.httpClient.put<TokenData>(this.API_URL, tokenAndPasswordData).pipe(
      first()
    );
  }
}
