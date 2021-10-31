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
        let param = '?pageIndex=1&pageSize=10';

        return this.helperService.getParam(this.controll + 'get-all-user', param);
    }
}