import { Injectable } from "@angular/core";
import { HelperService } from "src/app/_helpers/helper.service";

@Injectable({
    providedIn: "root"
})

export class DashBoard {
    constructor(private helperService: HelperService) {}

    getAllMember() {
        let param = '?pageIndex=1&pageSize=10';

        return this.helperService.getParam('Dashboard/get-all-user', param);
    }
}