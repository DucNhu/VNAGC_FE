import { Component, OnInit } from '@angular/core';
import { DashBoardService } from 'src/app/core/_service/admin/dashBoard.service';
import { AuthenService } from 'src/app/core/_service/authen/authen.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  listOrder = []
  load = true;
  active = 0;
  constructor(
    private admin: DashBoardService,
    private authenservice: AuthenService
  ) { }
  ngOnInit(): void {

    Promise.all(
      [this.getAllMember()]
    ).then(
      dt => {
        this.listOrder = dt[0].Data.Items;
        this.load = false;
      }
    )
  }

  getAllMember(): Promise<any> {
    return new Promise(
      async (resolve) => {
        let dt = await this.admin.getAllMember().toPromise();
        return resolve(dt)
      }
    )
  }

  publicAccount(userId, status) {
    this.load = true
    this.authenservice.activeAcc(userId).subscribe(
      (dt: any) => {
        this.load = false;
      },
      err => {
        this.load = false;
      }
    )
  }
}
