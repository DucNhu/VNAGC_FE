import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/_service/category/category.service';
import { ProfileService } from 'src/app/core/_service/profile/profileService..service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  urlImg = this.categoryService.urlImg;
  userId;
  listBlog;
  constructor(
    private categoryService: CategoryService,
    private profileService: ProfileService
  ) {
    this.userId = JSON.parse(sessionStorage.getItem("user")).id;
   }

  ngOnInit(): void {
    Promise.all([
      this.getBlogById()
    ]).then(
      dt => {
        this.listBlog = dt[0].Data;
        console.log(this.listBlog)
      }
    )
  }

  getBlogById():Promise<any> {
    return new Promise(async (resolve)=> {
      let dt = await this.profileService.getBlogById(this.userId).toPromise();
      resolve(dt)
    })
  }
}

