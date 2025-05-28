import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverySteps } from '../../model/enum/recovery-steps.enum';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenData } from '../../model/token-data';
import { EmailService } from '../../services/email.service';
import { EmailDTO } from '../../model/emailDTO';
import { ForgetPasswordService } from '../../services/forget-password.service';

@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})


export class ForgetPasswordComponent {

  emailData: EmailDTO = { email: '' };
  tokenData: TokenData = { email: '', token: '', password: '', confirmPassword: '' };

  emailForm!: FormGroup;
  forgetPasswordForm!: FormGroup;
  RecoverySteps = RecoverySteps;
  steps: RecoverySteps = RecoverySteps.RequestEmail;

  @Output() closed = new EventEmitter<void>();


  constructor(private toastr: ToastrService, private emailService: EmailService, private forgetPasswordService: ForgetPasswordService) {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.forgetPasswordForm = new FormGroup(
    {
      token: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    },
    {validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  enviarEmail() {
    if(this.emailForm.valid) {
      console.log('Enviando token para o email...', this.emailForm.value.email);
      this.steps = RecoverySteps.Loading;
      this.emailData.email = this.emailForm.value.email;
      console.log('Dados do token:', this.emailData.email);
      this.emailService.sendEmailToken(this.emailData).subscribe({ 
        next: (response) => {
          console.log('Token enviado com sucesso', response);
          this.toastr.success('Token enviado para o seu email');
          this.steps = RecoverySteps.NewPassword;
        },
        error: (error) => {
          console.error('Erro ao enviar token', error);
          this.toastr.error('Erro ao enviar token, verifique o email informado');
          this.steps = RecoverySteps.RequestEmail;
        }
      });
    }
  }

  onSubmitChangePassword() {
    if (this.forgetPasswordForm.valid) {
      this.tokenData = {
        email: this.emailData.email,
        token: this.forgetPasswordForm.value.token,
        password: this.forgetPasswordForm.value.password,
        confirmPassword: this.forgetPasswordForm.value.confirmPassword
      }
      this.forgetPasswordService.forgetPassword(this.tokenData).subscribe({
        next: (response) => {
          console.log('Senha alterada com sucesso', response);
          this.toastr.success('Senha alterada com sucesso');
          this.close();
        },
        error: (error) => {
          console.error('Erro ao alterar senha', error);
          this.toastr.error('Erro ao alterar senha, verifique o token e tente novamente');
        }
      });
    }}


  close() {
    this.closed.emit(); 
    this.steps = RecoverySteps.RequestEmail;
  }
}
