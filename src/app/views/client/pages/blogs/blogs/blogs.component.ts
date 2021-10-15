import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/core/_service/blog/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  listBlog:any=[];
  constructor(
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    Promise.all([this.getAllBlogeres()]).then(
      dt => {
        this.listBlog = dt[0]
        console.log(this.listBlog)
      }
    )
  }

  getAllBlogeres():Promise<any> {
    return new Promise((resolve)=> {
      const dt = this.blogService.getAllBlogeres().toPromise();
      return resolve(dt)
    })
  }
}
