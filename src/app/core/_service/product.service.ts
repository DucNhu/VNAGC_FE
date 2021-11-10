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
    return this.helperService.getAll("Products/get-all-product");
  }

  getProduct(id) {
    return this.helperService.get("Products/detail", id);
  }

  create(data) {
    return this.helperService.post("Products", data);
  }

  update(data) {
    return this.helperService.put("Products/edit/" + data.id, data);
  }

  delete(id) {
    return this.helperService.delete("Products/remove", id);
  }

  GetImgProductFeature(id) {
    return this.helperService.get("Products/GetImgProductFeature", id);
  }

  createImgFeature(data) {
    return this.helperService.post("ImgProductFeatures", data);
  }

  updateImgFeature(data) {
    console.log("ImgProductFeatures/" + data.id)
    return this.helperService.put("ImgProductFeatures/" + data.id, data);
  }
}
