import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { EmailDTO } from '../model/emailDTO';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly API_URL = ('http://localhost:8080/email/send-token')
  constructor(private httpClient: HttpClient) { }

  sendEmailToken(emailData: EmailDTO) {
    return this.httpClient.post<EmailDTO>(this.API_URL, emailData).pipe(
      first(),
    );
  }

}
