import { Injectable } from "@angular/core";
import { HelperService } from "src/app/_helpers/helper.service";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private helperService: HelperService) { }
 
    getOrders() {
        return this.helperService.getAll("Order");
    }
}