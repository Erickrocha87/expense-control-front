import { Component } from '@angular/core';
import { SideMenuComponent } from '../../componenents/side-menu/side-menu.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataUserService } from '../../services/data-user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, TheaterIcon } from 'lucide-angular';
@Component({
  selector: 'app-user-data',
  imports: [
    SideMenuComponent,
    ReactiveFormsModule,
    CommonModule,
    LucideAngularModule,
  ],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent {
  editMode = false;
  originalDataUser!: {
    id: number;
    username: string;
    email: string;
    profileImageUrl?: string;
  };
  dataUserForm!: FormGroup;
  changePasswordForm!: FormGroup;

  constructor(
    private userService: DataUserService,
    private authService: AuthServiceService,
    private toastr: ToastrService
  ) {
    this.dataUserForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.getDataUser();

    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  getDataUser() {
    this.userService.getDataUser().subscribe((userData) => {
      console.log('Dados do usuário recebidos:', userData);
      this.originalDataUser = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        profileImageUrl: userData.profileImageUrl,
      };
      this.dataUserForm.patchValue({
        username: userData.username,
        email: userData.email,
      });
    });
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const dataForm = this.changePasswordForm.value;
      console.log('Form enviado:', dataForm);

      this.authService.changePassword(dataForm).subscribe({
        next: () => {
          this.toastr.success('Senha alterada com sucesso');
          this.authService.logout();
        },
        error: (err) => {
          console.error('Erro ao alterar senha:', err);
          this.toastr.error('Erro ao alterar senha');
        },
      });
    }
  }

  onSubmitDataUser() {
    if (this.dataUserForm.valid) {
      const dataForm = this.dataUserForm.value;
      const updatedFields: any = {};

      if (
        dataForm.username?.trim() &&
        dataForm.username?.trim() !== this.originalDataUser.username.trim()
      ) {
        updatedFields.username = dataForm.username.trim();
      }
      if (
        dataForm.email?.trim() &&
        dataForm.email?.trim() !== this.originalDataUser.email.trim()
      ) {
        updatedFields.email = dataForm.email.trim();
      }
      if (Object.keys(updatedFields).length === 0) {
        this.toastr.info('Nenhum dado foi alterado');
        return;
      }
      console.log('Dados do usuário:', this.originalDataUser);

      if(dataForm.email.trim() !== this.originalDataUser.email.trim()){
        confirm(
          'Você alterou seu email, para continuar você precisa fazer login novamente')
        this.updateUser(updatedFields);
        this.authService.logout();
      } else{
        this.updateUser(updatedFields);
      }
    }
  }

  updateUser(updatedFields: any) {
    const dataForm = this.dataUserForm.value;
     this.userService
        .editDataUser(this.originalDataUser.id, updatedFields)
        .subscribe({
          next: () => {
            this.toastr.success('Dados alterados com sucesso');
            this.originalDataUser = { ...this.originalDataUser, ...dataForm };
            this.dataUserForm.markAsPristine();
            this.editMode = false;
          },
          error: () => {
            this.toastr.error('Esse email já está em uso');
            console.error('Erro ao alterar dados:');
          },
        });
  }

  triggerFileInput() {
    const fileInput = document.getElementById(
      'avatarUpload'
    ) as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadProfileImage(file);
    }
  }

  uploadProfileImage(file: File) {
    this.userService
      .uploadProfileImage(this.originalDataUser.id, file)
      .subscribe({
        next: (res) => {
          this.originalDataUser.profileImageUrl =
            res.profileImageUrl + '?v=' + Date.now();
          this.getDataUser();
          this.toastr.success('Imagem de perfil atualizada com sucesso');
        },
        error: (err) => {
          console.error('Erro ao fazer upload da imagem de perfil:', err);
          this.toastr.error('Erro ao fazer upload da imagem de perfil');
        },
      });
  }
  getEncodedImageUrl(fileName: string | undefined): string {
    const encodedName = encodeURI(fileName ?? '');
    return `http://localhost:8080${encodedName}`;
  }
}
