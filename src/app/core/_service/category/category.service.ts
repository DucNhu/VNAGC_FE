import { Injectable } from "@angular/core";
import { HelperService } from "src/app/_helpers/helper.service";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    constructor(private helperService: HelperService) {}
    
    getCategorys() {
        return this.helperService.getAll("Category/get-all-category");
    }

    createCategory(name) {
        let param='';
        param += '?name=' + name;
        return this.helperService.postUrl("Category/create", name, param);
    }

    updateCategory(data) {
        let param = '';
        param += '?name=' + data;
        return this.helperService.put("Category/edit", data);
    }

    deleteCategory(id) {
        return this.helperService.delete("Category/remove", id);
        
    }
}