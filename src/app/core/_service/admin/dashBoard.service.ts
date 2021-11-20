import { Injectable } from "@angular/core";
import { HelperService } from "src/app/_helpers/helper.service";

@Injectable({
    providedIn: "root"
})

export class DashBoardService {
    constructor(private helperService: HelperService) { }
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

    getBlogByMonth(start, end) {
        let param = `?start=${start}&end=${end}`;
        return this.helperService.getAll("Dashboard/get-Top-Blog-by-month" + param);
    }

    getBlogByYear() {
        return this.helperService.getAll("Dashboard/get-Top-Blog-by-year");
    }


    getOrderByMonth(start, end) {
        let param = `?start=${start}&end=${end}`;
        return this.helperService.getAll("Dashboard/get-Top-Order-by-month" + param);
    }
    getTopMemberInMonth(time) {
        let param = "?time="+time;
        return this.helperService.getAll("Dashboard/get-top-member" + param)
    }
    getOrderByYear() {
        return this.helperService.getAll("Dashboard/get-Top-Order-by-year");
    }

    GetTopOrderByDay(date) {
        let param = "?date=" + date;
        return this.helperService.getParam("Dashboard/get-All-Order-by-day", param);
    }

    GetTopOrderInMonth(month) {
        let param = "?month=" + month;
        return this.helperService.getParam("Dashboard/get-order-in-month", param);
    }

    GetCountBlogByDay(date) {
        let param = "?date=" + date;
        return this.helperService.getParam("Dashboard/get-count-Blog-by-day", param);
    }

    GetTopBlogByDay(date) {
        let param = "?date=" + date;
        return this.helperService.getParam("Dashboard/get-All-Blog-by-day", param);
    }

    getAllReport(id) {
        let param = "?blog_id=" + id;
        return this.helperService.getAll("Dashboard/get-report-blog" + param);
    }
}
