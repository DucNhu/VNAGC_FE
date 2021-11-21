import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardService } from 'src/app/core/_service/admin/dashBoard.service';
import { BlogService } from 'src/app/core/_service/blog/blog.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Data } from 'src/app/models/pagination';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListBlogComponent implements OnInit {
  loading = true;
  constructor(
    private blogService: BlogService,
    private route: Router,
    private dashBoardService: DashBoardService,
    private domSanitizer: DomSanitizer
  ) { }

  listBlog = [];
  data: Data;
  PageCount=[];
  ngOnInit(): void {
    this.getAllBlogeres(1);

  }

  routerUpdate(id) {
    this.route.navigateByUrl("/" + this.route.url.split('/')[1] + "/" + "/update", { state: id })
  }

  routerCreateBlog() {
    this.route.navigateByUrl("/" + this.route.url.split('/')[1] + "/create")
  }

  activeBlog(val, status) {
    this.loading = true;
    let data = {
      id: val.id,
      status: status.checked ? 1 : 0
    }
    this.blogService.activeBlog(data).subscribe(
      dt => {
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    )
  }

  deleteProduct(id, index) {
    if (confirm("Delete ok?")) {
      this.blogService.delete(id).subscribe(
        dt => {
          this.listBlog.splice(index, 1)
        },
        err => {
          this.loading = false;
        }
      )
    }
  }

  timeSelect = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
  newDate = this.timeSelect;

  listBlognotActive;
  getBlogNotActive() {
    this.listBlognotActive = this.listBlog;
    this.listBlog = [];
    this.listBlognotActive.forEach(e => {
      if (e.status == false) {
        this.listBlog.push(e)
      }
    })
  }

  reset() {
    this.loading = true;
    this.blogService.getAllBlogeres(1).subscribe(
      dt => {
        this.listBlog = dt.Data.Items;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    )
  }

  getAllBlogeres(pageIndex) {
    this.loading = true;
    this.blogService.getAllBlogeres(pageIndex).subscribe(
      dt => {
        this.data = dt.Data;
        this.PageCount = [];
        for (let i = 0; i < this.data.PageCount;) {
          this.PageCount.push(++i);
        }
        console.log(this.data);
        this.listBlog = this.data.Items;
        this.listBlog.forEach(
          e => {
            let img = this.domSanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${e.banner_img}`);
            e.banner_img = e.banner_img ? img : 'assets/images/avatars/default-avatar.jpg';
          })
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    )
  }
}

