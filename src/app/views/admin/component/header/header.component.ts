import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user';
import { AuthenService } from 'src/app/core/_service/authen/authen.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profile:user;
  constructor(private authenSv: AuthenService) { }

  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem("user") ? localStorage.getItem("user") : sessionStorage.getItem("user"));
  }
logout() {
    this.authenSv.logout()
  }
}
