import { Injectable } from "@angular/core";
import { HelperService } from "src/app/_helpers/helper.service";

@Injectable({ providedIn: 'root'})
export class PaymentService {
    constructor(private helperService: HelperService) {}
    
    createPayment(data) {
        return this.helperService.post("Order", data)
    }
}