import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/_helpers/helper.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private helperService: HelperService
  ) { }

  getAllProduct() {
    return this.helperService.get("Products");
  }
}
