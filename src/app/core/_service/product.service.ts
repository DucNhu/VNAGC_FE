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

  getAllProducts() {
    return this.helperService.getAll("Products");
  }

  getProduct(id) {
    return this.helperService.get("Products", id);
  }

  create(data) {
    return this.helperService.post("Products", data);
  }

  update(data) {
    return this.helperService.put("Products", data);
  }

  delete(id) {
    return this.helperService.delete("Products", id);
  }

  createImgFeature(data) {
    return this.helperService.post("ImgProductFeatures", data);
  }
}
