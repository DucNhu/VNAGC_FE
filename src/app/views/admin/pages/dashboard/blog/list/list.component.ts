import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/core/_service/blog/blog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListBlogComponent implements OnInit {
  loading = true;
  constructor(
    private blogService: BlogService,
    private route: Router
  ) { }

  listBlog = [{}];
  ngOnInit(): void {
    this.blogService.getAllBlogeres().subscribe(
      (dt: any) => {
        this.listBlog = dt;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    )
  }

  routerUpdate(id) {
    this.route.navigateByUrl("/" + this.route.url.split('/')[1] + "/" + this.route.url.split('/')[2] + "/update", { state: id })
  }

}
