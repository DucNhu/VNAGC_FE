import { Component, OnInit } from '@angular/core';
import { DashBoard } from 'src/app/core/_service/admin/dashBoard.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  listOrder = []
  load = true;
  constructor(
    private admin: DashBoard
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

}
