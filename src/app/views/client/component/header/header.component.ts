import { Component, OnInit } from '@angular/core';
import { AuthenService } from 'src/app/core/_service/authen/authen.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin=false;
  user: user;
  constructor(
    private authenSv: AuthenService
  ) { }

  ngOnInit(): void {
    this.authenSv.currentUserSubject.subscribe(
      dt => {
        if (dt) {
          this.isLogin = true;
          this.user = JSON.parse(localStorage.getItem("user"))
        }
        else {
          this.isLogin = false;
        }
      }
    )
    
  }
  logout() {
    this.authenSv.logout()
  }

}
