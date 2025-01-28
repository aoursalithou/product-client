import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ProductSeriesRequest } from "src/transport/product-series.request";
import { environment } from "src/environments/environment";
import { CommonService } from "./common.service";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class ProductSeriesService extends CommonService {

  private baseUrl = environment.BASE_URL + '/products-series'


  createproductSeries(request: ProductSeriesRequest): Observable<any> {
    return this.http.post(
      this.baseUrl + '/create-product-series', request
    ).pipe(map((response: any) => {
      return response;
    }));
  }//

  getproductSeriesList(request: ProductSeriesRequest) {
    return this.http.get(
      this.baseUrl + '/get-product-series-list',
      {
        params: this.constructParams(request, '')
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  getById(id: number): Observable<any> {
    return this.http.get(
      this.baseUrl + '/get-product-series-by-id',
      {
        params: new HttpParams().set('id', id.toString())
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  updateproductSeries(request: ProductSeriesRequest): Observable<any> {
    return this.http.put(
      this.baseUrl + '/update-product-series?id=' + request.$id,
      request)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  deleteproductSeries(id: number): Observable<any> {
    return this.http.post(
      this.baseUrl + '/delete-product-series', id
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  fetchproductsByproductSeriesCode(qrCode: string): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-products-by-product-series-code', {
        params: new HttpParams().set('qrCode', qrCode),
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  fetchAvailableproducts(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-available-products')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
