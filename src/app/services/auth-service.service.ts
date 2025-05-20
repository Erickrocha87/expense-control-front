import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePassword } from '../model/changePassword';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly TOKEN_KEY = 'auth-token';
  private readonly API_URL = ('http://localhost:8080/auth/users/change-password')
  constructor(private router: Router, private httpClient: HttpClient) { }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  
  changePassword(changePassword: ChangePassword){
    return this.httpClient.put<ChangePassword>(this.API_URL, changePassword).pipe(
      first()
    )
  }
  
  
}
