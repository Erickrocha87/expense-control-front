import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    

    loginForm!: FormGroup;

    constructor(private loginService: LoginService, private toastr: ToastrService){
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
      })
    }

    onSubmit(){
      if(this.loginForm.valid){
          this.loginService.Login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
            next: () => this.toastr.success("Login realizado com sucesso"),
            error: () => this.toastr.error("Erro ao realizar login")
          })
      }
    }
}
 