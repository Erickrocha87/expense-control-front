import { Component } from '@angular/core';
import { SideMenuComponent } from '../../componenents/side-menu/side-menu.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataUserService } from '../../services/data-user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-data',
  imports: [SideMenuComponent, ReactiveFormsModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export class UserDataComponent {

  dataUserForm!: FormGroup;
  changePasswordForm!: FormGroup;
  
  constructor(private userService: DataUserService, private authService: AuthServiceService, private toastr: ToastrService){

    this.dataUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    })

    this.userService.getDataUser().subscribe(userData => {
      console.log('Dados do usuário recebidos:', userData);
      this.dataUserForm.patchValue({
        name: userData.username,
        email: userData.email
      })
    })
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit() {
  if (this.changePasswordForm.valid) {
    const dataForm = this.changePasswordForm.value;
    console.log('Form enviado:', dataForm);

    this.authService.changePassword(dataForm).subscribe({
      next: () => {
        this.toastr.success("Senha alterada com sucesso");
        this.authService.logout(); // Descomente se desejar forçar logout após alteração de senha
      },
      error: (err) => {
        console.error('Erro ao alterar senha:', err);
        this.toastr.error("Erro ao alterar senha");
      }
    });
  }
}



}
