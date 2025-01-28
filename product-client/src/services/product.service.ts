import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ProductRequest } from "src/transport/product.request";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { CommonService } from './common.service';

@Injectable()
export class ProductService extends CommonService {

  private baseUrl = environment.BASE_URL + '/products'

  createproduct(request: ProductRequest): Observable<any> {
    return this.http.post(
      this.baseUrl + '/create-product', request
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  updateproduct(request: ProductRequest): Observable<any> {
    return this.http.put(
      this.baseUrl + '/update-product?id=' + request.$id,
      request)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  deleteproduct(id: number): Observable<any> {
    return this.http.post(
      this.baseUrl + '/delete-product', id
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  fetchproducts(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-products')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  fetchproductsSeriesCodes(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-products-series-codes')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getproductsList(request: ProductRequest) {
    return this.http.get(
      this.baseUrl + '/get-products-list',
      {
        params: this.constructParams(request, 'name,purchaseDateFrom,purchaseDateTo,productSeriesCodesList')
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  getproductById(id: number): Observable<any> {
    return this.http.get(
      this.baseUrl + '/get-product-by-id',
      {
        params: new HttpParams().set('id', id.toString())
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

}
