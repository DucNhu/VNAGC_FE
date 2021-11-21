import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  listMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  load = true;
  active = 0;
  isGetAll = true;
  constructor(
    private categoryService: CategoryService,
    private dashBoardService: DashBoardService,
    private authenservice: AuthenService,
    private domSanitizer: DomSanitizer
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
        this.listMember.forEach(
          e => {
            let img = this.domSanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${e.avatar}`);
            e.avatar = e.avatar ? img : 'assets/images/avatars/default-avatar.jpg';
          })
        this.load = false;
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
    if(month<10) {
      month = '0' + month;
    }
    this.dashBoardService.getTopMemberInMonth(`2021-${month}-01`).subscribe(
      dt => {
        this.load = false;
        this.listMember = dt;
      }
    )
  }
}
