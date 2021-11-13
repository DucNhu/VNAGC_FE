import { Injectable } from "@angular/core";
import { HelperService } from "src/app/_helpers/helper.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    constructor(private helperService: HelperService) { }

    getProfile(id:string) {
        return this.helperService.getAll("Dashboard/get-user-detail/"+id);
    }

    getBlogById(id) {
        return this.helperService.getAll("Dashboard/get-all-blog-by-user?user_id="+id);
    }
}