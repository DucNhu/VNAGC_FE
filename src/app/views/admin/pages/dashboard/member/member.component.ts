import { Component, OnInit } from '@angular/core';
import { DashBoardService } from 'src/app/core/_service/admin/dashBoard.service';
import { AuthenService } from 'src/app/core/_service/authen/authen.service';
import { CategoryService } from 'src/app/core/_service/category/category.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  listMember = [];
  urlImg = this.categoryService.urlImg;
  listMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 11, 12]

  load = true;
  active = 0;
  isGetAll = true;
  constructor(
    private categoryService: CategoryService,
    private dashBoardService: DashBoardService,
    private authenservice: AuthenService
  ) { }
  ngOnInit(): void {

    this.getAll();
  }
  getAll() {
    this.isGetAll = true;
    Promise.all(
      [this.getAllMember()]
    ).then(
      (dt) => {
        this.listMember = dt[0].Data.Items;
        this.load = false;
        console.log(this.listMember)
      }
    )
  }
  getAllMember(): Promise<any> {
    return new Promise(
      async (resolve) => {
        let dt = await this.dashBoardService.getAllMember().toPromise();
        return resolve(dt)
      }
    )
  }

  getMemberInMonth(month) {
    this.isGetAll = false;
    this.load = true;
    this.active = month;
    this.dashBoardService.getTopMemberInMonth(`2021-${month}-01`).subscribe(
      dt => {
        this.load = false;
        this.listMember = dt;
      }
    )
  }
}
