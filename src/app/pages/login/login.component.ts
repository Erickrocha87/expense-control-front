import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService
        .Login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: () => {
            this.toastr.success('Login realizado com sucesso');
            this.router.navigate(['/home']);
          },
          error: () => this.toastr.error('Erro ao realizar login'),
        });
    }
  }
}
