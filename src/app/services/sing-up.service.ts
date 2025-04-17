import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, switchMap, tap } from 'rxjs';
import { SingUpResponse } from '../types/sing-up-response.type';
import { LoginService } from './login.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class SingUpService {

  private readonly API_URL = ('http://localhost:8080/auth/register')

  constructor(private httpClient: HttpClient, private loginService: LoginService, private router: Router) { }

  SingUp(username: string, password: string, email: string){
    return this.httpClient.post<SingUpResponse>(this.API_URL, {username, password, email}).pipe(
      switchMap(() => this.loginService.Login(email, password) ),
      delay(1000),
      tap(() => this.router.navigate(['/home'])),
    )
  }
}
