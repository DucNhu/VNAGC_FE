import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/core/_service/blog/blog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListBlogComponent implements OnInit {

  constructor(
    private blogService: BlogService,
    private route: Router
  ) { }

  listBlog = [{}];
  ngOnInit(): void {
    this.blogService.getAllBlogeres().subscribe(
      (dt:any) => {
        this.listBlog = dt;
        console.log(this.listBlog)
      }
    )
  }

  routerUpdate(id) {
    console.log(this.route.url.split('/')[1] + this.route.url.split('/')[2])
    this.route.navigate(["/" + this.route.url.split('/')[1] + "/" + this.route.url.split('/')[2] + "/update"])
  }

}
