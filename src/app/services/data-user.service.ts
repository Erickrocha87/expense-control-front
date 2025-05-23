import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user-data';
import { first } from 'rxjs';
import { ChangePassword } from '../model/changePassword';


@Injectable({
  providedIn: 'root'
})
export class DataUserService {

  private readonly API_URL = ('http://localhost:8080/users')

  constructor(private httpClient: HttpClient) { }

  getDataUser(){
    return this.httpClient.get<User>(this.API_URL).pipe(
      first()
    );
  }

  editDataUser(id: number, user: User){
    return this.httpClient.put<User>(`${this.API_URL}/${id}`, user).pipe(
      first()
    );
  }

  uploadProfileImage(id: number, image: File){
    const formData = new FormData();
    formData.append('file', image);

    return this.httpClient.post<User>(`${this.API_URL}/${id}/upload-profile-image`, formData).pipe(
      first()
    );
  }

  

}
