import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private httpClient: HttpClient) { }
  
  
  login(data) {
    return this.httpClient.post(AppConfig.settings.WhiteServer + "Authen/login", data)
  }

  register(data) {
    return this.httpClient.post(AppConfig.settings.WhiteServer + "Authen/Register", data)
  }

  sendMail(data) {
    return this.httpClient.post(AppConfig.settings.WhiteServer + 'Mail/send', data)
  }

  activeAcc(id) {
    return this.httpClient.put(AppConfig.settings.WhiteServer + `Authen/activeAccount/${id}`, id)
  }
}
