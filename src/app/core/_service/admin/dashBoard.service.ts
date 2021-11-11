import { Injectable } from "@angular/core";
import { HelperService } from "src/app/_helpers/helper.service";

@Injectable({
    providedIn: "root"
})

export class DashBoardService {
    constructor(private helperService: HelperService) {}
    controll = 'Dashboard/';

    getStatistics() { 
        return this.helperService.getAll(this.controll + 'get-DashBoard');
    }

    getAllMember() {
        let param = '?pageIndex=1&pageSize=1000';

        return this.helperService.getParam(this.controll + 'get-all-user', param);
    }

    getAllOrder() {
        let param = '?pageIndex=1&pageSize=1000';
        return this.helperService.getParam("Dashboard/get-all-order", param);
    }

    getProductTopRating() {
        return this.helperService.getAll("Products/get-product-top-rating");
    }

    getProductPopular() {
        return this.helperService.getAll("Products/get-product-popular");
    }
    

    getTopBlog() {
        return this.helperService.getAll("Dashboard/get-Top-Blog");
    }

    getAllOrderDetail(id) {
        return this.helperService.get("get-order-detail",  id);
    }
}