import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthServiceService, private toastr: ToastrService) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      this.router.navigate(['/login']);
      this.toastr.error("Usuário não authenticado");
      return false;
    }
    return true;
  }
}
