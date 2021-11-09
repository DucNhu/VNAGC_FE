import { Injectable } from "@angular/core";
import { AppConfig } from "src/app/app.config";
import { HelperService } from "src/app/_helpers/helper.service";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    urlImg = AppConfig.settings.WhiteServer.replace("/api/", "");

    constructor(private helperService: HelperService) {}
    
    getCategorys() {
        return this.helperService.getAll("Category/get-all-category");
    }

    createCategory(data) {
        let param='';
        param += '?name=' + data.get('name');
        return this.helperService.postUrl("Category/create", data, param);
    }

    updateCategory(data) {
        let param = '';
        param += '?name=' + data;
        return this.helperService.postUrl("Category/edit", data, '');
    }

    deleteCategory(id) {
        return this.helperService.delete("Category/remove", id);
        
    }
}