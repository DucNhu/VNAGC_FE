import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/_helpers/helper.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private helperService: HelperService) { }
  getAllBlogeres() {
    return this.helperService.getAll("Blogeres");
  }

  getBlog(id) {
    return this.helperService.get("Blogeres", id);
  }

  create(data) {
    return this.helperService.post("Blogeres", data);
  }

  update(data) {
    return this.helperService.put("Blogeres/" + data.id, data);
  }

  delete(id) {
    return this.helperService.delete("Blogeres", id);
  }
}
