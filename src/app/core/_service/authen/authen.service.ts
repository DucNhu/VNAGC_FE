import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { user } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  currentUserSubject = new BehaviorSubject<user>(JSON.parse(localStorage.getItem("user")));
  currentUser = new Observable<user>();
  
  public get currenUserValue(): user {
    return this.currentUserSubject.value;
  }
  constructor(private httpClient: HttpClient) { }
  
  
  login(data) {
    return this.httpClient.post(AppConfig.settings.WhiteServer + "Authen/Login", data)
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

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }
}
