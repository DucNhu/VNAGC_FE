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

  listBlog = [];
  ngOnInit(): void {
    this.blogService.getAllBlogeres().subscribe(
      dt => {
        this.listBlog = dt.Data.Items;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    )
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
}

