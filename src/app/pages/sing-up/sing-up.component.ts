import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl, AbstractControl, ValidationErrors} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SingUpService } from '../../services/sing-up.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sing-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {

  singUpForm !: FormGroup

  constructor(private singUpService: SingUpService, private router: Router, private toastr: ToastrService){
      this.singUpForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])},
      { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
        return { passwordMismatch: true };
    }
    return null;
}

  onSubmit(){
    if(this.singUpForm.valid){
      console.log(this.singUpForm.value)
      this.singUpService.SingUp(this.singUpForm.value.username, this.singUpForm.value.password, this.singUpForm.value.email).subscribe({
        next: () => this.toastr.success('Cadastro realizado com sucesso'),
        error: () => this.toastr.error('Erro ao se cadastrar')
      })
      console.log(this.singUpForm.value)
    }
  }
}
